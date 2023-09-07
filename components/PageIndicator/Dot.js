import AccessibilityLabel from "../AccessibilityLabel/AccessibilityLabel";

export default function Dot({
    onClick,
    current,
    index,
    ...props
}) {
    return (
        <button
            className="page_dot"
            data-current={current}
            onClick={onClick}
            {...props}
        >
            <AccessibilityLabel>{`Go to page ${index + 1}`}</AccessibilityLabel>
        </button>
    )
}