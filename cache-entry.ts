import { HttpResponse } from '@angular/common/http';

export interface CacheEntry{
    url: string;
    response: HttpResponse<any>;
    entryTime: number;
}

// Tempo de validade do cache em milisegundos
export const MAX_CACHE_AGE = 300000;