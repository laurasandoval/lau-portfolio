export function formatCategories(categories) {
    if (!categories || categories.length === 0) return null;

    if (categories.length === 1) {
        return categories[0];
    } else {
        return categories.slice(0, 3).join(', ');
    }
};

export function formatYears(startYear, endYear) {
    if (startYear && endYear) {
        return startYear === endYear ? `${startYear}` : `${startYear} — ${endYear}`;
    } else if (startYear && endYear === null) {
        return `Since ${startYear}`;
    } else if (endYear && startYear === null) {
        return `Until ${endYear}`;
    } else {
        return null;
    }
};