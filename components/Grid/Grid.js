import styles from './Grid.module.scss'

export default function Grid({
    featured,
    children,
}) {
    return (
        <section className={styles.projects_grid} data-featured={featured}>
            {children}
        </section>
    )
}