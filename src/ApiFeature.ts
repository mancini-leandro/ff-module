import { IFeature } from './/interfaces/IFeature';
import { IApiResponse } from './interfaces/IApiResponse';
import { Feature } from './models/Feature';

export class ApiFeature implements IFeature {
    url: string;

    constructor(url: string) {
        this.url = url;
    }
    
    getFeatures(): Promise<any> {
        const apiUrl = this.url;

        return fetch(
            apiUrl,
            {
                method: 'post',
                body: JSON.stringify({})
            }
        )
        .then(this.handleErrors)
        .then((response: Response) => {
            return response.json();
        })
        .then((response: IApiResponse<Feature[]>) => {
            if (response.data && response.data.length > 0) {
                return response.data;
            }

            return response;
        })
        .catch((ex) => {
            // tslint:disable-next-line: no-console
            console.error('Falha ao buscar flags. ' + ex);

            throw Error(ex);
        });
    }

    handleErrors(response: Response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response;
    }

}