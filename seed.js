import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./src/models/userModel.js";
import { ProfileSettings, HeroRole, HeroStat } from "./src/models/profileModel.js";
import { Skill, Highlight } from "./src/models/skillsModel.js";
import { Project } from "./src/models/projectsModel.js";
import { Experience } from "./src/models/experienceModel.js";
import { Education } from "./src/models/educationModel.js";
import { Certification } from "./src/models/certsModel.js";
import { Message } from "./src/models/messagesModel.js";

dotenv.config();

const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
  console.error("CRITICAL: MONGODB_URI is not set in .env file.");
  process.exit(1);
}

const seedData = async () => {
  try {
    console.log("Connecting to MongoDB database...");
    await mongoose.connect(connectionString);
    console.log("Connected successfully. Starting database seed operation...");

    // 1. Clear existing data
    console.log("Wiping existing collections...");
    await User.deleteMany({});
    await ProfileSettings.deleteMany({});
    await HeroRole.deleteMany({});
    await HeroStat.deleteMany({});
    await Highlight.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Education.deleteMany({});
    await Certification.deleteMany({});
    await Message.deleteMany({});
    console.log("Collections wiped.");

    // 2. Insert Users
    console.log("Seeding users...");
    await User.create({
      username: "admin",
      password_hash: "$2a$10$l3YkyFRlVm1hH9BuokCcruIa9TJS1pwo.3UGLCr9ZeZJ7Oykopp6u", // Hash for 'admin_secure_pass'
      email: "admin@deva.core",
      role: "admin",
      created_at: new Date("2026-06-14T00:34:50Z")
    });

    // 3. Insert Profile Settings
    console.log("Seeding profile settings...");
    await ProfileSettings.create({
      name: "Devanand Farkade",
      status: "FULL STACK DEVELOPER",
      core_stack: "React.js, Node.js, Express, Java",
      about_text: "I am a Full Stack Developer skilled in React.js and Node.js. I specialize in building efficient, scalable applications and contributing to high-performing development teams. With professional experience spanning MEAN stack implementations, Django backend APIs, and Java database operations, I deploy robust applications from database configurations to responsive frontend displays.",
      email: "devaapatil330@gmail.com",
      phone: "+91 9518331190",
      location: "Pune, Maharashtra, India",
      resume_url: "https://www.overleaf.com/project/69f4ccd2a77545648f1565de",
      github_url: "https://github.com/Devanandfarkade",
      linkedin_url: "https://linkedin.com/in/devanandfarkade",
      updated_at: new Date("2026-06-14T00:03:50Z")
    });

    // 4. Insert Hero Roles
    console.log("Seeding hero roles...");
    await HeroRole.create([
      { role_name: "MERN Stack Developer", display_order: 1 },
      { role_name: "Frontend Engineer", display_order: 2 },
      { role_name: "React Specialist", display_order: 3 },
      { role_name: "UI/UX Craftsman", display_order: 4 },
      { role_name: "Full Stack Builder", display_order: 5 }
    ]);

    // 5. Insert Hero Stats
    console.log("Seeding hero stats...");
    await HeroStat.create([
      { value: "2+", label: "Years Exp.", display_order: 1 },
      { value: "20+", label: "Projects", display_order: 2 },
      { value: "10+", label: "Clients", display_order: 3 },
      { value: "5+", label: "Certs", display_order: 4 }
    ]);

    // 6. Insert About Highlights
    console.log("Seeding about highlights...");
    await Highlight.create([
      { icon_name: "Code2", label: "CLEAN CODE PROTOCOL", description: "Writing modular, scalable, and highly documented architectures is my baseline default.", delay_offset: 0.10, display_order: 1 },
      { icon_name: "Rocket", label: "LATENCY OPTIMIZATION", description: "Obsessed with file size reductions, request pipelines, and 60fps frame budgets.", delay_offset: 0.15, display_order: 2 },
      { icon_name: "Coffee", label: "ALGORITHMIC RESOLVER Devaa", description: "Translating convoluted business logics into clean, decoupled web applications.", delay_offset: 0.20, display_order: 3 },
      { icon_name: "ShieldAlert", label: "SECURE INTRUSION", description: "Ensuring secure token handling, parameterized database queries, and clean input sanitizations.", delay_offset: 0.25, display_order: 4 }
    ]);

    // 7. Insert Skills
    console.log("Seeding skills...");
    await Skill.create([
      { name: "React.js", icon_name: "SiReact", level: 90, color_hex: "#61dafb", category: "FRONTEND", display_order: 1 },
      { name: "JavaScript", icon_name: "SiJavascript", level: 88, color_hex: "#f7df1e", category: "FRONTEND", display_order: 2 },
      { name: "Tailwind CSS", icon_name: "SiTailwindcss", level: 92, color_hex: "#06b6d4", category: "FRONTEND", display_order: 3 },
      { name: "HTML5", icon_name: "SiHtml5", level: 95, color_hex: "#e34f26", category: "FRONTEND", display_order: 4 },
      { name: "CSS3", icon_name: "SiCss", level: 90, color_hex: "#1572b6", category: "FRONTEND", display_order: 5 },
      { name: "Node.js", icon_name: "SiNodedotjs", level: 85, color_hex: "#339933", category: "BACKEND", display_order: 6 },
      { name: "Express.js", icon_name: "SiExpress", level: 82, color_hex: "#ffffff", category: "BACKEND", display_order: 7 },
      { name: "Java", icon_name: "FaJava", level: 86, color_hex: "#007396", category: "BACKEND", display_order: 8 },
      { name: "Spring Boot", icon_name: "FaServer", level: 78, color_hex: "#6db33f", category: "BACKEND", display_order: 9 },
      { name: "PostgreSQL", icon_name: "SiPostgresql", level: 80, color_hex: "#336791", category: "BACKEND", display_order: 10 },
      { name: "MongoDB", icon_name: "SiMongodb", level: 80, color_hex: "#47a248", category: "BACKEND", display_order: 11 },
      { name: "Git", icon_name: "SiGit", level: 88, color_hex: "#f05032", category: "TOOLS", display_order: 12 },
      { name: "GitHub", icon_name: "SiGithub", level: 90, color_hex: "#ffffff", category: "TOOLS", display_order: 13 },
      { name: "REST APIs", icon_name: "FaServer", level: 87, color_hex: "#00e5ff", category: "TOOLS", display_order: 14 }
    ]);

    // 8. Insert Projects
    console.log("Seeding projects...");
    await Project.create([
      {
        title: "BANK MANAGEMENT SYSTEM",
        description: "A comprehensive financial transaction ledger built to manage core banking operations. Implements user authentication, automated ledger entries, checking deposits, withdrawals, and calculations of ATM and debit card schedules.",
        category: "JAVA",
        repo_url: "https://github.com/Devanandfarkade",
        live_url: "",
        status: "STABLE",
        color_hex: "#39ff14",
        tags: ["Java", "MySQL", "JDBC", "Database Design", "Git"]
      },
      {
        title: "VEHICLE SERVICE CENTER",
        description: "An automated billing, scheduling, and invoicing system developed from scratch. Processes diagnostic logs, tracks inventory parts consumed, aggregates labor rates, and computes customer invoices with detailed cost summaries.",
        category: "JAVA",
        repo_url: "https://github.com/Devanandfarkade",
        live_url: "",
        status: "STABLE",
        color_hex: "#00e5ff",
        tags: ["Java", "Spring Boot", "MySQL", "Spring Tool Suite 4", "REST APIs"]
      }
    ]);

    // 9. Insert Experiences
    console.log("Seeding experiences...");
    await Experience.create([
      {
        role: "Full Stack Developer",
        company: "RajYug IT Solutions",
        location: "Pune, India",
        period: "Dec 2025 – Present",
        type: "Full-Time",
        description: "Contributing to enterprise-grade web applications using the MEAN stack and Java technologies.",
        points: [
          "Involved in frontend development, backend API integration, database design, and performance optimization within agile teams.",
          "Enhanced usability, data accuracy, and automation for professional and client applications.",
          "Developed modular REST APIs and streamlined data validation processes."
        ],
        tech: ["MongoDB", "Express.js", "Angular", "Node.js", "Java", "REST APIs"],
        color_hex: "#39ff14",
        display_order: 1
      },
      {
        role: "Software Development Engineer (SDE)",
        company: "Bluestock Fintech",
        location: "Pune, India",
        period: "Apr 2025 – May 2025",
        type: "Contract",
        description: "Engineered high-throughput IPO tracking applications and REST API web nodes.",
        points: [
          "Developed a production-level IPO web application and REST API using Django and PostgreSQL.",
          "Created secure APIs delivering IPO data including company info, price band, dates, and status.",
          "Coordinated with testing teams under agile methodology to minimize deployment stutters."
        ],
        tech: ["Django", "Python", "PostgreSQL", "REST APIs", "JavaScript", "SQL"],
        color_hex: "#00e5ff",
        display_order: 2
      },
      {
        role: "Java Developer Intern",
        company: "Mass Technologies",
        location: "Pune, India",
        period: "Jan 2025 – Apr 2025",
        type: "Internship",
        description: "Programmed educational and administrative systems using Java web architectures.",
        points: [
          "Developed an attendance system using Java, JSP, and MySQL with role-based logins and tracking features.",
          "Refactored relational schemas to improve database query execution times.",
          "Built simple, clean web frontends using JSP, CSS, and HTML5 templates."
        ],
        tech: ["Java", "JSP", "Servlets", "MySQL", "HTML5", "CSS3"],
        color_hex: "#ff007f",
        display_order: 3
      }
    ]);

    // 10. Insert Education
    console.log("Seeding education...");
    await Education.create([
      {
        degree: "Master of Computer Applications (MCA)",
        institution: "JSPM Narhe Technical Campus",
        location: "Pune, MH, India",
        period: "2023 – 2025",
        grade: "8.03 CGPA",
        highlights: [
          "Acquired expertise in Advanced Web Technologies and Cloud computing.",
          "Developed web applications integrating React.js client layers with Node.js REST nodes.",
          "Focused on database efficiency, object-oriented concepts, and software architecture."
        ],
        color_hex: "#39ff14",
        display_order: 1
      },
      {
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "CMCS College Nashik",
        location: "Nashik, MH, India",
        period: "2019 – 2022",
        grade: "6.67 CGPA",
        highlights: [
          "Studied programming fundamentals, data structures, and database management systems (DBMS).",
          "Completed graduation with strong foundations in software engineering paradigms.",
          "Engineered database projects utilizing relational structures and SQL queries."
        ],
        color_hex: "#00e5ff",
        display_order: 2
      }
    ]);

    // 11. Insert Certifications
    console.log("Seeding certifications...");
    await Certification.create([
      {
        title: "Java Full Stack Development",
        issuer: "QSpiders Wakad, Pune",
        date: "Mar 2023 - Sep 2023",
        credential_id: "QS-JFS-2023",
        link: "https://qspiders.com",
        skills: ["Java", "SQL", "Web Technologies", "J2EE"],
        icon_emoji: "☕",
        color_hex: "#39ff14",
        display_order: 1
      },
      {
        title: "Java Full Stack Development",
        issuer: "Symbiosis (Capgemini), Pune",
        date: "Jun 2024 - Aug 2024",
        credential_id: "SYM-CAP-24",
        link: "https://capgemini.com",
        skills: ["Enterprise Java", "Spring Boot", "Angular", "Agile"],
        icon_emoji: "💻",
        color_hex: "#00e5ff",
        display_order: 2
      },
      {
        title: "Technology's Impact on Business",
        issuer: "HP LIFE Online Course",
        date: "Oct 2022 - Nov 2022",
        credential_id: "HP-LIFE-2022",
        link: "https://life-global.org",
        skills: ["Business IT", "Tech Strategy", "Analytics"],
        icon_emoji: "📊",
        color_hex: "#ffb700",
        display_order: 3
      },
      {
        title: "Basics of Java Certification",
        issuer: "CodeChef",
        date: "Aug 23",
        credential_id: "CC-JAVA-23",
        link: "https://codechef.com",
        skills: ["Java Basics", "OOPs", "Problem Solving"],
        icon_emoji: "🍳",
        color_hex: "#ff007f",
        display_order: 4
      }
    ]);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Critical: Failed to seed MongoDB database:", error);
    process.exit(1);
  }
};

seedData();
