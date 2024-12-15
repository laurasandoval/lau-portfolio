import ProjectCollection from '@/components/ProjectCollection/ProjectCollection'

export default function FolderPage({ folderName, posts, server }) {
  const _normalizedFolderName = () => {
    const cleanedFolderName = folderName.replaceAll("-", " ");
    const words = cleanedFolderName.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
  }

  const _folderDisplayName = () => {
    if (posts[0].client === undefined) {
      return _normalizedFolderName()
    } else {
      return posts[0].client
    }
  }

  return (
    <ProjectCollection
      title={_folderDisplayName()}
      posts={posts}
      server={server}
    />
  )
}

export async function getServerSideProps(context) {
  const dev = process.env.NODE_ENV !== 'production'
  const server = dev ? `http://localhost:3000` : `https://${context.req.headers.host}`
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
      server
    }
  }
}