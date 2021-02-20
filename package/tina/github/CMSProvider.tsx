import { GithubClient, TinacmsGithubProvider } from "react-tinacms-github"
import { NextGithubMediaStore } from "next-tinacms-github"
import { TinaProvider, TinaCMS } from "tinacms"
import { useRouter } from "next/router"
import { useMemo } from "react"

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
