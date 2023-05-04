import './Button.scss'

export default function Button({
    type,
    link,
    href,
    label,
    onClick,
    ...props
}) {
    if (link) {
        return (
            <a
                className="button"
                data-type={type}
                href={href}
                rel="noopener noreferrer"
                {...props}
            >
                {label}
            </a>
        )
    } else {
        return (
            <button
                className="button"
                data-type={type}
                onClick={onClick}
                {...props}
            >
                {label}
            </button>
        )
    }
}