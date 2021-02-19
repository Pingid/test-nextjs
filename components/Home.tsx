import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import { useGitFile } from '@package/tina'
import { useCMS, useForm, usePlugin, usePlugins } from 'tinacms'
import { useEffect } from 'react'

export const useHomePageData = () => {
  // const { file } = useGitFile()
  const cms = useCMS()
  const formConfig = {
    id: 'two',
    label: 'Edit 2nd Page',
    fields: [{ name: 'title', label: 'title', component: 'text' }],
    onSubmit: (data: any) => {
      console.log('Submitting', data)
    },
  }
  const [data, form] = useForm(formConfig)
  // useEffect(() => {
  //   setTimeout(() => {
  //     cms.plugins.add(form)
  //   }, 3000)
  // }, [])
  usePlugin(form)
  // useGithubToolbarPlugins()

  return data as any
}

export const Home = () => {
  const data = useHomePageData()

  return (
    <section className="App-header">
      {/**
       * 5. Render the `editableData` returned from `useForm`
       */}
      <div>fds</div>
      <h1>{data.title}</h1>
    </section>
  )
}
