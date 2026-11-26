import { motion } from 'motion/react';
import { WEDDING_FEATURED_VERSE, WEDDING_PILLARS } from '../data/weddingData';
import { BotanicalSprig } from './BotanicalOrnaments';

export function WeddingBlessingSection() {
  return (
    <section id="doa" className="scroll-mt-16 md:scroll-mt-24 bg-[#F3F1EC] py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto mb-10 sm:mb-12"
        >
          <p className="text-xs tracking-[0.2em] text-[#9A7B3E] font-semibold">
            Ayat Suci &amp; Harapan
          </p>
          <h2 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold text-[#1E3A2F]">
            Untaian Doa Pernikahan
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A5A52] leading-relaxed">
            Berlandaskan firman Allah SWT, kami memohon doa restu untuk melangkah menuju rumah tangga yang penuh ketenteraman dan keberkahan.
          </p>
        </motion.div>

        {/* Featured Quranic Verse Card */}
        <motion.article
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden bg-white border border-[#9A7B3E]/25 rounded-3xl p-7 sm:p-10 shadow-xs text-center"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#9A7B3E]/60 to-transparent"
          />
          <BotanicalSprig className="w-28 h-9 mx-auto text-[#9A7B3E]/85" />
          <blockquote className="mt-4 font-serif italic text-base sm:text-xl leading-relaxed text-[#1E3A2F] max-w-2xl mx-auto">
            {WEDDING_FEATURED_VERSE.text}
          </blockquote>
          <p className="mt-4 text-xs font-semibold tracking-[0.16em] text-[#9A7B3E]">
            {WEDDING_FEATURED_VERSE.surah}
          </p>
        </motion.article>

        {/* Animated Connector from Verse into the Three Pillars */}
        <div aria-hidden="true" className="flex flex-col items-center">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-px h-6 origin-top bg-gradient-to-b from-[#9A7B3E] to-[#9A7B3E]/40"
          />
          <motion.span
            initial={{ scale: 0, rotate: 0 }}
            whileInView={{ scale: 1, rotate: 45 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="w-2 h-2 border border-[#9A7B3E] bg-[#FAF9F6]"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-px h-6 origin-top bg-gradient-to-b from-[#9A7B3E]/40 to-[#9A7B3E]"
          />
        </div>

        {/* Three Pillars of Sakinah, Mawaddah, Warahmah */}
        <div className="flex flex-col items-center">
          {WEDDING_PILLARS.map((item, idx) => (
            <div key={item.code} className="w-full flex flex-col items-center">
              <motion.article
                initial={{ opacity: 0, y: 22, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="relative overflow-hidden w-full bg-white border border-[#1E3A2F]/10 rounded-3xl p-6 sm:p-8 shadow-xs text-center"
              >
                <p className="text-xs text-[#9A7B3E] font-semibold tracking-[0.14em]">
                  {item.subtitle}
                </p>
                <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#1E3A2F]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm text-[#4A5A52] leading-relaxed max-w-xl mx-auto">
                  {item.description}
                </p>
              </motion.article>

              {idx < WEDDING_PILLARS.length - 1 && (
                <div aria-hidden="true" className="flex flex-col items-center">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-px h-5 sm:h-6 origin-top bg-gradient-to-b from-[#9A7B3E] to-[#9A7B3E]/40"
                  />
                  <motion.span
                    initial={{ scale: 0, rotate: 0 }}
                    whileInView={{ scale: 1, rotate: 45 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="w-2 h-2 border border-[#9A7B3E] bg-[#FAF9F6]"
                  />
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-px h-5 sm:h-6 origin-top bg-gradient-to-b from-[#9A7B3E]/40 to-[#9A7B3E]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
