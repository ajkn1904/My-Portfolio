//about me
export interface Experience {
  post: string;
  company: string;
  duration: string;
  location: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface Profile {
  name: string;
  email: string;
  officialEmail: string;
  contact: string;
  photoUrl: string;
  address: string;
  institution: string;
  degree: string;
  cgpa: number;
  github: string;
  linkedin: string;
  stackoverflow: string;
  experiences: Experience[];
  skills: Skill[];
}

//project
export interface TechStack {
  id: number;
  name: string;
  projectId: number;
}

export interface Detail {
  id: number;
  text: string;
  projectId: number;
}

export interface UiImage {
  id: number;
  value: string;
  projectId: number;
}

export interface Project {
  id: number;
  name: string;
  img: string;
  liveLink: string;
  githubLink: string;
  intro: string;
  techStacks: TechStack[];
  details: Detail[];
  uiImages: UiImage[];
}

//image gallery
export interface UiImage {
  id: number;
  value: string;
  projectId: number;
}

export interface ProjectImageGalleryProps {
  uiImages: UiImage[];
  projectName: string;
  git: string,
  live: string 
}