import Banner from "@/components/Banner";
import NewArrivals from "@/components/NewArrivals";
import HowBorrowingWorks from "@/components/HowBorrowingWorks";
import ExploreCategories from "@/components/ExploreCategories";

export default function Home() {
  return (
    <main>
      <Banner />
      <NewArrivals />
      <HowBorrowingWorks />
      <ExploreCategories />
    </main>
  );
}