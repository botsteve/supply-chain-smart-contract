import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private messageService:MessageService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        this.messageService.add({ severity: 'error', summary: 'Error 400', detail: `${error.error.message}` });
                    } else {
                        // server-side error
                        this.messageService.add({ severity: 'error', summary: 'Error 500', detail: `${error.error.message}` });
                    }
                    return throwError(errorMessage);
                })
            )
    }
}