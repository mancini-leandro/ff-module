import { FFConfig } from './FFConfig';
import { ApiFeature } from './ApiFeature';
import { Feature } from './models/Feature';

export class FFModule {
  config: FFConfig;
  public features: Feature[] = [];

  constructor(url: string) {
    this.config = new FFConfig(url);

    this.init();
  }

  async init() {
    this.features = await this.getFeatures();
  }

  private getFeatures(): Promise<Feature[]> {
    const apiFeature = new ApiFeature(this.config.url);

    return apiFeature.getFeatures();
  }
}
