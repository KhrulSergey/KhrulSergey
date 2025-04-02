import React, {useCallback, useEffect, useMemo, useState} from 'react';
import '../assets/styles/Project.scss';
import ProjectData from '../model/ProjectData';
import ProjectService from '../service/ProjectService';

function Project() {
    const projectService = useMemo(() => ProjectService.getInstance(), []);
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [filterButtons, setFilterButtons] = useState<string[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);

    useEffect(() => {
        projectService.getProjects().then((data: ProjectData[]) => {
            setProjects(data);
            setFilteredProjects(data)
        });
    }, [projectService]);

    useEffect(() => {
        projectService.getProjectsStack().then(setFilterButtons);
    }, [projectService]);

    const filterProjects = useCallback(
        (pType: string) => {
            if (pType === 'All') {
                setFilteredProjects(projects);
            } else {
                const filtered = projects.filter((project) =>
                    project.technologies.some(tech =>
                        tech.toLowerCase().includes(pType.toLowerCase())
                    )
                );
                setFilteredProjects(filtered);
            }
        },
        [projects]
    );

    const searchProjects = useCallback(
        (e: any) => {
            const searchTerm = e.target.value
            const searched = projects.filter((project) =>
                project.name.toLowerCase().includes(searchTerm.toLowerCase())
                || project.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProjects(searched);
        },
        [projects]
    );

    const handleFilter = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            const typePro = (e.target as HTMLButtonElement).value;
            filterProjects(typePro);
        },
        [filterProjects]
    );

    return (
        <div className="projects-container" id="projects">
            <h1>Personal Projects</h1>
            <div className="search-grid">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        onChange={searchProjects}
                    />
                </div>
                <div className="filter-container">
                    {filterButtons.map((type, index) => (
                        <button
                            className="filter-buttons"
                            key={index}
                            value={type}
                            onClick={handleFilter}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="projects-grid">
                {filteredProjects.map((project) => (
                    <div className="project" key={project.id}>
                        <div className="image-container">
                            <img
                                src={project.images[0]}
                                className="zoom"
                                alt="thumbnail"
                                width="100%"
                            />
                        </div>
                        <a className="details" href={project.link} target="_blank" rel="noreferrer">
                            <h2>{project.name}</h2>
                            <div className="tooltip">
                                <h3>ID:{project.id}</h3>
                                <h3>Key Contributions:</h3>
                                <ul>
                                    {project.keyContributions.map((contribution, index) => (
                                        <li key={index}>{contribution}</li>
                                    ))}
                                </ul>
                                <h3>Status: <div className="inline">{project.status}</div></h3>
                                <h3>Responsibilities:</h3>
                                <ul>
                                    {project.responsibilities.map((responsibility, index) => (
                                        <li key={index}>{responsibility}</li>
                                    ))}
                                </ul>
                            </div>
                        </a>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Project;