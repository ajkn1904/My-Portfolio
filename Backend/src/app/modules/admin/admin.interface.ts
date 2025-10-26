export interface IExperience {
  company: string;
  location: string;
  post: string;
  duration: string;
}

export interface ISkill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advance";
}

export interface IAdminInfo {
  id?: number;
  name: string;
  email: string;
  officialEmail: string;
  contact: string;
  photoUrl?: string | null;
  address: string;
  institution: string;
  degree: string;
  cgpa: number;
  github: string;
  linkedin: string;
  stackoverflow: string;
  experiences?: IExperience[] | null;
  skills?: ISkill[] | null;
}



export interface IAdminInfoUpdatePayload {
  name?: string;
  email?: string;
  officialEmail?: string;
  contact?: string;
  photoUrl?: string | null;
  address?: string;
  institution?: string;
  degree?: string;
  cgpa?: number;
  github?: string;
  linkedin?: string;
  stackoverflow?: string;
  experiences?: IExperience[];
  skills?: ISkill[];
}
