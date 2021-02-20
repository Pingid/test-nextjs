import {
  getGithubPreviewProps,
  GithubFile,
  parseJson,
  NextGithubMediaStore,
} from "next-tinacms-github"
import { GithubClient, TinacmsGithubProvider } from "react-tinacms-github"
import { createContext, useContext, useEffect, useMemo } from "react"
import { TinaProvider, TinaCMS } from "tinacms"
import { GetStaticPropsContext } from "next"
import { useRouter } from "next/router"

export const getGitFile = <T extends any>(absolutePath: string, getData: () => Promise<T>) => ({
  preview,
  previewData,
}: GetStaticPropsContext) =>
  getData()
    .then((data) => ({
      error: null,
      preview: !!preview,
      file: { data, fileRelativePath: absolutePath, sha: "" },
    }))
    .then((y) =>
      preview
        ? getGithubPreviewProps({
            ...previewData,
            fileRelativePath: absolutePath,
            parse: parseJson,
          }).then((x) => ({ ...y, ...x.props, file: x.props.file || y.file }))
        : y
    )

type PromiseOf<T> = T extends Promise<infer D> ? D : never
export const mapToProps = <T extends { [x: string]: (p: GetStaticPropsContext) => Promise<any> }>(
  files: T
) => (
  ctx: GetStaticPropsContext
): Promise<{ props: { [K in keyof T]: PromiseOf<ReturnType<T[K]>> } }> =>
  Object.keys(files)
    .reduce(
      (a, b) => a.then((x) => files[b](ctx).then((y) => ({ ...x, [b]: y }))),
      Promise.resolve({} as { [K in keyof T]: PromiseOf<ReturnType<T[K]>> })
    )
    .then((props) => ({ props: { ...props, preview: !!ctx.preview } }))

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

export class TinaGithubClient extends GithubClient {
  // prehaps at some point this functionality should be moved to the GitHub cleint in tinaCMS
  async fetchFile(filePath: string, decoded = true) {
    const repo = this.workingRepoFullName
    const branch = this.branchName
    const request = await this.req({
      url: `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`,
      method: "GET",
    })

    // decode using base64 decoding (https://developer.mozilla.org/en-US/docs/Glossary/Base64)
    request.content = decoded ? atob(request.content || "") : request.content
    return request
  }
}

export const CMSProvider = ({
  children,
  error,
  enabled,
}: {
  children: React.ReactNode
  enabled: boolean
  error?: any
}) => {
  const router = useRouter()

  const client = useMemo(
    () =>
      new GithubClient({
        proxy: "/api/proxy-github",
        authCallbackRoute: "/api/create-github-access-token",
        clientId: process.env.GITHUB_CLIENT_ID || "",
        baseRepoFullName: process.env.REPO_FULL_NAME || "", // e.g: tinacms/tinacms.org,
        baseBranch: process.env.BASE_BRANCH,
        authScope: "repo",
      }),
    []
  )

  const cms = useMemo(
    () =>
      new TinaCMS({
        enabled,
        apis: { github: client },
        media: new NextGithubMediaStore(client),
        toolbar: enabled,
        sidebar: enabled,
      }),
    [enabled, client]
  )

  return (
    <TinaProvider cms={cms}>
      <TinacmsGithubProvider onLogin={enterEditMode} onLogout={exitEditMode} error={error}>
        <button
          onClick={() => cms.toggle()}
          className="fixed bottom-0 right-0 bg-black text-white p-1 z-10"
        >
          {cms.enabled ? "Exit Edit Mode" : "Edit This Site"}
        </button>
        {children}
      </TinacmsGithubProvider>
    </TinaProvider>
  )
}

const enterEditMode = () => {
  const token = localStorage.getItem("tinacms-github-token") || null

  const headers = new Headers()

  if (token) {
    headers.append("Authorization", "Bearer " + token)
  }

  return fetch(`/api/preview`, { headers: headers }).then(() => {
    window.location.href = window.location.pathname
  })
}

const exitEditMode = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload()
  })
}
