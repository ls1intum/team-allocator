/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Skill } from '../../models/skill';

export interface CourseIterationsCourseIterationIdSkillsGet$Params {

/**
 * Unique identifier of the course iteration
 */
  courseIterationId: string;
}

export function courseIterationsCourseIterationIdSkillsGet(http: HttpClient, rootUrl: string, params: CourseIterationsCourseIterationIdSkillsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Skill>>> {
  const rb = new RequestBuilder(rootUrl, courseIterationsCourseIterationIdSkillsGet.PATH, 'get');
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

courseIterationsCourseIterationIdSkillsGet.PATH = '/course-iterations/{courseIterationId}/skills';
