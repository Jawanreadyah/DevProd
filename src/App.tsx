/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BadgeCheck, Home, Folder, User, Mail, ChevronRight, Plus, Star, Twitter, Linkedin, ArrowLeft, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import * as React from 'react';
import { useState, useRef } from 'react';
import { motion } from "motion/react";
import { ActivityCalendar } from 'react-activity-calendar';
import { CommitsGrid } from './components/ui/commits-grid';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("GitHubCalendar error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p className="text-gray-500 text-sm">GitHub activity currently unavailable.</p>;
    }
    return (this as any).props.children;
  }
}

const PROJECTS_DATA = [
  {
    id: "zeal-it-events",
    title: "Zeal it Events",
    category: "Landing Page",
    image: "https://i.ibb.co/WN7Vjx4q/image.png",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Greenora",
    images: [
      "https://i.ibb.co/WN7Vjx4q/image.png",
      "https://i.ibb.co/XkdkgW10/image.png",
      "https://i.ibb.co/hF1Sz81z/width-1904.webp"
    ],
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
    deliveryTime: "2 Weeks",
    description: "A vibrant and engaging landing page designed for Zeal it Events, focusing on high conversion rates and a seamless user experience. The project involved creating custom animations and a responsive layout that works perfectly across all devices."
  },
  {
    id: "neetcode",
    title: "NeetCode",
    category: "Saas",
    image: "https://i.ibb.co/hJ8gF3bN/image.png",
    logo: null,
    images: [
      "https://i.ibb.co/hJ8gF3bN/image.png",
      "https://i.ibb.co/VWBCXt59/Screenshot-2026-04-14-194231.png",
      "https://i.ibb.co/45nCYvy/neet-code-vercel-app-4.png"
    ],
    techStack: ["Next.js", "TypeScript", "Supabase"],
    deliveryTime: "4 Weeks",
    description: "A comprehensive SaaS platform built for developers to practice coding interviews. Features include user authentication, progress tracking, and an interactive code editor integrated directly into the browser."
  },
  {
    id: "marza-hypermarket",
    title: "Marza Hypermarket",
    category: "Landing Page(Personal Project)",
    image: "https://i.ibb.co/B21cSYxL/image.png",
    logo: null,
    images: [
      "https://i.ibb.co/B21cSYxL/image.png",
      "https://i.ibb.co/PZ8Kk9mm/image.png",
      "https://i.ibb.co/G45KT4fz/image.png"
    ],
    techStack: ["Vue.js", "Tailwind CSS", "Firebase"],
    deliveryTime: "3 Weeks",
    description: "A modern e-commerce landing page concept for a hypermarket. The design emphasizes product visibility, easy navigation, and a clean aesthetic to enhance the online shopping experience."
  }
];

function VinylPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div 
      className="fixed top-24 right-6 z-40 w-24 sm:w-32 flex flex-col items-center gap-2"
      animate={isPlaying ? { y: 40 } : { y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative w-24 h-24 sm:w-32 sm:h-32">
        {/* Audio element */}
        <audio ref={audioRef} loop>
          <source src="https://od.lk/s/OTBfNDM3OTM0NjRf/Kendrick%20Lamar%20%26%20SZA%20-%20All%20The%20Stars%20%28Instrumental%29%20%281%29.mp3" type="audio/mpeg" />
        </audio>

        {/* Vinyl Record Container */}
        <motion.div
          className="absolute top-0 left-[5%] w-[90%] h-[90%] z-0"
          initial="closed"
          animate={isPlaying ? "playing" : "closed"}
          variants={{
            closed: { y: "0%" },
            playing: { y: "-50%" }
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* The spinning record */}
          <div 
            className="w-full h-full rounded-full bg-black shadow-xl border-4 border-gray-900 flex items-center justify-center animate-spin"
            style={{ 
              animationDuration: '3s', 
              animationPlayState: isPlaying ? 'running' : 'paused' 
            }}
          >
            {/* Record grooves */}
            <div className="w-[85%] h-[85%] rounded-full border border-gray-800 absolute" />
            <div className="w-[70%] h-[70%] rounded-full border border-gray-800 absolute" />
            <div className="w-[55%] h-[55%] rounded-full border border-gray-800 absolute" />
            {/* Record label */}
            <div className="w-[35%] h-[35%] bg-red-500 rounded-full border-2 border-black" />
            <div className="w-2 h-2 bg-white rounded-full absolute" />
          </div>
        </motion.div>

        {/* Album Case */}
        <div 
          className="absolute bottom-0 left-0 w-full h-full bg-gray-200 rounded-lg shadow-2xl border border-gray-300 z-10 flex items-center justify-center cursor-pointer overflow-hidden group"
          onClick={togglePlay}
        >
          {/* Placeholder for album cover */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
            <img src="https://i.scdn.co/image/ab67616d0000b273c027ad28821777b00dcaa888" alt="Album Cover" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          
          {/* Play/Pause overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {isPlaying ? (
              <Pause className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" fill="currentColor" />
            ) : (
              <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" fill="currentColor" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}




import { Feed } from './components/Feed';

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen pb-32 pt-12 px-4 sm:px-8 lg:px-12 xl:px-20 flex flex-col lg:flex-row justify-center w-full max-w-[1700px] mx-auto gap-8 lg:gap-8 font-sans bg-white">
      <VinylPlayer />

      {/* Main Content */}
      <div className="w-full lg:w-[650px] xl:w-[750px] bg-[#F8FAFC] rounded-[2.5rem] p-3 sm:p-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,1),inset_0_0_0_1px_rgba(255,255,255,0.4)] shrink-0 z-20 relative border border-black/5">
        <div className="space-y-2 sm:space-y-3">
          <div id="home"><HeaderCard scrollTo={scrollTo} navigate={navigate} /></div>
          <div id="projects"><SelectedWorks /></div>
          <div id="about"><AboutMe scrollTo={scrollTo} /></div>
          <Services scrollTo={scrollTo} />
          <GitHubActivity />
          <div id="experience"><Experience /></div>
          <StacksAndSkills />
          <FAQ />
          <div id="contact"><Contact /></div>
          <Footer />
        </div>
      </div>
      
      {/* Sticky Carousel */}
      <div className="hidden lg:block w-[400px] h-screen sticky top-12 z-10">
        <Feed />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
      </Routes>
      <FloatingNav />
    </BrowserRouter>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-[#F5F5F5] rounded-3xl p-8 sm:p-10 border border-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,1),inset_0_0_0_1px_rgba(255,255,255,0.4),0_2px_8px_rgba(0,0,0,0.04)] ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <h2 className={`text-sm font-bold tracking-[0.2em] text-gray-900 uppercase mb-8 ${className}`}>
      {children}
    </h2>
  );
}

function HeaderCard({ scrollTo, navigate }: { scrollTo: (id: string) => void, navigate: any }) {
  const [showDiscordToast, setShowDiscordToast] = React.useState(false);

  const copyDiscord = () => {
    navigator.clipboard.writeText("azuz2878");
    setShowDiscordToast(true);
    setTimeout(() => setShowDiscordToast(false), 2000);
  };

  return (
    <Card className="relative">
      <div className="absolute top-8 right-8 flex gap-3">
        <a href="https://x.com/Wavy93919129" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/330px-X_logo_2023.svg.png?_=20250120013756" alt="X" className="w-5 h-5" referrerPolicy="no-referrer" />
        </a>
        <a href="https://www.linkedin.com/in/family-not-guy-19b810313/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
          <img src="https://cdn-icons-png.flaticon.com/512/3991/3991775.png" alt="LinkedIn" className="w-5 h-5" referrerPolicy="no-referrer" />
        </a>
        <button onClick={copyDiscord} className="text-gray-400 hover:text-gray-600 transition-colors relative">
          <img src="https://i.ibb.co/HD8DWFBn/image.png" alt="Discord" className="w-6 h-6" referrerPolicy="no-referrer" />
          {showDiscordToast && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-3 py-1 rounded-lg text-xs shadow-lg z-50 whitespace-nowrap border border-gray-100">
              Username copied: azuz2878
            </div>
          )}
        </button>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center overflow-hidden border-[3px] border-white shadow-md">
          <img src="https://cdn.discordapp.com/avatars/812387714241396736/1d4d460fc56840c97a734b3ccb10b910.webp?size=128" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <h1 className="text-2xl font-bold text-gray-900">DevProd</h1>
        <img src="https://cdn-icons-png.flaticon.com/512/16740/16740079.png" alt="Verified" className="w-5 h-5" referrerPolicy="no-referrer" />
      </div>
      <p className="text-gray-500 text-sm mb-6">Web Designer</p>
      <p className="text-gray-700 text-base leading-relaxed mb-8 max-w-md">
        Crafting interactive, user-centered experiences that bring ideas to life through thoughtful design and seamless digital execution.
      </p>
      <div className="flex gap-3">
        <button onClick={() => scrollTo('contact')} className="bg-[linear-gradient(180deg,#222222_0%,#000000_100%)] text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:opacity-90 transition-all shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
          Hire Me
        </button>
        <button onClick={() => navigate('/projects')} className="bg-white text-gray-900 px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-gray-50 transition-all shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
          View Works
        </button>
      </div>
    </Card>
  );
}

function SelectedWorks() {
  const navigate = useNavigate();

  return (
    <Card>
      <SectionTitle>Selected Works</SectionTitle>
      <div className="space-y-6">
        {PROJECTS_DATA.map((work, index) => (
          <div key={index} onClick={() => navigate(`/projects/${work.id}`)} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-shadow">
            <div className="relative rounded-2xl overflow-hidden aspect-video mb-6 bg-gray-200">
              <img src={work.image} alt={work.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-medium pb-2">
              <span className="text-gray-900 font-bold">{work.title}</span>
              <span className="text-gray-400">—</span>
              <span className="text-gray-500">{work.category}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AboutMe({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
    <Card>
      <SectionTitle>About Me</SectionTitle>
      <div className="relative h-48 mb-8">
        <div className="absolute left-0 top-0 w-32 h-32 rounded-2xl overflow-hidden border-4 border-white z-10 rotate-[-5deg] shadow-sm">
          <img src="https://lh3.googleusercontent.com/a/ACg8ocLXI0HJDCwTiTXCvC61hserpGx62g5j-U9Kk8KKyqeSLCEhNjM=s288-c-no" alt="Portrait 1" className="w-full h-full object-cover" />
        </div>
        <div className="absolute left-20 top-8 w-36 h-36 rounded-2xl overflow-hidden border-4 border-white z-20 rotate-[5deg] shadow-md">
          <img src="https://cdn.discordapp.com/avatars/812387714241396736/1d4d460fc56840c97a734b3ccb10b910.webp?size=128" alt="Portrait 2" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="space-y-4 text-gray-700 text-base leading-relaxed mb-8">
        <p>
          I'm DevProd, a passionate digital designer and  developer who bridges creativity with technology. Currently exploring new ways to craft meaningful digital experiences, I'm driven by curiosity and a love for clean, purposeful design.
        </p>
        <p>
          I thrive on transforming ideas into reality — whether it's shaping intuitive interfaces, crafting distinctive brand identities, designing immersive visuals, or building websites that feel effortless to use.
        </p>
      </div>
      <button onClick={() => scrollTo('contact')} className="bg-[#000000] text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-[0_10px_20px_rgba(0,0,0,0.25)]">
        Get in Touch
      </button>
    </Card>
  );
}

function Services({ scrollTo }: { scrollTo: (id: string) => void }) {
  const services = [
    {
      id: "01",
      title: "Web Design",
      description: "I create clean, functional websites that reflect your brand and engage your audience with clarity and purpose.",
      bgColor: "bg-orange-50",
      pinColor: "bg-red-600"
    },
    {
      id: "02",
      title: "No code Development",
      description: "I build functional websites and apps using no-code tools, turning ideas into efficient, live digital experiences.",
      bgColor: "bg-blue-50",
      pinColor: "bg-red-600"
    },
    {
      id: "03",
      title: "Branding",
      description: "I craft distinctive brand identities that capture your vision and communicate your story through compelling visuals and thoughtful design.",
      bgColor: "bg-orange-50",
      pinColor: "bg-red-600"
    }
  ];

  return (
    <Card className="flex flex-col items-center">
      <SectionTitle>Services</SectionTitle>
      <div className="w-full space-y-4 sm:space-y-6 relative flex flex-col px-2 sm:px-8">
        {services.map((service, index) => (
          <div key={service.id} className={`relative bg-white rounded-3xl p-6 sm:p-8 shadow-[0_0_20px_rgba(0,0,0,0.04)] border border-gray-100 w-full max-w-[240px] transform transition-transform hover:-translate-y-1 ${index % 2 === 0 ? 'self-start -rotate-2' : 'self-end rotate-2'}`}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 w-12 h-12">
              <img src="https://framerusercontent.com/images/pQSIhyVSrKe5ubgcAAi5huBUI.png?scale-down-to=512&width=551&height=476" alt="Pin" className="w-full h-full object-contain" />
            </div>
            <div className="text-gray-500 font-mono text-sm font-bold mb-4">{service.id}</div>
            <div className={`rounded-2xl p-5 ${service.bgColor} shadow-[0_4px_10px_rgba(0,0,0,0.05)]`}>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16">
        <button onClick={() => scrollTo('contact')} className="bg-[linear-gradient(180deg,#222222_0%,#000000_100%)] text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:opacity-90 transition-all shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
          Book a Service
        </button>
      </div>
    </Card>
  );
}

function GitHubActivity() {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('https://github-contributions-api.deno.dev/jawanreadyah.json')
      .then(r => r.json())
      .then(d => {
        const levels: Record<string, number> = {
          NONE: 0,
          FIRST_QUARTILE: 1,
          SECOND_QUARTILE: 2,
          THIRD_QUARTILE: 3,
          FOURTH_QUARTILE: 4
        };
        const transformedData = d.contributions.flat().map((item: any) => ({
          date: item.date,
          count: item.contributionCount,
          level: levels[item.contributionLevel] ?? 0
        }));
        setData(transformedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("GitHub fetch error", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <Card className="text-center">
      <SectionTitle>GitHub Activity</SectionTitle>
      <div className="flex justify-center overflow-x-auto min-h-[150px] items-center">
        {loading && <p className="text-gray-500 text-sm">Loading GitHub activity...</p>}
        {error && <p className="text-gray-500 text-sm">GitHub activity currently unavailable.</p>}
        {!loading && !error && data && (
          <ErrorBoundary>
            <ActivityCalendar
              data={data}
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
              }}
              maxLevel={4}
              labels={{
                totalCount: '{{count}} contributions in the last year'
              }}
            />
          </ErrorBoundary>
        )}
      </div>
    </Card>
  );
}

function Experience() {
  const experiences = [
    {
      company: "Bolt.new",
      role: "Hackathon Participant",
      period: "2025",
      logo: "https://cdn-1.webcatalog.io/catalog/bolt-new/bolt-new-icon-filled-256.png?v=1730692903154"
    },
    {
      company: "Lovable",
      role: "Hackathon Top 100",
      period: "2025",
      logo: "https://lovable.dev/favicon.ico"
    },
    {
      company: "Kiro",
      role: "Hackathon Participant",
      period: "2025",
      logo: "https://kiro.dev/icon.svg?fe599162bb293ea0"
    }
  ];

  return (
    <Card>
      <SectionTitle>Experience</SectionTitle>
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-[0_0_20px_rgba(0,0,0,0.04)] border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 border border-gray-100">
                <img src={exp.logo} alt={exp.company} className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{exp.company}</h4>
                <p className="text-sm text-gray-500">{exp.role}</p>
              </div>
            </div>
            <div className="text-sm font-mono text-gray-500 font-medium">
              {exp.period}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function StacksAndSkills() {
  const skills = [
    { name: "Vue.js", category: "Frontend Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
    { name: "TypeScript", category: "Language", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { name: "Supabase", category: "Backend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
    { name: "Firebase", category: "Backend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
    { name: "Claude", category: "AI Model", logo: "https://cdn.simpleicons.org/anthropic/D97757" },
    { name: "Gemini", category: "AI Model", logo: "https://cdn.simpleicons.org/googlegemini/8E75B2" },
    { name: "Tailwind CSS", category: "Styling", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "React", category: "Frontend Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" }
  ];

  return (
    <Card>
      <SectionTitle>Stacks & Skills</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 flex items-center gap-4 border-2 border-dashed border-gray-200">
            <div className="w-12 h-12 flex items-center justify-center shrink-0">
              <img src={skill.logo} alt={skill.name} className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{skill.name}</h4>
              <p className="text-sm text-gray-500">{skill.category}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const faqs = [
    { question: "What web development services do you offer?", answer: "I specialize in building modern, responsive, and high-performance web applications using technologies like React, Vue.js, and TypeScript." },
    { question: "Do you provide UI/UX design services?", answer: "Yes, I create intuitive and aesthetically pleasing designs, focusing on user experience and modern design principles." },
    { question: "How long does a typical web project take?", answer: "Project timelines depend on the scope and complexity, but most projects are completed within 3 to 8 weeks." },
    { question: "Can you help with existing website improvements?", answer: "Absolutely! I can help optimize performance, update designs, and add new features to your existing website." }
  ];

  return (
    <Card>
      <SectionTitle>Frequently Asked Questions</SectionTitle>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">{faq.question}</span>
              <Plus className={`w-5 h-5 text-gray-400 transition-transform ${expandedIndex === index ? 'rotate-45' : ''}`} />
            </div>
            {expandedIndex === index && (
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

function Contact() {
  const [showToast, setShowToast] = useState(false);
  const [showDiscordToast, setShowDiscordToast] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("dev2006me@gmail.com");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const copyDiscord = () => {
    navigator.clipboard.writeText("azuz2878");
    setShowDiscordToast(true);
    setTimeout(() => setShowDiscordToast(false), 2000);
  };

  return (
    <Card className="relative">
      <SectionTitle>Contact</SectionTitle>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        I'm always open to new projects, collaborations, or a conversation about design. If you have an idea in mind or want to connect, feel free to get in touch.
      </p>
      <div className="flex gap-4 mb-8 text-gray-500 relative">
        <a href="https://x.com/Wavy93919129" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/330px-X_logo_2023.svg.png?_=20250120013756" alt="X" className="w-6 h-6" referrerPolicy="no-referrer" />
        </a>
        <button onClick={copyDiscord} className="hover:text-gray-900 transition-colors relative">
          <img src="https://i.ibb.co/HD8DWFBn/image.png" alt="Discord" className="w-7 h-7" referrerPolicy="no-referrer" />
          {showDiscordToast && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-3 py-1 rounded-lg text-xs shadow-lg z-50 whitespace-nowrap border border-gray-100">
              Username copied: azuz2878
            </div>
          )}
        </button>
        <a href="https://www.linkedin.com/in/family-not-guy-19b810313/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
          <img src="https://cdn-icons-png.flaticon.com/512/3991/3991775.png" alt="LinkedIn" className="w-6 h-6" referrerPolicy="no-referrer" />
        </a>
        <a href="mailto:dev2006me@gmail.com" className="hover:text-gray-900 transition-colors">
          <Mail className="w-6 h-6" />
        </a>
        <button onClick={copyEmail} className="hover:text-gray-900 transition-colors relative">
          <span className="text-xs">Copy Email</span>
          {showToast && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-3 py-1 rounded-lg text-xs shadow-lg z-50 whitespace-nowrap border border-gray-100">
              Email copied!
            </div>
          )}
        </button>
      </div>
      <form action="https://formsubmit.co/dev2006me@gmail.com" method="POST" className="space-y-4">
        <input type="hidden" name="_next" value={window.location.href} />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-900">Name</label>
            <input type="text" name="name" required placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-900">Email</label>
            <input type="email" name="email" required placeholder="johndoe@gmail.com" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-900">Message</label>
          <textarea name="message" required rows={4} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"></textarea>
        </div>
        <button type="submit" className="w-full bg-[#000000] text-white py-3 rounded-2xl font-medium hover:bg-gray-800 transition-colors shadow-[0_10px_20px_rgba(0,0,0,0.25)]">
          Submit
        </button>
      </form>
    </Card>
  );
}

function FloatingNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#2a2a2a]/90 backdrop-blur-md rounded-3xl px-6 py-3 flex items-center gap-8 shadow-xl z-50">
      <NavItem icon={<Home className="w-5 h-5" />} label="Home" onClick={() => scrollTo('home')} active={location.pathname === '/' && !window.location.hash} />
      <NavItem icon={<Folder className="w-5 h-5" />} label="Projects" onClick={() => scrollTo('projects')} active={location.pathname.startsWith('/projects')} />
      <NavItem icon={<User className="w-5 h-5" />} label="About" onClick={() => scrollTo('about')} />
      <NavItem icon={<Mail className="w-5 h-5" />} label="Contact" onClick={() => scrollTo('contact')} />
    </div>
  );
}

function NavItem({ icon, label, onClick, active = false }: { icon: React.ReactNode, label: string, onClick: () => void, active?: boolean }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 ${active ? 'text-white' : 'text-gray-400 hover:text-gray-200'} transition-colors`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

function Footer() {
  return (
    <div className="pt-8 pb-4 flex justify-center">
      <CommitsGrid text="Dev" />
    </div>
  );
}

function ProjectsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-32 pt-12 px-4 sm:px-6 flex justify-center font-sans bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-2 sm:p-3 shadow-xl shadow-gray-200/50">
        <div className="space-y-2 sm:space-y-3">
          <Card>
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">All Projects</h1>
            </div>
            <div className="space-y-6">
              {PROJECTS_DATA.map((work) => (
                <div key={work.id} onClick={() => navigate(`/projects/${work.id}`)} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-shadow">
                  <div className="relative rounded-2xl overflow-hidden aspect-video mb-6 bg-gray-200">
                    <img src={work.image} alt={work.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm font-medium pb-2">
                    <span className="text-gray-900">{work.title}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500">{work.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Footer />
        </div>
      </div>
    </div>
  );
}

function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS_DATA.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h1>
          <button onClick={() => navigate('/projects')} className="text-blue-600 hover:underline">Back to Projects</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32 pt-12 px-4 sm:px-6 flex justify-center font-sans bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-2 sm:p-3 shadow-xl shadow-gray-200/50">
        <div className="space-y-2 sm:space-y-3">
          <Card>
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => navigate('/projects')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
            </div>
            
            <div className="space-y-6">
              {project.images.map((img, index) => (
                <div key={index} className="rounded-2xl overflow-hidden bg-gray-200">
                  <img src={img} alt={`${project.title} screenshot ${index + 1}`} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">About the Project</h3>
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase mb-3">Delivery Time</h3>
                  <p className="text-gray-700 font-medium">{project.deliveryTime}</p>
                </div>
              </div>
            </div>
          </Card>
          <Footer />
        </div>
      </div>
    </div>
  );
}
