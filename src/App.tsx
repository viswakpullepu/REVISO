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
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ScienceSection />
        <Features />
        <AudienceSection />
      </main>
      <Footer />
      <AdminDashboard />
    </div>
  );
}

