import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { CoupleSection } from './components/CoupleSection';
import { CoverGate } from './components/CoverGate';
import { ErrorBoundary } from './components/ErrorBoundary';
import { EventSection } from './components/EventSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MusicPlayer } from './components/MusicPlayer';
import { Navbar } from './components/Navbar';
import { PetalCanvas } from './components/PetalCanvas';
import { WeddingBlessingSection } from './components/WeddingBlessingSection';
import { WeddingMusicEngine } from './utils/musicEngine';
import {
  parseGuestNameFromSearch,
  shouldAutostartFromSearch,
} from './utils/weddingUtils';

const SECTION_IDS = ['beranda', 'mempelai', 'doa', 'acara'] as const;

export default function App() {
  const guestName = useMemo(
    () =>
      typeof window !== 'undefined'
        ? parseGuestNameFromSearch(window.location.search)
        : 'Tamu Kehormatan',
    [],
  );

  const [isOpened, setIsOpened] = useState<boolean>(() =>
    typeof window !== 'undefined' ? shouldAutostartFromSearch(window.location.search) : false,
  );
  const [activeSection, setActiveSection] = useState<string>('beranda');
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [volume, setVolume] = useState(0.45);
  const [mobileMusicOpen, setMobileMusicOpen] = useState(false);

  const engineRef = useRef<WeddingMusicEngine | null>(null);

  useEffect(() => {
    const engine = new WeddingMusicEngine();
    engine.setOnProgress((sec) => setElapsedSec(sec));
    engineRef.current = engine;
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isOpened) return;
    const observers: IntersectionObserver[] = [];

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          }
        },
        { rootMargin: '-30% 0px -55% 0px', threshold: 0.05 },
      );
      obs.observe(el);
      observers.push(obs);
    }

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [isOpened]);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    engineRef.current?.play(trackIndex);
    setIsPlaying(true);
  };

  const handleToggleMusic = () => {
    if (isPlaying) {
      engineRef.current?.pause();
      setIsPlaying(false);
    } else {
      engineRef.current?.play(trackIndex);
      setIsPlaying(true);
    }
  };

  const handleSelectTrack = (index: number) => {
    setTrackIndex(index);
    setElapsedSec(0);
    engineRef.current?.setTrack(index);
    if (!isPlaying) {
      engineRef.current?.play(index);
      setIsPlaying(true);
    }
  };

  const handleChangeVolume = (nextVol: number) => {
    setVolume(nextVol);
    engineRef.current?.setVolume(nextVol);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#FAF9F6] text-[#1A2420] relative">
        <PetalCanvas intensity={isOpened ? 'soft' : 'cover'} />

        <AnimatePresence>
          {!isOpened && (
            <CoverGate guestName={guestName} onOpen={handleOpenInvitation} />
          )}
        </AnimatePresence>

        {isOpened && (
          <>
            <Navbar
              activeSection={activeSection}
              isPlaying={isPlaying}
              onOpenMusicSheet={() => setMobileMusicOpen(true)}
            />

            <main>
              <HeroSection
                guestName={guestName}
                isPlaying={isPlaying}
                trackIndex={trackIndex}
                onToggleMusic={handleToggleMusic}
                onOpenMusicSheet={() => setMobileMusicOpen(true)}
              />
              <CoupleSection />
              <WeddingBlessingSection />
              <EventSection />
            </main>

            <Footer />

            <MusicPlayer
              isPlaying={isPlaying}
              trackIndex={trackIndex}
              elapsedSec={elapsedSec}
              volume={volume}
              mobileSheetOpen={mobileMusicOpen}
              onCloseMobileSheet={() => setMobileMusicOpen(false)}
              onTogglePlay={handleToggleMusic}
              onSelectTrack={handleSelectTrack}
              onChangeVolume={handleChangeVolume}
            />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}
