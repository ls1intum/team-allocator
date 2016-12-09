import {Team} from "./team";
import {Language} from "./language";
import {Skill, SkillLevel} from "./skill";
import {Device, DeviceType} from "./device";
/**
 * Created by wanur on 05/11/2016.
 */

export class Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  iosDevExp: string;
  iosDevExpDescription: string;
  gitExpDescription: string;
  skills: Skill[] = [];
  languages: Language[] = [];
  devices: Device[] = [];

  currentTerm: number;
  major: string;

  team: Team;
  teamPriorities: Team[] = [];

  supervisorRating: number;

  constructor(id?: number, firstName?: string) {
    this.id = id || 0;
    this.firstName = firstName || "no name";
  }

  getTeamPriority(team: Team): number {
    return this.teamPriorities.indexOf(team) + 1;
  }

  addDevice(device: Device) {
    this.devices.push(device);
  }

  addSkill(skillName: string, skillLevel:SkillLevel) {
    this.skills.push(new Skill(skillName,skillLevel));
  }

  ownsDevice(deviceType: DeviceType): boolean {
    return this.devices.filter(d => d.deviceType === deviceType).length >0;
  }
}
