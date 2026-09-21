import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { skillGroups } from '../data';

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 bg-slate-900/40">
      <div className="section-container">
        <SectionHeader
          title="Technical Skills"
          subtitle="Technologies I work with and continue to deepen"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="card-glass p-6 hover:border-indigo-500/30 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-indigo-400 mb-4">
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50
                               hover:border-indigo-500/40 hover:text-indigo-300 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
