import { FFConfig } from './FFConfig';
import { ApiFeature } from './ApiFeature';

export class FFModule {
    config: FFConfig;

    constructor(
        url: string
    ) {
        this.config = new FFConfig(url);
    }

    getFeatures(): Promise<any> {
        const apiFeature = new ApiFeature(this.config.url);

        return apiFeature.getFeatures();
    }
}
