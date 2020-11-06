import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('key=') > -1) {
            const httpRequest = new HttpRequest(req.method as any, req.url + environment.key);
            req = Object.assign(req, httpRequest);
        }
        const dupReq = req.clone();
        return next.handle(dupReq);
    }
}
