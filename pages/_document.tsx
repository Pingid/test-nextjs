import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentProps,
} from "next/document"
import { ServerStyleSheet } from "styled-components"
import { CMS } from "../data"

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html className="bg-primaryBlack">
        <Head>
          <meta name="description" content={CMS.settings.site_description} />
          <meta name="keywords" content={CMS.settings.site_keywords} />

          <meta property="og:title" content={CMS.settings.site_title} />
          <meta property="og:description" content={CMS.settings.site_description} />
          <meta property="og:image" content={CMS.settings.thumbnail} />
          <meta property="og:url" content={CMS.settings.base_url} />

          {/* Replace with your own */}
          <meta name="author" content="daytime.studio" />
          <meta name="copyright" content="daytime.studio" />

          {/* Google Analytics goes here */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
