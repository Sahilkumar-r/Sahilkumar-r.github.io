import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import TaglineReveal from "@/components/TaglineReveal";
import Projects from "@/components/Projects";
import GithubActivity from "@/components/GithubActivity";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Sources from "@/components/Sources";
import Footer from "@/components/Footer";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="body-4 sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Benefits />
        <TaglineReveal text={profile.tagline} />
        <Projects />
        <GithubActivity />
        <Experience />
        <Skills />
        <Faq />
        <Contact />
        <Sources />
      </main>
      <Footer />
    </>
  );
}
