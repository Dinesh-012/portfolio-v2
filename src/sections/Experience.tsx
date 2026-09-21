import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { Briefcase, Calendar } from 'lucide-react';
import { experience } from '../data';

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="section-container">
        <SectionHeader
          title="Experience"
          subtitle="My professional journey so far"
        />

        <div className="relative max-w-5xl mx-auto space-y-10">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-cyan-500 to-transparent" />

          {experience.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-12 md:pl-20"
            >
              <div className="absolute left-0 md:left-4 top-1 w-8 h-8 rounded-full bg-indigo-600 border-4 border-slate-950 flex items-center justify-center z-10">
                <Briefcase size={14} className="text-white" />
              </div>

              <div className="card-glass p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-slate-100">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-indigo-400 shrink-0">
                    <Calendar size={14} />
                    <span>{item.period}</span>
                  </div>
                </div>

                <p className="text-indigo-300 font-medium mb-4">
                  {item.company}
                </p>

                <ul className="space-y-3 text-slate-300">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-indigo-400 mt-1.5 shrink-0">▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
