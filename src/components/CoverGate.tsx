import { motion } from 'motion/react';
import { MailOpen, Music } from 'lucide-react';
import { COUPLE } from '../data/weddingData';
import { CornerBotanicalFlourish, MonogramCrest } from './BotanicalOrnaments';

interface CoverGateProps {
  guestName: string;
  onOpen: () => void;
}

export function CoverGate({ guestName, onOpen }: CoverGateProps) {
  return (
    <motion.div
      key="cover-gate"
      data-testid="cover-gate"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -36, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-y-auto bg-[#11201A] text-[#FAF9F6] px-5 py-10 sm:py-14"
    >
      {/* Animated ambient aurora glows (zero photos) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [-24, 28, -24], y: [-18, 22, -18], scale: [1, 1.15, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-[#244B3C]/45 blur-3xl"
        />
        <motion.div
          animate={{ x: [22, -26, 22], y: [20, -16, 20], scale: [1.05, 0.92, 1.05] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full bg-[#C6A358]/16 blur-3xl"
        />
      </div>

      {/* Subtle architectural frame + animated corner botanical flourishes */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-4 sm:inset-8 border border-[#C6A358]/25 rounded-3xl overflow-hidden"
      >
        <CornerBotanicalFlourish className="absolute top-1 left-1 w-24 h-24 sm:w-32 sm:h-32 rotate-90 text-[#DFC484]/45" />
        <CornerBotanicalFlourish className="absolute top-1 right-1 w-24 h-24 sm:w-32 sm:h-32 rotate-180 text-[#DFC484]/45" />
        <CornerBotanicalFlourish className="absolute bottom-1 left-1 w-24 h-24 sm:w-32 sm:h-32 text-[#DFC484]/45" />
        <CornerBotanicalFlourish className="absolute bottom-1 right-1 w-24 h-24 sm:w-32 sm:h-32 -rotate-90 text-[#DFC484]/45" />
      </div>

      {/* Top crest */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center pt-2"
      >
        <MonogramCrest className="w-20 h-20 sm:w-24 sm:h-24 text-[#DFC484]" />
        <p className="mt-3 text-xs tracking-[0.22em] text-[#DFC484]">
          Undangan Pernikahan
        </p>
      </motion.div>

      {/* Center couple headline with gentle orbital ring behind */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center my-6 max-w-xl"
      >
        <motion.div
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
          className="pointer-events-none absolute -top-10 w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-dashed border-[#DFC484]/15"
        />
        <h1 className="relative font-serif text-5xl sm:text-7xl font-medium tracking-tight text-[#FAF9F6] leading-[1.05]">
          I&apos;il <span className="italic font-normal text-[#DFC484]">&amp;</span> Sabbihis
        </h1>
        <div className="relative mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-[#E5E0D5]">
          <span>{COUPLE.dateLabel}</span>
          <span aria-hidden="true">·</span>
          <span>Murukan, Mojoagung, Jombang</span>
        </div>
        <p className="relative mt-2 text-xs text-[#DFC484]/90">
          Keluarga Bpk. Suyanto (Yanto) &amp; Ibu Siti Zainab
        </p>
      </motion.div>

      {/* Bottom personalized guest card & primary CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md bg-[#182B23]/88 backdrop-blur-md border border-[#DFC484]/30 rounded-2xl p-6 sm:p-7 text-center shadow-2xl"
      >
        <p className="text-xs tracking-[0.16em] text-[#DFC484]">
          Kepada Yth. Bapak/Ibu/Saudara/i
        </p>
        <p
          data-testid="cover-guest-name"
          className="mt-2 font-serif text-2xl sm:text-3xl font-medium text-[#FAF9F6] break-words"
        >
          {guestName}
        </p>
        <p className="mt-2 text-xs text-[#D3CFC4] leading-relaxed">
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk menghadiri Akad &amp; Resepsi Pernikahan kami.
        </p>

        <button
          type="button"
          onClick={onOpen}
          className="group relative overflow-hidden mt-6 w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#DFC484] px-6 py-3 text-sm font-semibold text-[#13221C] hover:bg-[#EAD49F] active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DFC484]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/35 to-transparent"
          />
          <MailOpen className="w-4 h-4 shrink-0 relative z-10" aria-hidden="true" />
          <span className="relative z-10">Buka Undangan</span>
        </button>

        <p className="mt-3 inline-flex items-center justify-center gap-1.5 text-[11px] text-[#C8C3B8]">
          <Music className="w-3.5 h-3.5 text-[#DFC484]" aria-hidden="true" />
          <span>Musik latar romantis akan diputar otomatis</span>
        </p>
        <p className="mt-2 text-[10px] text-[#B6B0A3]/90">
          Mohon maaf apabila ada kesalahan penulisan nama dan gelar.
        </p>
      </motion.div>
    </motion.div>
  );
}
