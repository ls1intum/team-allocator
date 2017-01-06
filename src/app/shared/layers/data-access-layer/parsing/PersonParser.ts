import {Person, Gender} from "../../../models/person";
import {CsvColumNames, CsvValueNames} from "../../../constants/csv.constants";
import {Device, DeviceType} from "../../../models/device";
import {StringHelper} from "../../../helpers/string.helper";
import {SkillLevel} from "../../../models/skill";
/**
 * Created by Malte Bucksch on 01/12/2016.
 */

export abstract class PersonParser {
  static parsePerson(personProps: Array<any>): Person {
    let person = new Person();

    // TODO check if this conversion works
    person.id = personProps[CsvColumNames.Person.Id];
    person.firstName = personProps[CsvColumNames.Person.FirstName];
    person.lastName = personProps[CsvColumNames.Person.LastName];
    person.major = personProps[CsvColumNames.Person.Major];
    if (person.major === CsvValueNames.MajorOtherValue)
      person.major = personProps[CsvColumNames.Person.MajorOther];
    person.currentTerm = personProps[CsvColumNames.Person.Term];
    person.tumId = personProps[CsvColumNames.Person.TumId];
    person.iosDevExp = personProps[CsvColumNames.Person.IosDevExperience];
    person.iosDevExpDescription = personProps[CsvColumNames.Person.IosDevExperienceDescription];
    person.gitExpDescription = personProps[CsvColumNames.Person.GitExperience];
    person.email = personProps[CsvColumNames.Person.Email];
    person.supervisorRating = this.parseSkillLevel(personProps[CsvColumNames.Person.SupervisorRating]);
    person.gender = this.parseGender(personProps[CsvColumNames.Person.Gender]);

    this.parsePersonDevices(person,personProps);
    this.parsePersonSkills(person,personProps);

    // TODO parse other props

    return person;
  }

  private static parsePersonSkills(person: Person, personProps: Array<any>){
    let conceptProps = this.parseArray(CsvColumNames.PersonSkills.Concept,personProps);
    for(let skillKey in conceptProps){
      let skillLevel=this.parseSkillLevel(conceptProps[skillKey]);
      person.addSkill(skillKey,CsvColumNames.PersonSkills.Concept,skillLevel);
    }

    let techProps = this.parseArray(CsvColumNames.PersonSkills.Technology,personProps);
    for(let skillKey in techProps){
      let skillLevel=this.parseSkillLevel(techProps[skillKey]);
      person.addSkill(skillKey,CsvColumNames.PersonSkills.Technology,skillLevel);
    }
  }

  static parseSkillLevel(skillLevelString: string): SkillLevel {
    if(skillLevelString === CsvValueNames.SkillLevelValue.VeryHigh)
      return SkillLevel.VeryHigh;
    if(skillLevelString === CsvValueNames.SkillLevelValue.High)
      return SkillLevel.High;
    if(skillLevelString === CsvValueNames.SkillLevelValue.Medium)
      return SkillLevel.Medium;
    if(skillLevelString === CsvValueNames.SkillLevelValue.Low)
      return SkillLevel.Low;
    if(skillLevelString === CsvValueNames.SkillLevelValue.None)
      return SkillLevel.None;

    return SkillLevel.None;
  }

  static parseGender(genderString: string): Gender {
    if(genderString === CsvValueNames.GenderValue.Male)
      return Gender.Male;
    if(genderString === CsvValueNames.GenderValue.Female)
      return Gender.Female;

    return Gender.Male;
  }

  private static parsePersonDevices(person: Person, personProps: Array<any>) {
    let available = CsvValueNames.DeviceAvailableBooleanValue.Available;

    if(personProps[CsvColumNames.PersonDevices.Ipad] === available)
      person.addDevice(new Device(DeviceType.Ipad));
    if(personProps[CsvColumNames.PersonDevices.Mac] === available)
      person.addDevice(new Device(DeviceType.Mac));
    if(personProps[CsvColumNames.PersonDevices.Ipod] === available)
      person.addDevice(new Device(DeviceType.Ipod));
    if(personProps[CsvColumNames.PersonDevices.Watch] === available)
      person.addDevice(new Device(DeviceType.Watch));
    if(personProps[CsvColumNames.PersonDevices.Iphone] === available)
      person.addDevice(new Device(DeviceType.Iphone));
  }

  private static parseArray(columnArrayName: string, personProps: Array<any>): {[element: string]: string} {
    let array: {[element: string]: string} = {};

    for(let key in personProps){
      if(key.includes(columnArrayName)){
        let arrayElement = StringHelper.getStringBetween(key,CsvColumNames.ArrayBraces.Open,CsvColumNames.ArrayBraces.Close);
        array[arrayElement]=personProps[key];
      }
    }
    return array;
  }
}
