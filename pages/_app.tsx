import { AppProps } from "next/app"
import { TinaCMSProvider } from "@package/tina"

import "../css/tailwind.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TinaCMSProvider enabled={pageProps.preview} error={pageProps.error}>
      <Component {...pageProps} />
    </TinaCMSProvider>
  )
}
