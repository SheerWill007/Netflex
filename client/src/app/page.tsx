import { SignInButton, SignUpButton } from '@clerk/nextjs';
import '@/styles/Landing.css';

const trendingTitles = [
  { title: 'The Last Horizon', genre: 'Sci-fi thriller', style: 'horizon' },
  { title: 'Wild Hearts', genre: 'Feel-good series', style: 'hearts' },
  { title: 'The Deep', genre: 'Mystery', style: 'deep' },
  { title: 'After Hours', genre: 'Crime drama', style: 'hours' },
  { title: 'Gold Rush', genre: 'Adventure', style: 'gold' },
];

const questions = [
  {
    question: 'What is Netflex?',
    answer:
      'Netflex is a place to discover and enjoy movies, series, documentaries, and stories picked for every kind of night in.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Choose the plan that works for you. Every plan gives you unlimited access to the Netflex library.',
  },
  {
    question: 'Where can I watch?',
    answer:
      'Watch wherever you like: on your phone, tablet, laptop, or TV. Start on one screen and pick up where you left off on another.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes. Your account is yours to manage, and you can change or cancel your plan whenever you need to.',
  },
];

function GetStartedButton({ className = '' }: { className?: string }) {
  return (
    <SignUpButton mode="modal">
      <button className={`landing-cta ${className}`}>
        Get started <span aria-hidden="true">›</span>
      </button>
    </SignUpButton>
  );
}

export default function Home() {
  return (
    <main className="landing">
      <section className="landing-hero" id="home">
        <header className="landing-header">
          <a className="landing-logo" href="#home" aria-label="Netflex home">
            NETFLEX<span>.</span>
          </a>
          <div className="landing-header__actions">
            <a className="landing-language" href="#features">
              Explore
            </a>
            <SignInButton mode="modal">
              <button className="landing-signin">Sign in</button>
            </SignInButton>
          </div>
        </header>

        <div className="landing-hero__content">
          <p className="landing-eyebrow">
            <span /> YOUR NEXT FAVORITE STARTS HERE
          </p>
          <h1>
            STORIES THAT
            <br />
            STAY WITH YOU<span className="landing-period">.</span>
          </h1>
          <p className="landing-hero__copy">
            The shows you talk about. The films you feel. All in one place.
          </p>
          <GetStartedButton className="landing-cta--hero" />
          <p className="landing-hero__note">Your first story is just a click away.</p>
        </div>

        <div className="landing-hero__caption">
          <span className="landing-caption-line" />
          <span>MADE FOR THE MOMENT</span>
          <span className="landing-hero__index">01 / 04</span>
        </div>
        <div className="landing-scroll" aria-hidden="true">
          SCROLL TO EXPLORE <span>↓</span>
        </div>
      </section>

      <section className="landing-trending" id="trending">
        <div className="landing-section-heading">
          <div>
            <p className="landing-kicker">WHAT EVERYONE&apos;S WATCHING</p>
            <h2>Trending now<span>.</span></h2>
          </div>
          <a href="#features" className="landing-text-link">
            There&apos;s more to discover <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="landing-title-grid">
          {trendingTitles.map((item, index) => (
            <article className={`title-card title-card--${item.style}`} key={item.title}>
              <span className="title-card__number">{String(index + 1).padStart(2, '0')}</span>
              <div className="title-card__details">
                <span>{item.genre}</span>
                <h3>{item.title}</h3>
              </div>
              <span className="title-card__play" aria-hidden="true">
                ▶
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-features" id="features">
        <div className="landing-section-heading">
          <div>
            <p className="landing-kicker">A BETTER WAY TO WATCH</p>
            <h2>Your night, your rules<span>.</span></h2>
          </div>
        </div>
        <div className="feature-grid">
          <article className="feature-card feature-card--large">
            <span className="feature-card__icon" aria-hidden="true">✦</span>
            <p className="landing-kicker">MADE FOR YOU</p>
            <h3>Find your next obsession.</h3>
            <p>Thoughtful picks make finding something great feel effortless.</p>
            <div className="feature-orbit" aria-hidden="true" />
          </article>
          <article className="feature-card">
            <span className="feature-card__icon" aria-hidden="true">▣</span>
            <p className="landing-kicker">TAKE IT WITH YOU</p>
            <h3>Go wherever the story goes.</h3>
            <p>Pick up right where you left off, on any screen.</p>
          </article>
          <article className="feature-card">
            <span className="feature-card__icon" aria-hidden="true">↓</span>
            <p className="landing-kicker">READY WHEN YOU ARE</p>
            <h3>Download and disappear.</h3>
            <p>Save your favorites and take them along for the ride.</p>
          </article>
          <article className="feature-card feature-card--wide">
            <div>
              <p className="landing-kicker">NO BAD SEATS</p>
              <h3>Big-screen feeling. Wherever you are.</h3>
              <p>Beautiful picture and immersive sound make every watch feel like an event.</p>
            </div>
            <span className="feature-card__screen" aria-hidden="true">
              <span />
            </span>
          </article>
        </div>
      </section>

      <section className="landing-faq" id="faq">
        <div className="landing-section-heading">
          <div>
            <p className="landing-kicker">THE QUICK VERSION</p>
            <h2>Good questions<span>.</span></h2>
          </div>
        </div>
        <div className="faq-list">
          {questions.map(({ question, answer }) => (
            <details className="faq-item" key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
        <div className="landing-final-cta">
          <p className="landing-kicker">THE COUCH IS CALLING</p>
          <h2>Make tonight a good story.</h2>
          <GetStartedButton />
        </div>
      </section>

      <footer className="landing-footer">
        <a className="landing-logo" href="#home" aria-label="Netflex home">
          NETFLEX<span>.</span>
        </a>
        <p>Stories worth staying in for.</p>
        <nav aria-label="Footer navigation">
          <a href="#trending">Trending</a>
          <a href="#features">Why Netflex</a>
          <a href="#faq">FAQs</a>
        </nav>
        <small>© 2026 Netflex. Made for your next favorite.</small>
      </footer>
    </main>
  );
}
