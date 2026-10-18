import React, { useState, useEffect } from 'react';
import { SparkleTrail } from './components/SparkleTrail';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LullabyLab } from './components/LullabyLab';
import { NightlightGallery } from './components/NightlightGallery';
import { DreamDeliveryMap } from './components/DreamDeliveryMap';
import { StoryVignettes } from './components/StoryVignettes';
import { DreamJarGuestbook } from './components/DreamJarGuestbook';
import { EarlyWebFooter } from './components/EarlyWebFooter';
import { EasterEggOverlay } from './components/EasterEggOverlay';
import { soundEngine } from './utils/sound';

export function App() {
  const [dreamCount, setDreamCount] = useState<number>(1428);
  const [isDaytime, setIsDaytime] = useState<boolean>(false);
  const [isSleeping, setIsSleeping] = useState<boolean>(false);
  const [showEasterEgg, setShowEasterEgg] = useState<boolean>(false);

  // Increment dream odometer on user actions
  const incrementDream = () => {
    setDreamCount((prev) => prev + 1);
  };

  // Easter egg bow trigger
  const handleBowEasterEgg = () => {
    setIsSleeping(true);
    setShowEasterEgg(true);
    soundEngine.playGiggle();
  };

  const handleWakeUp = () => {
    setIsSleeping(false);
    setShowEasterEgg(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-700 relative ${
        isDaytime
          ? 'bg-gradient-to-b from-[#242b56] via-[#1a1f3d] to-[#0c0e1e] text-slate-100'
          : 'bg-[#0c0e1e] text-slate-100'
      }`}
    >
      {/* Background Star Texture / Retro Dots */}
      <div className="fixed inset-0 pointer-events-none retro-dots opacity-40 z-0" />

      {/* Sparkle Cursor Trail (+2 pt bonus) */}
      <SparkleTrail />

      {/* Top Navbar (+1 pt Odometer, +3 pt Mute switch) */}
      <Navbar
        dreamCount={dreamCount}
        isDaytime={isDaytime}
        onToggleDaytime={() => setIsDaytime(!isDaytime)}
        onSleepClick={() => setIsSleeping(!isSleeping)}
      />

      {/* Main Content Sanctuary */}
      <main className="relative z-10 space-y-8">
        {/* Hero Section */}
        <Hero
          isSleeping={isSleeping}
          onWakeUp={handleWakeUp}
          onBowEasterEgg={handleBowEasterEgg}
          isDaytime={isDaytime}
          onExploreClick={() => scrollToSection('lullaby-lab')}
          onWishClick={() => scrollToSection('dream-jar')}
        />

        {/* Story Vignettes (Origin & Journey) */}
        <StoryVignettes />

        {/* Project 1: The Lullaby Lab */}
        <LullabyLab onInteract={incrementDream} />

        {/* Project 2: Nightlight Collection */}
        <NightlightGallery onInteract={incrementDream} />

        {/* Project 3: Dream Delivery Rooftops */}
        <DreamDeliveryMap onDeliverDream={incrementDream} />

        {/* Side Quest: Dream Jar Guestbook (+2 pts) */}
        <DreamJarGuestbook onWishAdded={incrementDream} />
      </main>

      {/* Early-Web Soul Footer (+5 pts) */}
      <EarlyWebFooter />

      {/* Secret Easter Egg Bedtime Overlay */}
      <EasterEggOverlay
        isOpen={showEasterEgg}
        onClose={handleWakeUp}
      />
    </div>
  );
}

export default App;
