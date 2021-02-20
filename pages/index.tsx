import { InferGetStaticPropsType } from "next"

import { Github } from "@package/tina"

import Layout from "../components/Layout"
import { Home } from "../components/home"

export const getStaticProps = Github.mapToProps({
  data: Github.getGitFile("data/tina/data.json", () =>
    import("../data/tina/data.json").then((x) => x.default)
  ),
})

const IndexPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Github.FileProvider {...props.data}>
      <Layout title="Home">
        <Home />
      </Layout>
    </Github.FileProvider>
  )
}

export default IndexPage
