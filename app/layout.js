// Here, i'm using @/ — Alias, that's(defined in jsconfig.json) "@/app/" means root folder.
// This makes import cleaner and easier.
import Header from "@/app/_components/Header";
// importing google font
import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
// importing global css
import "@/app/_styles/globals.css";
// The export const metadata config tells Next.js what to render in <head> (titles, meta tags, icons) for App Router pages.
// for favicon just create a icon.png or any other images file in app folder.
export const metadata = {
  title: {
    // %s = it means whatever the page title is and / The-mountain-view
    template: "%s / The-mountain-view",
    default: "The-mountain-view",
  },
  description: "The quite and very luxurious Hotel",
};
// Root layout for the Next.js App Router; wraps every route with shared HTML structure.is a global wrapper that applies to all app routes.
// Here, children is the current route's content, for example if i'm in about  page the children is that page's page.js content
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* the primary is custom color from  tailwind.config.js file and (josefin.className) is a Google font  */}
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen`}
      >
        <Header />
        <main> {children}</main>
      </body>
    </html>
  );
}
