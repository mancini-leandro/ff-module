import { ApiFeature } from './ApiFeature';
import { Feature } from './models/Feature';
import { of } from 'rxjs';

const features = [
    { name: 'feature_boolean', type: 'B', value: 'true' },
    { name: 'feature_string', type: 'S', value: 'stringText' },
    { name: 'feature_json', type: 'J', value: '{"teste":123}' },
  ] as Feature[];

describe('ApiFeature', () => {
    let apiFeature: ApiFeature;

    beforeEach(() => {
        const url = 'http://api.url.com.br';

        apiFeature = new ApiFeature(url);
    });

    it('should get features', () => {
        spyOn(apiFeature, 'fetchFeature').and.returnValue(of(features));

        apiFeature.getFeatures().subscribe(res => {
            expect(res).toBeTruthy();
            expect(res.length).toBeGreaterThan(0);
        });

        expect(apiFeature.fetchFeature).toHaveBeenCalled();
    });

    it('should get features by feature name', () => {
        spyOn(apiFeature, 'fetchFeatureName').and.returnValue(of(features[0]));

        const featureName = 'feature_boolean';

        apiFeature.getFeatures(featureName).subscribe(res => {
            expect(res).toBeTruthy();
            expect(res).toEqual({ name: 'feature_boolean', type: 'B', value: 'true' });
        });

        expect(apiFeature.fetchFeatureName).toHaveBeenCalledWith(featureName);
    });

    it('should fetch by feature name', () => {
        spyOn(apiFeature, 'fetchFeature').and.returnValue(of(features));

        const featureName = 'feature_string';

        apiFeature.fetchFeatureName(featureName).subscribe(res => {
            expect(res).toBeTruthy();
            expect(res).toEqual({ name: 'feature_string', type: 'S', value: 'stringText' });
        });

        expect(apiFeature.fetchFeature).toHaveBeenCalled();
    });

    it('should fetch feature', () => {
        apiFeature.fetchFeature().subscribe(res => {
            expect(res).toBeTruthy();
        });

        expect(apiFeature.url).toEqual('http://api.url.com.br');
    });
});