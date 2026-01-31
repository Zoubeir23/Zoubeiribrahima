import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Github,
  MessageCircle,
  ArrowUp,
  BookOpen,
  Code,
  Shield,
  Zap,
  Download,
  FileText
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useForm, ValidationError } from "@formspree/react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  icon: React.ReactNode;
  skills?: string[];
  certId?: string;
  category: "education" | "certification";
}

const certifications: Certification[] = [
  {
    title: "Licence IAGE - informatique appliquée à la Gestion des Entreprises",
    issuer: "Institut Supérieur d'Informatique (ISI), Dakar, Sénégal",
    date: "2023–2026 (en cours)",
    icon: <GraduationCap className="w-6 h-6" />,
    category: "education"
  },
  {
    title: "BTS Informatique de Gestion",
    issuer: "ISI, Dakar, Sénégal",
    date: "2023",
    icon: <GraduationCap className="w-6 h-6" />,
    category: "education"
  },
  {
    title: "Baccalauréat Série C",
    issuer: "École Communautaire Arabe-Islamique, Mitsoudjé, Comores",
    date: "2023",
    icon: <GraduationCap className="w-6 h-6" />,
    category: "education"
  },
  {
    title: "CS50x - Introduction to Computer Science & CS50P - Python Programming",
    issuer: "Harvard CS50",
    date: "2024",
    icon: <BookOpen className="w-6 h-6" />,
    skills: ["Informatique", "Python", "Algorithmes"],
    category: "certification"
  },
  {
    title: "Certificat Python (Base)",
    issuer: "HackerRank",
    date: "2026",
    icon: <Award className="w-6 h-6" />,
    skills: ["Python"],
    category: "certification"
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "2025",
    icon: <Zap className="w-6 h-6" />,
    certId: "b2gcc4ubkdsu",
    category: "certification"
  },
  {
    title: "GitHub Copilot (4 certifications : Code, Tests, Documentation)",
    issuer: "Microsoft",
    date: "2025",
    icon: <Code className="w-6 h-6" />,
    skills: ["GitHub Copilot", "Code", "Tests", "Documentation"],
    category: "certification"
  },
  {
    title: "Python Essentials 1 & Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "2025",
    icon: <Shield className="w-6 h-6" />,
    skills: ["Python", "Cybersécurité"],
    category: "certification"
  },
  {
    title: "Django, Automatisation Python, Algorithmes",
    issuer: "LinkedIn Learning",
    date: "2025",
    icon: <Award className="w-6 h-6" />,
    skills: ["Django", "Python", "Algorithmes"],
    category: "certification"
  },
  {
    title: "Python complet, Java Fundamentals, Maîtrise Java & Python",
    issuer: "Udemy",
    date: "2025",
    icon: <Award className="w-6 h-6" />,
    skills: ["Python", "Java"],
    category: "certification"
  },
];

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xaqovjqb");

  if (state.succeeded) {
    return (
      <motion.div
        className="glass-panel rounded-3xl p-8 md:p-10 shadow-neon relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center py-12">
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Mail className="w-10 h-10 text-green-500" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Message envoyé avec succès !
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Merci pour votre message. Je vous répondrai dans les plus brefs délais.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="glass-panel rounded-3xl p-8 md:p-10 shadow-neon relative overflow-hidden group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-neon-accent to-secondary"></div>
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold" htmlFor="name">
              Nom Complet
            </label>
            <input
              className="w-full bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
              id="name"
              name="name"
              placeholder="John Doe"
              type="text"
              required
            />
            <ValidationError prefix="Nom" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold" htmlFor="email">
              Email
            </label>
            <input
              className="w-full bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
              id="email"
              name="email"
              placeholder="john@example.com"
              type="email"
              required
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold" htmlFor="subject">
            Sujet
          </label>
          <select
            className="w-full bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
            id="subject"
            name="subject"
            required
          >
            <option value="Freelance / Mission">Freelance / Mission</option>
            <option value="Recrutement (Stage/Emploi)">Recrutement (Stage/Emploi)</option>
            <option value="Collaboration">Collaboration</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold" htmlFor="message">
            Message
          </label>
          <textarea
            className="w-full bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 resize-none"
            id="message"
            name="message"
            placeholder="Parlez-moi de votre projet..."
            rows={4}
            required
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
        </div>
        <button
          className="group/btn relative w-full bg-primary text-white font-bold py-4 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={state.submitting}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {state.submitting ? "Envoi en cours..." : "Envoyer le Message"}
            {!state.submitting && <ArrowUp className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        </button>
      </form>
    </motion.div>
  );
};

const CertificationsWallOfFame = () => {
  const { t } = useLanguage();

  const copyEmail = () => {
    navigator.clipboard.writeText("Zoubeiribrahima@gmail.com");
    alert("Email copié !");
  };

  return (
    <section id="certifications" className="py-20 px-4 bg-background-light dark:bg-background-dark relative overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/5 rounded-full blur-[120px] mix-blend-screen animate-pulse"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 dark:bg-secondary/5 rounded-full blur-[150px] mix-blend-screen"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />
      </div>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            className="relative w-24 h-24 mx-auto mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary shadow-2xl">
              <img
                src="/Zoubeiriprofile.jpeg"
                alt="Zoubeiri Ibrahima Amed"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse"></div>
          </motion.div>

          <motion.h2
            className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-4 uppercase text-gradient opacity-90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Formation & Certifications
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Mon parcours académique et mes certifications professionnelles
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto mb-32">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/30"></div>

          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className={`relative flex items-center mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Icon on Timeline */}
              <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-4 shadow-lg ${
                    cert.category === "education" ? "bg-gradient-to-br from-blue-500 to-blue-600 border-blue-200 dark:border-blue-800 text-white" : "bg-gradient-to-br from-primary to-purple-600 border-primary/30 dark:border-primary/70 text-white"
                  }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {cert.icon}
                </motion.div>
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"} pl-24 md:pl-0`}>
                <motion.div
                  className="glass-card bg-white dark:bg-card-dark rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3 md:justify-start md:flex-row">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        cert.category === "education" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "bg-primary/10 text-primary"
                      }`}>
                        {cert.category === "education" ? "Formation" : "Certification"}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                        {cert.date}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {cert.issuer}
                    </p>

                    {cert.skills && cert.skills.length > 0 && (
                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                        {cert.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary/80 border border-primary/20">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <section className="relative pt-20 pb-20" id="contact">
          <div className="mb-16 text-center lg:text-left">
            <motion.h2
              className="font-display text-4xl md:text-6xl lg:text-8xl font-black uppercase leading-tight tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-600 dark:from-white dark:to-gray-500">
                Créons
              </span>
              <br />
              <span className="text-gradient">
                L'Extraordinaire!
              </span>
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start relative">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Info */}
            <div className="relative flex flex-col justify-center h-full space-y-12">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="relative z-10 space-y-6">
                <motion.h3
                  className="text-2xl font-display font-bold text-gray-900 dark:text-white"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Coordonnées
                </motion.h3>
                <motion.div
                  className="flex items-center gap-4 group cursor-pointer"
                  onClick={copyEmail}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center border border-gray-300 dark:border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                    <Mail className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-lg font-mono text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      Zoubeiribrahima@gmail.com
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Copier
                  </span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center border border-gray-300 dark:border-white/10">
                    <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Localisation</p>
                    <p className="text-lg text-gray-900 dark:text-white">
                      Grand-Dakar, Dakar, Sénégal
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center border border-gray-300 dark:border-white/10">
                    <Phone className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Téléphone</p>
                    <p className="text-lg font-mono text-gray-900 dark:text-white">
                      +221 78 594 10 71
                    </p>
                  </div>
                </motion.div>
              </div>
              <motion.div
                className="relative z-10 pt-8 border-t border-gray-200 dark:border-white/10"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-6">
                  Réseaux Sociaux
                </h3>
                <div className="flex gap-4">
                  <a
                    className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 flex items-center justify-center text-2xl text-gray-700 dark:text-white hover:scale-110 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-lg"
                    href="https://linkedin.com/in/zoubeir-ibrahima"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 flex items-center justify-center text-2xl text-gray-700 dark:text-white hover:scale-110 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-300 shadow-lg"
                    href="https://github.com/Zoubeir23"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 flex items-center justify-center text-2xl text-gray-700 dark:text-white hover:scale-110 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 shadow-lg"
                    href="https://wa.me/221785941071"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-gray-200 dark:border-white/5 py-10 flex flex-col md:flex-row justify-between items-center relative">
          <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
            © 2025 Zoubeir Ibrahima Amed. All rights reserved.
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <motion.a
              href="/CV_page-0001.jpg"
              download="Zoubeir_Ibrahima_Amed_CV_Image.jpg"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-5 h-5" />
              <span>Télécharger CV (Image)</span>
            </motion.a>
            <motion.a
              href="/CV.pdf"
              download="Zoubeir_Ibrahima_Amed_CV.pdf"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              <span>Télécharger CV (PDF)</span>
            </motion.a>
          </div>
        </footer>
      </main>

      {/* Noise Overlay */}
      <svg className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-50 mix-blend-overlay">
        <filter id="noiseFilter">
          <feTurbulence baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" type="fractalNoise"></feTurbulence>
        </filter>
        <rect filter="url(#noiseFilter)" height="100%" width="100%"></rect>
      </svg>
    </section>
  );
};

export default CertificationsWallOfFame;
