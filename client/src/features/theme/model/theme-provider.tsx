"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Extracting the props type and ensuring children is included
type NextThemesProviderProps = React.ComponentProps<typeof NextThemesProvider>;

interface ThemeProviderProps extends NextThemesProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
