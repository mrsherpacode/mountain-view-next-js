//  This layout is nested layout of accout route which includes reservations and profile and children prop is current route's page.js file content

import SideNavigation from "@/app/_components/SideNavigation";

//
export default function Layout({ children }) {
  return (
    // This div creates two columns grid with first 16rem and second takes the remaing space.
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
