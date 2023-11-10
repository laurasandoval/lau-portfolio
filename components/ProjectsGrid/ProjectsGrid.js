import React, { useState, useEffect, useRef } from 'react';
import './ProjectsGrid.scss';
import { IconArrowDown } from '@tabler/icons-react';

export default function ProjectsGrid({ featured, children }) {
    const gridRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const prevWidthRef = useRef(windowWidth);

    const getComputedStyleColumnCount = () => {
        if (gridRef.current) {
            const style = window.getComputedStyle(gridRef.current);
            const columns = style.getPropertyValue('grid-template-columns').trim();
            const columnCount = columns.split(' ').length;
            return columnCount;
        }
        return 0;
    };

    const getInitialItemCount = () => {
        if (featured) return React.Children.count(children);
        const columnCount = getComputedStyleColumnCount();
        return columnCount === 1 ? 0 : 6;
    };

    const [itemsToShow, setItemsToShow] = useState(getInitialItemCount);

    const loadMoreItems = () => {
        const columnCount = getComputedStyleColumnCount();
        if (!featured) {
            const itemsToAdd = columnCount === 1 ? 4 : columnCount * 2;
            setItemsToShow((prevItemsToShow) => prevItemsToShow + itemsToAdd);
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

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

    useEffect(() => {
        const columnCount = getComputedStyleColumnCount();
        if (featured) {
            setItemsToShow(React.Children.count(children));
        } else if (columnCount === 1) {
            setItemsToShow(0);
        } else {
            setItemsToShow(columnCount * 1);
        }
    }, [featured, windowWidth]);

    const displayedChildren = React.Children.toArray(children).slice(0, itemsToShow);

    return (
        <section ref={gridRef} className="projects_grid" data-featured={featured}>
            {displayedChildren}
            {!featured && children.length > itemsToShow && (
                <button className="load_more" onClick={loadMoreItems}>
                    <span>Load More</span>
                    <IconArrowDown />
                </button>
            )}
        </section>
    );
}
