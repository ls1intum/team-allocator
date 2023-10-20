import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../../shared/models/person';
import { Colors } from '../../shared/constants/color.constants';
import { Skill, SkillLevel } from '../../shared/models/skill';
import { Device } from '../../shared/models/device';
import { IconMapperService } from '../../shared/ui/icon-mapper.service';
import { TeamService } from '../../shared/layers/business-logic-layer/team.service';
import { PersonConstraintService } from '../../shared/layers/business-logic-layer/person-constraint.service';
import { NationalityHelper } from '../../shared/helpers/nationality.helper';

@Component({
  selector: 'app-person-preview',
  templateUrl: './person-preview.component.html',
  styleUrls: ['./person-preview.component.scss'],
})
export class PersonPreviewComponent implements OnInit {
  @Input() person: Person;
  @Input() pinable = true;

  genderIconPath: string;

  SkillLevel = SkillLevel;
  Device = Device;
  iOSSkillLevelColor: string;
  supervisorRatingColor: string;
  flagEmoji: string;
  devices: string[];
  labelForSkillLevel: string;
  firstLetterOfSkillLevelName: string;
  matchesPersonConstraints: boolean;

  /* functions used in template */

  PersonConstraintService = PersonConstraintService;
  protected getFlagEmojiFromNationality = NationalityHelper.getFlagEmojiFromNationality;
  protected getGenderIconPath = IconMapperService.getGenderIconPath;
  protected getColor = Colors.getColor;
  protected getLabelForSkillLevel = Skill.getLabelForSkillLevel;
  protected getDeviceTypeIconPath = IconMapperService.getDeviceTypeIconPath;

  constructor(public teamService: TeamService) {}

  ngOnInit() {
    this.matchesPersonConstraints = PersonConstraintService.matchesConstraints(this.person);
    if (!this.pinable) this.person.isPinned = false;
    this.mapPersonsAttributes();
  }

  mapPersonsAttributes() {
    this.genderIconPath = this.getGenderIconPath(this.person.gender);
    this.iOSSkillLevelColor = this.getColor(this.person.getiOSSkillLevel());
    this.supervisorRatingColor = this.getColor(this.person.supervisorRating);
    this.firstLetterOfSkillLevelName = this.getFirstLetterOfSkillLevelName(this.person.getiOSSkillLevel());
    this.devices = this.getDeviceIconPaths(this.person.devices);
    this.flagEmoji = this.getFlagEmojiFromNationality(this.person.nationality);
    this.labelForSkillLevel = this.getLabelForSkillLevel(this.person.supervisorRating);
  }

  isPersonRated(): boolean {
    return this.person.supervisorRating !== undefined && this.person.supervisorRating !== SkillLevel.None;
  }

  getFirstLetterOfSkillLevelName(skillLevel: SkillLevel): string {
    return this.getLabelForSkillLevel(skillLevel).charAt(0);
  }

  getDeviceIconPaths(devices: Device[]): string[] {
    return devices.map(device => IconMapperService.getDeviceTypeIconPath(device));
  }
}
