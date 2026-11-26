import { motion, useScroll, useSpring } from 'motion/react';
import { BookHeart, CalendarHeart, HeartHandshake, Home, Music } from 'lucide-react';
import { MonogramCrest } from './BotanicalOrnaments';

interface NavbarProps {
  activeSection: string;
  isPlaying: boolean;
  onOpenMusicSheet: () => void;
}

const NAV_LINKS = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'mempelai', label: 'Mempelai' },
  { id: 'doa', label: 'Doa' },
  { id: 'acara', label: 'Acara' },
] as const;

const CHAPTER_RAIL = [
  { id: 'beranda', num: '01', label: 'Beranda' },
  { id: 'mempelai', num: '02', label: 'Mempelai' },
  { id: 'doa', num: '03', label: 'Ayat & Doa' },
  { id: 'acara', num: '04', label: 'Jadwal Acara' },
] as const;

const MOBILE_TABS = [
  { id: 'beranda', label: 'Beranda', icon: Home },
  { id: 'mempelai', label: 'Mempelai', icon: HeartHandshake },
  { id: 'doa', label: 'Doa', icon: BookHeart },
  { id: 'acara', label: 'Acara', icon: CalendarHeart },
] as const;

export function Navbar({
  activeSection,
  isPlaying,
  onOpenMusicSheet,
}: NavbarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 });

  return (
    <>
      {/* Desktop Floating Frosted-Glass Top Bar */}
      <header className="sticky top-0 z-30 md:pt-3 md:px-6 pointer-events-none">
        {/* Desktop 3-Zone Floating Bar */}
        <div className="hidden md:block max-w-5xl mx-auto pointer-events-auto rounded-2xl bg-[#FAF9F6]/88 backdrop-blur-xl border border-[#1E3A2F]/12 shadow-[0_8px_28px_rgba(21,38,31,0.06)] overflow-hidden">
          <div className="flex items-center justify-between gap-8 px-6 h-[60px]">
            <a
              href="#beranda"
              className="inline-flex items-center gap-2.5 font-serif text-xl font-semibold tracking-tight text-[#1E3A2F] whitespace-nowrap shrink-0"
            >
              <MonogramCrest className="w-8 h-8 text-[#9A7B3E]" />
              <span>
                I&apos;il <span className="italic font-normal text-[#9A7B3E]">&amp;</span> Sabbihis
              </span>
            </a>

            <nav aria-label="Navigasi Undangan" className="flex items-center gap-7 text-sm font-medium text-[#4A5A52]">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className={`relative py-2 whitespace-nowrap shrink-0 transition-colors hover:text-[#1E3A2F] ${
                      isActive ? 'text-[#1E3A2F] font-semibold' : ''
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="desktop-nav-underline"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute left-0 right-0 bottom-0.5 h-[2px] bg-[#9A7B3E] rounded-full"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="shrink-0">
              <a
                href="#acara"
                className="inline-flex items-center justify-center min-h-[38px] px-5 py-2 rounded-xl bg-[#1E3A2F] text-[#FAF9F6] text-xs font-semibold hover:bg-[#152A22] transition-colors whitespace-nowrap shrink-0"
              >
                Jadwal Acara
              </a>
            </div>
          </div>

          <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="h-[2px] w-full origin-left bg-gradient-to-r from-[#1E3A2F] via-[#9A7B3E] to-[#DFC484]"
          />
        </div>

        {/* Mobile Compact Top Bar (50px) */}
        <div className="md:hidden pointer-events-auto bg-[#FAF9F6]/92 backdrop-blur-md border-b border-[#1E3A2F]/10">
          <div className="flex items-center justify-between px-4 h-[50px]">
            <a
              href="#beranda"
              className="inline-flex items-center gap-2 font-serif text-lg font-semibold tracking-tight text-[#1E3A2F] whitespace-nowrap shrink-0"
            >
              <MonogramCrest className="w-7 h-7 text-[#9A7B3E]" />
              <span>
                I&apos;il <span className="italic font-normal text-[#9A7B3E]">&amp;</span> Sabbihis
              </span>
            </a>

            <button
              type="button"
              onClick={onOpenMusicSheet}
              aria-label="Buka pemutar musik"
              className="min-h-[38px] px-3.5 inline-flex items-center gap-2 rounded-xl bg-[#15261F] text-xs font-semibold text-[#FAF9F6] hover:bg-[#1E3A2F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isPlaying ? (
                <span className="flex items-end gap-0.5 h-3" aria-hidden="true">
                  <motion.span
                    animate={{ height: ['35%', '100%', '45%'] }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-0.5 bg-[#DFC484] rounded-full"
                  />
                  <motion.span
                    animate={{ height: ['90%', '35%', '95%'] }}
                    transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-0.5 bg-[#DFC484] rounded-full"
                  />
                  <motion.span
                    animate={{ height: ['50%', '95%', '35%'] }}
                    transition={{ duration: 0.65, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-0.5 bg-[#DFC484] rounded-full"
                  />
                </span>
              ) : (
                <Music className="w-3.5 h-3.5 text-[#DFC484]" aria-hidden="true" />
              )}
              <span>{isPlaying ? 'Musik Aktif' : 'Putar Musik'}</span>
            </button>
          </div>
          <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="h-[2px] w-full origin-left bg-gradient-to-r from-[#1E3A2F] via-[#9A7B3E] to-[#DFC484]"
          />
        </div>
      </header>

      {/* Desktop Left-Side Floating Chapter Stepper Rail (xl+) */}
      <nav
        aria-label="Penanda Bab Undangan"
        className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-2"
      >
        {CHAPTER_RAIL.map((ch) => {
          const active = activeSection === ch.id;
          return (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              className="group flex items-center gap-2.5 py-1 text-left"
            >
              <span
                className={`h-[2px] rounded-full transition-all duration-300 ${
                  active
                    ? 'w-7 bg-[#9A7B3E]'
                    : 'w-3 bg-[#1E3A2F]/25 group-hover:w-5 group-hover:bg-[#1E3A2F]/60'
                }`}
              />
              <span
                className={`text-[11px] tracking-wider transition-all duration-200 ${
                  active
                    ? 'text-[#1E3A2F] font-semibold opacity-100 translate-x-0'
                    : 'text-[#5C6B63] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                {ch.num} · {ch.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Mobile Floating Deep-Emerald & Gold Curved Dock (58px + 8px margin = 66px; total sticky 118px <= 15% of 844px) */}
      <nav
        aria-label="Navigasi Cepat Mobile"
        className="md:hidden fixed bottom-2 left-3 right-3 z-30 rounded-2xl bg-[#15261F]/95 backdrop-blur-xl border border-[#DFC484]/25 shadow-[0_10px_30px_rgba(15,27,22,0.35)] h-[58px] px-1.5"
      >
        <div className="grid grid-cols-4 h-full items-center gap-1">
          {MOBILE_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className={`relative min-h-[44px] h-[46px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-colors ${
                  isActive ? 'text-[#DFC484] font-semibold' : 'text-[#D3CFC4]/80 hover:text-[#FAF9F6]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-tab-glow"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    className="absolute inset-0 rounded-xl bg-[#DFC484]/15 border border-[#DFC484]/30"
                  />
                )}
                <motion.span
                  animate={{ y: isActive ? -1.5 : 0, scale: isActive ? 1.08 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </motion.span>
                <span className="relative z-10 text-[10px] tracking-tight whitespace-nowrap">
                  {tab.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
