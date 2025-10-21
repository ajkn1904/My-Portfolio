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