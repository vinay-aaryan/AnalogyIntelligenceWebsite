import Hero from "./components/sections/Hero";
import StatsSection from "./components/sections/StatsSection";
import FounderQuote from "./components/sections/FounderQuote";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import DetailedServices from "./components/sections/DetailedServices";
import Features from "./components/sections/Features";
import Process from "./components/sections/Process";
import SelectedWork from "./components/sections/SelectedWork";
import Testimonials from "./components/sections/Testimonials";
import FinalCTA from "./components/sections/FinalCTA";
import dbConnect from "@/lib/db";
import { Product, Stat, Testimonial } from "@/models/Content";

export default async function Home() {
  let products = [];
  let stats = [];
  let testimonials = [];

  try {
    await dbConnect();
    const [productsRaw, statsRaw, testimonialsRaw] = await Promise.all([
      Product.find({}).sort({ createdAt: -1 }).lean(),
      Stat.find({}).sort({ createdAt: -1 }).lean(),
      Testimonial.find({}).sort({ createdAt: -1 }).lean(),
    ]);

    products = JSON.parse(JSON.stringify(productsRaw));
    stats = JSON.parse(JSON.stringify(statsRaw));
    testimonials = JSON.parse(JSON.stringify(testimonialsRaw));
  } catch (error) {
    console.error("Database connection failed, using empty data:", error);
    // Fallback data is already empty arrays
  }

  return (
    <main style={{ background: "var(--token-bg-page)", minHeight: "100vh" }}>
      <Hero />
      <FounderQuote />
      <WhyChooseUs />
      <DetailedServices />
      <Features />
      <Process />
      <SelectedWork projects={products} />
      <StatsSection stats={stats} />
      <Testimonials testimonials={testimonials} />
      <FinalCTA />
    </main>
  );
}
