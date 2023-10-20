import { Component, Input, OnInit } from '@angular/core';
import { Gender, Person } from '../../shared/models/person';
import { Skill, SkillLevel } from '../../shared/models/skill';
import { CSVConstants } from '../../shared/constants/csv.constants';
import { IconMapperService } from '../../shared/ui/icon-mapper.service';
import { Device } from '../../shared/models/device';
import { NationalityHelper } from '../../shared/helpers/nationality.helper';

@Component({
  selector: 'app-person-detail-card',
  templateUrl: './person-detail-card.component.html',
  styleUrls: ['./person-detail-card.component.scss'],
})
export class PersonDetailCardComponent implements OnInit {
  @Input() person: Person;

  genderIconPath: string;
  devices: string[];
  flagEmoji: string;
  @Input() supervisorRatingColor: string;
  @Input() isPersonRated: boolean;
  @Input() labelForSkillLevel: string;

  getLabelForSkillLevel = Skill.getLabelForSkillLevel;
  SkillLevel = SkillLevel;
  CSVConstants = CSVConstants;
  Device = Device;
  getFlagEmojiFromNationality = NationalityHelper.getFlagEmojiFromNationality;
  // getSupervisorRatingColor = Colors.getColor;

  ngOnInit(): void {
    this.mapPersonsAttributes();
  }

  mapPersonsAttributes() {
    this.genderIconPath = this.getGenderIconPath(this.person.gender);
    this.devices = this.getDeviceIconPaths(this.person.devices);
    this.flagEmoji = this.getFlagEmojiFromNationality(this.person.nationality);
    this.labelForSkillLevel = this.getLabelForSkillLevel(this.person.supervisorRating);
  }

  getGenderIconPath(gender: Gender): string {
    return IconMapperService.getGenderIconPath(gender);
  }

  getDeviceIconPaths(devices: Device[]): string[] {
    return devices.map(device => IconMapperService.getDeviceTypeIconPath(device));
  }
}
