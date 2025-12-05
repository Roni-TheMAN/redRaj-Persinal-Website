import React, { useState, useEffect, useRef } from 'react';
import {
    Linkedin,
    Mail,
    Phone,
    MapPin,
    Globe,
    Award,
    BookOpen,
    Utensils,
    BedDouble,
    Users,
    Calendar,
    ConciergeBell,
    Sun,
    Moon,
    Menu,
    X,
    ChevronDown
} from 'lucide-react';

/* ==========================================
  DATA SECTION
  ==========================================
*/
const initialData = {
    personalInfo: {
        name: "Raj Patel",
        title: "Hospitality Professional | Hotel & Tourism Management",
        email: "p_raj1@icloud.com",
        phone: "+1 (256) 525 0128",
        location: "Madison, Alabama 35758",
        about: "I am a dedicated hospitality student with strong communication and teamwork skills. I work well under pressure and deliver professional, guest-focused service. Passionate about the hospitality industry, I consistently bring a positive attitude and a strong work ethic while continuing to develop my skills.",
        social: {
            linkedin: "https://www.linkedin.com/in/raj-patel-600ba6282",
        }
    },
    skills: [
        { name: "F&B Service", icon: Utensils },
        { name: "Room Division", icon: BedDouble },
        { name: "Event Management", icon: Calendar },
        { name: "Guest Relations", icon: Users },
        { name: "Communication", icon: ConciergeBell },
        { name: "Trend Forecasting", icon: Award },
        { name: "Digital Marketing", icon: Globe },
    ],
    experience: [
        {
            id: 1,
            role: "F&B Service, Housekeeping & Event Intern",
            company: "Thessoni Hotel",
            location: "Zurich, Switzerland",
            period: "Internship",
            description: "Gained hands-on experience in fine dining service operations. Performed housekeeping duties, ensuring high room and service standards. Supported event management operations, assisting in planning and guest coordination."
        },
        {
            id: 2,
            role: "Hospitality Practical Training",
            company: "HTMi Switzerland",
            location: "Sörenberg, Switzerland",
            period: "April – October 2023",
            description: "Worked across multiple operational areas, including kitchen support, F&B service, and housekeeping. Learned professional hospitality service standards and teamwork in an international environment."
        },
        {
            id: 3,
            role: "Finance Management Intern",
            company: "Krishna Hotel",
            location: "India",
            period: "Internship",
            description: "Assisted the finance team with daily hotel financial operations. Supported tasks such as record keeping, cost tracking, and financial reporting."
        }
    ],
    education: [
        {
            id: 1,
            degree: "Diploma in International Hotel and Tourism Operations",
            school: "HTMi, Hotel and Tourism Management Institute",
            location: "Switzerland",
            year: "April – October 2023",
            description: "Comprehensive training in global hotel operations, tourism management, and service excellence."
        },
        {
            id: 2,
            degree: "Higher Secondary School",
            school: "Himmat High School",
            location: "India",
            year: "2021 – 2022",
            description: ""
        },
        {
            id: 3,
            degree: "Secondary School Certificate",
            school: "Glorious Public School",
            location: "India",
            year: "2019 – 2020",
            description: ""
        }
    ],
    languages: [
        { language: "English", level: "B2 - Professional Working" },
        { language: "German", level: "B2 - Professional Working" },
        { language: "Hindi", level: "C2 - Native/Bilingual" },
        { language: "Gujarati", level: "C2 - Native/Bilingual" },
        { language: "Marathi", level: "C2 - Native/Bilingual" }
    ]
};

