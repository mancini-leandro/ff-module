import { FFConfig } from './FFConfig';
import { ApiFeature } from './ApiFeature';
import { Feature } from './models/Feature';
import * as lodash from 'lodash';
import { FFGlobals } from './FFGlobals';
import { interval, timer } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export class FFModule {
  config: FFConfig;
  globals: FFGlobals;

  get features(): Feature[] {
    return this.FEATURES;
  }

  set features(value: Feature[]) {
    this.FEATURES = value;
  }

  private FEATURES: Feature[] = [];

  constructor(url: string, interv?: number) {
    this.config = new FFConfig(url, interv);
    this.globals = new FFGlobals();
    this.init();
  }

  private init() {
    const apiFeature = new ApiFeature(this.config.url);
    const time = this.config.interval ? this.config.interval : 3000;
    const source = interval(time);

    apiFeature
      .getFeatures()
      .pipe(debounceTime(3000))
      .subscribe((res: Feature[]) => (this.features = res));

    // source.subscribe(() => {
    //   apiFeature.getFeatures().subscribe((res: Feature[]) => (this.features = res));
    // });
  }

  getFeature(featureName?: string): any {
    if (this.features.length > 0) {
      const feature = this.getFeatureName(this.features, featureName) as Feature;

      return feature;
    }

    return null;
  }

  private getFeatureName(features: Feature[], featureName?: string): Feature {
    const feature = lodash.find(features, { name: featureName }) as Feature;

    if (feature) {
      return this.globals.mapBoolFeature(feature);
    }

    return feature;
  }
}
