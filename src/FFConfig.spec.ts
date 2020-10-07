import { FFConfig } from './FFConfig';

describe('FFConfig', () => {
    it('should create an instance', () => {
        const url = 'http://api.url.com.br';
        const config = new FFConfig(url);
    
        expect(config).toBeTruthy();
        expect(config.url).toEqual(url);
        expect(config.interval).toBeFalsy();
    });
    
    it('should create an instance with interval', () => {
        const url = 'http://api.url.com.br';
        const interval = 10000;
        const config = new FFConfig(url, interval);
    
        expect(config).toBeTruthy();
        expect(config.url).toEqual(url);
        expect(config.interval).toBe(interval);
    });
});
