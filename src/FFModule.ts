import { FFConfig } from './FFConfig';
import { ApiFeature } from './ApiFeature';
import { Feature } from './models/Feature';

export class FFModule {
  config: FFConfig;

  get features(): Feature[] {
    return this.FEATURES;
  }

  set features(value: Feature[]) {
    this.FEATURES = value;
  }

  private FEATURES: Feature[] = [];

  constructor(url: string) {
    this.config = new FFConfig(url);
    this.init();
  }

  private init() {
    const apiFeature = new ApiFeature(this.config.url);

    apiFeature.getFeatures().subscribe((res: Feature[]) => (this.FEATURES = res));
  }
}
