import styles from './AccessibilityLabel.module.scss'

export default function AccessibilityLabel({
    as,
    role,
    children,
}) {
    const Tag = as ? as : "span";

    return (
        <Tag className={styles.accessibility_label} role={role}>
            {children}
        </Tag>
    )
}