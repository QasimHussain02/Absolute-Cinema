import ReactClient from "@/ReactClient";
import "@/styles/globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Absolute Cinema",
  description: "Trending Now - Absolute Cinema",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-surface text-on-surface antialiased font-body-md min-h-screen overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
        <ReactClient>{children}</ReactClient>
        <Toaster />
      </body>
    </html>
  );
}
