import { Observable } from 'rxjs';
import { FFModule } from './FFModule';
import { Feature } from './models/Feature';

const features = [
  { name: 'feature_boolean', type: 'B', value: 'true' },
  { name: 'feature_string', type: 'S', value: 'stringText' },
  { name: 'feature_json', type: 'J', value: '{"teste":123}' },
] as Feature[];

describe('FFModule', () => {
  let ffmodule: FFModule;

  beforeEach(() => {
    const url = 'http://api.url.com.br';

    ffmodule = new FFModule(url);
  });

  it('shoud init interval default', () => {
    ffmodule.init();
  });

  it('shoud init add interval', () => {
    const url = 'http://api.url.com.br';

    ffmodule = new FFModule(url);
    ffmodule.config.interval = 5000;

    ffmodule.init();
  });

  it('should get features', () => {
    expect(ffmodule.getFeature()).toBeNull();

    ffmodule.features = features;

    ffmodule.getFeature();

    expect(ffmodule.features.length).toBeGreaterThan(0);
    expect(ffmodule.getFeature()).toBeUndefined();

    expect(ffmodule.getFeature('feature_boolean')).toEqual(features[0]);
    expect(ffmodule.getFeature('feature_string')).toEqual(features[1]);
    expect(ffmodule.getFeature('feature_json')).toEqual(features[2]);
  });
});
