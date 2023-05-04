import './SnappingFeed.scss'
import GlobalHeader from "./GlobalHeader/GlobalHeader";
import Slide from "./Slide/Slide";

function SnappingFeed({
    children,
}) {
    return (
        <>
            <SnappingFeed.GlobalHeader />

            <div className="snapping_feed_container">
                <div className="snapping_feed">
                    {children}
                </div>
            </div>
        </>
    )
}

SnappingFeed.GlobalHeader = GlobalHeader;
SnappingFeed.Slide = Slide;

export default SnappingFeed;