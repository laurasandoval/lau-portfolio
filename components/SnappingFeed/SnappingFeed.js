import './SnappingFeed.scss'
import GlobalHeader from "./GlobalHeader/GlobalHeader";
import Slide from "./Slide/Slide";
import { NextSeo } from 'next-seo';

function SnappingFeed({
    children,
}) {
    return (
        <>
            <NextSeo
                additionalMetaTags={[
                    {
                        name: "theme-color",
                        content: "#000000",
                    },
                ]}
            />

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