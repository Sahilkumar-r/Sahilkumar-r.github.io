import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Benefits from "@/components/Benefits";
import TaglineReveal from "@/components/TaglineReveal";
import GithubActivity from "@/components/GithubActivity";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
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
        <Featured />
        <Education />
        <Experience />
        <Projects />
        <Benefits />
        <TaglineReveal text={profile.tagline} />
        <GithubActivity />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
