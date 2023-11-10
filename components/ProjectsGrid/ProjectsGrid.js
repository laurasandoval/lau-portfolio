import React, { useState, useEffect, useRef } from 'react';
import './ProjectsGrid.scss';
import { IconArrowDown } from '@tabler/icons-react';

export default function ProjectsGrid({ featured, children }) {
    const gridRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    const getComputedStyleColumnCount = () => {
        if (gridRef.current) {
            const style = window.getComputedStyle(gridRef.current);
            const columns = style.getPropertyValue('grid-template-columns').trim();
            const columnCount = columns.split(' ').length;
            return columnCount;
        }
        return 0;
    };

    // Determine initial item count based on the column count
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
        // Ensure window is defined before using it
        if (typeof window === 'undefined') {
            return;
        }

        const updateItemsToShow = () => {
            const columnCount = getComputedStyleColumnCount();
            if (featured) {
                setItemsToShow(React.Children.count(children));
            } else if (columnCount === 1) {
                setItemsToShow(0);
            } else {
                setItemsToShow(columnCount * 1);
            }
        };

        updateItemsToShow();

        const handleResize = () => {
            const newWidth = window.innerWidth;
            if (newWidth !== windowWidth) {
                setWindowWidth(newWidth);
                updateItemsToShow();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
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
