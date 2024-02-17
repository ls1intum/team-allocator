/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Skill } from '../../models/skill';

export interface V2CourseIterationCourseIterationIdSkillsGet$Params {

/**
 * Unique identifier of the course iteration
 */
  courseIterationId: string;
}

export function v2CourseIterationCourseIterationIdSkillsGet(http: HttpClient, rootUrl: string, params: V2CourseIterationCourseIterationIdSkillsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Skill>>> {
  const rb = new RequestBuilder(rootUrl, v2CourseIterationCourseIterationIdSkillsGet.PATH, 'get');
  if (params) {
    rb.path('courseIterationId', params.courseIterationId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Skill>>;
    })
  );
}

v2CourseIterationCourseIterationIdSkillsGet.PATH = '/v2/courseIteration/{courseIterationId}/skills';
