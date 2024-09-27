import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-montserrat",
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
      <body className={montserrat.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
