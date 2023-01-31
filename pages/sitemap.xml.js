function generateSiteMap(designWorkData) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://lau.work</loc>
     </url>
     <url>
       <loc>https://lau.work/about</loc>
     </url>
     <url>
       <loc>https://lau.work/resume</loc>
     </url>
     ${designWorkData.map((project, index) => {
        return `
       <url>
           <loc>${`https://lau.work/design/${project.src}`}</loc>
       </url>
     `;
    }).join('')}}
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    const url = `https://lau-portfolio-nextjs.vercel.app/api/design-work`
    const request = await fetch(url)
    const designWorkData = await request.json()

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(designWorkData);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;