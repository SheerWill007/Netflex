'use client';

import '@/styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__questions">Questions? Call 000-000-0000</p>
      <div className="footer__grid">
        <div className="footer__col">
          <a href="#">FAQ</a>
          <a href="#">Investor Relations</a>
          <a href="#">Privacy</a>
          <a href="#">Speed Test</a>
        </div>
        <div className="footer__col">
          <a href="#">Help Center</a>
          <a href="#">Jobs</a>
          <a href="#">Cookie Preferences</a>
          <a href="#">Legal Notices</a>
        </div>
        <div className="footer__col">
          <a href="#">Account</a>
          <a href="#">Ways to Watch</a>
          <a href="#">Corporate Information</a>
          <a href="#">Only on N-Clone</a>
        </div>
        <div className="footer__col">
          <a href="#">Media Center</a>
          <a href="#">Terms of Use</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
      <p className="footer__note">
        This is a practice project built for learning purposes.
      </p>
    </footer>
  );
};

export default Footer;
