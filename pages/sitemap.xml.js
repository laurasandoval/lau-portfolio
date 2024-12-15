import { getAllFolders, getSortedPostsData, getAllWorkTypes, getAllSectors } from "@/lib/posts";

function generateSiteMap(designWorkData, designWorkFoldersData, workTypes, sectors, server) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${server}</loc>
     </url>
     <url>
       <loc>${server}/photography</loc>
     </url>
     <url>
       <loc>${server}/videos</loc>
     </url>
     ${designWorkData.map((project) => {
    return `
         <url>
             <loc>${`${server}/design/${project.id}`}</loc>
         </url>
       `;
  }).join('')}
     ${designWorkFoldersData.map((folder) => {
    return `
         <url>
             <loc>${`${server}/design/${folder.params.project[0]}`}</loc>
         </url>
       `;
  }).join('')}
     ${workTypes.map((type) => {
    return `
         <url>
             <loc>${`${server}/work/discipline/${type}`}</loc>
         </url>
       `;
  }).join('')}
     ${sectors.map((sector) => {
    return `
         <url>
             <loc>${`${server}/work/sector/${sector}`}</loc>
         </url>
       `;
  }).join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will handle generating the sitemap
}

export async function getServerSideProps(context) {
  const dev = process.env.NODE_ENV !== 'production';
  const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`;

  const designWorkData = getSortedPostsData();
  const designWorkFoldersData = getAllFolders();
  const workTypes = getAllWorkTypes();
  const sectors = getAllSectors();

  const sitemap = generateSiteMap(designWorkData, designWorkFoldersData, workTypes, sectors, server);

  context.res.setHeader('Content-Type', 'text/xml');
  context.res.write(sitemap);
  context.res.end();

  return {
    props: {},
  };
}

export default SiteMap;
