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
        title: "Developed a passion for Big Data handling in Java/Go/TS",
        subtitle: "Remote: EU (Netherlands, Germany), Argentina",
        description: "Full-stack Development, Team Lead, Architecture, Blockchain",
        icon: faDatabase,
    },
    {
        date: "2017 - 2019",
        title: "Moved into management roles, overseeing tech duties in R&D, Commercial, and Marketing projects",
        subtitle: "Remote: US, EU, RU",
        description: "Project/Product Manager, Tech Manager, QA Lead, Marketing, Sales",
        icon: faPeopleRoof,
    },
    {
        date: "2016",
        title: "Stepped into my first Lead role",
        subtitle: "HUGHES Satellite Monitoring Center, US",
        description: "Lead Developer: Responsible for mentoring three interns, resulting in their full-time hires.",
        icon: faRocket,
    },
    {
        date: "2014",
        title: "Completed a postgraduate degree in Computer Engineering",
        subtitle: "Tomsk Polytechnic University (TPU), RU",
        description: "Degree topic: Satellite monitoring system for autonomous transport",
        icon: faUserGraduate,
    },
    {
        date: "2012",
        title: "Awarded a personal state R&D grant",
        subtitle: "Remote: US, RU",
        description: "Research topic: Improving vehicle navigation positioning through algorithms and software",
        icon: faTrophy,
    },
    {
        date: "2010",
        title: "Started a new chapter as a C# Research Engineer",
        subtitle: "Remote: US, RU",
        description: "Complex Algorithms, Data Processing, Statistical Analysis",
        icon: faMagnifyingGlassChart,
    },
    {
        date: "2010",
        title: "Earned a Master's degree in Applied Mathematics",
        subtitle: "Tomsk State University (TSU), RU",
        description: "Degree topic: Supervisory control of oil transit in the oil pipeline network",
        icon: faGraduationCap,
    },
    {
        date: "2008",
        title: "Started my first full-time job",
        subtitle: "On-site, RU",
        description: "Enhancing and maintaining turnstile systems",
        icon: faBuilding,
    },
    {
        date: "2003",
        title: "Started my developer career",
        subtitle: "Part-time, RU",
        description: "Modifying and updating a web portal with media content",
        icon: faCode,
    },
];
