import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      {props.children}
    </div>
  );
};

export default AuthLayout;
