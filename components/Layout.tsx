import React, { ReactNode } from "react"
import { withRouter, NextRouter } from "next/router"

type Props = {
  children?: ReactNode
  title?: string
  router: NextRouter
}

const Layout = ({ children }: Props) => <div className="relative min-h-screen">{children}</div>

export default withRouter(Layout)
