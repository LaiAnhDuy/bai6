import BaseLayout from "../BaseLayout";

type PublicRouteProps = {
    title?: string;
    children?: React.ReactNode;
}

const PublicRoute = (props: PublicRouteProps) => {
  return (
    <BaseLayout>{props.children}</BaseLayout>
  )
}

export default PublicRoute