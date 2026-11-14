import { useEffect, useRef, useState } from 'react';
import { portfolio } from '../../config/portfolio';
import './AgentTerminal.css';

type Line = { kind: 'u' | 't' | 'a'; text: string };

const ANSWERS: Record<string, string> = {
  about:
    "I'm Teju Nivas Binkam, a final-year ISE student at New Horizon College of Engineering, Bengaluru (CGPA 8.72). I build voice-first, accessible AI, games and tools.",
  projects:
    'Ascendant (browser dungeon crawler), AI Notebook (handwriting that gets answered), Multilingual Loan Advisor, Auditory Scholastic Chatbot, Smart Waste Management, ARIA desktop assistant, Lead Management CRM and an Arduino soil sensor.',
  skills:
    'Python, Java, C, C++, HTML, CSS, JavaScript, SQL, MongoDB, Redis, Neo4j, Cassandra, NumPy, Pandas, NLP, Machine Learning, Computer Vision, Arduino, Electron, Git.',
  experience:
    'Intern at Wipro, building AI agents and working through certifications and skills for that work.',
  education:
    'B.E. in Information Science and Engineering, NHCE, 2023 to 2027, CGPA 8.72. Class XII (CBSE) 2022 to 2023, 74.5%. Class X (CBSE) 2020 to 2021, 78.2%.',
  achievements:
    '2nd place in the Code CraftCoding Competition, and a patent filed for an innovative mini-project solution.',
  voice:
    'Voice is my thing: speech-to-text, text-to-speech and intent recognition, built into a multilingual loan advisor and a chatbot for visually impaired learners.',
  agents:
    'At Wipro I work on AI agents as an intern. On my own I have built a JARVIS-style Electron assistant with voice control and OS commands.',
  contact: `Email ${portfolio.email}, GitHub ${portfolio.github}, LinkedIn ${portfolio.linkedin}`,
};

const ROUTES: [string, string[]][] = [
  ['agents', ['agent', 'wipro', 'aria', 'jarvis']],
  ['voice', ['voice', 'speech', 'audio', 'nlp']],
  ['projects', ['project', 'build', 'built', 'game', 'ascendant', 'notebook', 'crm', 'tower']],
  ['skills', ['skill', 'stack', 'tech', 'language', 'python', 'java']],
  ['experience', ['experience', 'intern', 'work', 'job']],
  ['education', ['education', 'college', 'study', 'cgpa', 'degree', 'school']],
  ['achievements', ['achievement', 'award', 'patent', 'place', 'won']],
  ['contact', ['contact', 'hire', 'email', 'reach', 'linkedin', 'github']],
  ['about', ['who', 'about', 'teju', 'yourself']],
];

const HELP =
  'try: about, projects, skills, experience, education, achievements, contact\nor just ask a question. type  message <text>  to email me, clear to reset.';

const AgentTerminal = () => {
  const [lines, setLines] = useState<Line[]>([
    { kind: 'a', text: "hey, I'm Teju's agent. ask me anything about him.\n" + HELP },
  ]);
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const push = (l: Line) => setLines((p) => [...p, l]);

  const run = (raw: string) => {
    const q = raw.trim();
    if (!q || busy) return;
    push({ kind: 'u', text: `> ${q}` });
    const low = q.toLowerCase();

    if (low === 'clear') return setLines([]);
    if (low === 'help') return push({ kind: 'a', text: HELP });
    if (low.startsWith('message')) {
      const body = q.slice(7).trim();
      push({ kind: 'a', text: 'opening your mail app with your message...' });
      window.location.href = `mailto:${portfolio.email}?subject=${encodeURIComponent('Hello from your portfolio')}&body=${encodeURIComponent(body)}`;
      return;
    }

    const hit = ROUTES.find(([, keys]) => keys.some((k) => low.includes(k)))?.[0];
    const topic = hit ?? (ANSWERS[low] ? low : null);
    const answer = topic
      ? ANSWERS[topic]
      : "I only know Teju's public stuff. try: projects, skills, experience, or contact.";
    setBusy(true);
    const steps: Line[] = [
      { kind: 't', text: `[plan] understand "${q.slice(0, 40)}"` },
      { kind: 't', text: `[tool] lookup_profile(topic="${topic ?? 'unknown'}")` },
      { kind: 'a', text: answer },
    ];
    steps.forEach((s, i) => {
      timers.current.push(
        window.setTimeout(() => {
          push(s);
          if (i === steps.length - 1) setBusy(false);
        }, 450 * (i + 1)),
      );
    });
  };

  return (
    <section id="agent" className="agent-term">
      <h2>Ask my agent</h2>
      <p className="agent-term__sub">A tiny scripted agent that knows my work. No API, no waiting.</p>
      <div className="agent-term__box">
        <div className="agent-term__bar">
          <span>TEJU_AGENT.EXE</span>
          <span>{busy ? 'THINKING...' : 'READY'}</span>
        </div>
        <div className="agent-term__log" ref={logRef} aria-live="polite">
          {lines.map((l, i) => (
            <p key={i} className={l.kind}>{l.text}</p>
          ))}
        </div>
        <div className="agent-term__chips">
          {['projects', 'experience', 'skills', 'contact'].map((c) => (
            <button key={c} type="button" onClick={() => run(c)}>{c}</button>
          ))}
        </div>
        <form
          className="agent-term__row"
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
            setValue('');
          }}
        >
          <span>&gt;</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="ask something, or: message hi teju"
            aria-label="Ask the agent"
          />
        </form>
      </div>
    </section>
  );
};

export default AgentTerminal;
