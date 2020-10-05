import { FFConfig } from './FFConfig';
import { ApiFeature } from './ApiFeature';
import { Feature } from './models/Feature';

export class FFModule {
  config: FFConfig;
  features: Feature[];

  constructor(url: string) {
    this.config = new FFConfig(url);

    this.getFeatures();
  }

  private getFeatures() {
    const apiFeature = new ApiFeature(this.config.url);

    apiFeature.getFeatures().then((res: Feature[]) => this.features = res);
  }
}
