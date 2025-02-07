import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className='home'>
      <section className="hero-section">
        <div className="hero-content">
          <h2>Your Dream Job Awaits</h2>
          <p>Find the perfect job or hire the ideal candidate with JobWala's personalized job recommendations and smart matching features.</p>
          <div className="hero-buttons">
            <a href="/login" className="btn primary-btn">Get Started</a>
            <a href="https://magenta-glorious-fight.glitch.me/" target="_blank" className="btn secondary-btn">Learn More</a>
          </div>
        </div>
        <br/>
        <div className="hero-image">
          <img src="https://picsum.photos/500" alt="Job search illustration" />
        </div>
      </section>

      <section className="summary-section">
        <div className="container">
          <h2>The Growing Need for Student Part-Time Jobs</h2>
          <p>In today’s ever-evolving world, the financial responsibilities of students are growing rapidly. The cost of education, lifestyle, and other expenses has reached a point where many students feel the need to take on small responsibilities to support themselves. This shift is not just about money—it’s about independence, growth, and preparation for the future.</p>
          <p>For students, the idea of earning their own income through part-time jobs is a stepping stone toward self-reliance. Instead of solely depending on their parents, they aspire to leverage their skills to make a meaningful contribution. These part-time roles provide more than just financial stability; they offer an opportunity to enhance their professional and personal growth. By earning their own money, students gain confidence, develop critical life skills, and foster a sense of responsibility that prepares them for adulthood.</p>
          <p>Part-time jobs are a unique way for students to balance academic responsibilities with practical experience. They allow students to develop important skills like time management, teamwork, and communication, all while earning pocket money to meet their personal needs. Additionally, flexible work schedules ensure that students can prioritize their studies while gaining exposure to the professional world.</p>
          <p>Despite their willingness to work, students often struggle with locating reliable, flexible, and skill-based opportunities that align with their academic commitments. Traditional job platforms fail to meet these specific needs, leaving a significant gap in the market. This gap creates barriers for students, who often face difficulty navigating through platforms designed primarily for full-time roles.</p>
          <p>The lack of a centralized system for verified and student-friendly part-time jobs often leads to exploitation or missed opportunities. Additionally, companies willing to support students through part-time work find it challenging to reach this demographic effectively. The result is a missed chance to create a symbiotic relationship between students seeking growth and organizations aiming to make a positive social impact.</p>
          <p>It is in addressing these specific challenges that a dedicated platform like JobWala steps in. JobWala is designed to be more than just a job portal; it is a bridge between students and opportunities, empowering them to achieve financial independence while building skills and experiences that will shape their future. By connecting students with verified part-time opportunities and supporting companies in fulfilling their CSR goals, JobWala contributes to a stronger, more self-reliant community.</p>
        </div>
      </section>

      <section id="features" className="features-section">
        <h2>Why Choose JobWala?</h2>
        <div className="features-cards">
          <div className="card" style={{color: 'black'}}>
            <img src="https://picsum.photos/200/200" alt="Smart Matching" />
            <h3>Smart Matching</h3>
            <p>We match job seekers with the best-suited opportunities using advanced algorithms.</p>
          </div>
          <div className="card" style={{color: 'black'}}>
            <img src="https://picsum.photos/200/200" alt="Personalized Recommendations" />
            <h3>Personalized Recommendations</h3>
            <p>Get job suggestions tailored to your skills, experience, and preferences.</p>
          </div>
          <div className="card" style={{color: 'black'}}>
            <img src="https://picsum.photos/200/200" alt="Streamlined Recruitment" />
            <h3>Streamlined Recruitment</h3>
            <p>Employers can post jobs and manage applications effortlessly.</p>
          </div>
        </div>
      </section>

      <section id="featured-companies" className="featured-companies-section">
        <div className="container">
          <h2>Featured Companies</h2>
          <div className="companies-grid">
            <div className="company-card">
              <img src="https://picsum.photos/150/50" alt="Company 1" />
              <p>Company 1</p>

            </div>
            <div className="company-card">
              <img src="https://picsum.photos/150/50" alt="Company 2" />
              <p>Company 2</p>
            </div>
            <div className="company-card">
              <img src="https://picsum.photos/150/50" alt="Company 3" />
              <p>Company 3</p>
            </div>
            <div className="company-card">
              <img src="https://picsum.photos/150/50" alt="Company 4" />
              <p>Company 4</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <h2>About JobWala</h2>
        <p>JobWala is a cutting-edge platform designed to connect job seekers and employers. We aim to revolutionize the hiring process by providing tools and features that ensure seamless recruitment and job hunting experiences.</p>
        <p>Our mission is to bridge the gap between students and part-time job opportunities, helping them develop essential skills while empowering companies to meet their Corporate Social Responsibility (CSR) objectives by providing meaningful job opportunities for youth.</p>
      </section>

      <footer className="footer-section">
        <p>&copy; 2025 JobWala. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
