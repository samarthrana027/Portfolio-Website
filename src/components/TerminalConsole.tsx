import React, { useState, useEffect, useRef } from "react";
import { Terminal, Cpu, Play, Trash2, ArrowRight } from "lucide-react";
import { profile } from "../data";

interface LogLine {
  type: "system" | "input" | "output";
  text: string;
}

export const TerminalConsole: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [history, setHistory] = useState<LogLine[]>([
    { type: "system", text: "SAMARTH_SYS CORE [v1.4.2] initialized." },
    { type: "system", text: "Type a command or click a quick shortcut below to interact." }
  ]);
  const [inputVal, setInputVal] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newLogs: LogLine[] = [
      ...history,
      { type: "input", text: `~ $ ${cmd}` }
    ];

    switch (trimmed) {
      case "help":
        newLogs.push({
          type: "output",
          text: `Available system tasks:
  - about     : Print engineering goals & educational context
  - projects  : Display key active GitHub repositories
  - sys       : Print real-time container metrics & system specs
  - certs     : View verified NPTEL Swayam credentials
  - contact   : Query email and endpoint routing data
  - clear     : Flush terminal history buffer`
        });
        break;
      case "about":
        newLogs.push({
          type: "output",
          text: `ENGINEER SUMMARY:
  Name        : ${profile.name}
  Role        : ${profile.title}
  Focus       : Backend API engineering, automation & database structures
  Bio         : ${profile.aboutMe}`
        });
        break;
      case "projects":
        newLogs.push({
          type: "output",
          text: `CATALOG OUTPUT (${profile.projects.length} Total Repositories):
  - Taskmanager-Flask       [Tech: Flask, SQLite, HTML]
  - Taskmanager_fastapi     [Tech: FastAPI, SQLAlchemy, Uvicorn]
  - Employeemanage_fastapi  [Tech: FastAPI, PostgreSQL, Alchemy]
  - Stopword-App            [Tech: Streamlit, NLP, NLTK]
  - 7up7down-game           [Tech: Python CLI, Probability]
  * Type 'projects' in terminal or check interactive grid below for more details.`
        });
        break;
      case "sys":
        newLogs.push({
          type: "output",
          text: `SYSTEM ARCHITECTURE SPECIFICATIONS:
  - SYSTEM STATE : ACTIVE [HEALTH: 100%]
  - ENGINE_CORE  : Vite React + TypeScript v5.0
  - PLATFORM     : Cloud Ingress Container (Port: 3000)
  - COORDINATES  : 21.1702° N, 72.8311° E (Surat, GJ, India)
  - CURRENT_TIME : ${new Date().toLocaleTimeString()} UTC+5:30
  - FRAME_SYNC   : 60Hz Latency < 1ms`
        });
        break;
      case "certs":
        newLogs.push({
          type: "output",
          text: `VERIFIED PROFESSIONAL CREDENTIAL:
  - Course      : ${profile.certificate.title}
  - Issuer      : ${profile.certificate.provider}
  - Score       : ${profile.certificate.score}
  - Medal Badge : ${profile.certificate.badge} Certified
  - Roll No     : ${profile.certificate.rollNo}`
        });
        break;
      case "contact":
        newLogs.push({
          type: "output",
          text: `SECURE NETWORKING CHANNELS:
  - EMAIL_ADDR  : ${profile.email}
  - MOBILE_TEL  : ${profile.phone}
  - LOCATION    : ${profile.location}`
        });
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      default:
        newLogs.push({
          type: "output",
          text: `sys_err: Command '${cmd}' not recognized. Type 'help' to print options.`
        });
    }

    setHistory(newLogs);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(inputVal);
    }
  };

  const quickActions = ["help", "sys", "projects", "certs", "clear"];

  return (
    <div className={`rounded-lg border overflow-hidden flex flex-col font-mono text-xs shadow-xl transition-all h-[360px] ${
      isDark 
        ? "bg-[#0A0F1E] border-brand-border-dark text-[#00F59B]" 
        : "bg-[#090D16] border-slate-700 text-[#00FF9D]"
    }`}>
      {/* Terminal Title Bar */}
      <div className="px-4 py-2 bg-[#0F1626] border-b border-slate-800 flex items-center justify-between text-slate-400 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
          <span className="ml-2 font-mono font-medium text-[10px] text-slate-300 flex items-center gap-1">
            <Terminal size={11} className="text-emerald-400 animate-pulse" />
            samarth@sys-console: ~
          </span>
        </div>
        <span className="text-[9px] font-mono opacity-50 uppercase flex items-center gap-1">
          <Cpu size={10} className="text-slate-500" />
          Node-Ingress
        </span>
      </div>

      {/* Terminal Output Log Area */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-2.5 scrollbar-thin select-text min-h-0 bg-[#070A13]"
      >
        {history.map((log, index) => {
          if (log.type === "system") {
            return (
              <div key={index} className="text-slate-400 text-[11px] leading-relaxed border-l-2 border-emerald-500/30 pl-2">
                {log.text}
              </div>
            );
          }
          if (log.type === "input") {
            return (
              <div key={index} className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="text-slate-500">~</span>
                <span>{log.text}</span>
              </div>
            );
          }
          return (
            <pre key={index} className="text-slate-300 font-mono text-[11px] whitespace-pre-wrap leading-relaxed pl-3 border-l border-emerald-500/20">
              {log.text}
            </pre>
          );
        })}
      </div>

      {/* Interactive Input Bar */}
      <div className="p-3 bg-[#0D1322] border-t border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold shrink-0">~ $</span>
          <input
            type="text"
            placeholder="Type a command (e.g. help, projects, sys)..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent text-slate-200 border-none outline-hidden w-full focus:ring-0 placeholder-slate-600 font-mono text-xs py-0.5"
          />
          <button 
            onClick={() => runCommand(inputVal)}
            className="p-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors cursor-pointer shrink-0"
            title="Execute line"
          >
            <ArrowRight size={12} />
          </button>
        </div>

        {/* Quick action helper buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-800/60 text-[9px] text-slate-500">
          <span className="uppercase tracking-widest opacity-60 mr-1 select-none font-bold">Fast Run:</span>
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => runCommand(action)}
              className="px-2 py-0.5 rounded border border-slate-800 bg-[#0D1527] hover:border-emerald-500/50 hover:text-emerald-400 text-slate-400 transition-all cursor-pointer font-mono font-medium flex items-center gap-1"
            >
              {action === "clear" ? <Trash2 size={8} /> : <Play size={8} />}
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
