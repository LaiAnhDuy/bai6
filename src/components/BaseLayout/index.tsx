import { ReactNode } from "react"
import Footer from "../Footer"
import Header from "../Header"

interface BaseLayoutProps {
    children: ReactNode
}

const BaseLayout = (props: BaseLayoutProps) => {
  return (
    <div>
        <Header />
        {props.children}
        <Footer />
    </div>
  )
}

export default BaseLayout