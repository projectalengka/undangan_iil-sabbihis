import { motion } from 'motion/react';

export function BotanicalSprig({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <motion.path
        d="M12 42C44 40 72 28 90 12C108 28 136 40 168 42"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M90 12C86 24 88 38 90 52"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M58 32C48 22 36 22 28 28C38 35 49 36 58 32Z"
        stroke="currentColor"
        strokeWidth="1.1"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.0, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M122 32C132 22 144 22 152 28C142 35 131 36 122 32Z"
        stroke="currentColor"
        strokeWidth="1.1"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.0, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="90"
        cy="12"
        r="3.5"
        fill="currentColor"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
    </svg>
  );
}

export function MonogramCrest({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className={className}>
      <motion.circle
        cx="60"
        cy="60"
        r="54"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 4"
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '60px 60px' }}
      />
      <motion.circle
        cx="60"
        cy="60"
        r="47"
        stroke="currentColor"
        strokeWidth="1.2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <text
        x="60"
        y="67"
        textAnchor="middle"
        fill="currentColor"
        style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '27px', fontWeight: 600 }}
      >
        I &amp; S
      </text>
    </svg>
  );
}

export function CornerBotanicalFlourish({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <motion.path
        d="M12 124C14 82 32 48 64 26C86 12 108 10 126 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M28 96C44 92 56 80 58 66C42 68 30 80 28 96Z"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.65 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M58 56C72 52 84 42 86 28C70 30 58 40 58 56Z"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.65 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="22"
        cy="42"
        r="2.5"
        fill="currentColor"
        animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="98"
        cy="20"
        r="2"
        fill="currentColor"
        animate={{ opacity: [0.25, 0.85, 0.25], scale: [0.8, 1.25, 0.8] }}
        transition={{ duration: 4.2, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

interface FloralHaloArchProps {
  dateCompact: string;
  dateLabel: string;
  hashtag: string;
}

export function FloralHaloArch({
  dateCompact,
  dateLabel,
  hashtag,
}: FloralHaloArchProps) {
  return (
    <div className="relative h-[340px] sm:h-[420px] rounded-t-[152px] sm:rounded-t-[232px] rounded-b-2xl overflow-hidden bg-gradient-to-b from-[#172C24] via-[#1C362C] to-[#11211B] flex flex-col items-center justify-center px-6 py-8 text-[#FAF9F6]">
      {/* Animated ambient aurora glows */}
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.14, 1], opacity: [0.28, 0.48, 0.28] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-12 w-72 h-72 rounded-full bg-[#C6A358]/25 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -bottom-16 w-80 h-80 rounded-full bg-[#3A755B]/30 blur-3xl"
      />

      {/* Subtle inner arch line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 sm:inset-4 rounded-t-[140px] sm:rounded-t-[216px] rounded-b-xl border border-[#DFC484]/25"
      />

      {/* Corner flourishes */}
      <CornerBotanicalFlourish className="pointer-events-none absolute bottom-2 left-2 w-24 h-24 text-[#DFC484]/45" />
      <CornerBotanicalFlourish className="pointer-events-none absolute bottom-2 right-2 w-24 h-24 -scale-x-100 text-[#DFC484]/45" />

      {/* Rotating Celestial / Mandala Crest */}
      <div className="relative z-10 flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64">
        <svg viewBox="0 0 240 240" fill="none" aria-hidden="true" className="w-full h-full">
          <motion.circle
            cx="120"
            cy="120"
            r="112"
            stroke="#DFC484"
            strokeOpacity="0.32"
            strokeWidth="1"
            strokeDasharray="4 6"
            animate={{ rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '120px 120px' }}
          />
          <motion.circle
            cx="120"
            cy="120"
            r="98"
            stroke="#DFC484"
            strokeOpacity="0.48"
            strokeWidth="1.2"
            strokeDasharray="16 8"
            animate={{ rotate: -360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '120px 120px' }}
          />
          <motion.circle
            cx="120"
            cy="120"
            r="84"
            stroke="#FAF9F6"
            strokeOpacity="0.22"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        {/* Center Calligraphy + Intertwined Rings Stack (Zero Overlap) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <svg viewBox="0 0 64 28" fill="none" aria-hidden="true" className="w-12 h-5 mb-1.5">
            <motion.circle
              cx="24"
              cy="14"
              r="8.5"
              stroke="#DFC484"
              strokeWidth="1.4"
              animate={{ x: [0, 1.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="40"
              cy="14"
              r="8.5"
              stroke="#FAF9F6"
              strokeOpacity="0.88"
              strokeWidth="1.4"
              animate={{ x: [0, -1.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
          <p className="text-[10px] tracking-[0.22em] text-[#DFC484] font-medium">
            Save The Date
          </p>
          <p className="mt-1 font-serif text-4xl sm:text-5xl font-medium text-[#FAF9F6] tracking-wide leading-none">
            I <span className="italic font-normal text-[#DFC484]">&amp;</span> S
          </p>
          <p className="mt-2 font-serif text-base sm:text-lg text-[#E8DEC8] tabular-nums">
            {dateCompact}
          </p>
        </div>
      </div>

      {/* Bottom Typographic Band */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35 }}
        className="relative z-10 mt-3 text-center"
      >
        <p className="text-xs sm:text-sm font-medium text-[#E5E0D5]">{dateLabel}</p>
        <p className="mt-1 text-[11px] tracking-[0.16em] text-[#DFC484]">{hashtag}</p>
      </motion.div>
    </div>
  );
}

export function PortraitEmblemCard({
  initial,
  role,
  nickname,
}: {
  initial: string;
  role: string;
  nickname: string;
}) {
  return (
    <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-gradient-to-b from-[#162C23] via-[#1C382D] to-[#13251E] flex flex-col items-center justify-center text-[#FAF9F6]">
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.15, 1], opacity: [0.24, 0.45, 0.24] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute w-48 h-48 rounded-full bg-[#DFC484]/20 blur-2xl"
      />

      <CornerBotanicalFlourish className="pointer-events-none absolute top-2 left-2 w-20 h-20 rotate-90 text-[#DFC484]/35" />
      <CornerBotanicalFlourish className="pointer-events-none absolute bottom-2 right-2 w-20 h-20 -rotate-90 text-[#DFC484]/35" />

      {/* Rotating Wreath Ring + Monogram Initial */}
      <div className="relative z-10 w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
        <svg viewBox="0 0 140 140" fill="none" aria-hidden="true" className="w-full h-full">
          <motion.circle
            cx="70"
            cy="70"
            r="60"
            stroke="#DFC484"
            strokeOpacity="0.4"
            strokeWidth="1"
            strokeDasharray="3 5"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '70px 70px' }}
          />
          <motion.circle
            cx="70"
            cy="70"
            r="50"
            stroke="#FAF9F6"
            strokeOpacity="0.28"
            strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        <motion.span
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute font-serif italic text-5xl sm:text-6xl font-medium text-[#DFC484]"
        >
          {initial}
        </motion.span>
      </div>

      <p className="relative z-10 mt-1 text-[11px] tracking-[0.22em] text-[#E5E0D5]/85">
        {role} · {nickname}
      </p>
    </div>
  );
}
