import "../style/globals.css";
import { Toaster } from "react-hot-toast";

import SideBar from "@/components/SideBar";
import Provider from "app/Provider";
import Footer from "@/components/ui/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: {
    template: "%s|نکست شاپ ",
    default: "نکست شاپ",
  },
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <div className="font-display flex flex-col min-h-screen">
          <Toaster />
          <Provider>
            <Header />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 min-h-screen">
              <div className="md:col-span-1 p-4">
                <SideBar />
              </div>
              <main className="md:col-span-3 p-4 bg-white overflow-y-auto">
                {children}
              </main>
            </div>
            <Footer />
          </Provider>
        </div>
      </body>
    </html>
  );
}
