import React, {useCallback, useEffect, useMemo, useState} from 'react';
import '../assets/styles/Project.scss';
import ProjectData from '../model/ProjectData';
import ProjectService from '../service/ProjectService';

function Project() {
    const projectService = useMemo(() => ProjectService.getInstance(), []);
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [filterButtons, setFilterButtons] = useState<string[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>('All');

    useEffect(() => {
        projectService.getProjects().then((data: ProjectData[]) => {
            setProjects(data);
            setFilteredProjects(data);
        });
    }, [projectService]);

    useEffect(() => {
        projectService.getProjectsStack().then(setFilterButtons);
    }, [projectService]);

    const cleanSearchInput = () => {
        const searchInput = document.querySelector('.search-input') as HTMLInputElement;
        searchInput.value = '';
    };

    const filterProjects = useCallback(
        (pType: string) => {
            if (pType === 'All') {
                setFilteredProjects(projects);
            } else {
                const filtered = projects.filter((project) =>
                    project.technologies.some((tech) => tech.toLowerCase().includes(pType.toLowerCase()))
                );
                setFilteredProjects(filtered);
            }
            cleanSearchInput();
        },
        [projects]
    );

    const searchProjects = useCallback(
        (e: any) => {
            const searchTerm = e.target.value;
            const searched = projects.filter(
                (project) =>
                    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setActiveFilter('');
            setFilteredProjects(searched);
        },
        [projects]
    );

    const handleFilter = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            const typePro = (e.currentTarget as HTMLButtonElement).value;
            filterProjects(typePro);
            setActiveFilter(typePro);
        },
        [filterProjects]
    );

    return (
        <div className="projects-container" id="projects">
            <h1>Personal Projects</h1>
            <div className="search-grid">
                <div className="search-container">
                    <input className="search-input" type="text" placeholder="Search projects..."
                           onChange={searchProjects}/>
                </div>
                <div className="filter-container">
                    {filterButtons.map((type, index) => (
                        <button
                            key={index}
                            value={type}
                            onClick={handleFilter}
                            className={`filter-button ${activeFilter === type ? 'active' : ''}`}
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
                            <img src={project.images[0]} className="image-zoom" alt="thumbnail" width="100%"/>
                            <div className="image-tooltip">
                                <div className="responsibilities">
                                    {project.responsibilities.map((contribution, index) => (
                                        <div className="technology" key={index}>{contribution}</div>
                                    ))}
                                </div>
                                <div className="date">
                                    {project.date?.toLocaleDateString('en-US', {year: 'numeric'})}
                                </div>
                            </div>
                        </div>
                        <div className="details">
                            <div className="project-name">
                                {project.link ? (
                                    <a href={project.link} target="_blank" rel="noreferrer">
                                        <h2>{project.name}</h2>
                                    </a>
                                ) : (
                                    <h2>{project.name}</h2>
                                )}
                            </div>
                            <div className="info-icon-container">
                                <div className="info-icon">i</div>
                                <div className="tooltip">
                                    {/*<h3>ID:{project.id}</h3>*/}
                                    <h3>Key Contributions:</h3>
                                    <ul>
                                        {project.keyContributions.map((contribution, index) => (
                                            <li key={index}>{contribution}</li>
                                        ))}
                                    </ul>
                                    {project.partners && project.partners.length > 0 && (
                                        <>
                                            <h3>Partnership</h3>
                                            <ul>
                                                {project.partners.map((partner, index) => (
                                                    <li key={index}>{partner}</li>
                                                ))}
                                            </ul>
                                        </>)}
                                    <h3>Status: <div className="inline">{project.status}</div></h3>
                                    <h3>Tags:</h3>
                                    <ul>{project.tags.map((responsibility, index) => (
                                        <li key={index}>{responsibility}</li>
                                    ))}</ul>
                                </div>
                            </div>
                        </div>
                        <div className="technologies">
                            {project.technologies.map((contribution, index) => (
                                <div className="technology" key={index}>{contribution}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Project;
