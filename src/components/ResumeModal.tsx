import React, { useState, useEffect } from "react";
import { X, Printer, Download, ArrowUpRight, Award, GraduationCap, Code2, Briefcase, Mail, Phone, MapPin, Sparkles, AlertCircle, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { profile } from "../data";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

// Memory canvas and context to programmatically convert modern CSS colors (like OKLCH, OKLAB) to standard RGB/RGBA on-the-fly.
// This works because the browser's 2D canvas context fillStyle accepts any valid CSS color space (including OKLCH/OKLAB),
// and calling getImageData retrieves the pixel color converted automatically to standard sRGB.
let memoCanvas: HTMLCanvasElement | null = null;
let memoCtx: CanvasRenderingContext2D | null = null;

function isModernColor(val: string): boolean {
  return val.includes("oklch") || val.includes("oklab") || val.includes("lch") || val.includes("lab") || val.includes("display-p3");
}

function convertModernColorToRgb(colorStr: string): string {
  try {
    if (!memoCanvas) {
      memoCanvas = document.createElement("canvas");
      memoCanvas.width = 1;
      memoCanvas.height = 1;
      memoCtx = memoCanvas.getContext("2d", { willReadFrequently: true });
    }
    if (!memoCtx) return colorStr;
    memoCtx.clearRect(0, 0, 1, 1);
    memoCtx.fillStyle = colorStr;
    memoCtx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = memoCtx.getImageData(0, 0, 1, 1).data;
    return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
  } catch (e) {
    console.warn("Failed to convert modern color:", colorStr, e);
    return colorStr;
  }
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, isDark }) => {
  const [printTheme, setPrintTheme] = useState<"tech" | "classic">("classic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    try {
      setIsInIframe(window.self !== window.top);
    } catch (e) {
      setIsInIframe(true);
    }
  }, []);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);

    // Temporarily patch window.getComputedStyle to translate oklch colors for html2canvas
    const originalGetComputedStyle = window.getComputedStyle;
    window.getComputedStyle = function (elt, pseudoElt) {
      const style = originalGetComputedStyle(elt, pseudoElt);
      return new Proxy(style, {
        get(target, prop) {
          if (typeof prop !== "string") {
            return Reflect.get(target, prop);
          }
          const val = target[prop as any] as any;
          if (typeof val === "function") {
            return function (...args: any[]) {
              const res = val.apply(target, args);
              if (typeof res === "string" && isModernColor(res)) {
                return convertModernColorToRgb(res);
              }
              return res;
            };
          }
          if (typeof val === "string" && isModernColor(val)) {
            return convertModernColorToRgb(val);
          }
          return val;
        },
      });
    };

    try {
      const element = document.getElementById("printable-resume");
      if (!element) return;

      const originalTheme = printTheme;
      // Force classic theme for standard, pristine A4 white paper background
      setPrintTheme("classic");
      
      // Brief timeout to let the DOM settle
      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvas = await html2canvas(element, {
        scale: 2, // High DPI rendering
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      // Restore user visual setting
      setPrintTheme(originalTheme);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Samarth_Rana_Resume.pdf");
    } catch (error) {
      console.error("PDF Generation error:", error);
      alert("Note: Direct downloads can be restricted in some sandboxed environments. If the download fails, please open the application in a new tab, or click 'Print / Save PDF' to save your resume natively!");
    } finally {
      // Restore original getComputedStyle
      window.getComputedStyle = originalGetComputedStyle;
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      {/* Dynamic print-only style sheet to guarantee a clean, standard A4 layout when printing */}
      <style>{`
        @media print {
          /* Hide everything except the printable resume container */
          body * {
            visibility: hidden !important;
          }
          #printable-resume, #printable-resume * {
            visibility: visible !important;
          }
          #printable-resume {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 1.5cm !important;
            background: white !important;
            color: #0f172a !important;
            box-shadow: none !important;
            border: none !important;
          }
          /* Standard print formatting adjustments */
          .print-no-break {
            page-break-inside: avoid !important;
          }
          @page {
            size: A4;
            margin: 1.5cm;
          }
          /* Force standard text colors in print */
          .print-black { color: #000000 !important; }
          .print-gray { color: #475569 !important; }
          .print-light-gray { color: #64748b !important; }
          .print-border { border-color: #cbd5e1 !important; }
          .print-bg-none { background: none !important; }
          .print-bullet { color: #0f172a !important; }
        }
      `}</style>

      <div className={`relative w-full max-w-4xl h-[90vh] rounded-xl border flex flex-col overflow-hidden shadow-2xl transition-all ${
        isDark 
          ? "bg-[#090D16] border-brand-border-dark text-slate-100" 
          : "bg-white border-slate-200 text-slate-800"
      }`}>
        {/* Modal Controls Header */}
        <div className={`px-6 py-4 flex items-center justify-between border-b shrink-0 ${
          isDark ? "bg-[#0F1626]/80 border-slate-800" : "bg-slate-50 border-slate-200"
        }`}>
          <div className="flex items-center gap-2.5">
            <FileText className="text-emerald-500" size={18} />
            <div>
              <h2 className="font-mono font-bold text-sm tracking-tight">Samarth_Rana_Resume.pdf</h2>
              <p className="text-[10px] text-slate-400 font-mono">Interactive Curriculum Vitae Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle inside Resume (Tech vs. Classic Light) */}
            <div className="hidden sm:flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-900 p-0.5 border border-slate-200 dark:border-slate-800 text-[10px] font-mono">
              <button
                onClick={() => setPrintTheme("classic")}
                className={`px-2 py-1 rounded transition-all cursor-pointer ${
                  printTheme === "classic"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Classic Paper
              </button>
              <button
                onClick={() => setPrintTheme("tech")}
                className={`px-2 py-1 rounded transition-all cursor-pointer ${
                  printTheme === "tech"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Tech Console
              </button>
            </div>

            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold bg-[#10B981]/10 text-emerald-400 border border-[#10B981]/30 hover:bg-[#10B981]/20 transition-all cursor-pointer disabled:opacity-50"
              title="Download PDF version of Resume"
            >
              <Download size={13} className={isGenerating ? "animate-bounce" : ""} />
              <span className="hidden xs:inline">{isGenerating ? "Generating..." : "Download PDF"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer size={13} />
              <span className="hidden xs:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                isDark ? "hover:bg-slate-800 text-slate-400 hover:text-white" : "hover:bg-slate-200 text-slate-500 hover:text-slate-800"
              }`}
              aria-label="Close Resume"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Browser Preview PDF Instructions bar */}
        <div className={`px-6 py-2.5 flex flex-col gap-1.5 border-b text-[11px] font-mono shrink-0 ${
          isDark ? "bg-[#111A2E]/50 border-slate-800/80 text-emerald-400/90" : "bg-emerald-50/70 border-emerald-100 text-emerald-800"
        }`}>
          <div className="flex items-center gap-2">
            <AlertCircle size={13} className="shrink-0 text-amber-500" />
            <span>
              <strong>Pro Tip:</strong> Click "Print / Save PDF", choose <strong>"Save as PDF"</strong>, set Margins to <strong>"None"</strong>, and check <strong>"Background graphics"</strong>!
            </span>
          </div>
          {isInIframe && (
            <div className="text-[10px] text-amber-500/95 border-t border-slate-800/20 dark:border-slate-800/40 pt-1 mt-0.5 leading-relaxed">
              ⚠️ <strong>Iframe Notice:</strong> Direct download may be blocked by sandboxed iframes. If "Download PDF" is unresponsive, click the <strong>"Open in New Tab"</strong> button in the top right of the preview header first, or click <strong>"Print / Save PDF"</strong>.
            </div>
          )}
        </div>

        {/* Scrollable Viewable Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950/20 scrollbar-thin">
          <div
            id="printable-resume"
            className={`w-full max-w-3xl mx-auto p-8 md:p-12 rounded-lg border shadow-lg font-sans transition-all duration-300 text-left ${
              printTheme === "classic"
                ? "bg-white border-slate-300 text-slate-800"
                : "bg-[#090D16] border-[#10B981]/30 text-slate-200"
            }`}
          >
            {/* Header section */}
            <div className={`border-b pb-6 ${printTheme === "classic" ? "border-slate-300" : "border-slate-800"}`}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <h1 className={`text-3xl font-bold tracking-tight print-black ${printTheme === "classic" ? "text-slate-900" : "text-emerald-400"}`}>
                    {profile.name}
                  </h1>
                  <p className={`text-sm font-mono font-bold tracking-wide uppercase print-gray ${printTheme === "classic" ? "text-emerald-600" : "text-emerald-500"}`}>
                    {profile.title}
                  </p>
                  <p className={`text-xs max-w-xl leading-relaxed print-gray ${printTheme === "classic" ? "text-slate-500" : "text-slate-400"}`}>
                    Computer Engineering undergraduate at C.K. Pithawala College with high proficiency in API design, Python frameworks (FastAPI, Flask), server-side database integration, and programmatic PDF rendering.
                  </p>
                </div>

                {/* Contact Coordinates */}
                <div className="flex flex-col gap-1.5 font-mono text-xs shrink-0 md:text-right">
                  <a href={`mailto:${profile.email}`} className={`hover:underline flex items-center md:justify-end gap-1.5 print-black ${printTheme === "classic" ? "text-slate-600" : "text-slate-300"}`}>
                    <Mail size={12} className="opacity-60" />
                    {profile.email}
                  </a>
                  <a href={`tel:${profile.phone}`} className={`hover:underline flex items-center md:justify-end gap-1.5 print-black ${printTheme === "classic" ? "text-slate-600" : "text-slate-300"}`}>
                    <Phone size={12} className="opacity-60" />
                    {profile.phone}
                  </a>
                  <div className={`flex items-center md:justify-end gap-1.5 print-gray ${printTheme === "classic" ? "text-slate-500" : "text-slate-400"}`}>
                    <MapPin size={12} className="opacity-60" />
                    {profile.location}
                  </div>
                  <a href="https://github.com/samarthrana027" target="_blank" rel="noreferrer" className={`hover:underline flex items-center md:justify-end gap-1.5 font-semibold print-black ${printTheme === "classic" ? "text-emerald-600" : "text-emerald-400"}`}>
                    <ArrowUpRight size={12} className="opacity-70" />
                    github.com/samarthrana027
                  </a>
                </div>
              </div>
            </div>

            {/* Main resume columns */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
              
              {/* Left Main Stream (Projects and Experience) */}
              <div className="md:col-span-8 space-y-6">
                
                {/* Projects Section */}
                <div className="space-y-4">
                  <h3 className={`text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 border-b pb-1.5 print-border print-black ${
                    printTheme === "classic" ? "text-slate-900 border-slate-200" : "text-emerald-400 border-slate-800"
                  }`}>
                    <Code2 size={13} />
                    Core Project Catalog
                  </h3>

                  <div className="space-y-4">
                    {/* Project 1 */}
                    <div className="space-y-1 print-no-break">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold text-sm print-black ${printTheme === "classic" ? "text-slate-800" : "text-slate-100"}`}>
                          Employeemanage_fastapi
                        </h4>
                        <span className={`text-[10px] font-mono print-gray ${printTheme === "classic" ? "text-slate-500" : "text-emerald-400/80"}`}>
                          Python / FastAPI / PostgreSQL
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed print-gray ${printTheme === "classic" ? "text-slate-600" : "text-slate-300"}`}>
                        Designed a production-ready organizational management backend. Implemented secure routing architectures, automated department headcount mappings, and dynamic salary calculations. Leverage PostgreSQL and SQLAlchemy for relational integrity.
                      </p>
                    </div>

                    {/* Project 2 */}
                    <div className="space-y-1 print-no-break">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold text-sm print-black ${printTheme === "classic" ? "text-slate-800" : "text-slate-100"}`}>
                          Taskmanager_fastapi
                        </h4>
                        <span className={`text-[10px] font-mono print-gray ${printTheme === "classic" ? "text-slate-500" : "text-emerald-400/80"}`}>
                          FastAPI / SQLite / Pydantic
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed print-gray ${printTheme === "classic" ? "text-slate-600" : "text-slate-300"}`}>
                        A high-performance RESTful task execution API using async loops. Configured fully validated schemas via Pydantic models, detailed API documentation swagger schemas, and clean repository data-mapping paradigms.
                      </p>
                    </div>

                    {/* Project 3 */}
                    <div className="space-y-1 print-no-break">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold text-sm print-black ${printTheme === "classic" ? "text-slate-800" : "text-slate-100"}`}>
                          Taskmanager-Flask
                        </h4>
                        <span className={`text-[10px] font-mono print-gray ${printTheme === "classic" ? "text-slate-500" : "text-emerald-400/80"}`}>
                          Python / Flask / SQLite
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed print-gray ${printTheme === "classic" ? "text-slate-600" : "text-slate-300"}`}>
                        Engineered a full-stack, responsive workspace organizer enabling robust task tracking, categories sorting, and state transitions. Styled natively with Tailwind utility grids.
                      </p>
                    </div>

                    {/* Project 4 */}
                    <div className="space-y-1 print-no-break">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold text-sm print-black ${printTheme === "classic" ? "text-slate-800" : "text-slate-100"}`}>
                          Stopword-App
                        </h4>
                        <span className={`text-[10px] font-mono print-gray ${printTheme === "classic" ? "text-slate-500" : "text-emerald-400/80"}`}>
                          NLP / Streamlit / NLTK
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed print-gray ${printTheme === "classic" ? "text-slate-600" : "text-slate-300"}`}>
                        An interactive corpus cleaning NLP interface. Parses text files to strip natural language grammar stopwords, calculate frequency distributions, and output visual keyword insights.
                      </p>
                    </div>

                    {/* Project 5 */}
                    <div className="space-y-1 print-no-break">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold text-sm print-black ${printTheme === "classic" ? "text-slate-800" : "text-slate-100"}`}>
                          Invoice-Generate
                        </h4>
                        <span className={`text-[10px] font-mono print-gray ${printTheme === "classic" ? "text-slate-500" : "text-emerald-400/80"}`}>
                          Python / ReportLab (PDF)
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed print-gray ${printTheme === "classic" ? "text-slate-600" : "text-slate-300"}`}>
                        Programmatically design and render structured business PDF invoices with custom company logos, itemized math grids, totals and TAX additions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Professional Certifications */}
                <div className="space-y-3 print-no-break">
                  <h3 className={`text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 border-b pb-1.5 print-border print-black ${
                    printTheme === "classic" ? "text-slate-900 border-slate-200" : "text-emerald-400 border-slate-800"
                  }`}>
                    <Award size={13} />
                    Verified Credentials
                  </h3>

                  <div className={`p-4 rounded border transition-colors ${
                    printTheme === "classic" 
                      ? "bg-slate-50 border-slate-200 text-slate-800 print-bg-none print-border" 
                      : "bg-[#0F1626] border-slate-800 text-slate-300"
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-xs uppercase text-emerald-600 dark:text-emerald-400">
                          NPTEL Online Certification (IIT Kharagpur)
                        </h4>
                        <p className={`font-bold text-sm tracking-tight mt-1 print-black ${printTheme === "classic" ? "text-slate-800" : "text-white"}`}>
                          Programming in Java
                        </p>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 font-bold uppercase`}>
                        {profile.certificate.badge} Medal
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 font-mono text-[11px]">
                      <div>
                        <span className="opacity-60 block text-[9px] uppercase">Consolidated Score</span>
                        <strong className="text-emerald-500 text-xs">{profile.certificate.score}</strong>
                      </div>
                      <div>
                        <span className="opacity-60 block text-[9px] uppercase">Certification Roll ID</span>
                        <span className="font-semibold">{profile.certificate.rollNo}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Sidebar Stream (Education, Skills, Languages, Hobbies) */}
              <div className="md:col-span-4 space-y-6">
                
                {/* Academic Background */}
                <div className="space-y-3">
                  <h3 className={`text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 border-b pb-1.5 print-border print-black ${
                    printTheme === "classic" ? "text-slate-900 border-slate-200" : "text-emerald-400 border-slate-800"
                  }`}>
                    <GraduationCap size={13} />
                    Education
                  </h3>

                  <div className="space-y-4">
                    {profile.education.map((edu, idx) => (
                      <div key={idx} className="space-y-1 print-no-break">
                        <span className={`text-[9px] font-mono font-bold tracking-wide uppercase block print-gray ${
                          printTheme === "classic" ? "text-emerald-600" : "text-emerald-400/80"
                        }`}>
                          {edu.period}
                        </span>
                        <h4 className={`font-semibold text-xs leading-tight print-black ${printTheme === "classic" ? "text-slate-800" : "text-slate-100"}`}>
                          {edu.degree}
                        </h4>
                        <p className={`text-[11px] print-light-gray ${printTheme === "classic" ? "text-slate-500" : "text-slate-400"}`}>
                          {edu.institution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Skill Sets */}
                <div className="space-y-3">
                  <h3 className={`text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 border-b pb-1.5 print-border print-black ${
                    printTheme === "classic" ? "text-slate-900 border-slate-200" : "text-emerald-400 border-slate-800"
                  }`}>
                    <Code2 size={13} />
                    Core Skills
                  </h3>

                  <div className="space-y-3.5 text-xs font-mono">
                    {profile.skills.map((group, idx) => (
                      <div key={idx} className="space-y-1 print-no-break">
                        <span className="text-[10px] uppercase opacity-50 block">{group.category}</span>
                        <p className={`font-semibold ${printTheme === "classic" ? "text-slate-800" : "text-white"}`}>
                          {group.items.join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Linguistic Competencies */}
                <div className="space-y-3">
                  <h3 className={`text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 border-b pb-1.5 print-border print-black ${
                    printTheme === "classic" ? "text-slate-900 border-slate-200" : "text-emerald-400 border-slate-800"
                  }`}>
                    Languages
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between font-mono">
                      <span className="font-semibold">English</span>
                      <span className="opacity-60">Professional</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span className="font-semibold">Hindi</span>
                      <span className="opacity-60">Bilingual</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span className="font-semibold">Gujarati</span>
                      <span className="opacity-60">Native</span>
                    </div>
                  </div>
                </div>

                {/* Hobbies / Extras */}
                <div className="space-y-3 print-no-break">
                  <h3 className={`text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 border-b pb-1.5 print-border print-black ${
                    printTheme === "classic" ? "text-slate-900 border-slate-200" : "text-emerald-400 border-slate-800"
                  }`}>
                    Hobbies
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {profile.hobbies.map((hobby) => (
                      <span 
                        key={hobby} 
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border print-border print-black ${
                          printTheme === "classic" 
                            ? "bg-slate-50 border-slate-200 text-slate-700 print-bg-none" 
                            : "bg-slate-900 border-slate-800 text-slate-300"
                        }`}
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Print Footer Notice */}
            <div className={`mt-8 pt-4 border-t text-[10px] font-mono opacity-40 text-center flex justify-between print-border print-gray ${
              printTheme === "classic" ? "border-slate-200" : "border-slate-800"
            }`}>
              <span>Samarth Rana &copy; {new Date().getFullYear()}</span>
              <span>Generated programmatically via CV-Sync Engine v1.4</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
