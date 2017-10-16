import {Person, Gender} from '../../../models/person';
import {StringHelper} from '../../../helpers/string.helper';
import {CSVConstants} from '../../../constants/csv.constants';
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
    personProps[CSVConstants.Person.IntroAssessmentTutor] = person.introAssessmentTutor;
    this.serializePersonDevices(person, personProps);
    this.serializeSkills(person, personProps);
    personProps[CSVConstants.Person.OtherSkills] = person.otherSkills;
    this.serializePriorities(person, personProps);
    personProps[CSVConstants.Person.StudentComments] = person.studentComments;
    personProps[CSVConstants.Person.SupervisorRating] = this.serializeSkillLevel(person.supervisorRating);
    personProps[CSVConstants.Person.TutorComments] = person.tutorComments;

    return personProps;
  }

  private static serializePriorities(person: Person, personProps: {}) {
    for (const teamPrio of person.teamPriorities) {
      const columnName = StringHelper.format(CSVConstants.Team.Priority, person.getTeamPriority(teamPrio));

      personProps[columnName] = teamPrio.name;
    }
  }

  private static serializeSkills(person: Person, personProps: {}) {
    for (const skill of person.skills){
      const skillAbbreviation = CSVConstants.Skills.SkillNameAbbreviationPairs
        .find(pair => pair[0] === skill.name)[1];

      personProps[CSVConstants.Skills.ExpInterPrefix + skillAbbreviation + CSVConstants.Skills.ExperiencePostfix]
        = CSVConstants.Skills.SkillLevelAnswers[skill.skillLevel];
      personProps[CSVConstants.Skills.ExpInterPrefix + skillAbbreviation + CSVConstants.Skills.InterestPostfix]
        = CSVConstants.Skills.InterestLevelAnswers[skill.interestLevel];
      personProps[CSVConstants.Skills.JustifyPrefix + skillAbbreviation] = skill.justification;
    }
  }

  private static serializeGender(gender: Gender) {
    switch (gender) {
      case Gender.Male:
        return CSVConstants.GenderValue.Male;
      case Gender.Female:
        return CSVConstants.GenderValue.Female;
    }
  }

  static serializeSkillLevel(skillLevel: SkillLevel) {
    switch (skillLevel) {
      case SkillLevel.VeryHigh:
        return CSVConstants.SkillLevelValue.VeryHigh;
      case SkillLevel.High:
        return CSVConstants.SkillLevelValue.High;
      case SkillLevel.Medium:
        return CSVConstants.SkillLevelValue.Medium;
      case SkillLevel.Low:
        return CSVConstants.SkillLevelValue.Low;
      case SkillLevel.None:
        return CSVConstants.SkillLevelValue.None;
    }
  }

  private static serializePersonDevices(person: Person, personProps: {}) {
    const unavailableString = CSVConstants.DeviceAvailableBooleanValue.Unavailable;
    const availableString = CSVConstants.DeviceAvailableBooleanValue.Available;

    personProps[CSVConstants.Devices.Ipad] = person.ownsDevice(Device.Ipad) ? availableString : unavailableString;
    personProps[CSVConstants.Devices.Iphone] = person.ownsDevice(Device.Iphone) ? availableString : unavailableString;
    personProps[CSVConstants.Devices.Watch] = person.ownsDevice(Device.Watch) ? availableString : unavailableString;
    personProps[CSVConstants.Devices.Mac] = person.ownsDevice(Device.Mac) ? availableString : unavailableString;
  }
}
