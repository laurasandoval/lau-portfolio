import './SnappingFeed.scss'
import GlobalHeader from "./GlobalHeader/GlobalHeader";
import Slide from "./Slide/Slide";
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';

function SnappingFeed({
    children,
}) {
    useEffect(() => {
        document.body.classList.add("snapping_feed");

        return () => {
            document.body.classList.remove("snapping_feed");
        }
    }, [])

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