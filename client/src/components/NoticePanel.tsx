import '@/styles/NoticePanel.css';

const REQUEST_URL = 'https://github.com/SheerWill007/Netflex/issues/new?title=Title%20request%3A%20';

/** Announcement panel shown under the hero banner. */
export default function NoticePanel() {
  return (
    <section className="notice" aria-label="About Netflex">
      <div className="notice__col">
        <h2 className="notice__heading">Important Note</h2>
        <p className="notice__amber">
          Everything on Netflex is in the public domain or released under an open licence, so
          it&apos;s free to watch — no subscription, no sign-up, no ads.
        </p>
        <p className="notice__green">
          Films stream from the Internet Archive. Open a title and choose &ldquo;View source&rdquo;
          to see its licence and original upload.
        </p>
        <p className="notice__red">
          Bookmark this page: <span>new classics are added regularly.</span>
        </p>
      </div>

      <div className="notice__divider" aria-hidden="true" />

      <div className="notice__col">
        <h2 className="notice__heading notice__heading--plain">Help Grow the Library</h2>
        <div className="notice__cta-row">
          <a className="notice__cta" href={REQUEST_URL} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"
              />
            </svg>
            <span>
              <strong>REQUEST</strong>
              <em>A TITLE</em>
            </span>
          </a>
          <p className="notice__list">
            You can <span>★</span> suggest public-domain films and series, <span>★</span> report a
            broken player, <span>★</span> flag a title whose licence looks wrong.
          </p>
        </div>
      </div>
    </section>
  );
}
