import { IFeature } from './/interfaces/IFeature';
import { IApiResponse } from './interfaces/IApiResponse';
import { Feature } from './models/Feature';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as lodash from 'lodash';

export class ApiFeature implements IFeature {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  getFeatures(featureName?: string): Observable<Feature[]> {
    if (featureName) {
      return this.fetchFeatureName(featureName);
    }

    return this.fetchFeature();
  }

  private fetchFeatureName(featureName: string): Observable<any> {
    return this.fetchFeature()
    .pipe(map((items: Feature[]) => this.mapFeature(items, featureName)));
  }

  private fetchFeature(): Observable<Feature[]> {
    const apiUrl = this.url;

    return new Observable(subscribe => {
      fetch(apiUrl, {
        method: 'post',
        body: JSON.stringify({}),
      })
      .then(this.handleErrors)
      .then((response: Response) => {
        return response.json();
      })
      .then((response: IApiResponse<Feature[]>) => {
        subscribe.next(response.data);
        subscribe.complete();
      })
      .catch(err => subscribe.error(err));
    });
  }

  private mapFeature(items: Feature[], featureName: string) {
    return lodash.find(items, { name: featureName });
  }

  private handleErrors(response: Response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response;
  }
}
