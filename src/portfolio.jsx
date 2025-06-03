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
        <style>{`
          /* Include your existing CSS here - I'll add the key styles */

                  /* Core Styles */
        :root {
            --primary: #05addc;
            --primary-dark: #0487ad;
            --secondary: #32b8cd;
            --dark: #121212;
            --light: #f4f9ff;
            --space-bg: #041a2d;
            --space-light: #082945;
            --space-accent: #0fb8d8;
            --text: #e0e6ed;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Raleway', sans-serif;
            color: var(--text);
            background-color: var(--space-bg);
            line-height: 1.6;
            overflow-x: hidden;
            background-image: 
                radial-gradient(circle at 20% 35%, rgba(9, 53, 95, 0.8) 0%, transparent 30%),
                radial-gradient(circle at 75% 44%, rgba(4, 57, 94, 0.7) 0%, transparent 40%);
        }

        .container {
            width: 90%;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
        }

        section {
            padding: 60px 0;
            position: relative;
        }

        h1, h2, h3, h4, h5 {
            font-family: 'Verdana', 'Space Grotesk';
            line-height: 1.2;
            margin-bottom: 1rem;
        }
        
        a {
            text-decoration: none;
            color: var(--primary);
            transition: all 0.3s ease;
        }
        
        a:hover {
            color: var(--space-accent);
        }

        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: white;
            border-radius: 50px;
            font-weight: 600;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            text-transform: uppercase;
            font-size: 0.9rem;
        }

        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(5, 173, 220, 0.2);
            color: white;
        }

        /* Stars Animation */
        .stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        }

        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background-color: white;
            border-radius: 50%;
            opacity: 0.6;
            animation: twinkling 4s infinite;
        }

        @keyframes twinkling {
            0% { opacity: 0.2; }
            50% { opacity: 0.8; }
            100% { opacity: 0.2; }
        }

        /* Navigation */
        header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            transition: all 0.4s ease;
            padding: 20px 0;
            background-color: rgba(4, 26, 45, 0.9);
            backdrop-filter: blur(10px);
        }

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.8rem;
            font-weight: 700;
            letter-spacing: 1px;
            color: var(--primary);
        }

        .logo span {
            color: var(--light);
        }

        .nav-links {
            display: flex;
            list-style: none;
        }

        .nav-links li {
            margin-left: 30px;
        }

        .nav-links a {
            color: var(--text);
            font-weight: 600;
            font-size: 1rem;
            padding: 8px 12px;
            border-radius: 4px;
            transition: all 0.3s ease;
        }

        .nav-links a:hover,
        .nav-links a.active {
            color: var(--primary);
            background-color: rgba(255, 255, 255, 0.1);
        }

        .menu-toggle {
            display: none;
            cursor: pointer;
            font-size: 1.5rem;
        }

        /* Hero Section */
        .hero {
            height: 100vh;
            min-height: 700px;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
        }

        .hero-content {
            position: relative;
            z-index: 2;
            max-width: 800px;
            margin-top: 50px;
        }

        .hero h1 {
            font-size: 4rem;
            font-weight: 800;
            margin-bottom: 20px;
            line-height: 1.1;
            background: linear-gradient(120deg, white, var(--primary));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .hero p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            color: var(--text);
            max-width: 600px;
        }

        .typed-text {
            color: var(--primary);
            font-weight: 600;
        }

        .hero-buttons {
            display: flex;
            gap: 20px;
            margin-top: 30px;
        }

        .secondary-btn {
            background: transparent;
            border: 2px solid var(--primary);
            color: var(--primary);
        }

        .secondary-btn:hover {
            background-color: rgba(5, 173, 220, 0.1);
        }

        .cosmic-circle {
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            right: 10%;
            top: 40%;
            background: radial-gradient(circle at center, var(--primary), transparent 70%);
            opacity: 0.2;
            animation: pulse 8s infinite alternate;
            filter: blur(40px);
        }

        .orbit {
            position: absolute;
            width: 500px;
            height: 500px;
            border: 1px solid rgba(5, 173, 220, 0.3);
            border-radius: 50%;
            top: 50%;
            right: 5%;
            transform: translate(0, -50%);
            animation: rotate 20s linear infinite;
        }

        .orbit::before {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background-color: var(--primary);
            border-radius: 50%;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            box-shadow: 0 0 20px var(--primary);
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.2); opacity: 0.3; }
            100% { transform: scale(1); opacity: 0.2; }
        }

        @keyframes rotate {
            0% { transform: translate(0, -50%) rotate(0deg); }
            100% { transform: translate(0, -50%) rotate(360deg); }
        }

        /* About Section */
        .about {
            position: relative;
            background-color: var(--space-light);
        }

        .about-content {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 40px;
        }

        .about-text {
            flex: 1;
            min-width: 300px;
        }

        .about-image {
            flex: 1;
            min-width: 300px;
            text-align: center;
        }

        .about-image img {
            width: 100%;
            max-width: 400px;
            border-radius: 50%;
            border: 4px solid var(--primary);
            box-shadow: 0 0 30px rgba(5, 173, 220, 0.3);
        }

        .section-title {
            font-size: 2.5rem;
            position: relative;
            margin-bottom: 30px;
        }

        .section-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 60px;
            height: 4px;
            background: var(--primary);
            border-radius: 2px;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-top: 40px;
        }
        
        .stat-box {
            background-color: rgba(0, 184, 212, 0.1);
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            border: 1px solid rgba(0, 184, 212, 0.2);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .stat-box:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 184, 212, 0.2);
        }
        
        .stat-number {
            font-size: 36px;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 10px;
        }
        
        .stat-label {
            font-size: 14px;
            color: var(--text);
        }

        /* Skills Section */
        .skills {
            background-color: var(--space-bg);
        }

        .skills-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }

        .skill-category {
            background-color: rgba(8, 41, 69, 0.6);
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            border-top: 3px solid var(--primary);
        }

        .skill-category:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(5, 173, 220, 0.2);
        }

        .skill-category h3 {
            color: var(--primary);
            font-size: 1.3rem;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }

        .skill-category h3 i {
            margin-right: 10px;
            font-size: 1.5rem;
        }

        .skill-list {
            list-style: none;
        }

        .skill-list li {
            margin-bottom: 12px;
            display: flex;
            align-items: center;
        }

        .skill-list li:before {
            content: '●';
            color: var(--primary);
            margin-right: 10px;
            font-size: 0.8rem;
        }

        /* Experience Section */
        .experience {
            background-color: var(--space-light);
        }

        .timeline {
            position: relative;
            max-width: 1000px;
            margin: 40px auto 0;
        }

        .timeline::before {
            content: '';
            position: absolute;
            width: 2px;
            height: 100%;
            background-color: var(--primary);
            left: 50%;
            transform: translateX(-50%);
        }

        .timeline-item {
            padding: 20px 30px;
            position: relative;
            width: calc(65% - 30px);
            background-color: rgba(8, 41, 69, 0.6);
            border-radius: 10px;
            margin-bottom: 30px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .timeline-item:nth-child(odd) {
            right: calc(12% + 30px);
        }

        .timeline-item:nth-child(even) {
            left: calc(50% + 30px);
        }

        .timeline-item::before {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background-color: var(--primary);
            border-radius: 50%;
            top: 20px;
        }

        .timeline-item:nth-child(odd)::before {
            right: -40px;
        }

        .timeline-item:nth-child(even)::before {
            left: -40px;
        }

        .timeline-date {
            font-weight: 600;
            color: var(--primary);
            margin-bottom: 10px;
            font-size: 0.9rem;
        }

        .timeline-title {
            font-size: 1.2rem;
            margin-bottom: 5px;
        }

        .timeline-subtitle {
            color: #aaa;
            font-size: 0.95rem;
            margin-bottom: 15px;
        }

       /* Projects Section */
        .projects {
            background-color: var(--space-bg);
        }

        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }

        .project-card {
            background-color: rgba(8, 41, 69, 0.6);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(5, 173, 220, 0.2);
        }

        .project-img {
            height: 200px;
            background-color: var(--space-light);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            color: var(--primary);
            overflow: hidden; /* Ensures images don't overflow */
        }

        /* New styles for handling images properly */
        .project-img img {
            width: 100%; /* Make the image take the full width */
            height: 100%; /* Make the image take the full height */
            object-fit: cover; /* Maintain aspect ratio while filling the container */
            object-position: center; /* Center the image */
            display: block; /* Remove any potential spacing issues */
        }

        /* For project cards that still use icons */
        .project-img i {
            font-size: 3rem;
            color: var(--primary);
        }

        .project-content {
            padding: 25px;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        .project-title {
            font-size: 1.3rem;
            color: var(--light);
            margin-bottom: 10px;
        }

        .project-desc {
            margin-bottom: 20px;
            flex-grow: 1;
        }

        .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: auto;
        }

        .tech-tag {
            background-color: rgba(5, 173, 220, 0.1);
            color: var(--primary);
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
        }

        .project-links {
            display: flex;
            gap: 15px;
            margin-top: 15px;
        }

        .project-links a {
            color: var(--light);
            transition: color 0.3s ease;
        }

        .project-links a:hover {
            color: var(--primary);
        }

        /* Contact Section */
        .contact {
            background-color: var(--space-light);
        }

        .contact-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 40px;
            margin-top: 40px;
        }

        .contact-info {
            flex: 1;
            min-width: 300px;
        }

        .contact-form {
            flex: 1;
            min-width: 300px;
        }

        .contact-item {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
        }

        .contact-item i {
            background-color: rgba(5, 173, 220, 0.1);
            color: var(--primary);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            margin-right: 15px;
        }

        .contact-text h4 {
            margin-bottom: 5px;
            font-size: 1rem;
        }

        .contact-text p {
            color: var(--text);
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-control {
            width: 100%;
            padding: 15px;
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 5px;
            color: var(--light);
            font-family: inherit;
            transition: all 0.3s ease;
        }

        .form-control:focus {
            outline: none;
            border-color: var(--primary);
            background-color: rgba(255, 255, 255, 0.15);
        }

        .form-control::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .form-status {
            margin-top: 20px;
            transition: all 0.3s ease;
        }

        textarea.form-control {
            min-height: 150px;
            resize: vertical;
        }

        .social-links {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }

        .social-links a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.1);
            color: var(--light);
            border-radius: 50%;
            transition: all 0.3s ease;
        }

        .social-links a:hover {
            background-color: var(--primary);
            color: white;
            transform: translateY(-3px);
        }

        /* Footer */
        footer {
            background-color: var(--space-bg);
            padding: 30px 0;
            text-align: center;
        }

        .footer-text {
            color: var(--text);
            margin-bottom: 20px;
        }

        .back-to-top {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            background-color: var(--primary);
            color: white;
            border-radius: 50%;
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 99;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            font-size: 1.2rem;
        }

        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }

        .back-to-top:hover {
            background-color: var(--primary-dark);
            transform: translateY(-3px);
        }

        /* Responsive Styles */
        @media (max-width: 991px) {
            .hero h1 {
                font-size: 3rem;
            }

            .section-title {
                font-size: 2rem;
            }

            .timeline::before {
                left: 40px;
            }

            .timeline-item {
                width: calc(100% - 80px);
                left: 80px;
            }

            .timeline-item:nth-child(even) {
                left: 70px;
            }

            .timeline-item:nth-child(odd) {
                left: 70px;
            }

            .timeline-item::before {
                left: -40px;
            }

            .timeline-item:nth-child(odd)::before {
                right: auto;
                left: -40px;
            }
        }

        @media (max-width: 768px) {
            header {
                padding: 15px 0;
            }

            .nav-links {
                position: fixed;
                flex-direction: column;
                top: 70px;
                left: 0;
                width: 100%;
                background-color: var(--space-bg);
                padding: 20px 0;
                clip-path: circle(0% at 100% 0);
                transition: all 0.4s ease-out;
                z-index: 1000;
            }

            .nav-links.active {
                clip-path: circle(150% at 100% 0);
            }

            .nav-links li {
                margin: 15px 0;
                width: 100%;
                text-align: center;
            }

            .menu-toggle {
                display: block;
            }

            .hero h1 {
                font-size: 2.5rem;
            }

            .hero p {
                font-size: 1rem;
            }

            .orbit {
                width: 300px;
                height: 300px;
                right: -20%;
            }
        }

        @media (max-width: 576px) {
            .container {
                width: 95%;
                padding: 0 10px;
            }

            section {
                padding: 40px 0;
            }

            .hero {
                min-height: 600px;
            }

            .hero h1 {
                font-size: 2rem;
            }

            .hero-buttons {
                flex-direction: column;
                gap: 15px;
            }

            .hero-buttons .btn {
                width: 100%;
                text-align: center;
            }

            .section-title {
                font-size: 1.8rem;
            }

            .about-image img {
                max-width: 250px;
            }

            .projects-grid {
                grid-template-columns: 1fr;
            }
        }
          
          /* Add all other existing CSS styles here */
          /* For brevity, I'm not including all CSS - you'll need to add your index.css content */
        `}</style>

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
                  {/* Add the rest of your skills here */}
                </ul>
              </div>
              
              <div className="skill-category">
                <h3><i className="fas fa-brain"></i> AI & Machine Learning</h3>
                <ul className="skill-list">
                  <li>scikit-learn</li>
                  <li>AI Prompt Engineering</li>
                  {/* Add the rest of your skills here */}
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