import { Baloo_2 } from "next/font/google";
import { RestaurantSearchPage } from "./components/RestaurantSearchPage";
import "./restaurant-search.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata = {
  title: "Restaurant Search",
  description: "Search and discover restaurants on an interactive map",
};

import CommentArea from "@/app/components/CommentArea";

// ... (imports)

export default function Page() {
  const apiKey = process.env.GOOGLE_PLACE_API_KEY ?? "";

  return (
    <div className={`${baloo.className} min-h-screen bg-zinc-100 dark:bg-zinc-900 py-12 flex flex-col items-center`}>
      <div className="rs-phone-frame">
        <RestaurantSearchPage apiKey={apiKey} />
      </div>
      <div className="w-full max-w-xl mt-12">
        <CommentArea slug="restaurant-search" />
      </div>
    </div>
  );
}
