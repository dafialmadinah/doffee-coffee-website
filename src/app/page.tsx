import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CoffeeScrollSequence from "@/components/CoffeeScrollSequence";
import Ingredients from "@/components/Ingredients";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <CoffeeScrollSequence />
      <Ingredients />
      <About />
      <Footer />
    </main>
  );
}
