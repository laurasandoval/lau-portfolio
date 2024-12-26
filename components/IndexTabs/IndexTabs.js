import { useRef, useEffect, useState } from 'react';
import { throttle } from 'lodash';
import { normalizeForUrl } from '@/lib/formatters';
import './IndexTabs.scss';

export default function IndexTabs({
    tabs,
    selectedTab,
    onTabChange,
    headerHeight,
    feedsRef,
    onStickingChange
}) {
    const tabsRef = useRef([]);
    const currentTabIndicatorRef = useRef(null);
    const tabsContainerRef = useRef(null);
    const tabsContainerPositionMarkRef = useRef(null);
    const tabsScrollContainerRef = useRef(null);
    const [isTabsSticking, setIsTabsSticking] = useState(false);

    // Effect to track tabs sticking state
    useEffect(() => {
        const tabsElement = tabsContainerRef.current;
        if (!tabsElement) return;

        let lastStickingState = false;
        let lastScrollY = window.scrollY;
        let scrollTimeout = null;
        let isScrolling = false;

        // Separate immediate border update from the main sticky check
        const updateBorders = (isSticking) => {
            if (isSticking !== lastStickingState) {
                lastStickingState = isSticking;
                setIsTabsSticking(isSticking);
                if (onStickingChange) {
                    onStickingChange(isSticking);
                }
            }
        };

        const checkSticky = throttle(() => {
            if (!tabsElement) return;

            const { top } = tabsElement.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(tabsElement);
            const stickyTop = parseInt(computedStyle.top) || 0;

            // Determine scroll direction
            const scrollingDown = window.scrollY > lastScrollY;
            lastScrollY = window.scrollY;

            // Use a larger threshold during active scrolling
            const baseThreshold = 1;
            const scrollingThreshold = 5;
            const threshold = isScrolling ? scrollingThreshold : baseThreshold;

            // When scrolling down, be more eager to stick
            // When scrolling up, be more conservative about unsticking
            const isSticking = scrollingDown
                ? Math.abs(top - stickyTop) <= threshold
                : top <= (stickyTop + threshold);

            // Update borders immediately
            updateBorders(isSticking);

            // Only handle unsticking delay for non-border effects if needed
            if (!isSticking && lastStickingState) {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    if (Math.abs(top - stickyTop) > threshold) {
                        // Any non-border related unsticking logic would go here
                    }
                }, 50); // Reduced from 150ms since we don't need it for borders
            }
        }, 16, { leading: true, trailing: true }); // Reduced from 100ms to 16ms (1 frame)

        // Track when scrolling starts/stops
        const scrollStarted = () => {
            isScrolling = true;
            clearTimeout(scrollTimeout);
        };

        const scrollEnded = throttle(() => {
            isScrolling = false;
            checkSticky();
        }, 50); // Reduced from 150ms

        // Initial check
        checkSticky();

        // Add scroll listener with passive flag for better performance
        window.addEventListener('scroll', scrollStarted, { passive: true });
        window.addEventListener('scroll', checkSticky, { passive: true });
        window.addEventListener('scroll', scrollEnded, { passive: true });
        window.addEventListener('resize', checkSticky, { passive: true });

        return () => {
            window.removeEventListener('scroll', scrollStarted);
            window.removeEventListener('scroll', checkSticky);
            window.removeEventListener('scroll', scrollEnded);
            window.removeEventListener('resize', checkSticky);
            clearTimeout(scrollTimeout);
            checkSticky.cancel();
            scrollEnded.cancel();
        };
    }, [onStickingChange]);

    const centerTab = (index) => {
        const tabElement = tabsRef.current[index];
        const tabsScrollContainer = tabsScrollContainerRef.current;
        if (!tabElement || !tabsScrollContainer) return;

        // Center the selected tab
        const tabRect = tabElement.getBoundingClientRect();
        const containerRect = tabsScrollContainer.getBoundingClientRect();

        // Calculate how far the tab is from being centered
        const tabCenter = tabRect.left + (tabRect.width / 2);
        const containerCenter = containerRect.left + (containerRect.width / 2);
        const scrollOffset = tabCenter - containerCenter;

        // Add this offset to current scroll position
        const newScrollPosition = tabsScrollContainer.scrollLeft + scrollOffset;

        // Clamp the scroll position
        const maxScroll = tabsScrollContainer.scrollWidth - tabsScrollContainer.offsetWidth;
        const clampedScrollLeft = Math.max(0, Math.min(newScrollPosition, maxScroll));

        tabsScrollContainer.scrollTo({
            left: clampedScrollLeft,
            behavior: 'smooth'
        });
    };

    const scrollTabsIntoView = () => {
        const tabsElement = tabsContainerRef.current;
        const positionMark = tabsContainerPositionMarkRef.current;
        if (!tabsElement || !positionMark) return;

        // Get absolute position of the marker relative to the document
        const markRect = positionMark.getBoundingClientRect();
        const absoluteMarkPosition = markRect.top + window.scrollY;

        // Get the sticky top offset and height from the tabs element
        const computedStyle = window.getComputedStyle(tabsElement);
        const stickyTop = parseInt(computedStyle.top) || 0;

        // Scroll to the absolute position plus the sticky offset and tabs height
        window.scrollTo({
            top: absoluteMarkPosition - stickyTop,
            behavior: 'smooth'
        });
    };

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
                    centerTab(newFeedIndex);
                    scrollTabsIntoView();
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

        // Always scroll tabs into view when clicking, even if it's the current tab
        scrollTabsIntoView();

        // Only proceed with feed scrolling if it's a different tab
        if (index !== selectedTab) {
            const viewportWidth = feeds.offsetWidth;
            const targetX = index * viewportWidth;
            feeds.scrollTo({
                left: targetX,
                behavior: 'smooth'
            });

            centerTab(index);
        }
    };

    return (
        <>
            {/*
                This is a marker that is used to track the position of the tabs container.
                It is used to determine the fake "top" of the page when a tab is selected.
            */}
            <span className="tabs_container_position_mark" ref={tabsContainerPositionMarkRef} />
            <div
                className="tabs_container"
                ref={tabsContainerRef}
                style={{ "--header-height": `${headerHeight}px` }}
                data-show-border={isTabsSticking.toString()}
            >
                <div className="tabs" ref={tabsScrollContainerRef}>
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
                            <label
                                htmlFor={normalizeForUrl(label)}
                                onClick={() => handleTabClick(index)}
                            >
                                {label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
} 