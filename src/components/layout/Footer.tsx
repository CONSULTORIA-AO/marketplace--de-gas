

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, ArrowUp, MessageCircle } from "lucide-react";

import yhankoLogo from "@/assets/ee 1.svg";

import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/YhankoTech" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/yhankotech/" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/yhanko-corporation/?viewAsMember=true" },
  { name: "WhatsApp", icon: MessageCircle, href: "https://wa.me/947315059"}
];

const quickLinks = [
  { name: "Quem Somos", href: "#quem-somos" },
  { name: "Soluções", href: "#solucoes" },
  { name: "Sectores", href: "#sectores" },
  { name: "Processo", href: "#processo" },
  { name: "FAQ", href: "#faq" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_d2jfzul",
      "template_sl18u6i",
      e.target,
      "md-N74Y77bS9eGpsm"
    ).then(
      () => {
        toast.success("Inscrição realizada com sucesso 🚀");
      e.target.reset();
      },
      (error) => {
        toast.error("Alguma coisa aconteceu, se persistir por favor nos contacte!");
      }
    );

    e.target.reset();
  };

  return (
    <footer id="contato" className="relative pt-24 pb-8">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      {/* Background Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-bold gradient-text mb-6"
            >
              <img src={yhankoLogo} alt="logotipo yhanko" />
            </motion.h3>
            <p className="text-muted-foreground mb-6">
              Transformando ideias em soluções digitais inovadoras para um futuro melhor.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  target="_blank"
                  className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground hover:pl-2 transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Luanda, Angola
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+244947315059" 
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors">
                  +244 947 315 059
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:geral@yhanko.com" 
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors">
                  geral@yhanko.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Receba novidades e atualizações sobre tecnologia.
            </p>
            <form onSubmit={sendEmail} className="flex flex-col gap-3">
              <input
                type="email"
                name="user_email"
                placeholder="Seu e-mail"
                className="px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-foreground font-semibold"
              >
                Inscrever
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Yhanko. Todos os direitos reservados.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center"
          >
            <ArrowUp className="w-5 h-5 text-foreground" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
