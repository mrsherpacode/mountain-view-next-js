import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// generating Metadata Dynamically.
export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  // const { name } = await getCabin(params.cabinId);
  const { name } = await getCabin(cabinId);

  return {
    title: `Cabin ${name}`,
  };
}
// This code implements static generation for dynamic routes in Next.js:
//This enables fast, SEO-friendly page loads instead of rendering on-demand.
export async function generateStaticParams() {
  // get all cabins
  const cabins = await getCabins();
  // gets individual cabin's id
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  return ids;
}
// Dynamic route: Renders the cabin detail page for [cabinId] based on the URL segment in app/cabins/[cabinId]/page.js.// Server component: Page is async and fetches data server-side on each request.
// Dynamic segments: params contains URL path segments for the current route.

export default async function Page({ params }) {
  // getCabin gets individual cabin details .
  const { cabinId } = await params;
  // const cabin = await getCabin(params.cabinId);
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name}. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
