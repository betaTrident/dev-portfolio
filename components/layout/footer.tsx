const socialLinks = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Email", href: "mailto:hello@example.com" },
];

export function Footer() {
  return (
    <footer className="w-full py-12 px-8 bg-[#131313]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full max-w-7xl mx-auto">
        {/* Copyright */}
        <div className="font-sans text-xs uppercase tracking-[0.05em] text-[#c2c6d6]">
          © {new Date().getFullYear()} The Digital Architect. Engineered with precision.
        </div>

        {/* Social Links */}
        <div className="flex gap-8 font-sans text-xs uppercase tracking-[0.05em]">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c2c6d6] hover:text-[#adc6ff] transition-colors opacity-80 hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
