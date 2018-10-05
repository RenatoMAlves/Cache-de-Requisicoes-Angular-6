import { HttpRequest, HttpResponse, HttpInterceptor, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cache } from './cache';
import { CacheEntry, MAX_CACHE_AGE } from './cache-entry';

@Injectable()
export class CacheMapService implements Cache {

    // Mapeia o cache atual
    cacheMap = new Map<string, CacheEntry>();

    // Buscar o retorno da requisição que está armazenada no cache
    get(req: HttpRequest<any>): HttpResponse<any> | null {
        const entry = this.cacheMap.get(req.urlWithParams);
        if(!entry){
            return null;
        }
        const isExpired = (Date.now() - entry.entryTime) > MAX_CACHE_AGE;
        return isExpired ? null: entry.response;
    }

    // Salvar o retorno da requisição dentro do cache
    put(req: HttpRequest<any>, res: HttpResponse<any>): void {
        const entry: CacheEntry = { url: req.urlWithParams, response: res, entryTime: Date.now()};
        this.cacheMap.set(req.urlWithParams, entry);
        this.deleteExpiredCache();
    }

    // Limpa o cache caso sua validade tenha sido atingida
    private deleteExpiredCache(){
        this.cacheMap.forEach(entry => {
            if ((Date.now() - entry.entryTime) > MAX_CACHE_AGE){
                this.cacheMap.delete(entry.url);
            }
        })
    }
}