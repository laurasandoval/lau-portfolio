import { useRef, useEffect, useState } from 'react';
import { throttle } from 'lodash';
import { normalizeForUrl } from '@/lib/formatters';
import './IndexTabs.scss';

export default function IndexTabs({
    tabs,
    selectedTab,
    onTabChange,
    headerHeight,
    feedsRef
}) {
    const tabsRef = useRef([]);
    const currentTabIndicatorRef = useRef(null);
    const tabsContainerRef = useRef(null);
    const [isTabsSticking, setIsTabsSticking] = useState(false);

    // Effect to track tabs sticking state
    useEffect(() => {
        const tabsElement = tabsContainerRef.current;
        if (!tabsElement) return;

        const checkSticky = throttle(() => {
            if (!tabsElement) return;

            const { top } = tabsElement.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(tabsElement);
            const stickyTop = parseInt(computedStyle.top) || 0;

            setIsTabsSticking(top <= stickyTop);
        }, 100);

        // Initial check
        checkSticky();

        // Add scroll listener
        window.addEventListener('scroll', checkSticky);
        window.addEventListener('resize', checkSticky);

        return () => {
            window.removeEventListener('scroll', checkSticky);
            window.removeEventListener('resize', checkSticky);
            checkSticky.cancel();
        };
    }, []);

    useEffect(() => {
        const feeds = feedsRef.current;
        const tabs = tabsRef.current;
        const currentTabIndicator = currentTabIndicatorRef.current;

        let tabPositions = []; // cache tab dimensions and positions
        let currentFeedIndex = 0; // track the current feed index
        const resizeObservers = []; // store resize observers for cleanup

        const calculateTabPositions = () => {
            const tabsContainer = tabsContainerRef.current;
            if (!tabsContainer) return;

            const containerRect = tabsContainer.getBoundingClientRect();

            tabPositions = tabs
                .filter((tab) => tab)
                .map((tab) => {
                    const rect = tab.getBoundingClientRect();
                    return {
                        offsetLeft: rect.left - containerRect.left,
                        width: rect.width,
                    };
                });
        };

        const updateTabIndicator = () => {
            const scrollLeft = feeds.scrollLeft;
            const viewportWidth = feeds.offsetWidth;

            if (!tabPositions || tabPositions.length === 0) return;

            const currentIndex = Math.floor(scrollLeft / viewportWidth);
            const nextIndex = Math.min(currentIndex + 1, tabPositions.length - 1);

            const interpolationFactor = (scrollLeft % viewportWidth) / viewportWidth;

            // interpolate tab indicator position and width
            const current = tabPositions[currentIndex];
            const next = tabPositions[nextIndex];
            if (!current || !next) return;

            const interpolatedOffset =
                current.offsetLeft + interpolationFactor * (next.offsetLeft - current.offsetLeft);
            const interpolatedWidth =
                current.width + interpolationFactor * (next.width - current.width);

            currentTabIndicator.style.setProperty('--leading-offset', `${Math.round(interpolatedOffset)}px`);
            currentTabIndicator.style.setProperty('--width', `${Math.round(interpolatedWidth)}px`);
        };

        // Create a ResizeObserver for the tabs container
        const tabsResizeObserver = new ResizeObserver(throttle(() => {
            calculateTabPositions();
            updateTabIndicator();
        }, 100));

        // Observe each tab element for size changes
        tabs.forEach((tab) => {
            if (tab) {
                tabsResizeObserver.observe(tab);
            }
        });

        const updateFeedHeight = () => {
            const viewportWidth = feeds.offsetWidth;
            const scrollLeft = feeds.scrollLeft;
            const newFeedIndex = Math.round(scrollLeft / viewportWidth);

            // only update height if the feed index changes
            if (newFeedIndex !== currentFeedIndex) {
                currentFeedIndex = newFeedIndex;
                onTabChange(newFeedIndex);

                const feedElements = Array.from(feeds.children);
                const currentFeed = feedElements[currentFeedIndex];
                if (!currentFeed) return;

                const newHeight = currentFeed.offsetHeight;
                feeds.style.setProperty('--current-feed-height', `${newHeight}px`);
            }
        };

        const observeFeedHeights = () => {
            const feedElements = Array.from(feeds.children);
            feedElements.forEach((feed) => {
                const resizeObserver = new ResizeObserver(() => {
                    // update the height only if it's the current feed
                    const feedIndex = Array.from(feedElements).indexOf(feed);
                    if (feedIndex === currentFeedIndex) {
                        const newHeight = feed.offsetHeight;
                        feeds.style.setProperty('--current-feed-height', `${newHeight}px`);
                    }
                });
                resizeObserver.observe(feed);
                resizeObservers.push(resizeObserver);
            });
        };

        const detectCurrentTab = throttle(() => {
            updateFeedHeight();
        }, 200);

        const onScroll = () => {
            requestAnimationFrame(() => {
                updateTabIndicator();
                detectCurrentTab();
            });
        };

        const handleResize = () => {
            calculateTabPositions();
            updateTabIndicator();
            detectCurrentTab();
        };

        feeds.addEventListener('scroll', onScroll);
        window.addEventListener('resize', handleResize);

        // initial setup
        setTimeout(() => {
            calculateTabPositions();
            observeFeedHeights();
            detectCurrentTab();
            updateTabIndicator();
        }, 200);

        return () => {
            feeds.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', handleResize);
            resizeObservers.forEach((observer) => observer.disconnect());
            tabsResizeObserver.disconnect();
        };
    }, [onTabChange]);

    const handleTabClick = (index) => {
        const feeds = feedsRef.current;
        const viewportWidth = feeds.offsetWidth;

        feeds.scrollTo({
            left: index * viewportWidth,
            behavior: 'smooth',
        });
    };

    return (
        <div
            className="tabs_container"
            ref={tabsContainerRef}
            style={{ "--header-height": `${headerHeight}px` }}
            data-show-border={isTabsSticking.toString()}
        >
            <div className="tabs">
                <span className="current_tab_indicator" ref={currentTabIndicatorRef}></span>

                {tabs.map(({ label }, index) => (
                    <div
                        className="tab"
                        key={normalizeForUrl(label)}
                        ref={(el) => {
                            if (el) tabsRef.current[index] = el;
                        }}
                    >
                        <input
                            type="radio"
                            id={normalizeForUrl(label)}
                            name={normalizeForUrl(label)}
                            value={normalizeForUrl(label)}
                            checked={selectedTab === index}
                            onChange={() => handleTabClick(index)}
                        />
                        <label htmlFor={normalizeForUrl(label)}>{label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
} 