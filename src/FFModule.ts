import { FFConfig } from './FFConfig';
import { ApiFeature } from './ApiFeature';
import { Feature } from './models/Feature';

export class FFModule {
    config: FFConfig;
    features: Feature[];

    constructor(
        url: string
    ) {
        this.config = new FFConfig(url);

        this.getFeatures();
    }

    getFeatures() {
        const apiFeature = new ApiFeature(this.config.url);

        // tslint:disable-next-line: no-console
        apiFeature.getFeatures().then(res => console.log(res));
    }
}
