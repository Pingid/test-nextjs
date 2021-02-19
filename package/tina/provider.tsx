import { GithubClient, TinacmsGithubProvider } from "react-tinacms-github"
import { NextGithubMediaStore } from "next-tinacms-github"
import { TinaProvider, TinaCMS } from "tinacms"
import { useMemo } from "react"

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

export const TinaCMSProvider = ({
  children,
  error,
  enabled,
}: {
  children: React.ReactNode
  enabled: boolean
  error?: any
}) => {
  console.log({ children, error, enabled })
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

  console.log({ cms, client })

  return (
    <TinaProvider cms={cms}>
      <TinacmsGithubProvider onLogin={enterEditMode} onLogout={exitEditMode} error={error}>
        <button onClick={() => cms.toggle()}>
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
