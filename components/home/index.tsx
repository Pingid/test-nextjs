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
            <h1>{data.home.section[0].title}</h1>
            <p>{data.home.section[0].description}</p>
            <img src={data.home.section[0].image} />
          </div>
          <div>
            <img />
          </div>
        </div>
      </section>
      <section className="min-h-screen w-full">
        <div>
          <div>
            <h1>{data.home.section[1].title}</h1>
            <p>{data.home.section[1].description}</p>
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
  const formConfig = {
    id: file.fileRelativePath,
    label: "Home page",
    fields: [
      { name: "title", label: "title", component: "text" },
      { name: "home.section[0].title", label: "Section 1 title", component: "text" },
      {
        name: "home.section[0].description",
        label: "Section 1 description",
        component: "textarea",
      },
      {
        name: "home.section[0].image",
        label: "Image",
        component: "image",
        uploadDir: () => "/images/",
        parse: (x: any) => `/images/${x.filename}`,
        previewSrc: (fullSrc: string) => fullSrc.replace("/public", ""),
      },
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
  usePlugin(form)
  return data as {
    home: {
      section: [
        { title: string; description: string; image: {} },
        { title: string; description: string }
      ]
    }
  }
}
