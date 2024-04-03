/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Student } from '../../models/student';

export interface CourseIterationsCourseIterationIdStudentsGet$Params {

/**
 * Unique identifier of the course iteration
 */
  courseIterationId: string;
}

export function courseIterationsCourseIterationIdStudentsGet(http: HttpClient, rootUrl: string, params: CourseIterationsCourseIterationIdStudentsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Student>>> {
  const rb = new RequestBuilder(rootUrl, courseIterationsCourseIterationIdStudentsGet.PATH, 'get');
  if (params) {
    rb.path('courseIterationId', params.courseIterationId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Student>>;
    })
  );
}

courseIterationsCourseIterationIdStudentsGet.PATH = '/course-iterations/{courseIterationId}/students';
