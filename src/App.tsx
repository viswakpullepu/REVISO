/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScienceSection from './components/ScienceSection';
import Features from './components/Features';
import AudienceSection from './components/AudienceSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  const [shakeTrigger, setShakeTrigger] = useState(0);

  const handlePreRegisterClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Small delay to ensure scroll happens before shake for better visibility
    setTimeout(() => {
      setShakeTrigger(prev => prev + 1);
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onPreRegister={handlePreRegisterClick} />
      <main className="flex-grow">
        <Hero shakeTrigger={shakeTrigger} />
        <ScienceSection />
        <Features />
        <AudienceSection onAction={handlePreRegisterClick} />
      </main>
      <Footer />
      <AdminDashboard />
    </div>
  );
}

