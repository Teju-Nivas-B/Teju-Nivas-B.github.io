import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  Code,
  ExternalLink,
  FolderOpen,
  X,
} from 'lucide-react';

import './Projects.css';

type FolderColour =
  | 'orange'
  | 'sage'
  | 'forest'
  | 'blue'
  | 'lilac'
  | 'cream';

interface Project {
  id: string;
  title: string;
  shortLabel: string;
  description: string;
  technologies: string[];
  detailsUrl?: string;
  githubUrl?: string;
  folderColour: FolderColour;
  fileCount: string;
  category: string;
}

const PROJECTS: Project[] = [
  {
    id: 'ascendant',
    title: 'Ascendant: Tower of Beginnings',
    shortLabel: 'PROJECT_01',
    description:
      'Browser-based dungeon crawler with canvas WASD exploration, puzzle mechanics and a hint system, climbing a tower floor by floor.',
    technologies: ['JavaScript', 'HTML Canvas', 'Game Design'],
    detailsUrl: '',
    githubUrl: '',
    folderColour: 'orange',
    fileCount: '06 FILES',
    category: 'GAME · IN PROGRESS',
  },
  {
    id: 'ai-notebook',
    title: 'AI Notebook',
    shortLabel: 'PROJECT_02',
    description:
      'A magic notebook for the web: write or draw with a stylus, and the AI reads your handwriting with vision and replies on the same page in handwriting.',
    technologies: ['JavaScript', 'Canvas', 'Claude Vision API'],
    detailsUrl: '',
    githubUrl: '',
    folderColour: 'lilac',
    fileCount: '04 FILES',
    category: 'FEATURED BUILD',
  },
  {
    id: 'loan-advisor',
    title: 'Multilingual Loan Advisor',
    shortLabel: 'PROJECT_03',
    description:
      'AI virtual assistant giving personalised loan guidance by voice and text, with NLP intent recognition and speech-to-text and text-to-speech.',
    technologies: ['Python', 'AI', 'NLP', 'Voice Processing'],
    detailsUrl: '',
    githubUrl: '',
    folderColour: 'sage',
    fileCount: '08 FILES',
    category: 'VOICE AI',
  },
  {
    id: 'auditory-chatbot',
    title: 'Auditory Scholastic Chatbot',
    shortLabel: 'PROJECT_04',
    description:
      'Voice-enabled educational chatbot for visually impaired learners, with hands-free speech recognition and real-time audio answers.',
    technologies: ['Python', 'AI', 'NLP', 'Accessibility'],
    detailsUrl: '',
    githubUrl: '',
    folderColour: 'blue',
    fileCount: '05 FILES',
    category: 'ACCESSIBILITY',
  },
  {
    id: 'smart-waste',
    title: 'Smart Waste Management',
    shortLabel: 'PROJECT_05',
    description:
      'Full-stack platform for waste segregation with a responsive frontend, Python and MongoDB backend, and an AI model above 85% accuracy.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'MongoDB', 'AI'],
    detailsUrl: '',
    githubUrl: '',
    folderColour: 'forest',
    fileCount: '07 FILES',
    category: 'FULL STACK',
  },
  {
    id: 'aria',
    title: 'ARIA Desktop Assistant',
    shortLabel: 'PROJECT_06',
    description:
      'JARVIS-inspired Electron desktop assistant framework with voice control, system-level OS commands and cross-platform app launching.',
    technologies: ['Electron', 'JavaScript', 'Voice Control'],
    detailsUrl: '',
    githubUrl: '',
    folderColour: 'cream',
    fileCount: '06 FILES',
    category: 'DESKTOP APP',
  },
  {
    id: 'crm',
    title: 'Lead Management CRM',
    shortLabel: 'PROJECT_07',
    description:
      'CRM MVP built for a 48-hour job assignment, then iterated into a kanban board and funnel dashboard.',
    technologies: ['JavaScript', 'Dashboard', 'Kanban'],
    detailsUrl: '',
    githubUrl: '',
    folderColour: 'orange',
    fileCount: '05 FILES',
    category: 'PRODUCT BUILD',
  },
  {
    id: 'soil-sensor',
    title: 'Arduino Soil Sensor',
    shortLabel: 'PROJECT_08',
    description:
      'Hardware project using an Arduino and an NPK soil sensor to read soil nutrients.',
    technologies: ['Arduino', 'C++', 'Sensors'],
    detailsUrl: '',
    githubUrl: '',
    folderColour: 'sage',
    fileCount: '03 FILES',
    category: 'HARDWARE',
  },
];

