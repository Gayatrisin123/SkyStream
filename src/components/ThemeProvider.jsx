"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function ThemedToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      theme={theme === "light" || theme === "dark" || theme === "system" ? theme : undefined}
      richColors
      closeButton
      position="top-center"
    />
  );
}
