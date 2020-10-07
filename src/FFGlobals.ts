import { Feature } from './models/Feature';
import * as lodash from 'lodash';

export class FFGlobals {
  findFeature(items: Feature[], featureName: string) {
    return lodash.find(items, { name: featureName });
  }

  mapBoolFeature(item: Feature) {
    if (item.type === 'B') {
      item.value = JSON.parse(item.value);
    }

    return item;
  }
}
