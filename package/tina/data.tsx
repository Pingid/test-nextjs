import { getGithubPreviewProps, GithubFile, parseJson } from "next-tinacms-github"
import { createContext, useContext } from "react"
import { GetStaticPropsContext } from "next"

export const getTinaProps = <T extends any>(filename: string) => async ({
  preview,
  previewData,
}: GetStaticPropsContext): Promise<{ props: FileProviderProps<T> }> =>
  preview
    ? getGithubPreviewProps({
        ...previewData,
        fileRelativePath: `data/tina/data.json`,
        parse: parseJson,
      }).then(
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
              }) as { props: FileProviderProps<T> }
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