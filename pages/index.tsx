import { InferGetStaticPropsType } from "next"

import { FileProvider, getTinaProps } from "@package/tina"

import Layout from "../components/Layout"
import { Home } from "../components/Home"

export const getStaticProps = getTinaProps("data.json")

const IndexPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <FileProvider {...props}>
      <Layout title="Home">
        <Home />
      </Layout>
    </FileProvider>
  )
}

export default IndexPage
