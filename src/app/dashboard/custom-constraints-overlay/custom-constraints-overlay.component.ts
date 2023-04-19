import { Component, OnDestroy, OnInit } from '@angular/core';
import { OverlayComponent, OverlayService } from '../../overlay.service';
import { Constraint } from '../../shared/models/constraints/constraint';
import { ConstraintService } from '../../shared/layers/business-logic-layer/constraint.service';
import { Team } from '../../shared/models/team';
import { TeamGenerationService } from '../../shared/layers/business-logic-layer/team-generation/team-generation.service';
import { TeamService } from '../../shared/layers/business-logic-layer/team.service';
import { ConstraintLoggingService } from '../../shared/layers/business-logic-layer/constraint-logging.service';

@Component({
  selector: 'app-custom-constraints-overlay',
  templateUrl: './custom-constraints-overlay.component.html',
  styleUrls: ['./custom-constraints-overlay.component.scss'],
})
export class CustomConstraintsOverlayComponent implements OnInit, OnDestroy, OverlayComponent {
  public data: { customConstraintString: ""};

  constructor(
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this.fetchCustomConstraints()
  }

  ngOnDestroy(): void {
    this.saveCustomConstraints()
  }

  // Fetch and save custom constraints from config file
  saveCustomConstraints(): void {
    this.overlayService.closeOverlay();
  }

  fetchCustomConstraints(): void {
  }
}
