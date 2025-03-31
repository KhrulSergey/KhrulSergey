import ProjectData from '../model/ProjectData';

const projectPrefix = 'project-%s';
const stackIncludeWords = ['All', 'Java', 'PostgreSQL', 'Spring', 'TypeScript', 'Cosmos SDK', 'GoLang', 'Telegram',
    'Swagger', 'JavaScript', 'SQL', 'Reactor', 'GraphQL', 'React', 'Redis', 'MySQL', 'Kafka', 'Solidity',
    'WebSocket', 'ML', 'RxJava', 'GRPC', 'AWS', 'Python', 'Angular', 'Kotlin', 'WebFlux', 'Kubernetes',
    'ClickHouse', 'InfluxDB', 'Stellar', '3D', 'Blockchain', 'MongoDb', 'ThreeJS']

declare const require: any;

class ProjectService {
    private static instance: ProjectService | null = null;
    private projects: ProjectData[] = [];
    private projectsStack: string[] = [];
    private isInitialized: boolean = false;

    private constructor() {
    }

    public static getInstance(): ProjectService {
        if (!ProjectService.instance) {
            ProjectService.instance = new ProjectService();
        }
        return ProjectService.instance;
    }

    private getProjectStacks(projects: ProjectData[]): string[] {
        const stackCounts = new Map<string, number>();

        projects.forEach(project => {
            project.technologies.forEach(tech => {
                tech.split(' ').forEach(part => {
                    const cleanedPart = part.replace(/[^a-zA-Z0-9]/g, '');
                    if (cleanedPart && isNaN(Number(cleanedPart))) {

                        stackCounts.set(cleanedPart, (stackCounts.get(cleanedPart) || 0) + 1);
                    }
                });
            });
        });
        // Sort the unique stack names by their counts in descending order
        const stacks = Array.from(stackCounts.entries())
            .sort(([, countA], [, countB]) => countB - countA)
            .filter((stack, count) => count > 1)
            .map(([stack]) => stack);
        // console.log(stacks)
        return stacks
    }

    private async initialize(): Promise<void> {
        if (this.isInitialized) {
            return;
        }
        try {
            const response = await fetch('data/projects.json');
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Validate the data structure
            if (!Array.isArray(data)) {
                console.error('Invalid data format: Expected an array.');
                throw new Error('Invalid data format: Expected an array.');
            }

            // Map the data to ProjectData objects
            const projects: ProjectData[] = data.map((item: any) => {
                // Validate each item's structure
                if (
                    typeof item.id !== 'number' ||
                    typeof item.name !== 'string' ||
                    typeof item.domain !== 'string' ||
                    !Array.isArray(item.responsibilities) ||
                    !Array.isArray(item.technologies) ||
                    typeof item.status !== 'string' ||
                    (item.supported_chains !== null && !Array.isArray(item.supported_chains)) ||
                    (item.partnerships !== null && !Array.isArray(item.partnerships)) ||
                    !Array.isArray(item.key_contributions)
                ) {
                    console.error(`Invalid project data: ${JSON.stringify(item)}`);
                    throw new Error(`Invalid project data: ${JSON.stringify(item)}`);
                }
                return {
                    id: item.id,
                    name: item.name,
                    description: item.description || '',
                    images: item.image || this.loadImages(item.id),
                    link: item.link || '',
                    tags: item.domain.split(',').map((tag: string) => tag.trim()), // Convert domain to tags
                    responsibilities: item.responsibilities,
                    technologies: item.technologies,
                    status: item.status,
                    supportedChains: item.supported_chains || [],
                    partners: item.partnerships || [],
                    keyContributions: item.key_contributions,
                };
            });

            this.projects = projects;
            this.projectsStack = this.getProjectStacks(projects);
        } catch (error) {
            console.error('Error loading projects:', error);
        } finally {
            this.isInitialized = true;
        }
    }

    loadImages(projectId: number): string[] {
        const projectFolder = projectPrefix.replace('%s', projectId.toString());
        const imageContext = require.context('../../public/media/images', true, /\.(png|gif|jpe?g|JPG|svg|ico)$/);
        const images: string[] = [];
        console.log("imageContext:", imageContext.keys)
        imageContext.keys().filter((key: string) => key.startsWith('./' + projectFolder))
            .forEach((key: string) => {
                images.push(imageContext(key));
        });
        console.log(`${projectId} loaded image:`, images)
        return images;
    }

    async getProjects(): Promise<ProjectData[]> {
        return await this.initialize().then(() => this.projects);
    }

    async getProjectsStack(): Promise<string[]> {
        return Promise.resolve(stackIncludeWords)
        //analyze all stack loaded from project to decide what to include in stackIncludeWords
        // return await this.initialize().then(() => this.projectsStack);
    }
}

export default ProjectService;
