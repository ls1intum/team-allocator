/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from './api-configuration';
import { StrictHttpResponse } from './strict-http-response';

export type ApiFnOptional<P, R> = (http: HttpClient, rootUrl: string, params?: P, context?: HttpContext) => Observable<StrictHttpResponse<R>>;
export type ApiFnRequired<P, R> = (http: HttpClient, rootUrl: string, params: P, context?: HttpContext) => Observable<StrictHttpResponse<R>>;

/**
 * Helper service to call API functions directly
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private config: ApiConfiguration,
    private http: HttpClient
  ) {
  }

  private _rootUrl?: string;

  /**
   * Returns the root url for API operations. If not set directly here,
   * will fallback to `ApiConfiguration.rootUrl`.
   */
  get rootUrl(): string {
    return this._rootUrl || this.config.rootUrl;
  }

  /**
   * Sets the root URL for API operations
   */
  set rootUrl(rootUrl: string) {
    this._rootUrl = rootUrl;
  }

  /**
   * Executes an API call, returning the response body only
   */
  invoke<P, R>(fn: ApiFnRequired<P, R>, params: P, context?: HttpContext): Observable<R>;
  invoke<P, R>(fn: ApiFnOptional<P, R>, params?: P, context?: HttpContext): Observable<R>;
  invoke<P, R>(fn: ApiFnRequired<P, R> | ApiFnOptional<P, R>, params: P, context?: HttpContext): Observable<R> {
    return this.invoke$Response(fn, params, context)
      .pipe(map(r => r.body));
  }

  /**
   * Executes an API call, returning the entire response
   */
  invoke$Response<P, R>(fn: ApiFnRequired<P, R>, params: P, context?: HttpContext): Observable<StrictHttpResponse<R>>;
  invoke$Response<P, R>(fn: ApiFnOptional<P, R>, params?: P, context?: HttpContext): Observable<StrictHttpResponse<R>>;
  invoke$Response<P, R>(fn: ApiFnRequired<P, R> | ApiFnOptional<P, R>, params: P, context?: HttpContext): Observable<StrictHttpResponse<R>> {
    return fn(this.http, this.rootUrl, params, context)
      .pipe(
        filter(r => r instanceof HttpResponse),
        map(r => r as StrictHttpResponse<R>));
  }
}
