import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

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

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
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


export function getPostData(project) {
    const fullPath = path.join(postsDirectory, `${project}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the project
    return {
        project,
        ...matterResult.data,
    };
}
