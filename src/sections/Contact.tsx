import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react';
import { profile } from '../data';

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: 'Mobile',
    value: profile.phone,
    href: profile.phoneHref,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/sdk07',
    href: profile.linkedInUrl,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Dinesh-012',
    href: profile.githubUrl,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-900/40">
      <div className="section-container">
        <SectionHeader
          title="Get In Touch"
          subtitle="I'm open to backend and full-stack opportunities. Feel free to reach out."
        />

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4 mb-10"
          >
            {contactItems.map((item, idx) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-glass p-5 flex items-center gap-4 hover:border-indigo-500/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/25 transition-colors">
                  <item.icon size={22} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <p className="font-medium text-slate-100 group-hover:text-indigo-300 transition-colors">
                    {item.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 text-slate-400 text-sm mb-6">
              <MapPin size={16} />
              <span>{profile.relocationNote}</span>
            </div>
            <div>
              <a
                href={`mailto:${profile.email}`}
                className="btn-primary text-base px-8 py-3.5"
              >
                <Mail size={18} />
                Send me an email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