/* ==========================================
  ANIMATION HELPER COMPONENT
  ==========================================
*/
const RevealOnScroll = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const App = () => {
    const [data] = useState(initialData);
    const [darkMode, setDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'skills', 'education', 'experience', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
                    setActiveSection(section);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => setDarkMode(!darkMode);

    const scrollToSection = (id) => {
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Color palette logic
    // Light: Stone-50 background, Navy-900 text, Amber-600 accents
    // Dark: Slate-900 background, Slate-100 text, Amber-500 accents
    const theme = darkMode ? {
        bg: 'bg-slate-900',
        text: 'text-slate-100',
        subText: 'text-slate-400',
        accent: 'text-amber-500',
        accentBg: 'bg-amber-500',
        card: 'bg-slate-800 border-slate-700',
        nav: 'bg-slate-900/95 border-slate-800'
    } : {
        bg: 'bg-stone-50',
        text: 'text-stone-800',
        subText: 'text-stone-600',
        accent: 'text-amber-700',
        accentBg: 'bg-amber-700',
        card: 'bg-white border-stone-200 shadow-sm',
        nav: 'bg-white/90 border-stone-200'
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 font-sans ${theme.bg} ${theme.text}`}>
            <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>

            {/* Navigation */}
            <nav className={`fixed w-full z-50 backdrop-blur-md border-b transition-all duration-500 ${theme.nav}`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div
                            className={`font-serif text-2xl font-bold tracking-wide cursor-pointer flex items-center gap-2 ${theme.accent} hover:scale-105 transition-transform duration-300`}
                            onClick={() => scrollToSection('home')}
                        >
                            <ConciergeBell size={24} />
                            <span>RP</span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {['About', 'Skills', 'Education', 'Experience', 'Contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className={`text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:${theme.accent} relative group ${
                                        activeSection === item.toLowerCase() ? theme.accent : theme.subText
                                    }`}
                                >
                                    {item}
                                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${theme.accentBg} transition-all duration-300 group-hover:w-full ${activeSection === item.toLowerCase() ? 'w-full' : ''}`}></span>
                                </button>
                            ))}
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full transition-transform hover:rotate-12 hover:bg-black/5 ${theme.subText}`}
                            >
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-4">
                            <button onClick={toggleTheme} className={theme.subText}>
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={theme.text}
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className={`md:hidden absolute w-full border-b shadow-xl ${theme.nav} animate-in slide-in-from-top-5 duration-300`}>
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {['Home', 'About', 'Skills', 'Education', 'Experience', 'Contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className={`block w-full text-left px-3 py-3 rounded-md text-sm font-medium uppercase tracking-wider ${
                                        activeSection === item.toLowerCase() ? theme.accent : theme.text
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className={`absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none animate-float ${darkMode ? 'bg-amber-900' : 'bg-amber-100'}`} style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
                <div className={`absolute bottom-20 left-10 w-24 h-24 rounded-full opacity-5 pointer-events-none animate-float-delayed ${theme.accentBg}`}></div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <RevealOnScroll>
                        <div className={`inline-block mb-6 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase border ${theme.accent} border-opacity-30 bg-opacity-10 transition-transform hover:scale-105 duration-300`}>
                            Hospitality Portfolio
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={200}>
                        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            {data.personalInfo.name}
                        </h1>
                    </RevealOnScroll>

                    <RevealOnScroll delay={400}>
                        <h2 className={`text-xl md:text-2xl font-light mb-8 ${theme.subText}`}>
                            {data.personalInfo.title}
                        </h2>
                    </RevealOnScroll>

                    <RevealOnScroll delay={600}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={() => scrollToSection('contact')}
                                className={`px-8 py-3 rounded-md text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:brightness-110 active:scale-95 ${theme.accentBg}`}
                            >
                                Get in Touch
                            </button>
                            <a
                                href={data.personalInfo.social.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className={`px-8 py-3 rounded-md border font-medium transition-all duration-300 hover:bg-black/5 hover:-translate-y-1 flex items-center gap-2 ${darkMode ? 'border-slate-600' : 'border-stone-300'}`}
                            >
                                <Linkedin size={18} />
                                LinkedIn Profile
                            </a>
                        </div>
                    </RevealOnScroll>
                </div>

                <div className="absolute bottom-10 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => scrollToSection('about')}>
                    <ChevronDown className={theme.subText} size={32} />
                </div>
            </section>

            {/* About Section */}
            <section id="about" className={`py-24 ${darkMode ? 'bg-slate-800/30' : 'bg-stone-100/50'}`}>
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <RevealOnScroll>
                        <BookOpen className={`mx-auto mb-4 ${theme.accent}`} size={32} />
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">Professional Profile</h2>
                        <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${theme.subText}`}>
                            "{data.personalInfo.about}"
                        </p>
                    </RevealOnScroll>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-24">
                <div className="max-w-6xl mx-auto px-4">
                    <RevealOnScroll>
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Core Competencies</h2>
                            <div className={`w-20 h-1 mx-auto rounded-full ${theme.accentBg}`}></div>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {data.skills.map((skill, index) => (
                            <RevealOnScroll key={index} delay={index * 100}>
                                <div
                                    className={`p-6 rounded-xl border text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${theme.card} group`}
                                >
                                    <div className={`mx-auto w-12 h-12 mb-4 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${darkMode ? 'bg-slate-700 text-amber-500' : 'bg-stone-100 text-amber-700'}`}>
                                        <skill.icon size={24} />
                                    </div>
                                    <h3 className="font-medium text-lg">{skill.name}</h3>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section id="education" className={`py-24 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <RevealOnScroll>
                                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Education & Qualifications</h2>
                                <p className={`mb-8 text-lg ${theme.subText}`}>
                                    My academic background combines theoretical knowledge with practical training in Switzerland, the home of hospitality.
                                </p>
                            </RevealOnScroll>

                            <div className="space-y-8">
                                {data.education.map((edu, index) => (
                                    <RevealOnScroll key={index} delay={index * 150}>
                                        <div className="relative pl-8 border-l border-stone-300 group">
                                            <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full ${theme.accentBg} transition-all duration-300 group-hover:scale-150`}></div>
                                            <h3 className="text-xl font-bold">{edu.school}</h3>
                                            <div className={`text-sm font-bold uppercase tracking-wide mb-1 ${theme.accent}`}>
                                                {edu.location} • {edu.year}
                                            </div>
                                            <div className="text-lg font-medium mb-1">{edu.degree}</div>
                                            {edu.description && <p className={`text-sm ${theme.subText}`}>{edu.description}</p>}
                                        </div>
                                    </RevealOnScroll>
                                ))}
                            </div>
                        </div>

                        {/* Visual Element for Education */}
                        <div className="flex-1 w-full flex justify-center">
                            <RevealOnScroll delay={300}>
                                <div className={`relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border-8 ${darkMode ? 'border-slate-700 bg-slate-700' : 'border-stone-100 bg-stone-100'} shadow-2xl transform hover:scale-[1.02] transition-transform duration-500`}>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                        <div className="animate-float">
                                            <Globe size={64} className={`mb-6 ${theme.accent}`} strokeWidth={1} />
                                        </div>
                                        <h3 className="font-serif text-2xl font-bold mb-4">Global Perspective</h3>
                                        <div className="space-y-4 w-full text-left mt-4">
                                            {data.languages.map((lang, idx) => (
                                                <div key={idx} className="flex justify-between items-center border-b border-opacity-20 border-current pb-2 hover:pl-2 transition-all duration-300">
                                                    <span className="font-bold">{lang.language}</span>
                                                    <span className={`text-xs uppercase tracking-wider ${theme.subText}`}>{lang.level}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className={`py-24 ${darkMode ? 'bg-slate-900' : 'bg-stone-50'}`}>
                <div className="max-w-5xl mx-auto px-4">
                    <RevealOnScroll>
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
                            <div className={`w-20 h-1 mx-auto rounded-full ${theme.accentBg}`}></div>
                        </div>
                    </RevealOnScroll>

                    <div className="grid gap-8">
                        {data.experience.map((job, index) => (
                            <RevealOnScroll key={job.id} delay={index * 150}>
                                <div className={`p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${theme.card}`}>
                                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold">{job.role}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`font-medium ${theme.accent}`}>{job.company}</span>
                                                <span className={theme.subText}>•</span>
                                                <span className={`text-sm ${theme.subText}`}>{job.location}</span>
                                            </div>
                                        </div>
                                        <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors hover:bg-opacity-80 ${darkMode ? 'bg-slate-700' : 'bg-stone-100'}`}>
                      {job.period}
                    </span>
                                    </div>
                                    <p className={`leading-relaxed ${theme.subText}`}>
                                        {job.description}
                                    </p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className={`py-24 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <RevealOnScroll>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Contact Information</h2>
                        <p className={`text-lg mb-12 ${theme.subText}`}>
                            Available for opportunities in the hospitality sector.
                        </p>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {[
                            { icon: Mail, title: "Email", value: data.personalInfo.email, link: `mailto:${data.personalInfo.email}` },
                            { icon: Phone, title: "Phone", value: data.personalInfo.phone, link: `tel:${data.personalInfo.phone}` },
                            { icon: MapPin, title: "Location", value: data.personalInfo.location, link: null }
                        ].map((item, index) => (
                            <RevealOnScroll key={index} delay={index * 100}>
                                <div className={`p-6 rounded-xl flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${darkMode ? 'bg-slate-900' : 'bg-stone-50'}`}>
                                    <item.icon className={`mb-4 ${theme.accent}`} size={28} />
                                    <h3 className="font-bold mb-2">{item.title}</h3>
                                    {item.link ? (
                                        <a href={item.link} className={`hover:${theme.accent} transition-colors duration-300`}>
                                            {item.value}
                                        </a>
                                    ) : (
                                        <span className={theme.subText}>
                      {item.value}
                    </span>
                                    )}
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>

                    <div className={`pt-8 border-t ${darkMode ? 'border-slate-700' : 'border-stone-200'}`}>
                        <p className={`text-sm ${theme.subText}`}>
                            © {new Date().getFullYear()} {data.personalInfo.name}. All rights reserved.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default App;