import React, { useState, useEffect, useRef } from 'react';

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

  return (
    <>
      {/* Add external stylesheets */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href=".css" />
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
                <li><a href="#home" className="active">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
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
                <p>I am a Computer Science student at Ashesi University with a unique background in Human Physiology, bringing a holistic perspective to technology solutions. My passion lies at the intersection of impact and technology, where I develop empathetic, human-centered solutions.</p>
                <p>With experience leading community-focused projects like the HealingCells cancer support platform and the Grow Africa Eat Africa initiative tackling post-harvest losses, I am committed to creating sustainable impact through innovation.</p>
                <p>Currently, I combine my technical skills in programming with my understanding of human systems to build solutions that address real world challenges.</p>
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
                <img src="austine.jpeg" alt="Austine Iheji" />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section - Abbreviated */}
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
              
              {/* Add other skill categories here */}
            </div>
          </div>
        </section>

        {/* Experience Section - Abbreviated */}
        <section className="experience" id="experience">
          <div className="container">
            <h2 className="section-title">Professional Experience</h2>
            <p>My journey blends technical skill, social impact, and real-world experience across diverse sectors to build thoughtful, people-centered solutions.</p>

            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-date">January 2025 - May 2025</div>
                <h3 className="timeline-title">AI and Automation Extern</h3>
                <p className="timeline-subtitle">Outamation - Texas, United States of America</p>
                <ul>
                  <li>Engineered AI-powered workflows to automate document classification and data extraction, using Natural Language Processing (NLP), Computer Vision, and Python-based pipelines (PyMuPDF, OCR techniques)</li>
                  <li>Designed and implemented a retrieval system using LlamaIndex and Retrieval-Augmented Generation (RAG), boosting information discovery accuracy across mortgage-related files; benchmarked open-source AI models to fine-tune performance</li>
                </ul>
              </div>

              <div className="timeline-item">
                <div className="timeline-date">May 2022 - January 2025</div>
                <h3 className="timeline-title">Software Engineer and Sales Manager</h3>
                <p className="timeline-subtitle">Laotinoa Local Solutions - Ibadan, Oyo state, Nigeria</p>
                <ul>
                  <li>Built a custom inventory management system from scratch to digitize and centralize procurement and stock records, replacing Excel and enabling accurate, real-time tracking of over 200 product lines</li>
                  <li>Integrated live inventory and pricing data into an AI-powered customer service assistant, drastically reducing response time and enhancing customer satisfaction</li>
                </ul>
              </div>
              
              {/* Add other timeline items here */}
            </div>
          </div>
        </section>

        {/* Projects Section - Abbreviated */}
        <section className="projects" id="projects">
          <div className="container">
            <h2 className="section-title">Featured Projects</h2>
            <p>My work focuses on creating human-centered solutions with measurable impact.</p>
            
            <div className="projects-grid">
              <div className="project-card">
                <div className="project-img">
                  <img src="Healingcells.png" alt="Healthcare Project" />
                </div>
                <div className="project-content">
                  <h3 className="project-title">HealingCells – Cancer Support Platform</h3>
                  <p className="project-desc">A web platform supporting cancer patients, survivors, and caregivers with reliable resources and emotional support. Designed based on research with actual patients to address emotional and informational needs.</p>
                  <div className="project-tech">
                    <span className="tech-tag">HTML</span>
                    <span className="tech-tag">CSS</span>
                    <span className="tech-tag">JavaScript</span>
                    <span className="tech-tag">PHP</span>
                    <span className="tech-tag">MySQL</span>
                  </div>
                  <div className="project-links">
                    <a href="http://austineiheji.great-site.net/" target="_blank" rel="noopener noreferrer"><i className="fas fa-external-link-alt"></i> Live Demo</a>
                    <a href="https://github.com/alotanna/cancerwebsite.git" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i> Code</a>
                  </div>
                </div>
              </div>
              
              <div className="project-card">
                <div className="project-img">
                  <img src="GAEA.png" alt="Grow Africa Eat Africa" />
                </div>
                <div className="project-content">
                  <h3 className="project-title">Grow Africa Eat Africa</h3>
                  <p className="project-desc">Co-founded an initiative developing sustainable clay brick storage chambers to reduce post-harvest losses and extend crop shelf life for smallholder farmers across Africa.</p>
                  <div className="project-tech">
                    <span className="tech-tag">Sustainability</span>
                    <span className="tech-tag">Agriculture</span>
                    <span className="tech-tag">Field Research</span>
                    <span className="tech-tag">Product Design</span>
                  </div>
                  <div className="project-links">
                    <a href="https://www.canva.com/design/DAGnyFR38AQ/VXkQ8SHAzzlX1a6pYfNe2w/view?utm_content=DAGnyFR38AQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1bb35b3f9c" target="_blank" rel="noopener noreferrer"><i className="fas fa-external-link-alt"></i> Project Details</a>
                  </div>
                </div>
              </div>
              
              {/* Add other project cards here */}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact" id="contact">
          <div className="container">
            <h2 className="section-title">Get In Touch</h2>
            <p>Interested in collaborating or have a project in mind? Feel free to reach out.</p>
            
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