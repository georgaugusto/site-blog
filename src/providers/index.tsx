import { ReactNode } from "react";

import ThemeProvider from "./theme";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
};

export default Providers;
