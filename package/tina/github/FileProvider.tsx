import { GithubClient } from "react-tinacms-github"
import { createContext, useContext } from "react"
import { GithubFile } from "next-tinacms-github"

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
