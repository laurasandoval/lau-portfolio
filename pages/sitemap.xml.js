function generateSiteMap(designWorkData, server) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${server}</loc>
     </url>
     <url>
       <loc>${server}/about</loc>
     </url>
     <url>
       <loc>${server}/resume</loc>
     </url>
     <url>
       <loc>${server}/photography</loc>
     </url>
     <url>
       <loc>${server}/videos</loc>
     </url>
     ${designWorkData.map((project, index) => {
    return `
       <url>
           <loc>${`${server}/design/${project.src}`}</loc>
       </url>
     `;
  }).join('')}}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(context) {
  const dev = process.env.NODE_ENV !== 'production'
  const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`
  const url = `${server}/api/design-work`
  const request = await fetch(url)
  const designWorkData = await request.json()

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(designWorkData, server);

  context.res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  context.res.write(sitemap);
  context.res.end();

  return {
    props: {},
  };
}

export default SiteMap;