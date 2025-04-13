import {
    faDatabase,
    faGraduationCap,
    faBuilding,
    faCode,
    faMagnifyingGlassChart,
    faTrophy,
    faRocket,
    faPeopleRoof,
    faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import CareerData from "../model/CareerData";


class CareerService {
    private static instance: CareerService | null = null;

    private constructor() {
    }

    public static getInstance(): CareerService {
        if (!CareerService.instance) {
            CareerService.instance = new CareerService();
        }
        return CareerService.instance;
    }

    public getCareers(): CareerData[] {
        return careerList;
    }
}

export default CareerService;

const careerList: CareerData[] = [
    {
        date: "2019 - present",
        title: "Become fun of Big Data handling on Java/Go/TS",
        subtitle: "Remote: EU (Netherlands, Germany), Argentina",
        description: "Full-stack Development, Team Lead, Architecture, Blockchain",
        icon: faDatabase,
    },
    {
        date: "2017 - 2019",
        title: "Moved into management roles covering tech duties R&D, Commercial, and Marketing projects",
        subtitle: "Remote: US, EU, RU",
        description: "Project/Product Manager, Tech manager, QA Lead, Marketer, Sales",
        icon: faPeopleRoof,
    },
    {
        date: "2016",
        title: "Got my first Lead position",
        subtitle: "HUGHES Satellite Monitoring Center , US",
        description: "Lead Developer: Responsible for a 3 interns, resulting in their full-time hires.",
        icon: faRocket,
    },
    {
        date: "2014",
        title: "Finished Post-Graduate degree on Computer Engineering",
        subtitle: "TPU University, RU",
        description: "Degree topic: Satellite monitoring system for autonomous transport",
        icon: faUserGraduate,
    },
    {
        date: "2012",
        title: "Won personal state R&D grant",
        subtitle: "Remote: US, RU",
        description: "Research topic: Improving vehicle navigation positioning through algorithms and software",
        icon: faTrophy,
    },
    {
        date: "2010",
        title: "Started new chapter as C# Research Engineer",
        subtitle: "Remote: US, RU",
        description: "Complex algorithm, Data Processing, Statistical Analysis",
        icon: faMagnifyingGlassChart,
    },
    {
        date: "2010",
        title: "Got Master's degree in Applied Mathematics",
        subtitle: "TSU University, RU",
        description: "Degree topic: Supervisor control of oil transit in the oil pipeline network",
        icon: faGraduationCap,
    },
    {
        date: "2008",
        title: "Start my first full-time job",
        subtitle: "On-site, RU",
        description: "Refinement and maintenance of the turnstile system",
        icon: faBuilding,
    },
    {
        date: "2003",
        title: "Start of My developers career",
        subtitle: "Part-time, RU",
        description: "Modify and update WEB-portal with media content",
        icon: faCode,
    },
];