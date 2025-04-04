interface ProjectData {
  id: number;
  name: string;
  description: string;
  images: string[];
  link: string;
  tags: string[];
  responsibilities: string[];
  technologies: string[];
  status: string;
  supportedChains: string[];
  partners: string[];
  keyContributions: string[];
  date: Date | null;
}

export default ProjectData;