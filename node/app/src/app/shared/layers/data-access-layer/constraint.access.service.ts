/**
 * Created by Malte Bucksch on 23/02/2017.
 */
import {Injectable} from "@angular/core";
import {Person} from "../../models/person";
import {Team} from "../../models/team";
import {Constraint} from "../../models/constraints/constraint";
@Injectable()
export abstract class ConstraintAccessService {
  abstract saveConstraints(constraints: Constraint[]);

  abstract fetchConstraints(): Promise<Constraint[]>;
}
