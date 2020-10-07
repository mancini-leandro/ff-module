import { FFGlobals } from './FFGlobals';
import { Feature } from './models/Feature';

const features = [
  { name: 'feature_boolean', type: 'B', value: 'true' },
  { name: 'feature_string', type: 'S', value: 'stringText' },
  { name: 'feature_json', type: 'J', value: '{"teste":123}' },
] as Feature[];

describe('FFGlobals', () => {
  let globals: FFGlobals;

  beforeEach(() => {
    globals = new FFGlobals();
  });

  it('should find feature', () => {
    expect(globals.findFeature(features, 'feature_boolean')).toEqual(features[0]);
    expect(globals.findFeature(features, 'feature_string')).toEqual(features[1]);
    expect(globals.findFeature(features, 'feature_json')).toEqual(features[2]);
  });

  it('should map bool feature', () => {
    expect(globals.mapBoolFeature(features[0])).toBe(features[0]);
    expect(typeof features[0].value).toEqual('boolean');
    expect(features[0].value).toEqual(true);

    expect(globals.mapBoolFeature(features[1])).toEqual(features[1]);
    expect(globals.mapBoolFeature(features[2])).toEqual(features[2]);
  });
});
