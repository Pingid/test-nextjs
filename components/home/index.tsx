import { useGithubJsonForm, useGithubToolbarPlugins } from "react-tinacms-github"

import { useCMS, usePlugin } from "tinacms"
import { Github } from "@package/tina"

export const Home = () => {
  const data = useHomePageData()
  console.log(data)
  return (
    <div>
      <div className="flex justify-between w-full h-10 p-3">
        <h2>Leo Calrton</h2>
        <h2>Cycle</h2>
        <h2>Shop</h2>
      </div>
      <section className="h-screen w-full flex items-center justify-center">video</section>
      <section className="min-h-screen w-full">
        <div>
          <div>
            <h1>{data.title}</h1>
            <p>
              Talismans are mineral, vegetable or animal objects which can be worn, carried or
              placed. Traditionally, they are used to protect and bring positive energy and good
              fortune.
            </p>
          </div>
          <div>
            <img />
          </div>
        </div>
      </section>
    </div>
  )
}

export const useHomePageData = () => {
  const { file } = Github.useGitFile()
  const cms = useCMS()
  const formConfig = {
    id: file.fileRelativePath,
    label: "Home page",
    fields: [
      { name: "title", label: "title", component: "text" },
      { name: "home.section[0].title", label: "Section 1 title", component: "text" },
      { name: "home.section[0].description", label: "Section 1 title", component: "textarea" },
      { name: "home.section[0].image", label: "Image", component: "image" },
      { name: "home.section[1].title", label: "Section 2 title", component: "text" },
      {
        name: "home.section[1].description",
        label: "Section 2 description",
        component: "textarea",
      },
      { name: "home.section[1].image", label: "Section 2 Image", component: "image" },
    ],
    onSubmit: (data: any) => {
      console.log("Submitting", data)
    },
  }
  const [data, form] = useGithubJsonForm(file, formConfig)
  // useEffect(() => {
  //   setTimeout(() => {
  //     cms.plugins.add(form)
  //   }, 3000)
  // }, [])
  usePlugin(form)
  // useGithubToolbarPlugins()

  return data as any
}
