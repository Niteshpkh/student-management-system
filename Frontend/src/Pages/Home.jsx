import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const facilities = [
    {
      icon: "🏫",
      title: "Peaceful & Safe Campus",
      desc: "Located in the serene surroundings of Salakpur, Morang, providing a safe, green, and distraction-free environment for kids."
    },
    {
      icon: "🎓",
      title: "Nursery to Grade 8 Education",
      desc: "Tailored curriculum focusing on early childhood brain development progressing smoothly to middle school academic rigor."
    },
    {
      icon: "👩‍🏫",
      title: "Loving & Trained Faculty",
      desc: "Experienced educators who treat each child with patience, understanding, and individualized attention."
    },
    {
      icon: "💻",
      title: "Digital Student Portal",
      desc: "Modern digital management system for instant record-keeping, attendance, student performance, and administrative efficiency."
    },
    {
      icon: "🎨",
      title: "Arts, Music & Culture",
      desc: "Encouraging creativity, Nepali traditions, music, dance, and public speaking through weekly extracurricular activities."
    },
    {
      icon: "⚽",
      title: "Sports & Physical Wellness",
      desc: "Spacious play area with outdoor games, indoor mind games (chess), and structured physical education drills."
    }
  ];

  const levels = [
    {
      badge: "Foundation Wing",
      name: "Pre-Primary (Nursery, LKG, UKG)",
      age: "Ages 3 - 5 Years",
      points: [
        "Play-based & Montessori learning concepts",
        "Phonics, rhyme, and early vocabulary building",
        "Sensory motor skills & social interaction",
        "Warm, joyful, and fear-free classroom setting"
      ]
    },
    {
      badge: "Primary Wing",
      name: "Primary School (Grade 1 - 5)",
      age: "Ages 6 - 10 Years",
      points: [
        "Strong fundamentals in English, Nepali & Mathematics",
        "Curiosity-driven Science & Environmental studies",
        "Moral values, discipline, and cooperative teamwork",
        "Creative expression through arts, crafts & storytelling"
      ]
    },
    {
      badge: "Middle Wing",
      name: "Middle School (Grade 6 - 8)",
      age: "Ages 11 - 14 Years",
      points: [
        "Analytical problem solving & scientific method",
        "Computer literacy & introduction to digital tools",
        "Leadership skills, public speaking & debates",
        "Preparation for secondary academic excellence"
      ]
    }
  ];

  const notices = [
    {
      date: "Baisakh 2081",
      tag: "Admission",
      title: "New Academic Session Admissions Open (Nursery to Grade 8)",
      desc: "Admissions are currently underway for the new academic session. Visit our school office in Salakpur for registration and campus tour."
    },
    {
      date: "Ongoing",
      tag: "Notice",
      title: "Online Student Information System Live",
      desc: "Teachers and authorized staff can now access student data, attendance, and record sheets through the dedicated portal."
    },
    {
      date: "Upcoming",
      tag: "Event",
      title: "Parent-Teacher Interactive Conference",
      desc: "Regular quarterly meet to discuss holistic progress, student talents, and home-school learning collaboration."
    }
  ];

  const faqs = [
    {
      q: "Where is Rational Academy located?",
      a: "Rational Academy is conveniently situated at Sundarharaicha Municipality - 8, Salakpur, Morang, Nepal in a peaceful and easily accessible area."
    },
    {
      q: "What classes are offered at Rational Academy?",
      a: "We provide comprehensive quality education from Pre-Primary (Nursery, LKG, UKG) through Grade 8 (Middle School)."
    },
    {
      q: "When was the school established?",
      a: "Rational Academy was established in the year 2072 B.S. with the mission of nurturing capable, morally sound, and bright future leaders."
    },
    {
      q: "How can parents and teachers access the Student Management Portal?",
      a: "Simply click on the 'Login' button at the top-right corner to access your account dashboard."
    }
  ];

  return (
    <div className="home-page">
      {/* Top Banner Notice */}
      <div className="top-notice-bar">
        <div className="top-notice-content">
          <span className="notice-pill">Notice</span>
          <span className="notice-text">
            Admissions Open for Nursery to Grade 8 | Sundarharaicha-8, Salakpur, Morang | Est. 2072
          </span>
          <Link to="/login" className="top-portal-link">
            Open SMS Portal →
          </Link>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="home-header">
        <div className="header-container">
          {/* Logo & School Identity */}
          <Link to="/" className="brand-logo-container">
            <img 
              src="/logo.svg" 
              alt="Rational Academy Emblem" 
              className="school-logo-img" 
            />
            <div className="brand-text">
              <span className="brand-nepali">रेस्नल एकेडेमी</span>
              <h1 className="brand-english">Rational Academy</h1>
              <span className="brand-tagline">Sundarharaicha-8, Salakpur, Morang</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <a href="#about" className="nav-item">About Us</a>
            <a href="#programs" className="nav-item">Academics</a>
            <a href="#features" className="nav-item">Why Choose Us</a>
            <a href="#notices" className="nav-item">Notices</a>
            <a href="#contact" className="nav-item">Contact</a>
          </nav>

          {/* Side Auth Action Buttons (Login & Sign Up) */}
          <div className="header-actions">
            <Link to="/signin" className="btn-secondary">
              Sign Up
            </Link>
            <Link to="/login" className="btn-primary">
              <span className="portal-icon">🔐</span> Login Portal
            </Link>

            {/* Mobile Hamburger Button */}
            <button 
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About Us</a>
            <a href="#programs" onClick={() => setMobileMenuOpen(false)}>Academics</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>Why Choose Us</a>
            <a href="#notices" onClick={() => setMobileMenuOpen(false)}>Notices</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <div className="mobile-auth-actions">
              <Link to="/login" className="btn-primary" onClick={() => setMobileMenuOpen(false)}>
                Login Portal
              </Link>
              <Link to="/signin" className="btn-secondary" onClick={() => setMobileMenuOpen(false)}>
                Register (Sign Up)
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-shape-bg"></div>
        <div className="hero-container">
          <div className="hero-text-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>A Decade of Quality Education • Estd. 2072 B.S.</span>
            </div>

            <h2 className="hero-headline">
              Nurturing Young Minds From <br />
              <span className="highlight-text">Nursery to Grade 8</span>
            </h2>

            <p className="hero-description">
              Welcome to <strong>Rational Academy (रेस्नल एकेडेमी)</strong>, located at 
              Sundarharaicha-8, Salakpur, Morang. We blend academic excellence, 
              character building, creative activities, and digital innovation to help 
              every child shine.
            </p>

            <div className="hero-cta-group">
              <Link to="/login" className="btn-hero-primary">
                <span>Access Student Portal</span>
                <span className="arrow-icon">→</span>
              </Link>
              <a href="#programs" className="btn-hero-outline">
                Explore Classes
              </a>
            </div>

            {/* Highlights Bar */}
            <div className="hero-stats-row">
              <div className="stat-pill">
                <span className="stat-number">2072 B.S.</span>
                <span className="stat-label">Established</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-pill">
                <span className="stat-number">Nursery - 8</span>
                <span className="stat-label">Grade Levels</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-pill">
                <span className="stat-number">Salakpur, Morang</span>
                <span className="stat-label">Prime Location</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-pill">
                <span className="stat-number">100%</span>
                <span className="stat-label">Caring Attention</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="hero-visual">
            <div className="hero-emblem-card">
              <div className="card-ribbon">Rational Academy</div>
              <div className="emblem-wrapper">
                <img 
                  src="/logo.svg" 
                  alt="Rational Academy Official Emblem" 
                  className="hero-logo-large" 
                />
              </div>
              <div className="card-info">
                <h3 className="card-title">रेस्नल एकेडेमी</h3>
                <p className="card-sub">सुन्दरहरैँचा न.पा. -८, सलकपुर, मोरङ</p>
                <div className="card-badges">
                  <span className="tag-pill">🌱 Early Childhood</span>
                  <span className="tag-pill">📚 Primary</span>
                  <span className="tag-pill">🎯 Middle School</span>
                </div>
              </div>

              {/* Portal Quick Access Box */}
              <div className="quick-portal-box">
                <div className="portal-box-info">
                  <span className="portal-box-title">Student Management Portal</span>
                  <span className="portal-box-sub">Track attendance, grades & staff</span>
                </div>
                <Link to="/login" className="btn-portal-small">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About School Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">ABOUT OUR ACADEMY</span>
            <h2 className="section-title">Where Learning Meets Compassion & Excellence</h2>
            <div className="title-underline"></div>
          </div>

          <div className="about-grid">
            <div className="about-card highlight-card">
              <div className="about-icon">🎓</div>
              <h3>Our Noble Mission</h3>
              <p>
                To provide accessible, high-standard primary and lower-secondary education in 
                Sundarharaicha that fosters critical inquiry, moral integrity, physical health, 
                and a lifelong joy for learning in every student.
              </p>
            </div>

            <div className="about-card">
              <div className="about-icon">🌟</div>
              <h3>Our Inspiring Vision</h3>
              <p>
                To be the leading learning community in Morang district where children from Nursery to Grade 8 
                blossom into confident, creative, empathetic individuals ready to excel in higher education and society.
              </p>
            </div>

            <div className="about-card">
              <div className="about-icon">❤️</div>
              <h3>Our Core Values</h3>
              <p>
                Discipline with kindness, honesty, mutual respect, love for community and culture, 
                and curiosity to explore modern knowledge with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs Section */}
      <section id="programs" className="programs-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">ACADEMIC EXCELLENCE</span>
            <h2 className="section-title">Programs Designed For Every Stage</h2>
            <p className="section-intro">
              From the joyful first steps in Nursery to the academic mastery of Grade 8, 
              we guide our pupils step-by-step with structured pedagogy.
            </p>
            <div className="title-underline"></div>
          </div>

          <div className="programs-grid">
            {levels.map((lvl, index) => (
              <div key={index} className="program-card">
                <div className="program-header">
                  <span className="program-badge">{lvl.badge}</span>
                  <h3 className="program-title">{lvl.name}</h3>
                  <span className="program-age">{lvl.age}</span>
                </div>
                <ul className="program-list">
                  {lvl.points.map((pt, i) => (
                    <li key={i}>
                      <span className="check-icon">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="program-footer">
                  <Link to="/signin" className="program-btn">
                    Register Student
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us / Features */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">WHY CHOOSE RATIONAL ACADEMY</span>
            <h2 className="section-title">The Ideal Environment For Your Child</h2>
            <div className="title-underline"></div>
          </div>

          <div className="features-grid">
            {facilities.map((fac, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon-box">{fac.icon}</div>
                <h3 className="feature-card-title">{fac.title}</h3>
                <p className="feature-card-desc">{fac.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal Showcase Banner */}
      <section className="portal-showcase-section">
        <div className="section-container">
          <div className="portal-banner-card">
            <div className="portal-banner-content">
              <span className="portal-tag">Integrated System</span>
              <h2 className="portal-heading">Smart Student Management System</h2>
              <p className="portal-text">
                Rational Academy is equipped with a digital administrative system. 
                Teachers, students, and administrators can log in anytime to view academic 
                details, maintain student profiles, handle admissions, and track records securely.
              </p>
              <div className="portal-actions">
                <Link to="/login" className="btn-portal-action">
                  Go to Login Portal →
                </Link>
                <Link to="/signin" className="btn-portal-secondary">
                  Create Account
                </Link>
              </div>
            </div>
            <div className="portal-features-list">
              <div className="p-feature-item">
                <span className="p-dot">✓</span>
                <span>Role-based access (Student, Teacher, Admin)</span>
              </div>
              <div className="p-feature-item">
                <span className="p-dot">✓</span>
                <span>Fast & secure record lookup</span>
              </div>
              <div className="p-feature-item">
                <span className="p-dot">✓</span>
                <span>Personal student profile tracking</span>
              </div>
              <div className="p-feature-item">
                <span className="p-dot">✓</span>
                <span>Centralized school records for Salakpur-8</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notices & Events */}
      <section id="notices" className="notices-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">UPDATES & CIRCULARS</span>
            <h2 className="section-title">Latest School Notices</h2>
            <div className="title-underline"></div>
          </div>

          <div className="notices-grid">
            {notices.map((item, i) => (
              <div key={i} className="notice-card">
                <div className="notice-meta">
                  <span className="notice-tag">{item.tag}</span>
                  <span className="notice-date">{item.date}</span>
                </div>
                <h3 className="notice-title">{item.title}</h3>
                <p className="notice-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="faq-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">COMMON QUERIES</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="title-underline"></div>
          </div>

          <div className="faq-container">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item ${activeFaq === idx ? "active" : ""}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <span className="faq-icon">{activeFaq === idx ? "−" : "+"}</span>
                </div>
                {activeFaq === idx && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contact" className="contact-info-section">
        <div className="section-container">
          <div className="contact-card">
            <div className="contact-details">
              <span className="contact-pill">Visit Our Campus</span>
              <h2 className="contact-heading">Rational Academy (रेस्नल एकेडेमी)</h2>
              <p className="contact-desc">
                We warmly welcome parents and guardians to visit our campus, observe our 
                facilities, and meet our teachers and administration.
              </p>

              <div className="contact-list">
                <div className="contact-item">
                  <span className="c-icon">📍</span>
                  <div>
                    <strong>Campus Address:</strong>
                    <p>Sundarharaicha Municipality - Ward No. 8, Salakpur, Morang, Nepal</p>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="c-icon">⏱️</span>
                  <div>
                    <strong>Office Hours:</strong>
                    <p>Sunday – Friday: 9:00 AM – 4:00 PM</p>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="c-icon">🎒</span>
                  <div>
                    <strong>Grades:</strong>
                    <p>Nursery, LKG, UKG and Grade 1 to 8</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-actions-box">
              <h3>Need More Information?</h3>
              <p>Sign in to your portal or reach out directly to our admissions desk.</p>
              <div className="box-buttons">
                <Link to="/login" className="btn-primary full-width">
                  Open Student Portal
                </Link>
                <Link to="/signin" className="btn-secondary full-width">
                  Register Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-container">
          <div className="footer-col brand-col">
            <div className="footer-logo-row">
              <img src="/logo.svg" alt="Rational Academy" className="footer-logo" />
              <div>
                <h3 className="footer-title">Rational Academy</h3>
                <span className="footer-nepali">रेस्नल एकेडेमी</span>
              </div>
            </div>
            <p className="footer-desc">
              Dedicated to nurturing young minds with knowledge, wisdom, and character 
              from Nursery to Grade 8 in Salakpur, Morang.
            </p>
            <span className="estd-tag">Established 2072 B.S.</span>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#about">About School</a></li>
              <li><a href="#programs">Academic Wings</a></li>
              <li><a href="#features">Facilities & Care</a></li>
              <li><a href="#notices">Notice Board</a></li>
              <li><a href="#contact">Campus Location</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Portal Links</h4>
            <ul className="footer-links">
              <li><Link to="/login">Student & Staff Login</Link></li>
              <li><Link to="/signin">New Account Registration</Link></li>
              <li><Link to="/login">Admin Dashboard</Link></li>
              <li><Link to="/login">Teacher Records</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Address</h4>
            <p className="footer-address-text">
              Sundarharaicha Municipality - 8<br />
              Salakpur, Morang District<br />
              Koshi Province, Nepal
            </p>
            <div className="portal-quick-btn">
              <Link to="/login" className="btn-footer-portal">
                Portal Login →
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Rational Academy (रेस्नल एकेडेमी). All rights reserved.</p>
          <p className="location-bottom">Sundarharaicha-8, Salakpur, Morang • Nursery - Grade 8</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;