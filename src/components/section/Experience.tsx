import { type CSSProperties } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import './Experience.css';

const Experience = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const experiences = [
    {
      title: 'Intern, AI Agents',
      company: 'Wipro',
      location: '',
      period: 'Internship',
      description: [
        'Building AI agents as part of the internship',
        'Working through certifications and skill-building for agent development',
      ],
    },
    {
      title: 'B.E. Information Science and Engineering',
      company: 'New Horizon College of Engineering',
      location: 'Bengaluru, India',
      period: '2023 - 2027',
      description: ['CGPA: 8.72 / 10'],
    },
    {
      title: 'Class XII (CBSE)',
      company: 'Sri Chaitanya Techno PU College',
      location: 'Bangalore, India',
      period: '2022 - 2023',
      description: ['Percentage: 74.5%'],
    },
    {
      title: 'Class X (CBSE)',
      company: 'Sri Chaitanya Techno School',
      location: 'Bangalore, India',
      period: '2020 - 2021',
      description: ['Percentage: 78.2%'],
    },
  ];

  const sectionVariables = {
    '--experience-heading': isDarkMode
      ? themeColors.colors.white
      : themeColors.colors.pink[500],

    '--experience-title': isDarkMode
      ? themeColors.colors.pink[300]
      : themeColors.colors.pink[400],

    '--experience-text': isDarkMode
      ? themeColors.colors.dark[200]
      : themeColors.colors.dark[600],

    '--experience-accent': themeColors.primary,
  } as CSSProperties;

  return (
    <section
      id="experience"
      className={`experience-section ${
        isDarkMode
          ? 'experience-section--dark'
          : 'experience-section--light'
      }`}
      style={sectionVariables}
    >
      <div className="experience-section__ambient" aria-hidden="true" />

      <div className="container mx-auto px-6 experience-section__content">
        <h2 className="experience-section__title">
          Experience &amp; Education
        </h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {experiences.map((experience, index) => (
            <Card
              key={`${experience.title}-${index}`}
              className="experience-card"
            >
              <CardHeader className="pb-2">
                <div className="experience-card__header">
                  <div>
                    <CardTitle className="experience-card__title">
                      {experience.title}
                    </CardTitle>

                    <p className="experience-card__company">
                      {experience.company}
                    </p>
                  </div>

                  <div className="experience-card__meta">
                    <div>
                      <Calendar className="h-4 w-4" />
                      <span>{experience.period}</span>
                    </div>

                    {experience.location && (
                      <div>
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-2">
                <ul className="experience-card__list">
                  {experience.description.map((item, itemIndex) => (
                    <li key={`${item}-${itemIndex}`}>
                      <span
                        className="experience-card__bullet"
                        aria-hidden="true"
                      >
                        •
                      </span>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
