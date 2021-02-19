import { AppProps } from "next/app"
import { TinaCMSProvider } from "@package/tina"
import { ThemeProvider } from "styled-components"

import "../css/tailwind.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TinaCMSProvider enabled={pageProps.preview} error={pageProps.error}>
      <ThemeProvider theme={require("../content/styles.json")}>
        <Component {...pageProps} />
      </ThemeProvider>
    </TinaCMSProvider>
  )
}
