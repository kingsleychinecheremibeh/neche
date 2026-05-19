"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// SVG Icons Component to avoid external dependency issues in React 19 / Next 16
const Icons = {
  Github: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Linkedin: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="4" r="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ExternalLink: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Terminal: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Code: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Copy: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Sun: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Moon: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Send: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Info: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  Heart: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Download: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Folder: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

// Types & Data
interface Project {
  title: string;
  desc: string;
  stack: string[];
  live: string;
  github: string;
  highlight?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: "Shoppe Full-Stack Suite",
    desc: "A robust, high-performance PERN stack (PostgreSQL, Express.js, React/Next.js, Node.js) ecommerce ecosystem. Features a strictly layered enterprise architecture (Controller-Service-Repository), automated transaction management, Zod schemas, robust JWT authorization, centralized error containment, and a gorgeous, responsive storefront matching Figma specifications.",
    stack: ["Next.js 15", "PostgreSQL", "Express.js", "Node.js", "Zod", "Layered Architecture"],
    live: "https://github.com/kingsleychinecheremibeh/shoppe",
    github: "https://github.com/kingsleychinecheremibeh/shoppe",
    highlight: true,
  },
  {
    title: "Queue Flow",
    desc: "A highly performant, real-time virtual queuing platform designed to optimize customer flow, dispatch tickets dynamically, and eliminate physical wait lines.",
    stack: ["Next.js", "Tailwind CSS", "React", "WebSockets"],
    live: "https://queue-flow-seven.vercel.app/",
    github: "https://github.com/kingsleychinecheremibeh/Queue-Flow",
    highlight: true,
  },
  {
    title: "Cine Mate",
    desc: "A sleek, responsive cinema discovery engine displaying current schedules, real-time reviews, and custom movie list building via third-party APIs.",
    stack: ["Next.js", "Tailwind CSS", "REST API", "React"],
    live: "https://cinevault-topaz.vercel.app/",
    github: "https://github.com/kingsleychinecheremibeh/cinevault",
    highlight: true,
  },
  {
    title: "Tax Calculator",
    desc: "Precision income tax planner designed according to the current Nigerian PAYE statutory regulations, enabling easy PAYE breakdown, deductions, and net-pay modeling.",
    stack: ["React.js", "Tailwind CSS", "TypeScript", "Vite"],
    live: "https://nigerian-paye-tax-calculator.vercel.app",
    github: "https://github.com/kingsleychinecheremibeh/Nigerian-PAYE-Tax-Calculator",
    highlight: false,
  },
  {
    title: "Mixzed Cakes",
    desc: "A beautiful, hyper-fast Progressive Web Application (PWA) built for a luxury bakery featuring real-time catalogs, ordering interface, and custom product configuration.",
    stack: ["React.js", "Tailwind CSS", "PWA", "Vite"],
    live: "https://mixzed-cake.vercel.app",
    github: "https://github.com/kingsleychinecheremibeh/Mixzed-cake",
    highlight: false,
  },
  {
    title: "CRM Dashboard",
    desc: "A deeply responsive corporate management template focusing on data dense visual systems, fully animated charts, and modular widgets for customer relationship management.",
    stack: ["React.js", "Tailwind CSS", "Charts", "Modular Architecture"],
    live: "https://crm-pi-woad.vercel.app",
    github: "https://github.com/kingsleychinecheremibeh/crm",
    highlight: false,
  },
  {
    title: "E-Commerce Product Page",
    desc: "A modular, accessible and interaction-heavy product showcase built with precision states, custom checkout interactions, and absolute layout responsiveness.",
    stack: ["React.js", "CSS", "JavaScript", "Responsive Design"],
    live: "https://grocery-store-xi-swart.vercel.app",
    github: "https://github.com/kingsleychinecheremibeh/grocery-store",
    highlight: false,
  },
];

const SKILLS = [
  "TypeScript", "JavaScript (ES6+)", "Next.js", "React.js",
  "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL",
  "REST APIs", "Zod Validation", "Layered Architecture", "Git / GitHub",
  "Framer Motion", "PWA Development", "Figma"
];

