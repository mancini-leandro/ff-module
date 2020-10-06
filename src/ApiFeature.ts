import { IFeature } from './/interfaces/IFeature';
import { IApiResponse } from './interfaces/IApiResponse';
import { Feature } from './models/Feature';
import { Observable, timer } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { FFGlobals } from './FFGlobals';

export class ApiFeature implements IFeature {
  url: string;
  globals: FFGlobals;

  constructor(url: string) {
    this.globals = new FFGlobals();
    this.url = url;
  }

  getFeatures(featureName?: string): Observable<Feature[]> {
    if (featureName) {
      return this.fetchFeatureName(featureName);
    }

    return this.fetchFeature().pipe(takeUntil(timer(5e3)));
  }

  private fetchFeatureName(featureName: string): Observable<any> {
    return this.fetchFeature().pipe(map((items: Feature[]) => this.globals.findFeature(items, featureName)));
  }

  private fetchFeature(): Observable<Feature[]> {
    const apiUrl = this.url;

    return new Observable((subscribe) => {
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
        .catch((err) => subscribe.error(err));
    });
  }

  private handleErrors(response: Response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response;
  }
}
