import './GenericContainer.scss'

export default function GenericContainer({
    as,
    className,
    children,
}) {
    const Tag = as ? as : "span";

    return (
        <Tag className={`generic_container ${className}`}>{children}</Tag>
    )
}