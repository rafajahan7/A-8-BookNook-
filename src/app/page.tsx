
import Banner from "@/components/Banner";
import NewArrivals from "@/components/NewArrivals";
import HowBorrowingWorks from "@/components/HowBorrowingWorks";
import ExploreCategories from "@/components/ExploreCategories";
import PageAnimation from "@/components/PageAnimation";

export default function Home() {
  return (
    <PageAnimation>
      <main>
        <Banner />
        <NewArrivals />
        <HowBorrowingWorks />
        <ExploreCategories />
      </main>
    </PageAnimation>
  );
}
