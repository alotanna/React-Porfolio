import React, { useState, useEffect, useRef } from 'react';
import austineImage from './assets/austine.jpeg';
import healingCellsImage from './assets/Healingcells.png';
import gaeaImage from './assets/GAEA.png';
import gpaPredictorImage from './assets/GPA Predicter.png';
import samaCareImage from './assets/SamaCare.png';
import kelenneImage from './assets/Kelenne.png';
import eventManagerImage from './assets/EventManager.png';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const typedTextRef = useRef(null);
  const [stars, setStars] = useState([]);

  // Typed text effect
  useEffect(() => {
    const texts = [
      'building human-centered solutions',
      'bridging healthcare & technology',
      'creating sustainable impact',
      'solving complex problems'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        setTypedText(currentText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentText.substring(0, charIndex + 1));
        charIndex++;
      }
      
      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
      
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
      
      const speed = isDeleting ? 50 : 100;
      setTimeout(type, speed);
    };

    const timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Create stars background
useEffect(() => {
  const createStars = () => {
    const starsArray = [];
    for (let i = 0; i < 150; i++) {
      starsArray.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2
      });
    }
    return starsArray;
  };
  
  setStars(createStars()); // Store stars in state
}, []);

  // Handle form submission with EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject') || 'Email from your website';
    const message = formData.get('message');

    const templateParams = {
      name: name,
      email: email,
      subject: subject,
      message: message,
      time: new Date().toLocaleString(),
    };

    try {
      // Initialize EmailJS if not already done
      if (typeof window !== 'undefined' && window.emailjs) {
        await window.emailjs.send("service_urazj5j", "template_r7zuv8h", templateParams);
        
        setFormStatus(`
          <div style="text-align: center; padding: 20px 0; color: #32b8cd;">
            <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 10px;"></i>
            <p>Message sent successfully! I'll get back to you soon.</p>
          </div>
        `);
        e.target.reset();
      } else {
        throw new Error('EmailJS not loaded');
      }
    } catch (error) {
      console.error('Email send failed:', error);
      setFormStatus(`
        <div style="text-align: center; padding: 20px 0; color: #ff4545;">
          <i class="fas fa-exclamation-circle" style="font-size: 2rem; margin-bottom: 10px;"></i>
          <p>Something went wrong! Please try again or contact me directly via email.</p>
        </div>
      `);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load EmailJS script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init({ publicKey: "5lwBfaSI-wWb4Hfez" });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  //this useEffect for back to top button visibility
useEffect(() => {
  const handleScroll = () => {
    const backToTop = document.querySelector('.back-to-top');
    if (window.pageYOffset > 300) {
      backToTop?.classList.add('show');
    } else {
      backToTop?.classList.remove('show');
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  //this useEffect for active section highlighting
useEffect(() => {
  const handleScroll = () => {
    const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 100; // Offset for header

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(sections[i]);
        
        // Update nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sections[i]}`) {
            link.classList.add('active');
          }
        });
        break;
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  return (
    <>
      {/* Add external stylesheets */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="portfolio-container">


        {/* Stars Background */}
        <div className="stars" id="stars">
        {stars.map((star) => (
            <div
            key={star.id}
            className="star"
            style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`
            }}
            />
        ))}
        </div>

        {/* Header */}
        <header id="header">
          <div className="container">
            <nav>
              <div className="logo">AUSTINE<span>IHEJI</span></div>
              <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
                <li><a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
                <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
                <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
                <li><a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>Experience</a></li>
                <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
                <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
              </ul>
              <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="container">
            <div className="hero-content">
              <h1>INNOVATING AT THE INTERSECTION OF IMPACT & TECHNOLOGY</h1>
              <p>I'm an interdisciplinary problem-solver with expertise in <span className="typed-text">{typedText}</span></p>
              <div className="hero-buttons">
                <a href="#projects" className="btn">View My Work</a>
                <a href="#contact" className="btn secondary-btn">Get In Touch</a>
              </div>
            </div>
            <div className="cosmic-circle"></div>
            <div className="orbit"></div>
          </div>
        </section>

        {/* About Section */}
        <section className="about" id="about">
          <div className="container">
            <div className="about-content">
              <div className="about-text">
              <h2 className="section-title">About Austine</h2>
              <p>Hey, I’m Austine. I study Computer Science at Ashesi University, but my story didn’t start with code. I actually began in Human Physiology, which means I know a thing or two about how the human body works — and now I’m figuring out how technology can work better for humans too.</p>

              <p>I care deeply about using tech for good. I built <strong>HealingCells</strong>, a cancer support platform that puts people first, and co-founded <strong>Grow Africa Eat Africa</strong>, an initiative focused on reducing post-harvest losses. Because if we can grow it, we should eat it — simple logic.</p>

              <p>These days, I spend my time building projects that mix code with compassion. Whether it’s a platform, a tool, or a half-broken prototype I swear I’ll fix soon, I’m always thinking about how tech can solve real problems and make life just a bit better. And yes, I talk to my bugs like they're coworkers. Sometimes they even listen.</p>
              
              <p>When I’m not coding, you’ll find me diving into the latest AI news, experimenting with new recipes in the kitchen, rewatching comfort series from 2010 like they just came out yesterday, or trying (and failing) to convince my friends I’m not just a nerd who talks to computers — even though, well... I kind of am.</p>

                <div className="about-stats">
                  <br />
                  <div className="stat">
                    <h3>Education</h3>
                    <p>BSc. Computer Science, Ashesi University</p>
                  </div>
                  <div className="stats">
                    <div className="stat-box">
                      <div className="stat-number">3+</div>
                      <div className="stat-label">Years of Experience</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-number">6+</div>
                      <div className="stat-label">Major Projects</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-number">15+</div>
                      <div className="stat-label">Tech Skills</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-image">
                <img src={austineImage} alt="Austine Iheji" />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills" id="skills">
          <div className="container">
            <h2 className="section-title">My Skills</h2>
            <p>I've developed a diverse skill set that bridges technical expertise with human-centered understanding.</p>
            
            <div className="skills-container">
              <div className="skill-category">
                <h3><i className="fas fa-code"></i> Programming Languages</h3>
                <ul className="skill-list">
                        <li>Python</li>
                        <li>Java</li>
                        <li>JavaScript</li>
                        <li>C++</li>
                        <li>SQL</li>
                        <li>MIPS (Assembly)</li>
                        <li>R</li>
                        <li>FXML</li>
                        <li>HTML, CSS, PHP</li>
                        <li>React</li>
                        <li>TypeScript</li>
                        <li>React Native</li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h3><i className="fas fa-brain"></i> AI & Machine Learning</h3>
                <ul className="skill-list">
                        <li>scikit-learn</li>
                        <li>AI Prompt Engineering</li>
                        <li>API Integration</li>
                        <li>Chatbot Development</li>
                        <li>Neural Networks</li>
                </ul>
              </div>
                <div class="skill-category">
                    <h3><i class="fas fa-laptop-code"></i> Web & Software Development</h3>
                    <ul class="skill-list">
                        <li>Django</li>
                        <li>Streamlit</li>
                        <li>MySQL</li>
                        <li>Jenkins</li>
                        <li>Version Control (Git)</li>
                    </ul>
                </div>
                
                <div class="skill-category">
                    <h3><i class="fas fa-chart-bar"></i> Data & Tools</h3>
                    <ul class="skill-list">
                        <li>Pandas</li>
                        <li>NumPy</li>
                        <li>Excel</li>
                    </ul>
                </div>
                
                <div class="skill-category">
                    <h3><i class="fas fa-microchip"></i> Hardware</h3>
                    <ul class="skill-list">
                        <li>VHDL</li>
                        <li>MARS 4-5</li>
                        <li>Logisim (Single-Cycle CPU Design)</li>
                    </ul>
                </div>
                
                <div class="skill-category">
                    <h3><i class="fas fa-users"></i> Soft Skills</h3>
                    <ul class="skill-list">
                        <li>Research</li>
                        <li>Communication</li>
                        <li>Problem-Solving</li>
                        <li>Teamwork</li>
                        <li>Human-Centered Design</li>
                    </ul>
                </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="experience" id="experience">
          <div className="container">
            <h2 className="section-title">Professional Experience</h2>
            <p>My journey blends technical skill, social impact, and real-world experience across diverse sectors to build thoughtful, people-centered solutions.</p>

            <div className="timeline">
              <div class="timeline-item">
                <div class="timeline-date">January 2025 - May 2025</div>
                <h3 class="timeline-title">AI and Automation Extern</h3>
                <p class="timeline-subtitle">Outamation - Texas, United States of America</p>
                <ul>
                    <li>Engineered AI-powered workflows to automate document classification and data extraction, using Natural Language Processing (NLP), Computer Vision, and Python-based pipelines (PyMuPDF, OCR techniques)</li>
                    <li>Designed and implemented a retrieval system using LlamaIndex and Retrieval-Augmented Generation (RAG), boosting information discovery accuracy across mortgage-related files; benchmarked open-source AI models to fine-tune performance</li>
                    <li>Authored a strategic technical report distilling insights on leading AI solutions for document automation, detailing system limitations, enhancement techniques, and practical deployment considerations for enterprise use</li>
                </ul>
            </div>

              <div class="timeline-item">
                    <div class="timeline-date">May 2022 - January 2025</div>
                    <h3 class="timeline-title">Software Engineer and Sales Manager</h3>
                    <p class="timeline-subtitle">Laotinoa Local Solutions - Ibadan, Oyo state, Nigeria</p>
                    <ul>
                        <li>Built a custom inventory management system from scratch to digitize and centralize procurement and stock records, replacing Excel and enabling accurate, real-time tracking of over 200 product lines</li>
                        <li>Integrated live inventory and pricing data into an AI-powered customer service assistant, drastically reducing response time and enhancing customer satisfaction</li>
                        <li>Optimized restocking workflows by embedding demand forecasting into the system, leading to a 20% reduction in inventory-related losses and more efficient supplier coordination</li>
                    </ul>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-date">September 2023 - November 2023</div>
                    <h3 class="timeline-title">Research Intern</h3>
                    <p class="timeline-subtitle">Colton Alexander - Colorado, USA</p>
                    <ul>
                        <li>Spearheaded AI-enhanced market research to identify high-potential startups in the renewable energy sector, leveraging custom-built web scraping scripts and NLP tools to extract and analyze company data</li>
                        <li>Developed a data-driven profiling framework to assess financial health, technology differentiation, and sustainability impact, enabling the VC team to make evidence-backed portfolio decisions</li>
                    </ul>
                </div>

                <div class="timeline-item">
                    <div class="timeline-date">June 2023 - July 2023</div>
                    <h3 class="timeline-title">Venture Capital Extern</h3>
                    <p class="timeline-subtitle">IgniteXL Ventures - United States of America</p>
                    <ul>
                        <li>Leveraged prompt engineering and AI-powered research tools to streamline due diligence and enhance internal workflows, accelerating the evaluation of early-stage startups in the emerging tech and consumer innovation sectors</li>
                        <li>Identified high-potential investment opportunities by synthesizing market trend data, founder profiles, and competitive landscapes, earning formal recognition for excellence in venture sourcing and analysis</li>
                    </ul>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-date">January 2024 - Present</div>
                    <h3 class="timeline-title">Peer Coach</h3>
                    <p class="timeline-subtitle">CCAPS, Ashesi University - Ghana</p>
                    <ul>
                        <li>Provide academic and emotional support to peers</li>
                        <li>Facilitated 21 group sessions on mental health and resilience</li>
                        <li>Guide students through stress management and study techniques</li>
                    </ul>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-date">March 2024 - Present</div>
                    <h3 class="timeline-title">Digital Health Champion</h3>
                    <p class="timeline-subtitle">African Digital Health Student Network</p>
                    <ul>
                        <li>Advocate for adoption of digital tools in African healthcare systems</li>
                        <li>Contribute to research and events focused on digital health literacy</li>
                    </ul>
                </div>

                <div class="timeline-item">
                    <div class="timeline-date">September 2023 - Present</div>
                    <h3 class="timeline-title">Student Volunteer</h3>
                    <p class="timeline-subtitle">Code4All Initiative</p>
                    <ul>

                        
                        <li>Designed and facilitated interactive workshops to elevate the digital literacy of 70+ students, equipping them with essential tech skills for academic and professional success.</li>
                    </ul>
                </div>

                <div class="timeline-item">
                    <div class="timeline-date">August 2023 - February 2025</div>
                    <h3 class="timeline-title">Senior Ambassador</h3>
                    <p class="timeline-subtitle">Extern - New York, USA</p>
                    <ul>
                        <li>Spearheaded outreach campaigns that led to 200+ externship applications with top brands</li>
                        <li>Provided application guidance to prospective students, increasing program visibility</li>
                    </ul>
                </div>
            </div>
          </div>
        </section>

        {/* Projects Section*/}
        <section className="projects" id="projects">
          <div className="container">
            <h2 className="section-title">Featured Projects</h2>
            <p>My work focuses on creating human-centered solutions with measurable impact.</p>
            
            <div className="projects-grid">
                <div class="project-card">
                    <div class="project-img">
                        <img src={healingCellsImage} alt="Healthcare Project" />
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">HealingCells – Cancer Support Platform</h3>
                        <p class="project-desc">A web platform supporting cancer patients, survivors, and caregivers with reliable resources and emotional support. Designed based on research with actual patients to address emotional and informational needs.</p>
                        <div class="project-tech">
                            <span class="tech-tag">HTML</span>
                            <span class="tech-tag">CSS</span>
                            <span class="tech-tag">JavaScript</span>
                            <span class="tech-tag">PHP</span>
                            <span class="tech-tag">MySQL</span>
                        </div>
                        <div class="project-links">
                            <a href="http://austineiheji.great-site.net/" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                            <a href="https://github.com/alotanna/cancerwebsite.git" target="_blank"><i class="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                </div>
              
                <div class="project-card">
                    <div class="project-img">
                        <img src= {gaeaImage} alt="Grow Africa Eat Africa" />
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Grow Africa Eat Africa</h3>
                        <p class="project-desc">Co-founded an initiative developing sustainable clay brick storage chambers to reduce post-harvest losses and extend crop shelf life for smallholder farmers across Africa.</p>
                        <div class="project-tech">
                            <span class="tech-tag">Sustainability</span>
                            <span class="tech-tag">Agriculture</span>
                            <span class="tech-tag">Field Research</span>
                            <span class="tech-tag">Product Design</span>
                        </div>
                        <div class="project-links">
                            <a href="https://www.canva.com/design/DAGnyFR38AQ/VXkQ8SHAzzlX1a6pYfNe2w/view?utm_content=DAGnyFR38AQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1bb35b3f9c" target="_blank"><i class="fas fa-external-link-alt"></i> Project Details</a>
                        </div>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-img">
                        <img src= {gpaPredictorImage} alt="GPA Predictor Interface" />
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">AI GPA Predictor and Academic Advisor</h3>
                        <p class="project-desc">Co-developed an AI-powered academic advisor that predicts GPA based on lifestyle factors, trained with 92% accuracy and integrated with Cohere's Command-Xlarge language model for personalized advice.</p>
                        <div class="project-tech">
                            <span class="tech-tag">Python</span>
                            <span class="tech-tag">Neural Networks</span>
                            <span class="tech-tag">Cohere API</span>
                            <span class="tech-tag">Data Science</span>
                        </div>
                        <div class="project-links">
                            <a href="https://github.com/alotanna/AI_GPA_Predictor_and_Academic_Advisor-.git" target="_blank"><i class="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-img">
                        <img src= {samaCareImage} alt="SamaCare" />

                    </div>
                    <div class="project-content">
                        <h3 class="project-title">SamaCare - Bringing health care to your doorstep</h3>
                        <p class="project-desc">Co-developed an AI-powered healthcare platform enabling patients to book appointments, access medical records, and receive symptom-based triage recommendations via an integrated machine learning chatbot using a Random Forest model hosted using Flask API. </p>
                        <div class="project-tech">
                            <span class="tech-tag">HTML</span>
                            <span class="tech-tag">CSS</span>
                            <span class="tech-tag">JavaScript</span>
                            <span class="tech-tag">PHP</span>
                            <span class="tech-tag">MySQL</span>
                            <span class="tech-tag">Python</span>
                            <span class="tech-tag">ML</span>
                            <span class="tech-tag">Flask</span>
                        </div>
                        <div class="project-links">
                            <a href="https://github.com/Ama-Annor/SamaCare.git" target="_blank"><i class="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                </div>

                <div class="project-card">
                    <div class="project-img">
                        <img src= {kelenneImage} alt="Kelenne Car Wash Interface" />

                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Kelenne Car Wash Management System </h3>
                        <p class="project-desc">Co-developed a fully functional web application for Kelenne Car Wash, enabling customers to seamlessly book appointments, view service offerings, and much more. </p>
                        <div class="project-tech">
                            <span class="tech-tag">HTML</span>
                            <span class="tech-tag">CSS</span>
                            <span class="tech-tag">JavaScript</span>
                            <span class="tech-tag">PHP</span>
                            <span class="tech-tag">MySQL</span>
                        </div>
                        <div class="project-links">
                            <a href="https://github.com/alotanna/Kelenne.git" target="_blank"><i class="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                </div>

                <div class="project-card">
                    <div class="project-img">
                        <img src= {eventManagerImage} alt="Event Manager Application Interface" />
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Event Manager Application  </h3>
                        <p class="project-desc">Designed and implemented an event management system capable of handling bill tracking, food coordination, activity scheduling, and venue logistics.•	Utilized Java for backend logic and FXML for a user-friendly interface. </p>
                        <div class="project-tech">
                            <span class="tech-tag">Java</span>
                            <span class="tech-tag">FXML</span>
                        </div>
                        <div class="project-links">
                            <a href="https://github.com/alotanna/EventManger.git" target="_blank"><i class="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact" id="contact">
          <div className="container">
            <h2 className="section-title">Get In Touch</h2>
            <p>Got a project idea? A wild collaboration dream? Or just bored and want to send a message? I'm here for it.</p>
            <p>This is not a drill, or a fake contact section. I actually set this thing up (and triple-checked it after yelling at my screen a few times).</p> 
            <p>So go ahead, type something real(like your real email and messgae), hit send, and voilà-you’ll get a confirmation, I’ll get your message, and the universe will be in balance. Let’s do something epic. Or at least mildly interesting. Either way, I’m excited!</p>
            
            <div className="contact-wrapper">
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <p>austine.iheji@ashesi.edu.gh</p>
                    <p>austineihejiben12@gmail.com</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div className="contact-text">
                    <h4>Phone</h4>
                    <p>(+233) 534817766</p>
                    <p>(+234) 8102903790</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="contact-text">
                    <h4>Location</h4>
                    <p>Ashesi University, Ghana</p>
                  </div>
                </div>
                
                <div className="social-links">
                  <a href="http://www.linkedin.com/in/austine-lotanna-iheji" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                  <a href="https://github.com/alotanna" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                </div>
              </div>
              
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input type="text" className="form-control" name="name" placeholder="Your Name" required />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" name="subject" placeholder="Subject" />
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" name="message" placeholder="Your Message" required></textarea>
                  </div>
                  <button type="submit" className="btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span><i className="fas fa-spinner fa-spin"></i> Sending...</span>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                  <div className="form-status" dangerouslySetInnerHTML={{ __html: formStatus }}></div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="container">
            <p className="footer-text">© 2025 Austine Iheji. All rights reserved.</p>
          </div>
        </footer>

        {/* Back to Top Button */}
        <a href="#about" className="back-to-top">
          <i className="fas fa-arrow-up"></i>
        </a>
      </div>
    </>
  );
};

export default Portfolio;