"use client";

import { useEffect, useRef, useState } from "react";
import { Experience, ProjectExperience } from "@/components/experience";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  { name: "CGTrader", year: "2026", type: "3D ASSET INSPECTION", description: "A browser-based inspection tool for AI-generated 3D assets.", stack: "Three.js · TypeScript · Zustand", url: "https://www.cgtrader.com/" },
  { name: "W3R.ONE", year: "2024", type: "STUDIO EXPERIENCE", description: "A studio website built from a single geometric shape.", stack: "WebGL · Next.js · GSAP", url: "https://w3r.one/" },
  { name: "PRESTI.AI", year: "2026", type: "3D PRODUCT COMPOSER", description: "Real geometry as the foundation for AI-generated product visuals.", stack: "WebGL · Next.js · Zustand", url: "https://presti.ai/" },
  { name: "Grandir", year: "2024", type: "EDITORIAL STORYTELLING", description: "Five countries, five audiences, one narrative in motion.", stack: "GSAP · TypeScript · Vite", url: "https://www.grandir.com/" },
  { name: "Reaali", year: "2023", type: "3D SCROLL EXPERIENCE", description: "A floating island becomes the spine of a studio's story.", stack: "WebGL · GSAP · Blender", url: "https://reaali.fr/" },
  { name: "Stream of Value", year: "2026", type: "REAL-TIME SIMULATION", description: "Priceless, technically worthless. A procedural coin experiment.", stack: "Three.js · Vite · TSL", url: "https://lab.aengel.io/" },
];

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const root = useRef<HTMLElement | null>(null);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".manifesto-line", { yPercent: 110, opacity: 0 }, {
        yPercent: 0, opacity: 1, stagger: 0.16, duration: 1.1, ease: "power4.out",
        scrollTrigger: { trigger: ".manifesto", start: "top 72%" }
      });
      gsap.fromTo(".about-copy", { y: 48, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".about", start: "top 75%" }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const move = (direction: number) => setActive((current) => (current + direction + projects.length) % projects.length);
  const project = projects[active];

  return (
    <main ref={root} className="site-shell">
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#home" aria-label="AENGEL home">AENGEL<span>®</span></a>
        <div className="top-meta"><span className="status-dot" /> AVAILABLE FOR SELECT PROJECTS <span className="meta-divider">/</span> DESIGN ENGINEER</div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>HOME</a><a href="#projects" onClick={() => setMenuOpen(false)}>PROJECTS</a><a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a><a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a>
        </nav>
      </header>

      <section id="home" className="hero">
        <div className="hero-grid" />
        <div className="hero-label label-left"><span>VARIANT 01</span><span>ARCH // 3D</span></div>
        <div className="hero-label label-right"><span>ONLINE</span><span>0001 — 2026</span></div>
        <div className="hero-scene"><Experience active={entered} /></div>
        <div className="hero-copy">
          <p className="eyebrow">INDEPENDENT DESIGN ENGINEER <span>·</span> REAL-TIME WORLDS</p>
          <h1>Ideas into<br /><em>experiences.</em></h1>
          <p className="hero-sub">I write lines of code that tell a story.<br />Beauty born from simpler rules.</p>
        </div>
        {!entered && <button className="enter-button" onClick={() => setEntered(true)}><span>ENTER THE EXPERIENCE</span><ArrowUpRight size={15} /></button>}
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /><span className="hero-coordinate">13°45&apos; N&nbsp;&nbsp; 100°30&apos; E</span></div>
        <div className="hero-index">A / 001</div>
      </section>

      <section id="projects" className="projects section-pad">
        <div className="section-heading"><span>01 / SELECTED WORK</span><span>2023 — 2026</span></div>
        <div className="project-stage" onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={(e) => { if (touchStart.current !== null) { const delta = e.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 40) move(delta < 0 ? 1 : -1); touchStart.current = null; } }}>
          <div className="project-visual"><div className="project-canvas"><ProjectExperience activeIndex={active} /></div>
            <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="visual-core"><div className="core-wire" /><div className="core-glow" /></div>
            <div className="visual-crosshair cross-a" /><div className="visual-crosshair cross-b" />
            <span className="visual-caption">FIG. 0{active + 1} / {project.type}</span>
            <span className="visual-coords">X 00{active + 1}.42<br />Y 01.08 / Z 04.22</span>
          </div>
          <div className="project-details">
            <div className="project-count"><span>PROJECT</span><strong>0{active + 1}</strong><span>/ 06</span></div>
            <div className="project-info"><p className="eyebrow">{project.year} <span>·</span> {project.type}</p><h2>{project.name}</h2><p className="project-description">{project.description}</p><p className="project-stack">{project.stack}</p><a className="discover-link" href={project.url} target="_blank" rel="noreferrer">DISCOVER PROJECT <ArrowUpRight size={15} /></a></div>
            <div className="project-controls"><button onClick={() => move(-1)} aria-label="Previous project"><ArrowLeft /></button><button onClick={() => move(1)} aria-label="Next project"><ArrowRight /></button><span>DRAG / SWIPE TO SWITCH</span></div>
          </div>
        </div>
      </section>

      <section className="manifesto section-pad">
        <div className="section-heading"><span>02 / A WAY OF THINKING</span><span>CODE × FORM × MOTION</span></div>
        <div className="manifesto-copy">
          <p className="manifesto-line">I write lines of code</p><p className="manifesto-line">that tell a story.</p>
          <p className="manifesto-line muted">Beauty born from simpler rules…</p>
          <p className="manifesto-line">…the same logic that turns</p><p className="manifesto-line">code into stories.</p>
          <p className="manifesto-line muted">But every experience I build…</p><p className="manifesto-line">…begins with something real</p><p className="manifesto-line">I noticed.</p>
        </div>
      </section>

      <section id="about" className="about section-pad">
        <div className="section-heading"><span>03 / THE PERSON BEHIND THE PIXELS</span><span>ABOUT</span></div>
        <div className="about-layout"><p className="about-kicker">ARTHUR ENGEL<br /><span>DESIGN ENGINEER</span></p><div className="about-copy"><h2>Concept, design, motion, code.</h2><p>I work with studios and agencies on immersive websites, interactive experiences and campaigns. I move across the entire creative process, so what gets imagined is exactly what gets shipped.</p><p className="location-note"><span className="status-dot" /> BASED IN THAILAND</p></div></div>
      </section>

      <footer id="contact" className="footer section-pad">
        <div className="section-heading"><span>04 / START A CONVERSATION</span><span>CONTACT</span></div>
        <p className="footer-kicker">HAVE A GOOD ONE IN MIND?</p><a className="footer-email" href="mailto:contact@aengel.io">LET&apos;S TALK <ArrowUpRight /></a>
        <div className="footer-bottom"><a href="#home" className="brand">AENGEL<span>®</span></a><span>© 2026 — BUILT WITH INTENTION</span><a href="#home">BACK TO TOP ↑</a></div>
      </footer>
    </main>
  );
}