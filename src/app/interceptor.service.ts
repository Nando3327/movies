import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('[REPLACE]') > -1) {
            const replaceData = 'api_key=' + environment.key + '&language=' + environment.lang;
            const httpRequest = new HttpRequest(req.method as any, req.url.replace('[REPLACE]', replaceData));
            req = Object.assign(req, httpRequest);
        }
        const dupReq = req.clone();
        return next.handle(dupReq);
    }
}
