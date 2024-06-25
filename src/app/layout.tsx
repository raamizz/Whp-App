import type { Metadata } from "next";
import { Suspense } from "react";
import { Montserrat } from "next/font/google";
import "@/styles/styles.scss";
import GlobalProvider from "./GlobalProvider";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import NavTwo from "@/components/Header/TopNav/NavTwo";
import NavHoverMenu from "@/components/Header/Menu/NavHoverMenu";
import CountdownTimeType from "@/type/CountdownType";
import { countdownTime } from "@/store/countdownTime";
import Footer from "@/components/Footer/Footer";
import UserTracking from "./UserTracking";

const serverTimeLeft: CountdownTimeType = countdownTime();

const instrument = Montserrat({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "WHP Web",
//   description: "WHP Jewellers app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/images/other/logo2.png" />
        </head>
        <Suspense>
          <body className={instrument.className}>
            <UserTracking />
            <TopNavOne textColor="text-white" />
            <NavTwo props="style-three bg-white" />
            <div id="header" className="w-full ">
              <NavHoverMenu props="bg-white" />
            </div>
            {children}
            <Footer />
          </body>
        </Suspense>
      </html>
    </GlobalProvider>
  );
}