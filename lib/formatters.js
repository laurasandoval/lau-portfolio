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