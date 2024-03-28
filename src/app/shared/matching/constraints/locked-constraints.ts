import { Injectable } from '@angular/core';
import { IdMappingService } from '../../data/id-mapping.service';
import { Project, Student } from 'src/app/api/models';
import { StudentIdToProjectIdMapping } from '../../data/locks.service';

@Injectable({
  providedIn: 'root',
})
export class LockedConstraintsService {
  constructor(private constraintMappingService: IdMappingService) {}

  createConstraints(studentIdToProjectIdMapping: StudentIdToProjectIdMapping): string[] {
    const constraints = [];
    for (const [studentId, projectId] of studentIdToProjectIdMapping) {
      const studentNumericalId = this.constraintMappingService.getNumericalId(studentId);
      const projectNumericalId = this.constraintMappingService.getNumericalId(projectId);
      constraints.push(`x${studentNumericalId}y${projectNumericalId} = 1`);
    }
    return constraints;
  }
}
