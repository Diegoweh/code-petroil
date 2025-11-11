import Navbar from "@/components/Navbar";
import ScrollImageSequence from "@/components/ScrollImageSequence";
import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative bg-zinc-50 font-sans dark:bg-black">
      <Navbar />

      {/* Hero Section con scroll image sequence - Fixed background */}
      <section id="home">
        <ScrollImageSequence />
      </section>

      {/* Las secciones aparecen por encima del scroll sequence */}
      <div className="relative z-10">
        {/* Sección Acerca */}
        <AnimatedSection
          id="about"
          title="About Us"
          description="We design and deliver high-performance tools that drive innovation and efficiency in oil extraction."
          backgroundColor="bg-zinc-100 dark:bg-zinc-950"
        />

        {/* Sección Contacto */}
        <AnimatedSection
          id="contact"
          title="Let's Work Together"
          description="Have a project in mind? Let's discuss your needs and find the right oil extraction tools to get the job done efficiently."
          backgroundColor="bg-white dark:bg-black"
        />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
