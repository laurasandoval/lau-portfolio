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

export function normalizeForUrl(str) {
    return str
        .toLowerCase()
        .replace(/[&]/g, 'and')  // Replace & with 'and'
        .replace(/[^a-z0-9]+/g, '-')  // Replace any non-alphanumeric chars with hyphen
        .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
}