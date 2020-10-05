import { FFConfig } from './FFConfig';
import { ApiFeature } from './ApiFeature';
import { Feature } from './models/Feature';

export class FFModule {
  config: FFConfig;

  get features() {
    return this.FEATURES;
  }

  set features(value: Feature[]) {
    this.FEATURES = value;
  }
  private FEATURES: Feature[] = [];

  constructor(url: string) {
    this.config = new FFConfig(url);

    // this.getFeatures();
  }

  async getFeatures() {
    const apiFeature = new ApiFeature(this.config.url);

    const retorno = await apiFeature.getFeatures();

    // tslint:disable-next-line: no-console
    console.log(retorno);

    // await apiFeature.getFeatures().then((res: Feature[]) => (this.features = res));
  }
}
