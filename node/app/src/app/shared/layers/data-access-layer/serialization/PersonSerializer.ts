import {Person, Gender} from '../../../models/person';
import {StringHelper} from '../../../helpers/string.helper';
import {CsvColumNames, CSVConstants, CsvValueNames} from '../../../constants/csv.constants';
import {Device} from '../../../models/device';
import {SkillLevel} from '../../../models/skill';
/**
 * Created by Malte Bucksch on 01/12/2016.
 */

export class PersonSerializer {
  static serializePerson(person: Person): {} {
    const personProps = {};

    /* specified entries */
    personProps[CSVConstants.Person.FirstName] = person.firstName;
    personProps[CSVConstants.Person.LastName] = person.lastName;
    personProps[CSVConstants.Person.Email] = person.email;
    personProps[CSVConstants.Person.TumId] = person.tumId;
    personProps[CSVConstants.Person.Gender] = this.serializeGender(person.gender);
    personProps[CSVConstants.Person.Major] = person.major;
    personProps[CSVConstants.Person.Semester] = person.semester;
    personProps[CSVConstants.Person.GermanLanguageLevel] = person.germanLanguageLevel;
    personProps[CSVConstants.Person.EnglishLanguageLevel] = person.englishLanguageLevel;
    personProps[CSVConstants.Person.IosDevExperience] = person.iosDev;
    personProps[CSVConstants.Person.IosDevAppStoreLink] = person.appStoreLink;
    personProps[CSVConstants.Person.IosDevExperienceExplained] = person.iOSDevExplained;
    personProps[CSVConstants.Person.IntroAssessment] = person.introAssessment;

    /* (devices) */
    /* (skills) */

    // other skills

    /* (priorities) */


    personProps[CsvColumNames.Person.Comments] = person.generalComments;


    this.serializePersonDevices(person, personProps);
    this.serializePriorities(person, personProps);
    this.serializeSkills(person, personProps);

    /* application specific entries */
    personProps[CsvColumNames.Person.SupervisorRating] = this.serializeSkillLevel(person.supervisorRating);
    personProps[CsvColumNames.Person.OrderID] = person.orderId; // to export rows in correct order (in the same order it was imported)

    return personProps;
  }

  private static serializePriorities(person: Person, personProps: {}) {
    for (const teamPrio of person.teamPriorities) {
      const columnName = StringHelper.format(CsvColumNames.Team.Priority,
        person.getTeamPriority(teamPrio));

      personProps[columnName] = teamPrio.name;
    }
  }

  private static serializeSkills(person: Person, personProps: {}) {
    for (const skill of person.skills){
      const columnName = skill.skillName;
      personProps[columnName] = this.serializeSkillLevel(skill.skillLevel);
    }
  }

  private static serializeGender(gender: Gender) {
    switch (gender) {
      case Gender.Male:
        return CsvValueNames.GenderValue.Male;
      case Gender.Female:
        return CsvValueNames.GenderValue.Female;
    }
  }

  static serializeSkillLevel(skillLevel: SkillLevel) {
    switch (skillLevel) {
      case SkillLevel.VeryHigh:
        return CsvValueNames.SkillLevelValue.VeryHigh;
      case SkillLevel.High:
        return CsvValueNames.SkillLevelValue.High;
      case SkillLevel.Medium:
        return CsvValueNames.SkillLevelValue.Medium;
      case SkillLevel.Low:
        return CsvValueNames.SkillLevelValue.Low;
      case SkillLevel.None:
        return CsvValueNames.SkillLevelValue.None;
    }
  }

  private static serializePersonDevices(person: Person, personProps: {}) {
    personProps[CsvColumNames.PersonDevices.Ipad] = person.ownsDevice(Device.Ipad) ?
      CsvValueNames.DeviceAvailableBooleanValue.Available : CsvValueNames.DeviceAvailableBooleanValue.Unavailable;
    personProps[CsvColumNames.PersonDevices.Iphone] = person.ownsDevice(Device.Iphone) ?
      CsvValueNames.DeviceAvailableBooleanValue.Available : CsvValueNames.DeviceAvailableBooleanValue.Unavailable;
    personProps[CsvColumNames.PersonDevices.Ipod] = person.ownsDevice(Device.Ipod) ?
      CsvValueNames.DeviceAvailableBooleanValue.Available : CsvValueNames.DeviceAvailableBooleanValue.Unavailable;
    personProps[CsvColumNames.PersonDevices.Watch] = person.ownsDevice(Device.Watch) ?
      CsvValueNames.DeviceAvailableBooleanValue.Available : CsvValueNames.DeviceAvailableBooleanValue.Unavailable;
    personProps[CsvColumNames.PersonDevices.Mac] = person.ownsDevice(Device.Mac) ?
      CsvValueNames.DeviceAvailableBooleanValue.Available : CsvValueNames.DeviceAvailableBooleanValue.Unavailable;
  }
}
