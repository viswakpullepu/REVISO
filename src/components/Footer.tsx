const FOOTER_LINKS = [
  {
    heading: 'Product',
    links: ['Features', 'Integrations', 'Waitlist'],
  },
  {
    heading: 'Science',
    links: ['Methodology', 'Studies', 'Blog'],
  },
  {
    heading: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  },
];

export default function Footer() {
  return (
    <footer
      className="text-white py-12 md:py-16 px-5 md:px-6 border-t border-white/8"
      style={{ background: '#0F1F5C' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-12">
        {/* Brand */}
        <div className="space-y-4 md:space-y-5 max-w-xs">
          <div className="text-xl md:text-2xl font-bold tracking-tight text-white">Reviso</div>
          <p className="text-white/50 text-sm leading-relaxed">
            Revolutionizing academic success through the science of spaced repetition. Built for
            the modern student.
          </p>
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Reviso. Master your memory.
          </p>
        </div>

        {/* Links grid — 3 cols always, just tighter on mobile */}
        <div className="grid grid-cols-3 gap-x-8 md:gap-x-12 gap-y-8 w-full md:w-auto">
          {FOOTER_LINKS.map(({ heading, links }) => (
            <div key={heading} className="space-y-3 md:space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-widest text-gold">{heading}</h4>
              <ul className="space-y-2 md:space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs md:text-sm text-white/50 hover:text-gold transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
