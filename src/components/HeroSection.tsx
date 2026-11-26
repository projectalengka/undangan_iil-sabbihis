import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, CalendarHeart, MapPin, Music, Pause, Play } from 'lucide-react';
import { COUPLE } from '../data/weddingData';
import { PLAYLIST } from '../utils/musicEngine';
import { calculateCountdown, WEDDING_TARGET_ISO } from '../utils/weddingUtils';
import { BotanicalSprig, FloralHaloArch } from './BotanicalOrnaments';

interface HeroSectionProps {
  guestName: string;
  isPlaying: boolean;
  trackIndex: number;
  onToggleMusic: () => void;
  onOpenMusicSheet: () => void;
}

export function HeroSection({
  guestName,
  isPlaying,
  trackIndex,
  onToggleMusic,
  onOpenMusicSheet,
}: HeroSectionProps) {
  const [countdown, setCountdown] = useState(() =>
    calculateCountdown(WEDDING_TARGET_ISO, Date.now()),
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setCountdown(calculateCountdown(WEDDING_TARGET_ISO, Date.now()));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const { scrollY } = useScroll();
  const archY = useTransform(scrollY, [0, 500], [0, 22]);

  const currentTrack = PLAYLIST[trackIndex] ?? PLAYLIST[0];
  const timeUnits = [
    { label: 'Hari', value: countdown.days },
    { label: 'Jam', value: countdown.hours },
    { label: 'Menit', value: countdown.minutes },
    { label: 'Detik', value: countdown.seconds },
  ];

  return (
    <section
      id="beranda"
      className="scroll-mt-16 md:scroll-mt-24 relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 px-4 sm:px-6"
    >
      {/* Soft drifting ambient radial light */}
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 w-[540px] h-[340px] rounded-full bg-[#DFC484]/15 blur-3xl"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Centered Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs tracking-[0.18em] text-[#9A7B3E] font-semibold">
            <span>Undangan Pernikahan</span>
            <span aria-hidden="true">·</span>
            <span>Kepada {guestName}</span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-4 font-serif italic text-base sm:text-lg text-[#9A7B3E]"
          >
            Assalamu&apos;alaikum Wr. Wb.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#1E3A2F] leading-[1.08]"
          >
            {COUPLE.bride.fullName}{' '}
            <span className="italic font-normal text-[#9A7B3E] mx-1">&amp;</span>{' '}
            {COUPLE.groom.fullName}
          </motion.h1>

          <p className="mt-2 text-xs tracking-[0.2em] text-[#6B7A72] font-semibold">
            ({COUPLE.shortTitle})
          </p>

          <BotanicalSprig className="w-32 h-9 text-[#9A7B3E]/80 mt-4" />

          <p className="mt-4 text-sm sm:text-base text-[#4A5A52] leading-relaxed max-w-xl mx-auto">
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan
            Akad &amp; Resepsi Pernikahan kami yang insya Allah akan dilaksanakan pada:
          </p>

          {/* Centered Date & Location Metadata */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#1E3A2F]">
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#9A7B3E] shrink-0" aria-hidden="true" />
              <span className="font-medium">{COUPLE.dateLabel}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#9A7B3E] shrink-0" aria-hidden="true" />
              <span className="font-medium">{COUPLE.locationShort}</span>
            </span>
          </div>
        </motion.div>

        {/* Centered Animated Celestial Floral Arch Showcase (Photo-free) */}
        <motion.div
          style={{ y: archY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 max-w-2xl mx-auto p-2.5 bg-white border border-[#1E3A2F]/12 rounded-t-[160px] sm:rounded-t-[240px] rounded-b-3xl shadow-sm"
        >
          <FloralHaloArch
            dateCompact={COUPLE.dateCompact}
            dateLabel={COUPLE.dateLabel}
            hashtag={COUPLE.hashtag}
          />
        </motion.div>

        {/* Centered Action Cluster */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#acara"
            className="min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#1E3A2F] text-[#FAF9F6] text-sm font-semibold hover:bg-[#152A22] active:scale-[0.98] transition-all whitespace-nowrap"
          >
            <CalendarHeart className="w-4 h-4 text-[#DFC484]" aria-hidden="true" />
            <span>Lihat Jadwal Acara</span>
          </a>

          <button
            type="button"
            onClick={onToggleMusic}
            className="min-h-[48px] inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white border border-[#1E3A2F]/15 text-[#1E3A2F] text-sm font-medium hover:bg-[#F3F1EC] transition-colors cursor-pointer whitespace-nowrap"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-[#9A7B3E]" aria-hidden="true" />
            ) : (
              <Play className="w-4 h-4 text-[#9A7B3E]" aria-hidden="true" />
            )}
            <span>{isPlaying ? `Jeda: ${currentTrack.title}` : `Putar: ${currentTrack.title}`}</span>
          </button>

          <button
            type="button"
            onClick={onOpenMusicSheet}
            className="md:hidden min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-[#5C6B63] hover:text-[#1E3A2F]"
          >
            <Music className="w-4 h-4" aria-hidden="true" />
            <span>Pilih Lagu</span>
          </button>
        </motion.div>

        {/* Centered 4-Column Countdown Strip with staggered float */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Hitung Mundur Menuju Hari Pernikahan"
          className="mt-10 max-w-3xl mx-auto grid grid-cols-4 gap-2.5 sm:gap-5"
        >
          {timeUnits.map((unit, idx) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden bg-white border border-[#1E3A2F]/12 rounded-2xl py-4 sm:py-6 px-2 text-center shadow-xs"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-4 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#9A7B3E]/45 to-transparent"
              />
              <motion.span
                key={`${unit.label}-${unit.value}`}
                initial={{ opacity: 0.5, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="block font-serif text-3xl sm:text-5xl font-semibold text-[#1E3A2F] tabular-nums leading-none"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>
              <span className="mt-2 block text-[11px] sm:text-xs font-medium text-[#5C6B63]">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
