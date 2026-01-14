// This is a global loading indicator,and it applies to every pages.
// When you place this file in a route folder (like app), Next.js will automatically show this component while the page data is being fetched or the page is being rendered.
export default function Loader() {
  return <h1>Loading data...</h1>;
}
