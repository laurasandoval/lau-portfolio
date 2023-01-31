import './GenericContainer.scss'

export default function GenericContainer({
    as,
    className,
    children,
}) {
    const Tag = as ? as : "div";

    return (
        <Tag className={`generic_container ${className}`}>{children}</Tag>
    )
}