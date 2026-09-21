import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import SystemArchitecture from '../components/SystemArchitecture';
import { Github, Server, Database, Shield, Container, ExternalLink } from 'lucide-react';
import { projects } from '../data';
import { useTheme } from '../context/ThemeContext';

const highlightIcons = [Server, Database, ExternalLink, Shield, Container];

export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="projects"
      className={`py-20 md:py-28 ${isDark ? 'bg-slate-900/40' : 'bg-slate-100/60'}`}
    >
      <div className="section-container">
        <SectionHeader
          title="Featured Project"
          subtitle="A deep dive into my microservices work"
        />

        <div className="space-y-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card-glass overflow-hidden"
            >
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Left accent panel – stays visually distinct in both themes */}
                <div
                  className={`lg:col-span-2 p-8 md:p-10 flex flex-col justify-between ${
                    isDark
                      ? 'bg-gradient-to-br from-indigo-900/40 to-slate-900'
                      : 'bg-gradient-to-br from-indigo-100 via-indigo-50 to-slate-100'
                  }`}
                >
                  <div>
                    {project.badge && (
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                          isDark
                            ? 'bg-indigo-500/20 text-indigo-300'
                            : 'bg-indigo-200/70 text-indigo-700'
                        }`}
                      >
                        {project.badge}
                      </div>
                    )}
                    <h3
                      className={`text-2xl md:text-3xl font-bold mb-3 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`leading-relaxed mb-6 ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {project.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      <Github size={18} />
                      View on GitHub
                    </a>
                  </div>
                </div>

                {/* Right content */}
                <div className="lg:col-span-3 p-8 md:p-10">
                  <h4
                    className={`text-lg font-semibold mb-4 ${
                      isDark ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    Key Highlights
                  </h4>
                  <ul className="space-y-3 mb-8">
                    {project.highlights.map((highlight, i) => {
                      const Icon = highlightIcons[i % highlightIcons.length];
                      return (
                        <li
                          key={i}
                          className={`flex gap-3 ${
                            isDark ? 'text-slate-300' : 'text-slate-600'
                          }`}
                        >
                          <Icon
                            className={`shrink-0 mt-0.5 ${
                              isDark ? 'text-indigo-400' : 'text-indigo-600'
                            }`}
                            size={18}
                          />
                          <span>{highlight}</span>
                        </li>
                      );
                    })}
                  </ul>

                  <h4
                    className={`text-sm font-medium mb-3 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-xs rounded-md border ${
                          isDark
                            ? 'bg-slate-800 text-slate-300 border-slate-700'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* System Architecture - full width below the two-column layout */}
              {project.id === 'ecommerce-microservices' && (
                <div
                  className={`px-6 md:px-10 pb-8 md:pb-10 border-t ${
                    isDark ? 'border-slate-700/50' : 'border-slate-200'
                  }`}
                >
                  <SystemArchitecture />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {projects.length === 1 && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-center mt-8 text-sm ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            More projects coming soon...
          </motion.p>
        )}
      </div>
    </section>
  );
}
