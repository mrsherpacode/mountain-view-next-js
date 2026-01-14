// In Next.js, (App Router) app is a root folder and folders inside app define route segments and page.js exports the react component for that route.for example,inside app folder,there's cabins folder inside cabins folder there's a page.js file that's basically react component.

// This Metadata overrides the root Metadata.
export const metadata = {
  title: "Cabins",
};
export default async function Page() {
  return (
    <div>
      <h1>cabin Page</h1>
    </div>
  );
}
