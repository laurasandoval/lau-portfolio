import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { normalizeForUrl } from './formatters';

const postsDirectory = path.join(process.cwd(), '_posts');

// Helper function to recursively get all files in a directory
function getAllFiles(directory) {
    let files = [];

    // Read directory contents
    const items = fs.readdirSync(directory);

    // Iterate over items in directory
    for (const item of items) {
        const fullPath = path.join(directory, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // If the item is a directory, recursively get its files
            files = files.concat(getAllFiles(fullPath));
        } else if (stat.isFile() && fullPath.endsWith('.md')) {
            // If the item is a file, add it to the files list
            files.push(fullPath);
        }
    }

    return files;
}

export function getSortedPostsData() {
    const filePaths = getAllFiles(postsDirectory);
    const allPostsData = filePaths.map((filePath) => {
        // Extract the id from the file path relative to the posts directory
        const id = path.relative(postsDirectory, filePath).replace(/\.md$/, '');

        // Read markdown file as string
        const fileContents = fs.readFileSync(filePath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            id,
            ...matterResult.data,
        };
    });

    // Helper function for our default sort logic
    const defaultSort = (a, b) => {
        if (!a.endYear) return -1; // Ongoing projects first
        if (!b.endYear) return 1;  // If 'b' is ongoing but 'a' is not, 'b' comes first
        return b.endYear - a.endYear; // If both have endYears, sort by endYear
    };

    // First, sort all posts using our default logic
    const sortedPosts = allPostsData.sort(defaultSort);

    // Then, handle forceSlot posts
    const forcedPosts = new Map(); // Map of slot -> array of posts
    const regularPosts = [];

    // Separate forced and regular posts
    sortedPosts.forEach(post => {
        if (post.forceSlot !== undefined) {
            const slot = post.forceSlot;
            if (!forcedPosts.has(slot)) {
                forcedPosts.set(slot, []);
            }
            forcedPosts.get(slot).push(post);
        } else {
            regularPosts.push(post);
        }
    });

    // Sort posts within each forced slot using default logic
    forcedPosts.forEach(posts => {
        posts.sort(defaultSort);
    });

    // Build final array by inserting forced posts at their slots
    const result = [...regularPosts];
    forcedPosts.forEach((posts, slot) => {
        // slot is 1-based, so subtract 1 for array index
        const index = slot - 1;
        result.splice(index, 0, ...posts);
    });

    return result;
}

export function getAllPostIds() {
    const filePaths = getAllFiles(postsDirectory);
    return filePaths.map((filePath) => {
        const relativePath = path.relative(postsDirectory, filePath);
        const projectArray = relativePath.replace(/\.md$/, '').split(path.sep);

        return {
            params: {
                project: projectArray,
            },
        };
    });
}

export async function getPostData(project) {
    const fullPath = path.join(postsDirectory, `${project}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the project and contentHtml
    return {
        project,
        contentHtml,
        ...matterResult.data,
    };
}

export function getPostsByFolder(folder) {
    const allPosts = getSortedPostsData();
    return allPosts.filter(post => post.id.startsWith(folder + '/'));
}

export function getAllFolders() {
    const filePaths = getAllFiles(postsDirectory);
    const folders = new Set();

    filePaths.forEach(filePath => {
        const relativePath = path.relative(postsDirectory, filePath);
        const firstFolder = relativePath.split(path.sep)[0];
        if (relativePath.includes(path.sep)) { // Only add if it's in a subfolder
            folders.add(firstFolder);
        }
    });

    return Array.from(folders).map(folder => ({
        params: {
            project: [folder]
        }
    }));
}

export function getEarliestYear() {
    const allPosts = getSortedPostsData();
    let earliestYear = new Date().getFullYear(); // Start with current year

    allPosts.forEach(post => {
        if (post.startYear && post.startYear < earliestYear) {
            earliestYear = post.startYear;
        }
    });

    return earliestYear;
}

export function getAllWorkTypes() {
    const allPosts = getSortedPostsData();
    const workTypes = new Set();

    allPosts.forEach(post => {
        if (post.workType) {
            post.workType.forEach(type => {
                const urlType = normalizeForUrl(type);
                workTypes.add(urlType);
            });
        }
    });

    return Array.from(workTypes);
}

export function getPostsByWorkType(workType) {
    const allPosts = getSortedPostsData();
    return allPosts.filter(post => {
        if (!post.workType) return false;
        const normalizedWorkType = normalizeForUrl(workType);
        return post.workType.some(type =>
            normalizeForUrl(type) === normalizedWorkType
        );
    });
}

export function getAllSectors() {
    const allPosts = getSortedPostsData();
    const sectors = new Set();

    allPosts.forEach(post => {
        if (post.clientSector) {
            post.clientSector.forEach(sector => {
                // Convert to URL-friendly format
                const urlSector = normalizeForUrl(sector);
                sectors.add(urlSector);
            });
        }
    });

    return Array.from(sectors);
}

export function getPostsBySector(sector) {
    const allPosts = getSortedPostsData();
    return allPosts.filter(post => {
        if (!post.clientSector) return false;
        return post.clientSector.some(type =>
            normalizeForUrl(type) === normalizeForUrl(sector)
        );
    });
}
