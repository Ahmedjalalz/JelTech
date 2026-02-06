import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react";
import logoLetters from "@/assets/jt-logo-letters.png";

const footerLinks = {
  services: [
    { name: "Web Development", href: "/#services", isHash: true },
    { name: "Mobile Apps", href: "/#services", isHash: true },
    { name: "Shopify Stores", href: "/#services", isHash: true },
    { name: "UI/UX Design", href: "/#services", isHash: true },
    { name: "SEO", href: "/#services", isHash: true },
  ],
  company: [
    { name: "About", href: "/about", isHash: false },
    { name: "Work", href: "/#work", isHash: true },
    { name: "Contact", href: "/contact", isHash: false },
    { name: "Get a Quote", href: "/start-project", isHash: false },
  ],
};

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/jeltech.official", icon: Instagram },
  { name: "Twitter", href: "https://x.com/jeltechofficial", icon: Twitter },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/jeltech-group", icon: Linkedin },
];

export const Footer = () => {
  const handleHashClick = (href: string) => {
    if (window.location.pathname === "/") {
      const hash = href.split("#")[1];
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="border-t border-border py-16 relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logoLetters} alt="Jeltech" className="h-8 w-auto" />
              <span className="text-xl font-bold text-foreground">
                Jel<span className="text-primary">Tech</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Building modern, high-performance web & mobile experiences for businesses
              that want to stand out.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                  aria-label={link.name}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => link.isHash && handleHashClick(link.href)}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => link.isHash && handleHashClick(link.href)}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:Support@jeltech.net"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Support@jeltech.net
                </a>
              </li>
              <li>
                <a
                  href="tel:+923143394966"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  +92 314 3394966
                </a>
              </li>
            </ul>
            {/* Social Icons repeated for mobile */}
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 lg:hidden"
                  aria-label={link.name}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} JelTech. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Built with <span className="text-primary">♥</span> and clean code
          </p>
        </div>
      </div>
    </footer>
  );
};
