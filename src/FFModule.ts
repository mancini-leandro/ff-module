import { FFConfig } from './FFConfig';
import { ApiFeature } from './ApiFeature';
import { Feature } from './models/Feature';
import * as lodash from 'lodash';
import { FFGlobals } from './FFGlobals';
import { timer } from 'rxjs';

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

  constructor(url: string, interval?: number) {
    this.config = new FFConfig(url, interval);
    this.globals = new FFGlobals();
    this.init();
  }

  private init() {
    const apiFeature = new ApiFeature(this.config.url);

    timer(0, this.config.interval ? this.config.interval : 3000).subscribe(() => {
      apiFeature.getFeatures().subscribe((res: Feature[]) => (this.FEATURES = res));
    });
  }

  getFeature(featureName?: string): any {
    if (this.FEATURES.length > 0) {
      const feature = this.getFeatureName(this.FEATURES, featureName) as Feature;

      return feature;
    }

    return null;
  }

  private getFeatureName(features: Feature[], featureName?: string): Feature {
    const feature = lodash.find(features, { name: featureName }) as Feature;

    if (feature) {
      return this.globals.MapBoolFeature(feature);
    }

    return feature;
  }
}
