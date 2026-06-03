import { projects } from '@/data/projects';

export default function ProjectsWindow() {
  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <article className="mini-app" key={project.title}>
          <header><span>▣</span><strong>{project.title}</strong></header>
          <p>{project.description}</p>
          <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="mini-actions"><a href={project.viewUrl}>View</a><a href={project.codeUrl}>Code</a></div>
        </article>
      ))}
    </div>
  );
}
