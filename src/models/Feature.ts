import * as lodash from 'lodash';

export class Feature {
  // name: string;
  // type: string;
  // value: string;

  getFeatureName(features: Feature[], featureName?: string): Feature {
    return lodash.find(features, { name: featureName }) as Feature;
  }
}
