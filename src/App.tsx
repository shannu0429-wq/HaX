import React, { useState, useEffect } from 'react';
import { SparkleTrail } from './components/SparkleTrail';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AmbientSoundMachine } from './components/AmbientSoundMachine';
import { LullabyLab } from './components/LullabyLab';
import { NightlightGallery } from './components/NightlightGallery';
import { DreamDeliveryMap } from './components/DreamDeliveryMap';
import { ToyBoxMiniGame } from './components/ToyBoxMiniGame';
import { GrowthChart } from './components/GrowthChart';
import { DreamOracleChat } from './components/DreamOracleChat';
import { StoryVignettes } from './components/StoryVignettes';
import { DreamJarGuestbook } from './components/DreamJarGuestbook';
import { EarlyWebFooter } from './components/EarlyWebFooter';
import { EasterEggOverlay } from './components/EasterEggOverlay';
import { FlashlightMode } from './components/FlashlightMode';
import { soundEngine } from './utils/sound';
import { recordNewVisit } from './utils/visitorMemory';

export function App() {
  const [dreamCount, setDreamCount] = useState<number>(1428);
  const [isDaytime, setIsDaytime] = useState<boolean>(false);
  const [isSleeping, setIsSleeping] = useState<boolean>(false);
  const [showEasterEgg, setShowEasterEgg] = useState<boolean>(false);
  const [isFlashlight, setIsFlashlight] = useState<boolean>(false);

  useEffect(() => {
    recordNewVisit();
  }, []);

  const incrementDream = () => {
    setDreamCount((prev) => prev + 1);
  };

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
      className={`min-h-screen transition-colors duration-700 relative overflow-x-hidden ${
        isDaytime
          ? 'bg-gradient-to-b from-[#1b2144] via-[#121633] to-[#070913] text-slate-100'
          : 'bg-[#070913] text-slate-100'
      }`}
    >
      {/* Background Star Texture / Retro Dots & Ambient Aurora */}
      <div className="fixed inset-0 pointer-events-none retro-dots opacity-40 z-0" />
      <div className="fixed inset-0 pointer-events-none aurora-bg opacity-30 z-0" />

      {/* Sparkle Cursor Trail (+2 pt bonus) */}
      <SparkleTrail />

      {/* Flashlight Nightlight Mode (Tier 2 standout) */}
      <FlashlightMode isActive={isFlashlight} />

      {/* Top Navbar (+1 pt Odometer, +3 pt Mute switch, category jumps) */}
      <Navbar
        dreamCount={dreamCount}
        isDaytime={isDaytime}
        onToggleDaytime={() => setIsDaytime(!isDaytime)}
        onSleepClick={() => setIsSleeping(!isSleeping)}
        isFlashlight={isFlashlight}
        onToggleFlashlight={() => setIsFlashlight(!isFlashlight)}
      />

      {/* Main Content Sanctuary */}
      <main className="relative z-10 space-y-12">
        {/* Hero Section with 3D Parallax Pip */}
        <Hero
          isSleeping={isSleeping}
          onWakeUp={handleWakeUp}
          onBowEasterEgg={handleBowEasterEgg}
          isDaytime={isDaytime}
          onExploreClick={() => scrollToSection('lullaby-lab')}
          onWishClick={() => scrollToSection('dream-jar')}
        />

        {/* Ambient Procedural Sleep Soundscape (Rain & Wind) */}
        <AmbientSoundMachine />

        {/* Story Vignettes (Origin & Journey) */}
        <StoryVignettes />

        {/* Project 1: The Lullaby Lab with Live Spectrum Visualizer */}
        <LullabyLab onInteract={incrementDream} />

        {/* Project 2: Nightlight Collection with Dimmer Slider */}
        <NightlightGallery onInteract={incrementDream} />

        {/* Project 3: Dream Delivery Rooftops Game */}
        <DreamDeliveryMap onDeliverDream={incrementDream} />

        {/* Project 4: Pip's Toy Box Mini-Game (Block Stacker & Star Rattle) */}
        <ToyBoxMiniGame onInteract={incrementDream} />

        {/* Project 6: Pip's Growth Chart (Skills Wall) */}
        <GrowthChart onInteract={incrementDream} />

        {/* Tier 3 Legendary Feature: Pip's Dream Oracle Chat */}
        <DreamOracleChat onInteract={incrementDream} />

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
