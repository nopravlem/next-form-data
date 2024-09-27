import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Next App Adding to MongoDB",
  description: "Testing forms in next with MongoDB",
};

type LayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Readonly<LayoutProps>) => {
  return (
    <html lang="en">
      <body className={spaceGrotesk.variable}>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
