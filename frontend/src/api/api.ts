import { PROD_API_URL, LOCAL_API_URL } from "../config/constants";
import Endpoint from "./endpoint";

/*
    Inspired by: https://github.com/FrancescoSaverioZuppichini/API-Class
    Rendition: https://github.com/hackmcgill/hackerAPI-client-ts
*/

class API {
    _url: string;
    _endpoints: { [id: string]: Endpoint } = {};

    constructor(url: string) {
        this._url = url;
        this._endpoints = {};
    }

    public createEntity(name: string): void {
        this._endpoints[name] = this.createBasicCRUDEndpoints(name);
    }

    public createEntities(arrayOfEntity: string[]): void {
        arrayOfEntity.forEach(this.createEntity.bind(this));
    }

    public getEndpoint(name: string): Endpoint {
        return this._endpoints[name];
    }

    private createBasicCRUDEndpoints(name: string): Endpoint {
        const endpoints = new Endpoint(name, `${this._url}/${name}`);
        return endpoints;
    }
}

const API_URL = process.env.API_URL ?? process.env.NODE_ENV === "production" ? PROD_API_URL : LOCAL_API_URL;

export default new API(API_URL);
