export default function Footer() {
  return (
    <footer className="bg-primary-container/95 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-6 max-w-sm">
          <div className="text-2xl font-bold tracking-tight">Reviso</div>
          <p className="text-blue-200/60 text-sm leading-relaxed">
            Revolutionizing academic success through the science of spaced repetition. Built for the modern student.
          </p>
          <p className="text-blue-200/30 text-xs tracking-tight">
            © {new Date().getFullYear()} Reviso. Master your memory.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-8">
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-gold">Product</h4>
            <ul className="space-y-2 text-sm text-blue-200/80">
              <li><a href="#" className="hover:text-gold transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Waitlist</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-gold">Science</h4>
            <ul className="space-y-2 text-sm text-blue-200/80">
              <li><a href="#" className="hover:text-gold transition-colors">Methodology</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Studies</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Blog</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-gold">Legal</h4>
            <ul className="space-y-2 text-sm text-blue-200/80">
              <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
