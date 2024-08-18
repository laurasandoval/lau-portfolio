import { getSortedPostsData } from "@/lib/posts";

function generateSiteMap(designWorkData, server) {
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
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will handle generating the sitemap
}

export async function getServerSideProps(context) {
  const dev = process.env.NODE_ENV !== 'production';
  const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`;

  // Fetch and sort all posts data (similar to your other page)
  const designWorkData = getSortedPostsData();

  // Generate the XML sitemap with the project data
  const sitemap = generateSiteMap(designWorkData, server);

  context.res.setHeader('Content-Type', 'text/xml');
  // Send the XML to the browser
  context.res.write(sitemap);
  context.res.end();

  return {
    props: {}, // No props are needed as this page just serves the XML
  };
}

export default SiteMap;
