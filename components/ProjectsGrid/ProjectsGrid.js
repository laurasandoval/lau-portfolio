import React, { useState, useEffect, useRef } from 'react';
import './ProjectsGrid.scss';
import { IconArrowDown } from '@tabler/icons-react';
import { useRouter } from 'next/router';

export default function ProjectsGrid({ featured, children }) {
    const gridRef = useRef(null);
    const loadMoreButtonRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [itemsToShow, setItemsToShow] = useState(0);
    const [loadMoreButtonComputedHeight, setLoadMoreButtonComputedHeight] = useState(0);
    const [loadingOverlayHeight, setLoadingOverlayHeight] = useState(0);
    const [loadingMoreItems, setLoadingMoreItems] = useState(false);
    const prevWidthRef = useRef(windowWidth);
    const router = useRouter();

    const getComputedStyleColumnCount = () => {
        if (gridRef.current) {
            const style = window.getComputedStyle(gridRef.current);
            const columns = style.getPropertyValue('grid-template-columns').trim();
            const columnCount = columns.split(' ').length;
            return columnCount;
        }
        return 0;
    };

    const getLoadMoreButtonComputedHeight = () => {
        if (loadMoreButtonRef.current) {
            const computedStyle = window.getComputedStyle(loadMoreButtonRef.current);
            const computedHeight = loadMoreButtonRef.current.offsetHeight;
            const paddingTop = parseFloat(computedStyle.paddingTop);
            return Math.round(computedHeight - paddingTop);
        }
        return 0;
    };

    const getLoadingOverlayHeight = () => {
        if (gridRef.current) {
            const rect = gridRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const pixelsBelow = viewportHeight - rect.bottom;

            return Math.round(pixelsBelow + loadMoreButtonComputedHeight);
        }
        return 0;
    }

    const getInitialItemCount = () => {
        const columnCount = getComputedStyleColumnCount();
        if (featured) {
            return React.Children.count(children);
        } if (columnCount === 1) {
            return 0;
        } else {
            return columnCount * 1;
        }
    };

    const getItemsToAddCount = () => {
        const columnCount = getComputedStyleColumnCount();
        const itemsToAdd = columnCount === 1 ? 4 : columnCount * 2;
        return itemsToAdd
    };

    const updateUrlPage = (newPage) => {
        router.push(`?page=${newPage}`, undefined, { shallow: true });
    };

    const loadMoreItems = () => {
        setLoadMoreButtonComputedHeight(getLoadMoreButtonComputedHeight());
        setLoadingOverlayHeight(getLoadingOverlayHeight())

        setLoadingMoreItems(true);
        setTimeout(() => {
            setItemsToShow((prevItemsToShow) => prevItemsToShow + getItemsToAddCount());
            const newPage = parseInt(router.query.page || 1) + 1;
            updateUrlPage(newPage);
            setLoadingMoreItems(false);
        }, 400);
    };

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        setLoadMoreButtonComputedHeight(getLoadMoreButtonComputedHeight());

        const handleResize = () => {
            const newWidth = window.innerWidth;
            if (newWidth !== prevWidthRef.current) {
                prevWidthRef.current = newWidth; // Update the previous width
                setWindowWidth(newWidth);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Sets the initial number of items to render
    useEffect(() => {
        if (router.query.page >= 2) {
            let itemsToShow = getInitialItemCount() + (getItemsToAddCount() * (router.query.page - 1));
            setItemsToShow(itemsToShow);
        } else {
            setItemsToShow(getInitialItemCount());
        }
    }, [featured, windowWidth, router.query.page]);

    const displayedChildren = React.Children.toArray(children).slice(0, itemsToShow);

    return (
        <section
            ref={gridRef}
            className="projects_grid"
            data-featured={featured}
            data-loading-more-items={loadingMoreItems}
            style={{
                "--load-more-button-height": `${loadMoreButtonComputedHeight}px`,
                "--loading-overlay-height": `${loadingOverlayHeight}px`
            }}
        >
            {displayedChildren}
            {!featured && children.length > itemsToShow && (
                <button
                    ref={loadMoreButtonRef}
                    className="load_more"
                    onClick={loadMoreItems}
                >
                    <span>Load More</span>
                    <IconArrowDown />
                </button>
            )}
        </section>
    );
}
