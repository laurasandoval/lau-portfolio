import React, { useState, useEffect, useRef } from 'react';
import './ProjectsGrid.scss';
import { IconArrowDown } from '@tabler/icons-react';

export default function ProjectsGrid({ featured, children }) {
    const gridRef = useRef(null);
    // Start with all items if featured is true, otherwise start with 6.
    const [itemsToShow, setItemsToShow] = useState(featured ? React.Children.count(children) : 6);

    const getComputedStyleColumnCount = () => {
        if (gridRef.current) {
            const style = window.getComputedStyle(gridRef.current);
            const columns = style.getPropertyValue('grid-template-columns').trim();
            const columnCount = columns.split(' ').length;
            return columnCount;
        }
        return 0; // Default to 0 if we can't read the style
    };

    const loadMoreItems = () => {
        // Load more items only if featured is false
        if (!featured) {
            setItemsToShow((prevItemsToShow) => prevItemsToShow + (2 * getComputedStyleColumnCount()));
        }
    };

    useEffect(() => {
        // If featured is true, show all items and do not set up the resize listener
        if (featured) {
            setItemsToShow(React.Children.count(children));
            return;
        }

        const updateItemsToShow = () => {
            const columnCount = getComputedStyleColumnCount();
            setItemsToShow(columnCount * 1);
        };

        updateItemsToShow();

        const handleResize = () => {
            updateItemsToShow();
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [featured]); // Only re-run the effect if the featured prop changes

    const displayedChildren = featured
        ? children // Show all children if featured is true
        : React.Children.toArray(children).slice(0, itemsToShow);

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
