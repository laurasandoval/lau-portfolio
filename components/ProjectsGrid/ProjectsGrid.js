import './ProjectsGrid.scss'

export default function ProjectsGrid({
    featured,
    children,
}) {
    return (
        <section className="projects_grid" data-featured={featured}>
            <div className="dummy_container">
                {children}
            </div>
        </section>
    )
}