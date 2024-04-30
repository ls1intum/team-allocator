import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { SelectData } from 'src/app/shared/matching/constraints/constraint-functions/constraint-function';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements OnInit {
  @Input({ required: true }) elementsData: SelectData[] = [];
  @Input() title: string;
  allSelected: boolean;

  constructor() {}

  ngOnInit(): void {
    this.allSelected = this.selectedElementIds.length === this.elementsData.length;
  }

  private get selectedElementIds(): string[] {
    return this.elementsData.filter(element => element.selected).map(element => element.id);
  }

  toggleProjectsSelection(elementId: string) {
    if (this.selectedElementIds.includes(elementId)) {
      this.elementsData.find(element => element.id === elementId).selected = false;
      this.allSelected = false;
    } else {
      this.elementsData.find(element => element.id === elementId).selected = true;
      this.allSelected = this.selectedElementIds.length === this.elementsData.length;
    }
  }

  toggleAllProjectsSelection() {
    if (this.selectedElementIds.length === this.elementsData.length) {
      this.elementsData.forEach(element => (element.selected = false));
      this.allSelected = false;
    } else {
      this.elementsData.forEach(element => (element.selected = true));
      this.allSelected = true;
    }
  }
}
