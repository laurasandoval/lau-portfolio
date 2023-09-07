import './PageIndicator.scss'
import Dot from './Dot';

function PageIndicator({
    children,
}) {
    return (
        <div className="page_indicator">
            {children}
        </div>
    )
}

PageIndicator.Dot = Dot;

export default PageIndicator;