/**
 * Created by Malte Bucksch on 20/11/2016.
 */

export class CSVConstants {
  static readonly Person = {
    FirstName: 'firstname',
    LastName: 'lastname',
    Email: 'email',
    TumId: 'attribute_2',
    Gender: 'attribute_3',
    Nationality: 'nationality',
    Major: 'major',
    MajorOther: 'major[other]',
    Semester: 'semester',
    GermanLanguageLevel: 'language[a1]',
    EnglishLanguageLevel: 'language[a2]',
    IosDevExperience: 'iOSDev',
    IosDevAppStoreLink: 'appStoreLink',
    IosDevExperienceExplained: 'iOSDevExplained',
    IntroAssessment: 'introAssessment[INTRO]',
    IntroAssessmentTutor: 'introAssessmentTutor[INTRO]',
    IntroAssessmentAnswers: [
      'extremely challenging',
      'very challenging',
      'medium challenging',
      'hardly challenging',
      'not challenging at all',
    ],
    IntroAssessmentTutorAnswers: [
      'strongly below average',
      'below average',
      'average',
      'above average',
      'strongly above average',
    ],

    /* (devices) */
    /* (skills) */

    OtherSkills: 'otherSkills',

    /* (priorities) */

    StudentComments: 'Comments',
    SupervisorRating: 'supervisorRating',
    TutorComments: 'CommentsTutor',
    IsPinned: 'IsPinned',
  };

  static readonly Skills = {
    JustifyPrefix: 'justify',
    ExpInterPrefix: 'expinter',
    ExperiencePostfix: '[expinter][1]',
    InterestPostfix: '[expinter][2]',
    SkillNameAbbreviationPairs: [
      ['Frontend Development', 'WEBFE'],
      ['Server-side Development', 'SSDEV'],
      ['UI / UX', 'UIUX'],
      ['Embedded Development', 'EMBED'],
      ['Virtual & Augmented Reality', 'VRAR'],
      ['Machine Learning & Algorithms', 'MLALG'],
    ],
    SkillLevelAnswers: ['no skills', 'beginner skills', 'average skills', 'advanced skills', 'expert skills'],
    InterestLevelAnswers: [
      'not interested at all',
      'hardly interested',
      'average interest',
      'high interest',
      'extremely interested',
    ],
  };

  static readonly Devices = {
    Iphone: 'devices[iPhone]',
    Ipad: 'devices[iPad]',
    Mac: 'devices[Mac]',
    Watch: 'devices[Watch]',
    IphoneAR: 'devices[iPhoneAR]',
    IpadAR: 'devices[iPadAR]',
  };

  static readonly iOSDevExperienceLow =
    'I have no experience in Apple platform development other than the intro course.';
  static readonly iOSDevExperienceMedium =
    'I was involved in the development of a native Apple application, but I had another role than developer (e.g. tester).';
  static readonly iOSDevExperienceHigh = 'I have been an active developer for a native Apple application.';
  static readonly iOSDevExperienceVeryHigh = 'I have submitted my own native Apple application(s) to the AppStore.';

  static readonly Team = { TeamName: 'teamName', Priority: 'Priorities[{d}]' };
  static readonly ArrayBraces = { Open: '[', Close: ']' };

  static readonly SkillLevelValue = {
    VeryHigh: 'Expert',
    High: 'Advanced',
    Medium: 'Normal',
    Low: 'Novice',
    None: 'No',
  };

  static readonly GenderValue = { Male: 'male', Female: 'female' };

  static readonly DeviceAvailableBooleanValue = { Available: 'Yes', Unavailable: 'No' };

  static readonly MajorOtherValue = 'Other';
}

export const ExamplePersonPropertyCsvRemotePath = '/assets/persons_example.csv';
