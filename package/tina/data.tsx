import { getGithubPreviewProps, GithubFile, parseJson } from "next-tinacms-github"
import { createContext, useContext } from "react"
import { GetStaticPropsContext } from "next"

export const getAt = async (preview: any, previewData: any) => {
  if (preview) {
    const styleFormsProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: "content/data.json",
      parse: parseJson,
    }).catch((error) => {
      console.log({ error })
      return null
    })

    return {
      styleFile: styleFormsProps.props.file,
    }
  }

  return {
    styleFile: {
      data: (await import("../../content/data.json")).default,
      fileRelativePath: "content/data.json",
    },
  }
}

export const getFile = async ({ preview, previewData }: GetStaticPropsContext) => {
  if (preview) {
    const styleFormsProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: `data/tina/data.json`,
      parse: parseJson,
    })
    return styleFormsProps.props.file
  }

  return {
    data: (await import(`../../data/tina/data.json`)).default,
    fileRelativePath: `data/tina/data.json`,
    sha: "",
  }
}

export const getTinaProps = (filename: string) => async ({
  preview,
  previewData,
}: GetStaticPropsContext): Promise<{ props: FileProviderProps<any> }> =>
  preview
    ? getGithubPreviewProps({
        ...previewData,
        fileRelativePath: `data/tina/data.json`,
        parse: parseJson,
      })
        .catch(async (error) => {
          console.log(error)

          return { props: { file: false } }
        })
        .then(
          (x) =>
            (x.props.file
              ? x
              : {
                  ...x,
                  props: {
                    ...x.props,
                    file: {
                      fileRelativePath: `data/tina/data.json`,
                      sha: ``,
                      data: {},
                    },
                  },
                }) as { props: FileProviderProps<any> }
        )
    : {
        props: {
          error: null,
          preview: !!preview,
          file: {
            fileRelativePath: `data/tina/data.json`,
            sha: ``,
            data: (await import(`../../data/tina/data.json`)).default as T,
          },
        },
      }

export type FileProviderProps<T> = { file: GithubFile<T>; preview: boolean; error: Error | null }

const FileContext = createContext<FileProviderProps<any>>({
  file: { fileRelativePath: "", sha: "", data: {} },
  preview: false,
  error: null,
})

export const FileProvider = <T extends any>({
  children,
  ...props
}: { children: React.ReactNode } & FileProviderProps<T>) => {
  return <FileContext.Provider value={props}>{children}</FileContext.Provider>
}

export const useGitFile = <T extends any>(): FileProviderProps<T> => useContext(FileContext)
