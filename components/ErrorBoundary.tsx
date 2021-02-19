import { Component } from 'react'

export class ErrorBoundary extends Component<{}> {
  state = { hasError: false }
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="">
          <h1 className="text-3xl text-red-800">Something went wrong</h1>
          <button onClick={() => this.setState({ hasError: false })}>reset</button>
        </div>
      )
    }

    return this.props.children
  }
}
