import {Injectable} from "@angular/core";
import {Person} from "../../../models/person";
import Papa = require("papaparse");
import {PersonAccessService} from "../../data-access-layer/person.access.service";
import {NonPersistentPersonAccessService} from "../../data-access-layer/non-persistent-person.access.service";
import {CsvColumNames} from "../../../constants/csv-constants";

/**
 * Created by wanur on 05/11/2016.
 */

@Injectable()
export class PersonService {
  constructor(private personAccessService: PersonAccessService){

  }

  readPersons(): Promise<Person[]>{
    return this.personAccessService.read();
  }

  readPerson(id: number): Promise<Person>{
    return this.readPersons().then(persons => persons.find(person => person.id == id))
  }

  savePersons(persons: Person[]){
    this.personAccessService.save(persons);
  }

  // TODO extract parsing to parser
  parsePersons(csvFile: File, callback: (persons: Person[])=>void) {
    Papa.parse(csvFile, {
      complete: results => {
        callback(this.parsePersonCSV(results.data));
      },
      header: true
    });
  }

  private parsePersonCSV(csvString: Array<any>): Person[] {
    return csvString.map((personProps: Array<any>) => { return this.parsePerson(personProps) });
  }

  private parsePerson(personProps: Array<any>): Person {
    let person = new Person();

    person.id = personProps[CsvColumNames.Person.Id];
    person.firstName = personProps[CsvColumNames.Person.FirstName];
    person.lastName = personProps[CsvColumNames.Person.LastName];
    person.major = personProps[CsvColumNames.Person.Major];
    // TODO parse other props

    return person;
  }
}
