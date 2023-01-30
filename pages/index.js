import Head from 'next/head'
import Data from "../assets/design-work.json"
import { GlobalHeader } from '@/components/GlobalHeader/GlobalHeader'
import Grid from '@/components/Grid/Grid'
import { ProjectThumbnail } from '@/components/ProjectThumbnail/ProjectThumbnail'
import AccessibilityLabel from '@/components/AccessibilityLabel/AccessibilityLabel'

export default function Home() {

  const _renderThumbnail = (project, index, featured) => {
    return (
      <ProjectThumbnail
        {...project}
        as="article"
        hover
        autoplay
        key={index}
        portrait={featured}
        fadeIn
      />
    );
  }

  const maxFeaturedCount = 6;

  const featuredProjects = Data.DesignWork.slice(0, maxFeaturedCount);
  const remainingProjects = Data.DesignWork.slice(maxFeaturedCount, featuredProjects.lenght);

  return (
    <>
      <Head>
        <title>Laura Sandoval — Work</title>
        <meta name="description" content="Digital Product Designer & Developer from Santiago, Chile. Featured clients include Uber, Cornershop, among others." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="image" content="/site-thumbnail.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
      </Head>

      <GlobalHeader sticky />
      <AccessibilityLabel as="h2">Selected Works</AccessibilityLabel>
      <Grid featured>
        {featuredProjects.map((project, index) => {
          return _renderThumbnail(project, index, true);
        })}
      </Grid>
      <Grid>
        {remainingProjects.map((project, index) => {
          return _renderThumbnail(project, index);
        })}
      </Grid>
    </>
  )
}
