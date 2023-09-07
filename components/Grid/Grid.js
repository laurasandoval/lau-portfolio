import './Grid.scss'

export default function Grid({
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