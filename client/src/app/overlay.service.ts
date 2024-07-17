import { Injectable, Type } from '@angular/core';
import { ConfirmationOverlayData } from './shared/models/overlay-data/confirmation-overlay-data';
import { StudentDetailOverlayData } from './shared/models/overlay-data/student-detail-overlay-data';
import { ExportOverlayData } from './shared/models/overlay-data/export-overlay-data';
import { ConstraintBuilderOverlayData } from './shared/models/overlay-data/constraint-builder-overlay-data';

type OverlayData =
  | ConfirmationOverlayData
  | StudentDetailOverlayData
  | ExportOverlayData
  | ConstraintBuilderOverlayData;
export interface OverlayComponentData {
  data?: OverlayData;
}

export interface OverlayServiceHost {
  displayComponent(component: Type<OverlayComponentData>, data: any);
  closeOverlay();
}

@Injectable()
export class OverlayService {
  host: OverlayServiceHost;
  private displayedComponentData: any = null;

  displayComponent(component: Type<OverlayComponentData>, data?: OverlayData): void {
    if (this.displayedComponentData && this.displayedComponentData.onClose) {
      this.displayedComponentData.onClose();
    }

    if (this.host) {
      this.host.displayComponent(component, data);
      this.displayedComponentData = data;
    }
  }

  closeOverlay(): void {
    if (this.displayedComponentData && this.displayedComponentData.onClose) {
      this.displayedComponentData.onClose();
    }

    if (this.host) {
      this.host.closeOverlay();
      this.displayedComponentData = null;
    }
  }

  switchComponent(component: Type<OverlayComponentData>, data?: OverlayData): void {
    this.closeOverlay();
    setTimeout(() => {
      this.displayComponent(component, data);
    }, 1);
  }
}
