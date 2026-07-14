import { useState, useEffect, useMemo } from "react";
import {
  Github,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Award,
  ExternalLink,
  Search,
  Moon,
  Sun,
  Check,
  Copy,
  Languages,
  Heart,
  Terminal,
  BookOpen,
  ArrowUpRight,
  Code2,
  Sparkles,
  FileText,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { profile, Project } from "./data";
import { ProfileAvatar } from "./components/Avatar";
import { TerminalConsole } from "./components/TerminalConsole";
import { ResumeModal } from "./components/ResumeModal";

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    // Default to clean minimalist light theme
    return false;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedType, setCopiedType] = useState<"email" | "phone" | "address" | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Sync theme
  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const categories = ["All", "Flask", "FastAPI", "CLI & Games", "Utilities"];

  // Filter projects based on category and search
  const filteredProjects = useMemo(() => {
    return profile.projects.filter((project) => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.tech.some((t) => t.toLowerCase().includes(searchLower));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Copy function with visual feedback
  const handleCopy = (text: string, type: "email" | "phone" | "address") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  return (
    <div
      id="portfolio-root"
      className={`min-h-screen transition-colors duration-300 font-sans relative ${
        isDark ? "bg-brand-bg-dark text-brand-text-dark dark" : "bg-brand-bg-light text-brand-text-light"
      }`}
      style={{
        backgroundImage: isDark
          ? "radial-gradient(circle at 1.5px 1.5px, rgba(16, 185, 129, 0.08) 1.5px, transparent 0)"
          : "radial-gradient(circle at 1.5px 1.5px, rgba(5, 150, 105, 0.05) 1.5px, transparent 0)",
        backgroundSize: "24px 24px"
      }}
    >
      {/* BACKGROUND GRAPHIC ACCENTS */}

      {/* FIXED HEADER */}
      <header
        id="app-header"
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          isDark
            ? "border-brand-border-dark bg-brand-bg-dark/90"
            : "border-brand-border-light bg-brand-bg-light/90"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            id="logo"
            href="#hero"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className={`w-8 h-8 rounded flex items-center justify-center font-mono font-bold text-sm tracking-wide transition-all ${
              isDark
                ? "bg-brand-accent-dark text-brand-bg-dark hover:bg-brand-accent-dark/90"
                : "bg-brand-accent-light text-brand-bg-light hover:bg-brand-accent-light/90"
            }`}>
              SR
            </div>
            <span className="font-mono font-bold text-sm tracking-tight hidden sm:inline-block">
              Samarth Rana
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-[9px] font-mono text-emerald-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SYS: ONLINE [PORT_3000]
            </span>
          </a>

          {/* Navigation links */}
          <nav id="navbar" className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a
              href="#about"
              className={`hover:text-brand-accent-light dark:hover:text-brand-accent-dark transition-colors ${
                isDark ? "text-brand-text-muted-dark" : "text-brand-text-muted-light"
              }`}
            >
              About
            </a>
            <a
              href="#projects"
              className={`hover:text-brand-accent-light dark:hover:text-brand-accent-dark transition-colors ${
                isDark ? "text-brand-text-muted-dark" : "text-brand-text-muted-light"
              }`}
            >
              Projects
            </a>
            <a
              href="#skills"
              className={`hover:text-brand-accent-light dark:hover:text-brand-accent-dark transition-colors ${
                isDark ? "text-brand-text-muted-dark" : "text-brand-text-muted-light"
              }`}
            >
              Skills
            </a>
            <a
              href="#education"
              className={`hover:text-brand-accent-light dark:hover:text-brand-accent-dark transition-colors ${
                isDark ? "text-brand-text-muted-dark" : "text-brand-text-muted-light"
              }`}
            >
              Education
            </a>
            <a
              href="#certifications"
              className={`hover:text-brand-accent-light dark:hover:text-brand-accent-dark transition-colors ${
                isDark ? "text-brand-text-muted-dark" : "text-brand-text-muted-light"
              }`}
            >
              Certifications
            </a>
            <a
              href="#contact"
              className={`hover:text-brand-accent-light dark:hover:text-brand-accent-dark transition-colors ${
                isDark ? "text-brand-text-muted-dark" : "text-brand-text-muted-light"
              }`}
            >
              Contact
            </a>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold cursor-pointer border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/50 transition-all font-mono"
            >
              <FileText size={11} />
              Resume
            </button>
          </nav>

          {/* Right utility elements (theme switch, basic contact icons) */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <a
                id="header-github"
                href="https://github.com/samarthrana027"
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded border transition-all ${
                  isDark
                    ? "border-brand-border-dark hover:bg-brand-card-dark text-brand-text-dark"
                    : "border-brand-border-light hover:bg-brand-card-light text-brand-text-light"
                }`}
                title="GitHub Profile"
              >
                <Github size={16} />
              </a>
              <a
                id="header-email"
                href="mailto:samarthrana148@gmail.com"
                className={`p-2 rounded border transition-all ${
                  isDark
                    ? "border-brand-border-dark hover:bg-brand-card-dark text-brand-text-dark"
                    : "border-brand-border-light hover:bg-brand-card-light text-brand-text-light"
                }`}
                title="Send Email"
              >
                <Mail size={16} />
              </a>
            </div>

            {/* LIGHT MODE / DARK MODE TOGGLE */}
            <button
              id="theme-toggle"
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isDark
                  ? "border-brand-border-dark bg-brand-card-dark text-brand-accent-dark hover:border-brand-accent-dark"
                  : "border-brand-border-light bg-brand-card-light text-brand-accent-light hover:border-brand-accent-light"
              }`}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 relative z-10 py-12 md:py-20 space-y-24 md:space-y-36">
        
        {/* HERO SECTION / ABOUT ME */}
        <section id="hero" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border transition-all ${
                isDark ? "bg-brand-card-dark text-brand-text-dark border-brand-border-dark" : "bg-brand-card-light text-brand-text-light border-brand-border-light"
              }`}>
                Open for Opportunities
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28">
                  <div className={`w-full h-full rounded-full overflow-hidden border-2 transition-all duration-300 ${
                    isDark ? "border-brand-border-alt-dark bg-brand-card-dark" : "border-brand-border-alt-light bg-brand-card-light"
                  }`}>
                    <ProfileAvatar className="w-full h-full" />
                  </div>
                  <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-brand-bg-light dark:border-brand-bg-dark" />
                </div>

                <div className="space-y-2">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
                    Hi, I am <br />
                    <span className="font-semibold text-brand-text-light dark:text-brand-text-dark">
                      {profile.name}
                    </span>
                  </h1>
                  <p className={`text-xs uppercase tracking-widest font-mono font-bold ${
                    isDark ? "text-brand-text-muted-dark" : "text-brand-text-muted-light"
                  }`}>
                    {profile.title} • Student at C.K. Pithawala
                  </p>
                </div>
              </div>

              <p className={`text-sm leading-relaxed ${
                isDark ? "text-brand-text-muted-dark" : "text-[#4F4A45]"
              }`}>
                {profile.aboutMe}
              </p>

              {/* Quick interactive contact deck */}
              <div id="contact-pills" className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className={`p-4 rounded border flex flex-col justify-between relative overflow-hidden transition-all group ${
                  isDark ? "bg-brand-card-dark border-brand-border-dark hover:border-brand-border-alt-dark" : "bg-brand-card-light border-brand-border-light hover:border-brand-border-alt-light"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-wider uppercase opacity-60">Email Address</span>
                    <button
                      onClick={() => handleCopy(profile.email, "email")}
                      className="p-1 rounded opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                      title="Copy email to clipboard"
                    >
                      {copiedType === "email" ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    </button>
                  </div>
                  <a href={`mailto:${profile.email}`} className="text-xs font-mono font-medium mt-1 hover:underline truncate inline-flex items-center gap-1">
                    {profile.email}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all text-brand-accent-light dark:text-brand-accent-dark" />
                  </a>
                  {copiedType === "email" && (
                    <span className="absolute bottom-1 right-2 text-[10px] font-mono text-emerald-500 animate-pulse">Copied!</span>
                  )}
                </div>

                <div className={`p-4 rounded border flex flex-col justify-between relative overflow-hidden transition-all group ${
                  isDark ? "bg-brand-card-dark border-brand-border-dark hover:border-brand-border-alt-dark" : "bg-brand-card-light border-brand-border-light hover:border-brand-border-alt-light"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-wider uppercase opacity-60">Phone Number</span>
                    <button
                      onClick={() => handleCopy(profile.phone, "phone")}
                      className="p-1 rounded opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                      title="Copy phone to clipboard"
                    >
                      {copiedType === "phone" ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    </button>
                  </div>
                  <a href={`tel:${profile.phone}`} className="text-xs font-mono font-medium mt-1 hover:underline truncate inline-flex items-center gap-1">
                    {profile.phone}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all text-brand-accent-light dark:text-brand-accent-dark" />
                  </a>
                  {copiedType === "phone" && (
                    <span className="absolute bottom-1 right-2 text-[10px] font-mono text-emerald-500 animate-pulse">Copied!</span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="#projects"
                  className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 ${
                    isDark
                      ? "bg-brand-text-dark text-brand-bg-dark hover:bg-white"
                      : "bg-brand-text-light text-brand-bg-light hover:bg-[#2B2520]"
                  }`}
                >
                  <Code2 size={13} />
                  Projects ({profile.projects.length})
                </a>
                <a
                  href="#contact"
                  className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-bold border transition-all flex items-center gap-2 ${
                    isDark
                      ? "border-brand-border-dark text-brand-text-dark hover:bg-brand-card-dark"
                      : "border-brand-border-light text-brand-text-light hover:bg-[#F2ECE4]"
                  }`}
                >
                  <Mail size={13} />
                  Contact
                </a>
                <button
                  onClick={() => setIsResumeOpen(true)}
                  className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                    isDark
                      ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/5 hover:border-emerald-500/60 hover:bg-emerald-500/10"
                      : "border-emerald-600/20 text-emerald-700 bg-emerald-50/50 hover:border-emerald-600/40 hover:bg-emerald-100/60"
                  }`}
                >
                  <FileText size={13} />
                  View Resume
                </button>
              </div>
            </div>

            {/* Right Interactive Card / Code Sandbox Column */}
            <div id="about" className="lg:col-span-5 scroll-mt-24">
              <TerminalConsole isDark={isDark} />
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6 border-brand-border-light dark:border-brand-border-dark">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-brand-text-muted-light dark:text-brand-text-muted-dark font-semibold">
                <Code2 size={12} />
                Portfolio Repositories
              </div>
              <h2 className="text-3xl font-display font-light tracking-tight text-brand-text-light dark:text-brand-text-dark">
                My Projects
              </h2>
              <p className={`text-sm ${isDark ? "text-brand-text-muted-dark" : "text-brand-text-muted-light"}`}>
                A curated list of {profile.projects.length} repositories from my GitHub account.
              </p>
            </div>

            {/* Micro Dashboard stats */}
            <div className="flex items-center gap-2.5 text-[11px] font-mono font-medium">
              <div className={`px-2.5 py-1 rounded border ${isDark ? "bg-brand-card-dark border-brand-border-dark" : "bg-brand-card-light border-brand-border-light"}`}>
                <span className="opacity-60">FLASK</span> <strong className="text-brand-text-light dark:text-brand-text-dark">{profile.projects.filter(p => p.category === 'Flask').length}</strong>
              </div>
              <div className={`px-2.5 py-1 rounded border ${isDark ? "bg-brand-card-dark border-brand-border-dark" : "bg-brand-card-light border-brand-border-light"}`}>
                <span className="opacity-60">FASTAPI</span> <strong className="text-brand-text-light dark:text-brand-text-dark">{profile.projects.filter(p => p.category === 'FastAPI').length}</strong>
              </div>
              <div className={`px-2.5 py-1 rounded border ${isDark ? "bg-brand-card-dark border-brand-border-dark" : "bg-brand-card-light border-brand-border-light"}`}>
                <span className="opacity-60">CLI/GAMES</span> <strong className="text-brand-text-light dark:text-brand-text-dark">{profile.projects.filter(p => p.category === 'CLI & Games').length}</strong>
              </div>
            </div>
          </div>

          {/* Search and Filters panel */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search inputs */}
            <div className="relative w-full sm:max-w-xs">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted-light dark:text-brand-text-muted-dark pointer-events-none" />
              <input
                id="search-input"
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 text-xs rounded border transition-all outline-hidden ${
                  isDark
                    ? "border-brand-border-dark bg-brand-card-dark text-brand-text-dark placeholder-brand-text-muted-dark focus:border-brand-accent-dark"
                    : "border-brand-border-light bg-brand-card-light text-brand-text-light placeholder-brand-text-muted-light focus:border-brand-accent-light"
                }`}
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded text-xs uppercase tracking-wider font-bold transition-all shrink-0 cursor-pointer border ${
                    selectedCategory === cat
                      ? isDark
                        ? "bg-brand-text-dark text-brand-bg-dark border-brand-text-dark"
                        : "bg-brand-text-light text-brand-bg-light border-brand-text-light"
                      : isDark
                      ? "bg-brand-card-dark border-brand-border-dark hover:border-brand-border-alt-dark text-brand-text-muted-dark"
                      : "bg-[#F2ECE4] border-[#E2DDD5] hover:bg-[#E6E0D6] text-brand-text-muted-light"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project card grids with motion layouts */}
          <motion.div
            id="projects-grid"
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
               {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded border p-5 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                    isDark
                      ? "bg-brand-card-dark border-brand-border-dark hover:border-brand-border-alt-dark"
                      : "bg-brand-card-light border-brand-border-light hover:border-brand-border-alt-light"
                  }`}
                >
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
                        isDark ? "bg-brand-card-dark text-brand-text-dark border border-brand-border-dark" : "bg-[#F3EFE9] text-brand-text-light border border-[#E6E2DC]"
                      }`}>
                        {project.category}
                      </span>
                      <Terminal size={12} className="opacity-30" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm leading-snug tracking-tight text-brand-text-light dark:text-brand-text-dark">
                        {project.name}
                      </h3>
                      <p className={`text-xs leading-relaxed line-clamp-3 ${
                        isDark ? "text-brand-text-muted-dark" : "text-brand-text-muted-light"
                      }`}>
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Tags and Links */}
                  <div className="space-y-3 pt-4 relative z-10 border-t border-dashed border-brand-border-light dark:border-brand-border-dark mt-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                            isDark ? "bg-brand-card-dark text-brand-text-muted-dark border-brand-border-dark" : "bg-[#FDFCF9] text-brand-text-muted-light border-brand-border-light"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1 text-xs font-semibold hover:underline transition-all ${
                        isDark ? "text-brand-text-dark hover:text-brand-accent-dark" : "text-brand-text-light hover:text-brand-accent-light"
                      }`}
                    >
                      <Github size={11} />
                      View Code
                      <ArrowUpRight size={10} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-60" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty view state */}
            {filteredProjects.length === 0 && (
              <div className="col-span-full py-12 text-center space-y-2 border border-dashed rounded border-brand-border-light dark:border-brand-border-dark">
                <Search className="mx-auto text-brand-text-muted-light dark:text-brand-text-muted-dark" size={20} />
                <p className="font-semibold text-xs uppercase tracking-widest text-brand-text-muted-light dark:text-brand-text-muted-dark">No matching repositories found</p>
                <p className="text-xs opacity-60">Try refining your keyword query or switching categories.</p>
              </div>
            )}
          </motion.div>
        </section>

        {/* CORE SKILLS SECTION */}
        <section id="skills" className="scroll-mt-24 space-y-8">
          <div className="border-b pb-6 border-brand-border-light dark:border-brand-border-dark">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-brand-text-muted-light dark:text-brand-text-muted-dark font-semibold">
              <Cpu size={12} className="text-emerald-500" />
              Core Capabilities
            </div>
            <h2 className="text-3xl font-display font-light tracking-tight text-brand-text-light dark:text-brand-text-dark mt-1.5">
              Skills Inventory
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.skills.map((group) => (
              <div
                key={group.category}
                className={`rounded border p-5 space-y-4 transition-all duration-300 ${
                  isDark
                    ? "bg-brand-card-dark border-brand-border-dark hover:border-emerald-500/20"
                    : "bg-brand-card-light border-brand-border-light hover:border-emerald-500/20"
                }`}
              >
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b pb-2 border-brand-border-light dark:border-brand-border-dark">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className={`text-xs font-mono px-2.5 py-1 rounded border transition-colors ${
                        isDark
                          ? "bg-[#0B1527] text-slate-100 border-brand-border-dark hover:border-emerald-500/50 hover:bg-emerald-500/5"
                          : "bg-white text-slate-800 border-slate-200 hover:border-emerald-600/50 hover:bg-emerald-50/20"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION & TIMELINE SECTION */}
        <section id="education" className="scroll-mt-24 space-y-8">
          <div className="border-b pb-6 border-brand-border-light dark:border-brand-border-dark">
            <div className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-brand-text-muted-light dark:text-brand-text-muted-dark font-semibold">
              <GraduationCap size={12} />
              Academic History
            </div>
            <h2 className="text-3xl font-display font-light tracking-tight text-brand-text-light dark:text-brand-text-dark mt-1.5">
              Education
            </h2>
          </div>

          <div className="max-w-3xl space-y-10 relative before:absolute before:inset-y-0 before:left-4 sm:before:left-6 before:w-0.5 before:bg-brand-border-light dark:before:bg-brand-border-dark">
            {profile.education.map((edu, idx) => (
              <div
                key={idx}
                className="relative pl-10 sm:pl-16 group transition-all"
              >
                {/* Timeline node */}
                <div className={`absolute left-2.5 sm:left-4.5 top-1.5 w-3 h-3 rounded-full border-2 transition-all group-hover:scale-125 z-10 ${
                  idx === 0
                    ? "bg-brand-accent-light border-[#F0ECE6] dark:bg-brand-accent-dark dark:border-neutral-950"
                    : isDark
                    ? "bg-brand-bg-dark border-brand-border-dark"
                    : "bg-brand-bg-light border-[#DDD9D4]"
                }`} />

                <div className={`p-5 rounded border transition-all ${
                  isDark
                    ? "bg-brand-card-dark border-brand-border-dark hover:border-brand-border-alt-dark"
                    : "bg-brand-card-light border-brand-border-light hover:border-brand-border-alt-light"
                }`}>
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase inline-block ${
                    idx === 0
                      ? "bg-[#2D2926] text-[#FAF8F5] dark:bg-brand-accent-dark dark:text-brand-bg-dark"
                      : isDark
                      ? "bg-[#1C1C1E] text-brand-text-muted-dark"
                      : "bg-[#F3EFE9] text-brand-text-muted-light"
                  }`}>
                    {edu.period}
                  </span>
                  
                  <h3 className="font-semibold text-sm mt-2.5 tracking-tight text-brand-text-light dark:text-brand-text-dark">
                    {edu.degree}
                  </h3>
                  <p className={`text-xs mt-0.5 ${isDark ? "text-brand-text-muted-dark" : "text-brand-text-muted-light"}`}>
                    {edu.institution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NPTEL CERTIFICATION SECTION */}
        <section id="certifications" className="scroll-mt-24 space-y-8">
          <div className="border-b pb-6 border-brand-border-light dark:border-brand-border-dark">
            <div className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-brand-text-muted-light dark:text-brand-text-muted-dark font-semibold">
              <Award size={12} />
              Professional Credentials
            </div>
            <h2 className="text-3xl font-display font-light tracking-tight text-brand-text-light dark:text-brand-text-dark mt-1.5">
              Certifications
            </h2>
          </div>

          {/* Custom high-end certificate display box */}
          <div className="max-w-3xl">
            <div className={`rounded border p-6 md:p-8 overflow-hidden relative transition-all ${
              isDark
                ? "bg-brand-card-dark border-brand-border-dark hover:border-brand-border-alt-dark"
                : "bg-brand-card-light border-brand-border-light hover:border-brand-border-alt-light"
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Left logo / decorative stamp */}
                <div className="md:col-span-3 flex flex-col items-center justify-center text-center p-4 rounded border border-dashed border-brand-border-light dark:border-brand-border-dark bg-[#FAF8F5]/60 dark:bg-brand-card-dark/60 relative">
                  <div className="text-brand-accent-light dark:text-brand-accent-dark p-2 rounded bg-brand-card-light dark:bg-[#1C1C1E]/80">
                    <Award size={30} />
                  </div>
                  <span className="text-[9px] font-mono tracking-wider font-bold uppercase mt-3 text-brand-text-light dark:text-brand-text-dark">
                    {profile.certificate.badge} Certified
                  </span>
                  <span className="text-[8px] font-mono opacity-50 mt-1">SWAYAM / MoE</span>
                </div>

                {/* Right detailed information */}
                <div className="md:col-span-9 space-y-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-brand-border-light dark:bg-brand-border-dark text-brand-text-light dark:text-brand-text-dark font-bold uppercase">
                        NPTEL Online Certification
                      </span>
                      <span className="text-[10px] font-mono opacity-50">
                        {profile.certificate.period}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight pt-1.5 text-brand-text-light dark:text-brand-text-dark">
                      {profile.certificate.title}
                    </h3>
                    <p className={`text-xs ${isDark ? "text-brand-text-muted-dark" : "text-brand-text-muted-light"}`}>
                      Awarded by <strong>{profile.certificate.provider}</strong>
                    </p>
                  </div>

                  {/* Score details */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
                    <div className={`p-3 rounded border text-center transition-colors ${
                      isDark ? "bg-brand-card-dark/40 border-brand-border-dark" : "bg-[#FDFCF9] border-brand-border-light"
                    }`}>
                      <p className="text-[9px] font-mono uppercase opacity-50">Consolidated Score</p>
                      <p className="text-base font-mono font-bold text-brand-text-light dark:text-brand-text-dark mt-0.5">
                        {profile.certificate.score.split(" ")[0]}
                      </p>
                    </div>

                    <div className={`p-3 rounded border text-center transition-colors ${
                      isDark ? "bg-brand-card-dark/40 border-brand-border-dark" : "bg-[#FDFCF9] border-brand-border-light"
                    }`}>
                      <p className="text-[9px] font-mono uppercase opacity-50">Recommended Credits</p>
                      <p className="text-base font-mono font-bold text-brand-text-light dark:text-brand-text-dark mt-0.5">
                        4 Credits
                      </p>
                    </div>

                    <div className={`p-3 rounded border text-center transition-colors col-span-2 sm:col-span-1 ${
                      isDark ? "bg-brand-card-dark/40 border-brand-border-dark" : "bg-[#FDFCF9] border-brand-border-light"
                    }`}>
                      <p className="text-[9px] font-mono uppercase opacity-50">IIT Host Institute</p>
                      <p className="text-xs font-semibold mt-1">
                        IIT Kharagpur
                      </p>
                    </div>
                  </div>

                  {/* Verification number code */}
                  <div className={`p-3 rounded border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 font-mono text-xs ${
                    isDark ? "bg-brand-card-dark border-brand-border-dark" : "bg-[#FDFCF9] border-brand-border-light"
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <span className="opacity-50">Roll No:</span>
                      <span className="font-semibold text-brand-text-light dark:text-brand-text-dark">{profile.certificate.rollNo}</span>
                    </div>
                    <div className="text-[9px] opacity-40 italic">
                      Funded by the MoE, Govt. of India
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* LANGUAGES & HOBBIES SIDE-BY-SIDE */}
        <section id="languages-hobbies" className="grid grid-cols-1 md:grid-cols-2 gap-10 scroll-mt-24">
          
          {/* Languages section */}
          <div className="space-y-6">
            <div className="border-b pb-4 border-brand-border-light dark:border-brand-border-dark">
              <div className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-brand-text-muted-light dark:text-brand-text-muted-dark font-semibold">
                <Languages size={12} />
                Linguistic Competencies
              </div>
              <h2 className="text-2xl font-display font-light tracking-tight text-brand-text-light dark:text-brand-text-dark mt-1.5">
                Languages
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.languages.map((lang, index) => (
                <div
                  key={lang}
                  className={`p-4 rounded border flex items-center justify-between transition-colors ${
                    isDark ? "bg-brand-card-dark border-brand-border-dark" : "bg-brand-card-light border-brand-border-light"
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="font-semibold text-sm">{lang}</p>
                    <p className="text-xs opacity-50">
                      {lang === "English" ? "Professional" : lang === "Hindi" ? "Native / Bilingual" : "Native Tongue"}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((circle) => (
                      <span
                        key={circle}
                        className={`w-1.5 h-1.5 rounded-full ${
                          circle <= (lang === "English" ? 4 : 5)
                            ? "bg-brand-text-light dark:bg-brand-text-dark"
                            : "bg-[#E2DDD5] dark:bg-[#2C2621]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hobbies section */}
          <div className="space-y-6">
            <div className="border-b pb-4 border-brand-border-light dark:border-brand-border-dark">
              <div className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-brand-text-muted-light dark:text-brand-text-muted-dark font-semibold">
                <Heart size={12} className="text-brand-accent-light dark:text-brand-accent-dark" />
                Beyond the IDE
              </div>
              <h2 className="text-2xl font-display font-light tracking-tight text-brand-text-light dark:text-brand-text-dark mt-1.5">
                Hobbies
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.hobbies.map((hobby) => (
                <div
                  key={hobby}
                  className={`px-3.5 py-2 rounded border flex items-center gap-2 transition-colors ${
                    isDark
                      ? "bg-brand-card-dark border-brand-border-dark hover:border-brand-border-alt-dark"
                      : "bg-brand-card-light border-brand-border-light hover:bg-[#FAF6F0]"
                  }`}
                >
                  <BookOpen size={12} className="text-brand-text-muted-light dark:text-brand-text-muted-dark shrink-0" />
                  <span className="text-xs font-semibold">{hobby}</span>
                </div>
              ))}
            </div>
          </div>

        </section>

      </main>

      {/* FOOTER & COPY TOAST NOTIFICATIONS */}
      <footer
        id="contact"
        className={`border-t transition-colors duration-300 mt-20 ${
          isDark
            ? "border-brand-border-dark bg-[#0E0B0A] text-brand-text-muted-dark"
            : "border-brand-border-light bg-[#FAF8F5] text-brand-text-muted-light"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Brand Summary */}
            <div className="md:col-span-6 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded flex items-center justify-center font-display font-bold text-xs tracking-wider ${
                  isDark ? "bg-brand-card-dark text-brand-text-dark border border-brand-border-dark" : "bg-brand-text-light text-brand-bg-light"
                }`}>
                  SR
                </div>
                <span className={`font-display font-bold text-base tracking-tight ${
                  isDark ? "text-brand-text-dark" : "text-brand-text-light"
                }`}>
                  Samarth Rana
                </span>
              </div>
              <p className="text-xs leading-relaxed max-w-sm">
                A crafted, minimalist software portfolio summarizing academic milestones, professional credentials, and 12 curated GitHub repositories.
              </p>
            </div>

            {/* Right Quick Connection list */}
            <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-2.5">
              <a
                href={`mailto:${profile.email}`}
                className={`px-3 py-2 rounded border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isDark
                    ? "border-brand-border-dark bg-brand-card-dark text-brand-text-dark hover:border-brand-border-alt-dark hover:bg-[#1C1C1E]"
                    : "border-brand-border-light bg-brand-card-light text-brand-text-light hover:border-brand-border-alt-light hover:bg-[#FAF6F0]"
                }`}
              >
                <Mail size={13} />
                Email
              </a>

              <a
                href={`tel:${profile.phone}`}
                className={`px-3 py-2 rounded border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isDark
                    ? "border-brand-border-dark bg-brand-card-dark text-brand-text-dark hover:border-brand-border-alt-dark hover:bg-[#1C1C1E]"
                    : "border-brand-border-light bg-brand-card-light text-brand-text-light hover:border-brand-border-alt-light hover:bg-[#FAF6F0]"
                }`}
              >
                <Phone size={13} />
                Call
              </a>

              <a
                href="https://github.com/samarthrana027"
                target="_blank"
                rel="noreferrer"
                className={`px-3 py-2 rounded border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isDark
                    ? "border-brand-border-dark bg-brand-card-dark text-brand-text-dark hover:border-brand-border-alt-dark hover:bg-[#1C1C1E]"
                    : "border-brand-border-light bg-brand-card-light text-brand-text-light hover:border-brand-border-alt-light hover:bg-[#FAF6F0]"
                }`}
              >
                <Github size={13} />
                GitHub
              </a>
            </div>
          </div>

          <div className="border-t border-dashed border-brand-border-light dark:border-brand-border-dark pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p className="opacity-60 flex items-center gap-1">
              &copy; {new Date().getFullYear()} Samarth Rana. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 opacity-60">
              <span>Made with dedication</span>
              <Heart size={10} className="text-brand-accent-light dark:text-brand-accent-dark fill-brand-accent-light dark:fill-brand-accent-dark" />
            </div>
          </div>

        </div>
      </footer>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} isDark={isDark} />
    </div>
  );
}