export default function Home() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"highlighted" | "all">("highlighted");

  // Terminal state
  const [terminalInput, setTerminalInput] = useState<string>("");
  const [terminalLogs, setTerminalLogs] = useState<Array<{ type: "input" | "output" | "error"; text: string }>>([
    { type: "output", text: "guest@neche.dev:~$ welcome" },
    { type: "output", text: "Type 'help' to see list of available commands, or click the shortcut chips below." }
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Contact form state
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Sync dark class on mount/toggle (optimized to prevent style invalidation when class is already present)
  useEffect(() => {
    const root = window.document.documentElement;
    const hasDark = root.classList.contains("dark");
    if (darkMode && !hasDark) {
      root.classList.add("dark");
    } else if (!darkMode && hasDark) {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Scroll to bottom of terminal when logs change (skip initial mount to completely avoid forced reflows)
  useEffect(() => {
    if (terminalLogs.length > 2) {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs]);

  const copyEmail = () => {
    navigator.clipboard.writeText("codewithneche@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Terminal commands interpreter
  const handleTerminalSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...terminalLogs, { type: "input" as const, text: `guest@neche.dev:~$ ${terminalInput}` }];

    switch (cmd) {
      case "help":
        newLogs.push({
          type: "output",
          text: "Available commands:\n  about     - Brief background of Kingsley Ibeh\n  projects  - Show active premium projects\n  skills    - List core tech capabilities\n  contact   - Contact detail and socials\n  clear     - Wipe terminal log history"
        });
        break;
      case "about":
        newLogs.push({
          type: "output",
          text: "ABOUT ME:\nKingsley Chinecherem Ibeh (Neche) is a full-stack engineer specializing in Next.js, React, Node.js, Express, and PostgreSQL.\nHe builds high-performance user interfaces alongside enterprise-grade, strictly structured layered backend systems (Controller-Service-Repository). Based in Nigeria."
        });
        break;
      case "projects":
        newLogs.push({
          type: "output",
          text: "PREMIUM PROJECTS:\n\n1. Shoppe eCommerce Suite - Enterprise PERN stack ecommerce ecosystem\n   [https://github.com/kingsleychinecheremibeh/shoppe]\n\n2. Queue Flow - Real-time customer flow & virtual queuing app\n   [https://queue-flow-seven.vercel.app/]\n\n3. Cine Mate - Dynamic movie discovery platform with API scheduling\n   [https://cinevault-topaz.vercel.app/]\n\nType 'contact' to get in touch about collaborating!"
        });
        break;
      case "skills":
        newLogs.push({
          type: "output",
          text: `TECHNICAL STACK:\n- Front-End: Next.js, React.js, Vite, TypeScript, Tailwind CSS, Framer Motion\n- Back-End: Node.js, Express.js, PostgreSQL, REST APIs, WebSockets\n- Architecture: Controller-Service-Repository pattern, Zod schemas, JWT authentication\n- Tooling: Git, GitHub, Figma, PWA development`
        });
        break;
      case "contact":
        newLogs.push({
          type: "output",
          text: "CONNECT WITH ME:\n- Email: codewithneche@gmail.com\n- GitHub: github.com/kingsleychinecheremibeh\n- LinkedIn: linkedin.com/in/kingsley-ibeh-930a073a6\n- WhatsApp: +234 813 751 1883"
        });
        break;
      case "clear":
        setTerminalLogs([]);
        setTerminalInput("");
        return;
      default:
        newLogs.push({
          type: "error",
          text: `Command not found: '${cmd}'. Type 'help' for available commands.`
        });
    }

    setTerminalLogs(newLogs);
    setTerminalInput("");
  };

  const handleChipClick = (command: string) => {
    setTerminalInput(command);
    setTimeout(() => {
      // Simulate input update and then submit
      setTerminalLogs(prev => [...prev, { type: "input", text: `guest@neche.dev:~$ ${command}` }]);

      let responseText = "";
      if (command === "about") {
        responseText = "ABOUT ME:\nKingsley Chinecherem Ibeh (Neche) is a full-stack engineer specializing in Next.js, React, Node.js, Express, and PostgreSQL.\nHe builds high-performance user interfaces alongside enterprise-grade, strictly structured layered backend systems (Controller-Service-Repository). Based in Nigeria.";
      } else if (command === "projects") {
        responseText = "PREMIUM PROJECTS:\n\n1. Shoppe eCommerce Suite - Enterprise PERN stack ecommerce ecosystem\n   [https://github.com/kingsleychinecheremibeh/shoppe]\n\n2. Queue Flow - Real-time customer flow & virtual queuing app\n   [https://queue-flow-seven.vercel.app/]\n\n3. Cine Mate - Dynamic movie discovery platform with API scheduling\n   [https://cinevault-topaz.vercel.app/]";
      } else if (command === "skills") {
        responseText = `TECHNICAL STACK:\n- Front-End: Next.js, React.js, Vite, TypeScript, Tailwind CSS, Framer Motion\n- Back-End: Node.js, Express.js, PostgreSQL, REST APIs, WebSockets\n- Architecture: Controller-Service-Repository pattern, Zod schemas, JWT authentication\n- Tooling: Git, GitHub, Figma, PWA development`;
      } else if (command === "contact") {
        responseText = "CONNECT WITH ME:\n- Email: codewithneche@gmail.com\n- GitHub: github.com/kingsleychinecheremibeh\n- LinkedIn: linkedin.com/in/kingsley-ibeh-930a073a6\n- WhatsApp: +234 813 751 1883";
      } else if (command === "clear") {
        setTerminalLogs([]);
        setTerminalInput("");
        return;
      }

      setTerminalLogs(prev => [...prev, { type: "output", text: responseText }]);
      setTerminalInput("");
    }, 100);
  };

  // Handle Contact Submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setFormStatus("submitting");

    // Simulate sending mail
    setTimeout(() => {
      setFormStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 1500);
  };

  const filteredProjects = activeTab === "highlighted"
    ? PROJECTS.filter(p => p.highlight)
    : PROJECTS;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-300 font-sansSelection selection:bg-emerald-500/20 selection:text-emerald-400">

      {/* Structural Accent Lines */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-teal-500 to-indigo-500 z-50"></div>

      {/* Decorative Grid Overlays (Premium minimalist feel) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size[4rem_4rem] z-0"></div>

      {/* Elegant minimalist header */}
      <header className="sticky top-0 z-40 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-900/50 bg-zinc-50/85 dark:bg-zinc-950/85 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-mono font-bold tracking-tight text-lg flex items-center gap-1.5 group">
            <span className="text-emerald-500 transition-transform group-hover:rotate-12 duration-200">⌘</span>
            neche<span className="text-emerald-500">.dev</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a href="#about" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">Projects</a>
            <a href="#playground" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">Playground</a>
            <a href="#contact" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all text-zinc-500 dark:text-zinc-400"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Icons.Sun /> : <Icons.Moon />}
            </button>

            {/* Quick Contact Button */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs tracking-wider uppercase font-mono font-semibold px-4 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 hover:bg-emerald-500 dark:hover:bg-emerald-400 dark:hover:text-zinc-950 hover:text-zinc-950 transition-all"
            >
              Get in touch
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 relative z-10">

        {/* HERO SECTION */}
        <section id="hero" className="min-h-[85vh] flex flex-col justify-center py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Intro Text */}
            <div className="lg:col-span-7 flex flex-col space-y-6">

              {/* Monospace Badge */}
              <div className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-mono text-xs tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-semibold">
                  Full-stack capabilities • Available for roles & freelance
                </span>
              </div>

              {/* Majestic typography, pure focus on craft */}
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
                Building systems that scale, <span className="underline decoration-emerald-500/80 decoration-wavy underline-offset-8">front to back</span>.
              </h1>

              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
                I&apos;m <span className="font-semibold text-zinc-900 dark:text-white">Kingsley Chinecherem Ibeh</span>, a full-stack engineer. I craft gorgeous, fluid user interfaces alongside strictly structured, robust backends using PostgreSQL, Node.js, Express, and Next.js.
              </p>

              {/* Buttons & Links */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 font-medium px-6 py-3.5 rounded-xl bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 hover:bg-emerald-500 dark:hover:bg-emerald-400 dark:hover:text-zinc-950 hover:text-zinc-950 transition-all shadow-lg shadow-emerald-500/5"
                >
                  Selected Projects
                  <Icons.ArrowRight />
                </a>

                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 font-mono text-sm border border-zinc-200 dark:border-zinc-800/80 px-6 py-3.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
                >
                  {copied ? (
                    <>
                      <span className="text-emerald-500"><Icons.Check /></span>
                      <span>Copied email!</span>
                    </>
                  ) : (
                    <>
                      <Icons.Copy />
                      <span>codewithneche@gmail.com</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick links */}
              <div className="flex items-center gap-6 pt-4 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                <a href="https://github.com/kingsleychinecheremibeh" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 transition-colors">
                  <Icons.Github />
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/kingsley-ibeh-930a073a6" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 transition-colors">
                  <Icons.Linkedin />
                  <span>LinkedIn</span>
                </a>
                <a href="https://wa.me/2348137511883" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Premium Minimal Visual Block */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Glow ring */}
                <div className="absolute -inset-1.5 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full blur opacity-15 dark:opacity-30 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                {/* Profile Image Frame */}
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-2xl flex items-center justify-center">
                  <Image
                    src="/profile.webp"
                    alt="Kingsley Chinecherem Ibeh"
                    width={288}
                    height={288}
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                    sizes="(max-width: 768px) 224px, 288px"
                    priority
                  />
                </div>

                {/* Micro tech indicators */}
                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 font-mono text-[10px]">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span className="text-zinc-600 dark:text-zinc-300">⚡ Full-Stack</span>
                </div>

                <div className="absolute top-4 -left-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 font-mono text-[10px]">
                  <span className="text-emerald-500">⌘</span>
                  <span className="text-zinc-600 dark:text-zinc-300">Next.js + Postgres</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* WORK / PROJECTS SECTION */}
        <section id="projects" className="py-24 border-t border-zinc-200/60 dark:border-zinc-900/60">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold">
                Curated Showcase
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                Recent Projects
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex border border-zinc-200 dark:border-zinc-800 rounded-lg p-0.5 max-w-max bg-zinc-100/50 dark:bg-zinc-900/50">
              <button
                onClick={() => setActiveTab("highlighted")}
                className={`px-4 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${activeTab === "highlighted"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
              >
                Highlighted
              </button>
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${activeTab === "all"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
              >
                All Works ({PROJECTS.length})
              </button>
            </div>
          </div>

          {/* Grid Layout - Clean, structured, premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.title}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-900 hover:border-emerald-500/30 dark:hover:border-emerald-400/20 hover:bg-zinc-100/10 dark:hover:bg-zinc-900/60 transition-all duration-300 shadow-sm"
              >
                <div className="space-y-4">
                  {/* Folder Icon / Stack badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 dark:text-zinc-600 group-hover:text-emerald-500 transition-colors">
                      <Icons.Folder />
                    </span>

                    {/* Live link badge if highlighted */}
                    {project.highlight && (
                      <span className="text-[10px] tracking-wider uppercase font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Project Copy */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors text-zinc-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans line-clamp-4">
                      {project.desc}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-6 mt-4 border-t border-zinc-200/50 dark:border-zinc-800/40">
                  {/* Tech Pill Row */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-800/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 text-xs font-mono font-semibold pt-1">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <span>Live Site</span>
                      <Icons.ExternalLink />
                    </a>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      <Icons.Github />
                      <span>Source</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ABOUT & EXPERIENCE PHILOSOPHY */}
        <section id="about" className="py-24 border-t border-zinc-200/60 dark:border-zinc-900/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Header Block */}
            <div className="lg:col-span-4 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold">
                Core Philosophy
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                Engineering Custom Craft.
              </h2>
              <div className="h-1 w-12 bg-emerald-500 rounded"></div>
            </div>

            {/* Content Blocks */}
            <div className="lg:col-span-8 space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">

                <div className="space-y-2">
                  <h3 className="font-mono font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <span className="text-emerald-500">01.</span> Layered Backend Architecture
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    I design robust Express/Node.js backend architectures using the strictly segregated Controller-Service-Repository model. Decoupling routing, business algorithms, and SQL persistence maintains code bases that are stable, understandable, and modular.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-mono font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <span className="text-emerald-500">02.</span> Bulletproof Data Validation
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Unsanitized requests are a security failure. I implement strict validation logic using Zod schemas at request boundaries, paired with transaction containment (atomic units of work) to assure database writes remain consistent and corruption-free.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-mono font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <span className="text-emerald-500">03.</span> Performance & Core Web Vitals
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Unused assets and bloated libraries are slop. I verify bundle sizes, structure relational index optimizations, implement Next.js static optimizations, and push for maximum performance in database operations and user layout metrics alike.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-mono font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <span className="text-emerald-500">04.</span> Secure JWT & Central Error Containment
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    I deploy robust authorization pipelines with JWT and custom middleware. Operations utilize centralized async error catching and normalized Error mapping (e.g. `AppError` handlers) to prevent internal stack leakages and maintain system stability.
                  </p>
                </div>

              </div>

              {/* Technologies Pills */}
              <div className="space-y-4 pt-6 border-t border-zinc-200/60 dark:border-zinc-900/60">
                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold">
                  Active Toolkit
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800/80 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* INTERACTIVE PLAYGROUND (TERMINAL EASTER EGG) */}
        <section id="playground" className="py-24 border-t border-zinc-200/60 dark:border-zinc-900/60">
          <div className="space-y-4 mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold">
              Recruiter Terminal Sandbox
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Simulated Command Center
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
              An interactive micro-sandbox for developers and hiring managers. Query Neche&apos;s system background via a simulated guest shell.
            </p>
          </div>

          {/* Terminal Block */}
          <div className="w-full rounded-2xl bg-zinc-950 text-zinc-200 border border-zinc-800 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
            {/* Header bar */}
            <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between border-b border-zinc-800 select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              </div>
              <span className="text-[10px] tracking-wide text-zinc-400 uppercase font-bold">bash - guest@neche.dev</span>
              <span className="w-8"></span>
            </div>

            {/* Logs Area */}
            <div className="p-4 sm:p-6 space-y-3 min-h-[250px] max-h-[350px] overflow-y-auto leading-relaxed select-text">
              {terminalLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`whitespace-pre-wrap ${log.type === "input"
                    ? "text-zinc-100 font-bold"
                    : log.type === "error"
                      ? "text-rose-400"
                      : "text-emerald-400/90 dark:text-emerald-300/90"
                    }`}
                >
                  {log.text}
                </div>
              ))}
              <div ref={terminalEndRef}></div>
            </div>

            {/* Quick action chips for mobile/fast visitors */}
            <div className="px-4 sm:px-6 py-3 border-t border-zinc-900 bg-zinc-950 flex flex-wrap gap-2 select-none">
              <span className="text-[10px] text-zinc-400 uppercase font-bold flex items-center mr-1">Quick clicks:</span>
              {["about", "projects", "skills", "contact", "clear"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleChipClick(cmd)}
                  className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 hover:bg-zinc-800 text-[10px] text-zinc-300 transition-colors"
                >
                  [{cmd}]
                </button>
              ))}
            </div>

            {/* Input field */}
            <form onSubmit={handleTerminalSubmit} className="flex items-center border-t border-zinc-900 bg-zinc-900 px-4 sm:px-6 py-3.5">
              <span className="text-emerald-500 font-bold mr-2 select-none">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type 'help' and press Enter..."
                className="flex-1 bg-transparent border-none outline-none focus:ring-0 focus:outline-none text-zinc-100 font-mono caret-emerald-500"
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </div>
        </section>

        {/* SECURE DIRECT CONTACT SECTION */}
        <section id="contact" className="py-24 border-t border-zinc-200/60 dark:border-zinc-900/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Direct Connect & Social Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold">
                  Get In Touch
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                  Let&apos;s Build Something Solid.
                </h2>
              </div>

              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
                Have a challenging project, open workspace, or clean idea that needs frontend finesse? Let&apos;s discuss requirements and set up a call.
              </p>

              {/* Direct Card info */}
              <div className="space-y-4 font-mono text-sm pt-2">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500">
                    ✉
                  </span>
                  <div>
                    <div className="text-[10px] uppercase text-zinc-400">Direct Email</div>
                    <a href="mailto:codewithneche@gmail.com" className="hover:text-emerald-500 dark:hover:text-emerald-400 underline decoration-zinc-400 hover:decoration-emerald-500 transition-colors">
                      codewithneche@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="p-2 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500">
                    ☏
                  </span>
                  <div>
                    <div className="text-[10px] uppercase text-zinc-400">WhatsApp</div>
                    <a href="https://wa.me/2348137511883" className="hover:text-emerald-500 dark:hover:text-emerald-400 underline decoration-zinc-400 hover:decoration-emerald-500 transition-colors">
                      +234 813 751 1883
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Form */}
            <div className="lg:col-span-7 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-900 p-6 sm:p-8 rounded-2xl shadow-sm">
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="font-mono text-xs uppercase text-zinc-500 dark:text-zinc-400 block font-bold">Your Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="font-mono text-xs uppercase text-zinc-500 dark:text-zinc-400 block font-bold">Your Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="font-mono text-xs uppercase text-zinc-500 dark:text-zinc-400 block font-bold">Your Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your project, timeline, or requirements..."
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-zinc-900 dark:text-zinc-100"
                  ></textarea>
                </div>

                {/* Form submit button */}
                <button
                  type="submit"
                  disabled={formStatus === "submitting" || formStatus === "success"}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 hover:bg-emerald-500 dark:hover:bg-emerald-400 dark:hover:text-zinc-950 hover:text-zinc-950 transition-all font-mono text-xs tracking-wider uppercase font-bold disabled:opacity-50 disabled:hover:bg-zinc-900 disabled:hover:text-zinc-50"
                >
                  {formStatus === "submitting" ? (
                    <span>Transmitting data...</span>
                  ) : formStatus === "success" ? (
                    <span className="text-emerald-500 flex items-center gap-1.5">
                      <Icons.Check /> Sent successfully!
                    </span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Icons.Send />
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200/60 dark:border-zinc-900/60 bg-zinc-100/50 dark:bg-zinc-950 py-12 text-center text-xs font-mono text-zinc-600 dark:text-zinc-400 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p>© {new Date().getFullYear()} Kingsley Chinecherem Ibeh. All rights reserved.</p>
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
      </footer>

    </div>
  );
}
