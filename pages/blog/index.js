import Head from "@components/head"
import Layout from "@components/layout"
import Container from "@components/container"
import { getBlogPosts } from "@utils"
import { useGlobalStyleForm } from "@hooks"
import getGlobalStaticProps from "../../utils/getGlobalStaticProps"
import useCreateBlogPage from "../../hooks/useCreateBlogPage"
import BlogCard from "@components/blogCard"
import { getFile, getAt } from "@package/tina"
const Blog = (props) => {
  // useCreateBlogPage(props.posts)
  // const [styleData] = useGlobalStyleForm(props.styleFile, props.preview)
  return <div>fdsfsd</div>
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps = async function ({ preview, previewData }) {
  try {
    const posts = await getBlogPosts(preview, previewData, "content/blog")
    const global = await getGlobalStaticProps(preview, previewData)
    const l = await getFile("data.json")(preview, previewData)
    console.log({ l })
    if (preview) {
      return {
        props: {
          ...global,
          preview,
          posts,
        },
      }
    }
    return {
      props: {
        ...global,
        posts,
        preview: false,
        error: null,
      },
    }
  } catch (e) {
    return {
      props: {
        ...global,
      },
    }
  }
}

export default Blog
