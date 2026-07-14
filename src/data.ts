export interface Project {
  id: number;
  name: string;
  url: string;
  tech: string[];
  description: string;
  category: "Flask" | "FastAPI" | "CLI & Games" | "Utilities";
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface CertificateItem {
  title: string;
  provider: string;
  score: string;
  period: string;
  rollNo: string;
  badge: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  aboutMe: string;
  email: string;
  phone: string;
  location: string;
  education: EducationItem[];
  languages: string[];
  hobbies: string[];
  certificate: CertificateItem;
  projects: Project[];
  skills: SkillGroup[];
}

export const profile: ProfileData = {
  name: "Samarth Rana",
  title: "Computer Engineering Student",
  aboutMe: "As a student I am doing Computer Engineering at C.K. Pithawala College, Surat. I am learning new things, building software projects, and exploring different facets of computer science with a passion for continuous learning and problem solving.",
  email: "samarthrana148@gmail.com",
  phone: "+91 9726995988",
  location: "Surat, Gujarat, India",
  education: [
    {
      degree: "B.E. Computer Engineering",
      institution: "C.K. Pithawala College",
      period: "2024 - 2025 (Present)"
    },
    {
      degree: "12th Completed",
      institution: "Shri Swaminarayan Mission School",
      period: "2023 - 2024"
    },
    {
      degree: "10th Completed",
      institution: "Shri Swaminarayan Mission School",
      period: "2021 - 2022"
    }
  ],
  languages: ["English", "Hindi", "Gujarati"],
  hobbies: [
    "Reading",
    "Playing Cricket",
    "Travelling",
    "Video Editing",
    "Exploring new places"
  ],
  certificate: {
    title: "Programming in Java",
    provider: "NPTEL Online Certification (IIT Kharagpur)",
    score: "61% (Consolidated Score)",
    period: "Jan - Apr 2026 (12-Week Course)",
    rollNo: "NPTEL26CS36S866300370",
    badge: "Elite"
  },
  skills: [
    {
      category: "Programming Languages & Backend",
      items: ["Python (Programming Language)", "FastAPI", "Flask"]
    },
    {
      category: "Data Science, AI & ML",
      items: ["Pandas (Software)", "NumPy", "AI/ML", "Streamlit"]
    },
    {
      category: "Software & Systems Engineering",
      items: ["Computer Engineering", "Resiliency", "Web Design"]
    }
  ],
  projects: [
    {
      id: 1,
      name: "Taskmanager-Flask",
      url: "https://github.com/samarthrana027/Taskmanager-Flask",
      tech: ["Flask", "Python", "SQLite", "HTML", "Tailwind CSS"],
      description: "A complete web-based Task Manager to organize, prioritize, and track daily activities and projects seamlessly.",
      category: "Flask"
    },
    {
      id: 2,
      name: "Taskmanager_fastapi",
      url: "https://github.com/samarthrana027/Taskmanager_fastapi",
      tech: ["FastAPI", "Python", "Pydantic", "SQLAlchemy", "Uvicorn"],
      description: "A high-performance RESTful API for task management showcasing asynchronous endpoints, schemas, and robust error handling.",
      category: "FastAPI"
    },
    {
      id: 3,
      name: "Employeemanage_fastapi",
      url: "https://github.com/samarthrana027/Employeemanage_fastapi",
      tech: ["FastAPI", "Python", "PostgreSQL", "SQLAlchemy", "REST API"],
      description: "A comprehensive corporate backend system designed to manage employee roles, department allocations, and salaries.",
      category: "FastAPI"
    },
    {
      id: 4,
      name: "Passwordgernerator_fastapi",
      url: "https://github.com/samarthrana027/Passwordgernerator_fastapi",
      tech: ["FastAPI", "Python", "Tailwind CSS", "Randomization"],
      description: "A fast, API-backed secure password generation service with an elegant reactive Tailwind-styled user interface.",
      category: "FastAPI"
    },
    {
      id: 5,
      name: "Password-GeneratorFlask",
      url: "https://github.com/samarthrana027/Password-GeneratorFlask",
      tech: ["Flask", "Python", "Cryptography", "Bootstrap"],
      description: "A clean web application that allows users to customize length and character criteria to generate cryptographically safe passwords.",
      category: "Flask"
    },
    {
      id: 6,
      name: "Stopword-App",
      url: "https://github.com/samarthrana027/Stopword-App",
      tech: ["Streamlit", "Python", "NLTK", "NLP"],
      description: "An interactive Natural Language Processing tool built with Streamlit to filter stopwords from text and analyze frequency distributions.",
      category: "Utilities"
    },
    {
      id: 7,
      name: "My Chatbot",
      url: "https://github.com/samarthrana027/my-chatbot",
      tech: ["Python", "Pattern Matching", "NLP", "CLI"],
      description: "A conversational NLP chatbot engine that understands query intents and replies with contextual answers.",
      category: "Utilities"
    },
    {
      id: 8,
      name: "Invoice-Generate",
      url: "https://github.com/samarthrana027/Invoice-Generate",
      tech: ["Python", "ReportLab", "PDF Generation"],
      description: "A professional script that automates the generation of structured PDF invoices with custom company branding and itemized math.",
      category: "Utilities"
    },
    {
      id: 9,
      name: "Payment_Receipt",
      url: "https://github.com/samarthrana027/Payment_Receipt",
      tech: ["Python", "ReportLab", "Formatting"],
      description: "A quick, lightweight script to programmatically draft receipts, perfect for e-commerce or retail transactions.",
      category: "Utilities"
    },
    {
      id: 10,
      name: "7up7down-game",
      url: "https://github.com/samarthrana027/7up7down-game",
      tech: ["Python", "CLI", "Game Logic", "Probability"],
      description: "The traditional 7 Up 7 Down betting game recreated as a responsive command-line simulator.",
      category: "CLI & Games"
    },
    {
      id: 11,
      name: "Dicerolling-game",
      url: "https://github.com/samarthrana027/Dicerolling-game",
      tech: ["Python", "CLI", "Simulation"],
      description: "A engaging multi-player terminal dice roller with animations and customized score boards.",
      category: "CLI & Games"
    },
    {
      id: 12,
      name: "Anagram",
      url: "https://github.com/samarthrana027/Anagram",
      tech: ["Python", "Algorithms", "Strings"],
      description: "An algorithmic program capable of parsing letters and checking string configurations to identify anagram matches.",
      category: "CLI & Games"
    },
    {
      id: 13,
      name: "Number-Guessing-Game-CLI",
      url: "https://github.com/samarthrana027/Number-Guessing-Game-CLI",
      tech: ["Python", "CLI", "Randomization"],
      description: "An interactive CLI guessing game with dynamic difficulty level increments, try-counters, and score lists.",
      category: "CLI & Games"
    },
    {
      id: 14,
      name: "Sample_projectflask",
      url: "https://github.com/samarthrana027/Sample_projectflask",
      tech: ["Flask", "Python", "Boilerplate"],
      description: "A structural template for python web programs demonstrating routing best practices and static assets structure.",
      category: "Flask"
    },
    {
      id: 15,
      name: "Simple-Calculator-CLI",
      url: "https://github.com/samarthrana027/Simple-Calculator-CLI",
      tech: ["Python", "CLI", "Math"],
      description: "An interactive command-line interface calculator supporting fundamental arithmetic operations with error handling.",
      category: "CLI & Games"
    }
  ]
};