const Projects = () => {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  const openProject =
    PROJECTS.find((project) => project.id === openProjectId) ?? null;

  useEffect(() => {
    if (!openProject) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenProjectId(null);
      }
    };

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    window.addEventListener('keydown', handleEscape);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPaddingRight;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [openProject]);

  const projectModal =
    openProject && typeof document !== 'undefined'
      ? createPortal(
          <div
            className="pixel-project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pixel-project-dialog-title"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setOpenProjectId(null);
              }
            }}
          >
            <article
              className={`pixel-project-window pixel-window-${openProject.folderColour}`}
              onClick={(event) => event.stopPropagation()}
            >
              <header className="pixel-project-window-header">
                <div>
                  <FolderOpen size={16} aria-hidden="true" />

                  <span>
                    {openProject.shortLabel}/{openProject.id}.folder
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenProjectId(null)}
                  aria-label="Close project folder"
                  autoFocus
                >
                  <X size={17} aria-hidden="true" />
                </button>
              </header>

              <div className="pixel-project-window-body">
                <div className="pixel-project-preview">
                  <div
                    className="pixel-project-preview-grid"
                    aria-hidden="true"
                  />

                  <span
                    className="pixel-project-preview-folder"
                    aria-hidden="true"
                  >
                    <i />
                    <b />
                  </span>

                  <span className="pixel-project-preview-label">
                    {openProject.category}
                  </span>

                  <strong>{openProject.title}</strong>

                  <small>Creative fashion-tech project archive</small>
                </div>

                <div className="pixel-project-information">
                  <span className="pixel-project-information-label">
                    PROJECT_INFO.TXT
                  </span>

                  <h3 id="pixel-project-dialog-title">
                    {openProject.title}
                  </h3>

                  <p>{openProject.description}</p>

                  <div className="pixel-project-tech">
                    <span>TOOLS + STACK</span>

                    <div>
                      {openProject.technologies.map((technology) => (
                        <i key={technology}>{technology}</i>
                      ))}
                    </div>
                  </div>

                  <div className="pixel-project-actions">
                    {openProject.detailsUrl && (
                      <Link
                        to={openProject.detailsUrl}
                        onClick={() => setOpenProjectId(null)}
                      >
                        <ExternalLink size={15} aria-hidden="true" />
                        Open case study
                      </Link>
                    )}

                    {openProject.githubUrl && (
                      <a
                        href={openProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Code size={15} aria-hidden="true" />
                        View code
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <footer className="pixel-project-window-footer">
                <span>{openProject.fileCount}</span>
                <span>YOUR PROJECT ARCHIVE</span>
              </footer>
            </article>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <section id="projects" className="pixel-projects-section">
        <div className="pixel-projects-background" aria-hidden="true">
          <span className="pixel-project-leaf pixel-project-leaf-one" />
          <span className="pixel-project-leaf pixel-project-leaf-two" />
          <span className="pixel-project-flower pixel-project-flower-one" />
          <span className="pixel-project-flower pixel-project-flower-two" />
        </div>

        <div className="pixel-projects-shell">
          <header className="pixel-projects-header">
            <div>
              <span className="pixel-projects-kicker">
                PROJECT_ARCHIVE.EXE
              </span>

              <h2>Projects</h2>

              <p>
                Open a folder to explore the story, tools and code behind each
                build.
              </p>
            </div>

            <div className="pixel-projects-status" aria-hidden="true">
              <span>ARCHIVE STATUS</span>
              <strong>{PROJECTS.length} FOLDERS FOUND</strong>
            </div>
          </header>

          <div className="pixel-folder-grid">
            {PROJECTS.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className={`pixel-project-folder pixel-folder-${project.folderColour}`}
                onClick={() => setOpenProjectId(project.id)}
                aria-label={`Open ${project.title} project folder`}
                style={
                  {
                    '--folder-delay': `${index * 80}ms`,
                  } as CSSProperties
                }
              >
                <span className="pixel-folder-stack" aria-hidden="true">
                  <span className="pixel-folder-paper pixel-folder-paper-back">
                    <i />
                    <i />
                    <i />
                  </span>

                  <span className="pixel-folder-back">
                    <span className="pixel-folder-tab">
                      {project.shortLabel}
                    </span>
                  </span>

                  <span className="pixel-folder-paper pixel-folder-paper-front">
                    <span>{project.category}</span>
                    <strong>{project.title}</strong>

                    <div>
                      {project.technologies.slice(0, 3).map((technology) => (
                        <i key={technology}>{technology}</i>
                      ))}
                    </div>
                  </span>

                  <span className="pixel-folder-front">
                    <span className="pixel-folder-flower">
                      <i />
                      <i />
                      <i />
                      <i />
                      <b />
                    </span>

                    <span className="pixel-folder-sticker">OPEN</span>
                  </span>
                </span>

                <span className="pixel-folder-caption">
                  <span>
                    <strong>{project.title}</strong>
                    <small>{project.category}</small>
                  </span>

                  <span>
                    <FolderOpen size={16} aria-hidden="true" />
                    {project.fileCount}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="pixel-projects-footer">
            <span>SELECT FOLDER</span>
            <span>CLICK TO OPEN // ESC TO CLOSE</span>
          </div>
        </div>
      </section>

      {projectModal}
    </>
  );
};

export default Projects;
