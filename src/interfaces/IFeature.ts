import { Observable } from 'rxjs';
import { Feature } from '../models/Feature';

export interface IFeature {
  getFeatures(): Observable<Feature[]>;
}
