import { useDarkMode } from '../../contexts/DarkModeContext';

import purplePixelBadgeFrame from '../../assets/badges/purple-pixel-badge-frame.png';
import codeMark from '../../assets/magic-shop/code-mark.svg';

import './Certifications.css';

interface CertificationBadge {
  id: string;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  credentialUrl?: string;
}

const BADGES: CertificationBadge[] = [
  {
    id: 'cert-1',
    image: codeMark,
    alt: 'SAP Analytics Cloud badge',
    title: 'SAP Analytics Cloud',
    subtitle: 'SAP',
    credentialUrl: '',
  },
  {
    id: 'cert-2',
    image: codeMark,
    alt: 'NPTEL: Database Management Systems badge',
    title: 'NPTEL: Database Management Systems',
    subtitle: 'NPTEL',
    credentialUrl: '',
  },
  {
    id: 'cert-3',
    image: codeMark,
    alt: 'NPTEL: Operating Systems badge',
    title: 'NPTEL: Operating Systems',
    subtitle: 'NPTEL',
    credentialUrl: '',
  },
  {
    id: 'cert-4',
    image: codeMark,
    alt: 'Cybersecurity Simulation badge',
    title: 'Cybersecurity Simulation',
    subtitle: 'Deloitte',
    credentialUrl: '',
  },
  {
    id: 'cert-5',
    image: codeMark,
    alt: 'Cybersecurity Simulation badge',
    title: 'Cybersecurity Simulation',
    subtitle: 'TATA',
    credentialUrl: '',
  },
];

const Certifications = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <section
      id="certifications"
      className={`magic-badges ${
        isDarkMode ? 'is-dark' : 'is-light'
      }`}
    >
      <div className="magic-badges__shell">
        <header className="magic-badges__heading">
          <span>MAGIC_SHOP.ACHIEVEMENTS</span>

          <h2>Badges earned</h2>

          <p>
            Credentials collected while building my technical toolkit.
          </p>
        </header>

        <div className="magic-badges__grid">
          {BADGES.map((badge, index) => {
            const badgeContent = (
              <article className="magic-badge">
                <div className="magic-badge__emblem">
                  <img
                    src={purplePixelBadgeFrame}
                    alt=""
                    aria-hidden="true"
                    className="magic-badge__frame"
                    draggable={false}
                  />

                  <div className="magic-badge__credential">
                    <img
                      src={badge.image}
                      alt={badge.alt}
                      className="magic-badge__credential-image"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </div>

                <span className="magic-badge__number">
                  BADGE {String(index + 1).padStart(2, '0')} · UNLOCKED
                </span>

                <h3>{badge.title}</h3>

                <p>{badge.subtitle}</p>
              </article>
            );

            if (badge.credentialUrl) {
              return (
                <a
                  key={badge.id}
                  href={badge.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magic-badge__link"
                  aria-label={`View ${badge.title} credential`}
                >
                  {badgeContent}
                </a>
              );
            }

            return (
              <div key={badge.id}>
                {badgeContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
