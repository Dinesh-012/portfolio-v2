import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { GraduationCap, Calendar } from 'lucide-react';
import { education } from '../data';

export default function Education() {
  return (
    <section id="education" className="py-20 md:py-28">
      <div className="section-container">
        <SectionHeader
          title="Education"
          subtitle="Academic background"
        />

        <div className="max-w-2xl mx-auto space-y-6">
          {education.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card-glass p-6 md:p-8 flex gap-5"
            >
              <div className="shrink-0 w-14 h-14 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400">
                <GraduationCap size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-1">
                  {item.degree}
                </h3>
                <p className="text-indigo-300 font-medium mb-2">
                  {item.institution}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {item.period}
                  </span>
                  {item.detail && (
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      {item.detail}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
