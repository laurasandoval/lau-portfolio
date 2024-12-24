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

        let tabPositions = [];
        let currentFeedIndex = 0;
        let scrollTimeout;
        const resizeObservers = [];

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

        const updateVisuals = () => {
            if (!feeds || !currentTabIndicator || tabPositions.length === 0) return;

            const viewportWidth = feeds.offsetWidth;
            const scrollLeft = feeds.scrollLeft;
            const rawIndex = scrollLeft / viewportWidth;
            const currentIndex = Math.floor(rawIndex);
            const nextIndex = Math.min(currentIndex + 1, tabPositions.length - 1);
            const progress = rawIndex - currentIndex;

            if (currentIndex >= 0 && nextIndex < tabPositions.length) {
                const current = tabPositions[currentIndex];
                const next = tabPositions[nextIndex];
                if (!current || !next) return;

                const interpolatedOffset = current.offsetLeft + (next.offsetLeft - current.offsetLeft) * progress;
                const interpolatedWidth = current.width + (next.width - current.width) * progress;

                currentTabIndicator.style.setProperty('--leading-offset', `${Math.round(interpolatedOffset)}px`);
                currentTabIndicator.style.setProperty('--width', `${Math.round(interpolatedWidth)}px`);

                // Update tab colors
                tabs.forEach((tab, index) => {
                    if (!tab) return;
                    const label = tab.querySelector('label');
                    if (!label) return;

                    const distance = Math.abs(index - rawIndex);
                    const opacity = Math.max(0, 1 - distance);
                    label.style.setProperty('--active-opacity', opacity.toString());
                });
            }
        };

        const updateFeedHeight = (index) => {
            if (!feeds) return;
            const feedElements = Array.from(feeds.children);
            const currentFeed = feedElements[index];
            if (!currentFeed) return;

            const newHeight = currentFeed.offsetHeight;
            feeds.style.setProperty('--current-feed-height', `${newHeight}px`);
        };

        const observeFeedHeights = () => {
            const feedElements = Array.from(feeds.children);
            feedElements.forEach((feed) => {
                const resizeObserver = new ResizeObserver(() => {
                    const feedIndex = feedElements.indexOf(feed);
                    if (feedIndex === currentFeedIndex) {
                        updateFeedHeight(feedIndex);
                    }
                });
                resizeObserver.observe(feed);
                resizeObservers.push(resizeObserver);
            });
        };

        const onScroll = () => {
            // Immediate visual updates
            requestAnimationFrame(updateVisuals);

            // Debounced state updates
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const viewportWidth = feeds.offsetWidth;
                const scrollLeft = feeds.scrollLeft;
                const newFeedIndex = Math.round(scrollLeft / viewportWidth);

                if (newFeedIndex !== currentFeedIndex && newFeedIndex >= 0 && newFeedIndex < tabs.length) {
                    currentFeedIndex = newFeedIndex;
                    onTabChange(newFeedIndex);
                    updateFeedHeight(newFeedIndex);
                }
            }, 150);
        };

        const handleResize = () => {
            calculateTabPositions();
            updateVisuals();
            updateFeedHeight(currentFeedIndex);
        };

        // Setup
        feeds.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        observeFeedHeights();

        // Initial setup
        requestAnimationFrame(() => {
            calculateTabPositions();
            updateVisuals();
            updateFeedHeight(currentFeedIndex);
        });

        return () => {
            feeds.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', handleResize);
            clearTimeout(scrollTimeout);
            resizeObservers.forEach(observer => observer.disconnect());
        };
    }, [onTabChange]);

    const handleTabClick = (index) => {
        const feeds = feedsRef.current;
        if (!feeds || index < 0 || index >= tabs.length) return;

        const viewportWidth = feeds.offsetWidth;
        const targetX = index * viewportWidth;

        feeds.scrollTo({
            left: targetX,
            behavior: 'smooth'
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