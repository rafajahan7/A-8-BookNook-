
import { Search, BookOpen, Clock } from "lucide-react";

export default function HowBorrowingWorks() {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Find Your Book",
      description:
        "Explore our collection and discover books that match your interests."
    },
    {
      icon: BookOpen,
      number: "02",
      title: "Borrow Your Book",
      description:
        "Choose your favorite book and submit a borrowing request."
    },
    {
      icon: Clock,
      number: "03",
      title: "Enjoy Reading",
      description:
        "Read your book and return it within the given borrowing period."
    }
  ];

  return (
    <section className="bg-[#F5F3EF] py-20 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest text-[#D9A65A] mb-3">
            SIMPLE AND EASY
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#173B57]">
            How Borrowing Works
          </h2>

          <p className="text-gray-500 mt-3">
            Start your reading journey in just three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-lg transition"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F5F3EF] flex items-center justify-center mb-5">
                  <Icon size={30} className="text-[#D9A65A]" />
                </div>

                <p className="text-sm font-bold text-[#D9A65A] mb-2">
                  STEP {step.number}
                </p>

                <h3 className="text-xl font-bold text-[#173B57] mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-500 leading-7">
                  {step.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
