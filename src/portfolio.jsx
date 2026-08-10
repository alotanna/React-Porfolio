import React, { useState, useEffect } from 'react';
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

  const navigation = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const heroStats = [
    { value: '3+', label: 'Years building products' },
    { value: '6+', label: 'Shipped projects' },
    { value: '15+', label: 'Technologies used' },
  ];

  const focusCards = [
    {
      title: 'Product thinking',
      description: 'I turn rough ideas into focused, usable digital experiences with a strong visual point of view.',
    },
    {
      title: 'Human-centered tech',
      description: 'My work starts with the people involved, especially in health, education, and community impact.',
    },
    {
      title: 'Execution speed',
      description: 'I can move from concept to working interface without losing polish, structure, or clarity.',
    },
  ];

  const capabilityGroups = [
    {
      title: 'Frontend + Interfaces',
      items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Responsive UI', 'Design systems'],
    },
    {
      title: 'AI + Automation',
      items: ['Python', 'scikit-learn', 'Prompt engineering', 'API integration', 'RAG', 'Chatbots'],
    },
    {
      title: 'Product Engineering',
      items: ['Django', 'Node.js workflows', 'MySQL', 'Git', 'Jenkins', 'Flask', 'Streamlit'],
    },
    {
      title: 'Research + Hardware',
      items: ['Research', 'Human-centered design', 'VHDL', 'MIPS', 'Logisim', 'Data analysis'],
    },
  ];

  const experienceItems = [
    {
      period: 'June 2025 - Present',
      title: 'Software Engineering Intern, QA Focused',
      org: 'Profibook - United States of America',
      bullets: [
        'Built and maintained thousands of Jest tests to raise release confidence across web and mobile flows.',
        'Automated manual web testing with Playwright, reducing repetitive QA effort and speeding up delivery.',
        'Worked with NestJS and TypeScript teams to debug backend services and improve product stability.',
      ],
    },
    {
      period: 'January 2025 - May 2025',
      title: 'AI and Automation Extern',
      org: 'Outamation - Texas, United States of America',
      bullets: [
        'Created document-processing workflows using NLP, OCR, and Python pipelines.',
        'Developed a retrieval system with LlamaIndex and RAG for mortgage file discovery.',
        'Produced a technical report on AI tools, limitations, and deployment strategy.',
      ],
    },
    {
      period: 'May 2022 - January 2025',
      title: 'Software Engineer and Sales Manager',
      org: 'Laotinoa Local Solutions - Ibadan, Nigeria',
      bullets: [
        'Built inventory software from scratch to replace spreadsheets and centralize stock records.',
        'Connected inventory data to an AI support assistant to improve response speed and consistency.',
        'Improved restocking decisions through forecasting, reducing avoidable inventory losses.',
      ],
    },
  ];

  const projectItems = [
    {
      title: 'HealingCells',
      description: 'Cancer support platform designed from patient research to help people find reliable resources and emotional support.',
      image: healingCellsImage,
      tags: ['Health tech', 'PHP', 'MySQL', 'UX'],
      links: [
        { label: 'Live Demo', href: 'http://austineiheji.great-site.net/' },
        { label: 'Code', href: 'https://github.com/alotanna/cancerwebsite.git' },
      ],
      featured: true,
    },
    {
      title: 'Grow Africa Eat Africa',
      description: 'A sustainability-focused initiative using clay brick storage chambers to reduce post-harvest losses for farmers.',
      image: gaeaImage,
      tags: ['Sustainability', 'Field research', 'Product design'],
      links: [{ label: 'Details', href: 'https://www.canva.com/design/DAGrJt1Yj_A/EvaKNcv4KnEHjXsmhXDwpw/view?utm_content=DAGrJt1Yj_A&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h540085aeb4' }],
    },
    {
      title: 'AI GPA Predictor',
      description: 'Academic advisor prototype that predicts GPA and generates personalized guidance with AI assistance.',
      image: gpaPredictorImage,
      tags: ['Python', 'Neural nets', 'Cohere API'],
      links: [{ label: 'Code', href: 'https://github.com/alotanna/AI_GPA_Predictor_and_Academic_Advisor-.git' }],
    },
    {
      title: 'SamaCare',
      description: 'Healthcare platform that supports appointments, records, and symptom-based triage through a chatbot.',
      image: samaCareImage,
      tags: ['Healthcare', 'Python', 'Flask', 'ML'],
      links: [{ label: 'Code', href: 'https://github.com/Ama-Annor/SamaCare.git' }],
    },
    {
      title: 'Kelenne Car Wash',
      description: 'Appointment and service management system for a car wash business with a clean customer-facing experience.',
      image: kelenneImage,
      tags: ['Web app', 'PHP', 'MySQL'],
      links: [{ label: 'Code', href: 'https://github.com/alotanna/Kelenne.git' }],
    },
    {
      title: 'Event Manager',
      description: 'Java and FXML application for handling logistics, scheduling, and bill tracking for events.',
      image: eventManagerImage,
      tags: ['Java', 'FXML'],
      links: [{ label: 'Code', href: 'https://github.com/alotanna/EventManger.git' }],
    },
  ];

  const contactDetails = [
    {
      label: 'Email',
      values: ['austine.iheji@ashesi.edu.gh', 'austineihejiben12@gmail.com'],
      icon: 'fa-envelope',
    },
    {
      label: 'Phone',
      values: ['(+233) 534817766', '(+234) 8102903790'],
      icon: 'fa-phone',
    },
    {
      label: 'Location',
      values: ['Ashesi University, Ghana'],
      icon: 'fa-location-dot',
    },
  ];

  useEffect(() => {
    const texts = ['product design', 'frontend systems', 'AI-enabled workflows', 'human-centered interfaces'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentText = texts[textIndex];

      if (isDeleting) {
        setTypedText(currentText.substring(0, charIndex - 1));
        charIndex -= 1;
      } else {
        setTypedText(currentText.substring(0, charIndex + 1));
        charIndex += 1;
      }

      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 1500);
        return;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }

      setTimeout(type, isDeleting ? 45 : 80);
    };

    const timer = setTimeout(type, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observedSections = navigation.map((item) => document.getElementById(item.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 },
    );

    observedSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
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

  return (
    <>
      <div className="portfolio-shell">
        <div className="page-orb orb-one" aria-hidden="true"></div>
        <div className="page-orb orb-two" aria-hidden="true"></div>
        <div className="page-orb orb-three" aria-hidden="true"></div>

        <header className="site-header">
          <div className="container header-inner">
            <a className="brand" href="#home" aria-label="Austine Iheji home">
              <span className="brand-mark">AI</span>
              <span className="brand-text">
                Austine <strong>Iheji</strong>
              </span>
            </a>

            <nav className={`site-nav ${isMenuOpen ? 'is-open' : ''}`}>
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a className="nav-cta" href="#contact" onClick={() => setIsMenuOpen(false)}>
                Start a conversation
              </a>
            </nav>

            <button
              type="button"
              className={`menu-toggle ${isMenuOpen ? 'is-open' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </header>

        <main>
          <section className="hero section" id="home">
            <div className="container hero-grid">
              <div className="hero-copy reveal-up">
                <p className="eyebrow">Austine Iheji | Tech, product, and human-centered systems</p>
                <h1>Designing digital products that look refined and feel effortless.</h1>
                <p className="hero-lede">
                  I build interfaces, products, and AI-enabled workflows with a clear visual point of view and a bias toward useful, elegant execution.
                </p>

                <div className="hero-inline">
                  <span className="label">Currently focused on</span>
                  <strong>{typedText}</strong>
                </div>

                <div className="hero-actions">
                  <a className="btn btn-primary" href="#projects">
                    View selected work
                  </a>
                  <a className="btn btn-ghost" href="#contact">
                    Contact me
                  </a>
                </div>

                <div className="hero-stats">
                  {heroStats.map((stat) => (
                    <article key={stat.label} className="stat-chip">
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </article>
                  ))}
                </div>
              </div>

              <div className="hero-visual reveal-up delay-1">
                <div className="portrait-card">
                  <div className="portrait-frame">
                    <img src={austineImage} alt="Austine Iheji" />
                  </div>
                  <div className="portrait-caption">
                    <span>Computer Science, Ashesi University</span>
                    <strong>Frontend, AI, and impact-driven product work</strong>
                  </div>
                </div>

                <div className="floating-note note-top">
                  <span>Current mode</span>
                  <strong>Interface-first thinking</strong>
                </div>

                <div className="floating-note note-bottom">
                  <span>Style</span>
                  <strong>Clean, editorial, memorable</strong>
                </div>
              </div>
            </div>
          </section>

          <section className="ticker-band" aria-label="Design principles">
            <div className="ticker-track">
              <span>Human-centered products</span>
              <span>Visual systems</span>
              <span>AI workflows</span>
              <span>Design polish</span>
              <span>Frontend craftsmanship</span>
              <span>Research-led execution</span>
              <span>Human-centered products</span>
              <span>Visual systems</span>
              <span>AI workflows</span>
              <span>Design polish</span>
              <span>Frontend craftsmanship</span>
              <span>Research-led execution</span>
            </div>
          </section>

          <section className="section about" id="about">
            <div className="container about-grid">
              <div className="section-head reveal-up">
                <p className="eyebrow">About</p>
                <h2>Built for work that needs taste, structure, and real-world usefulness.</h2>
                <p>
                  I started in Human Physiology before moving into Computer Science, so I tend to think about software from both the technical side and the human side. That mix shapes how I design, build, and ship.
                </p>
              </div>

              <div className="about-panel reveal-up delay-1">
                <p>
                  I care about products that solve actual problems, whether they sit in healthcare, agriculture, education, or internal operations. I like interfaces that feel calm, systems that are easy to trust, and details that make a portfolio feel designed instead of assembled.
                </p>
                <p>
                  Outside of work, I stay close to emerging AI tools, good food, and the kind of experimentation that keeps ideas sharp.
                </p>
              </div>

              <div className="about-rail reveal-up delay-2">
                {focusCards.map((card) => (
                  <article key={card.title} className="focus-card">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section capabilities" id="capabilities">
            <div className="container">
              <div className="section-head narrow reveal-up">
                <p className="eyebrow">Capabilities</p>
                <h2>A compact stack that moves between product, code, and research.</h2>
              </div>

              <div className="capability-grid">
                {capabilityGroups.map((group) => (
                  <article key={group.title} className="capability-card reveal-up">
                    <h3>{group.title}</h3>
                    <div className="chip-row">
                      {group.items.map((item) => (
                        <span key={item} className="chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section experience" id="experience">
            <div className="container">
              <div className="section-head narrow reveal-up">
                <p className="eyebrow">Experience</p>
                <h2>A mix of product delivery, research, and operational problem-solving.</h2>
              </div>

              <div className="experience-stack">
                {experienceItems.map((item) => (
                  <article key={item.title} className="experience-card reveal-up">
                    <div className="experience-meta">
                      <span>{item.period}</span>
                      <h3>{item.title}</h3>
                      <p>{item.org}</p>
                    </div>
                    <ul>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section projects" id="projects">
            <div className="container">
              <div className="section-head narrow reveal-up">
                <p className="eyebrow">Selected work</p>
                <h2>Projects presented with a cleaner editorial rhythm and stronger visual hierarchy.</h2>
              </div>

              <div className="projects-grid">
                {projectItems.map((project) => (
                  <article key={project.title} className={`project-card reveal-up ${project.featured ? 'featured' : ''}`}>
                    <div className="project-media">
                      <img src={project.image} alt={project.title} />
                    </div>
                    <div className="project-body">
                      <div>
                        <p className="project-kicker">{project.featured ? 'Featured project' : 'Selected project'}</p>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                      </div>

                      <div className="chip-row compact">
                        {project.tags.map((tag) => (
                          <span key={tag} className="chip subtle">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="project-links">
                        {project.links.map((link) => (
                          <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section contact" id="contact">
            <div className="container contact-grid">
              <div className="section-head reveal-up">
                <p className="eyebrow">Contact</p>
                <h2>Open to selective collaborations, product work, and thoughtful design problems.</h2>
                <p>
                  If you want a portfolio site, a product interface, or a system that feels sharper and more premium, send the details over.
                </p>
              </div>

              <div className="contact-info reveal-up delay-1">
                {contactDetails.map((detail) => (
                  <article key={detail.label} className="contact-card">
                    <div className="contact-icon">
                      <i className={`fas ${detail.icon}`}></i>
                    </div>
                    <div>
                      <h3>{detail.label}</h3>
                      {detail.values.map((value) => (
                        <p key={value}>{value}</p>
                      ))}
                    </div>
                  </article>
                ))}

                <div className="social-links">
                  <a href="http://www.linkedin.com/in/austine-lotanna-iheji" target="_blank" rel="noreferrer">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://github.com/alotanna" target="_blank" rel="noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>

              <div className="contact-form reveal-up delay-2">
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <input type="text" className="form-control" name="name" placeholder="Your name" required />
                    <input type="email" className="form-control" name="email" placeholder="Email address" required />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" name="subject" placeholder="Subject" />
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" name="message" placeholder="Tell me what you want to build" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary form-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </button>
                  <div className="form-status" dangerouslySetInnerHTML={{ __html: formStatus }}></div>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="container footer-inner">
            <p>© 2025 Austine Iheji. Crafted with clarity.</p>
            <a href="#home">Back to top</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Portfolio;