import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { Code2, Server, Database, Layers } from 'lucide-react';
import { profile } from '../data';

const highlightIcons = [Server, Layers, Database, Code2];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="section-container">
        <SectionHeader
          title="About Me"
          subtitle="A quick look at who I am and what I care about"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-slate-300 leading-relaxed"
          >
            {profile.about.map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === profile.about.length - 1
                    ? 'text-indigo-400 font-medium'
                    : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {profile.highlights.map((item, idx) => {
              const Icon = highlightIcons[idx % highlightIcons.length];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="card-glass p-5 hover:border-indigo-500/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/15 flex items-center justify-center mb-3 text-indigo-400">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold text-slate-100 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
