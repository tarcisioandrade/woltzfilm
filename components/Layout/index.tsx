import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <main className="container mx-auto px-6">{children}</main>;
};

export default Layout;
