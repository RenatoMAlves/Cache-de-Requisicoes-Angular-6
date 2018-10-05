# Cache-de-Requisicoes-Angular-6
Implementação de cache de retorno de requisição para url específica utilizando o caching interceptor do Angular 6


**Utilização:**

app.module.ts

```
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CachingInterceptor } from './services/cache/cache-interceptor';
import { httpInterceptorProviders } from './interceptors/index';
import { CacheMapService } from './services/cache/cache.service';
...

@NgModule({
  declarations:[
  ...
  ],
  imports: [
  ...
  ],
  providers:[
    httpInterceptorProviders,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    CacheMapService,
    {provide: Cache, useClass: CacheMapService},
  ]
})

export class AppModule { }
```
