import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";
import {ConstraintsComponent} from "./constraints.component";
import {SharedModule} from "../shared/shared.module";
import {TeamService} from "../shared/layers/business-logic-layer/services/team.service";
import {PersonService} from "../shared/layers/business-logic-layer/services/person.service";
@NgModule({
  imports: [CommonModule, SharedModule, MaterialModule.forRoot()],
  declarations: [ConstraintsComponent],
  exports: [ConstraintsComponent],
  providers: [TeamService,PersonService]
})
export class TeamGenerationModule {

}
