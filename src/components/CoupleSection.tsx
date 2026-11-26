import { motion } from 'motion/react';
import { COUPLE } from '../data/weddingData';
import {
  BotanicalSprig,
  CornerBotanicalFlourish,
  PortraitEmblemCard,
} from './BotanicalOrnaments';

export function CoupleSection() {
  const profiles = [
    { role: 'Mempelai Putri', data: COUPLE.bride },
    { role: 'Mempelai Putra', data: COUPLE.groom },
  ];

  return (
    <>
      {/* Sacred Verse Band with Ambient Halo */}
      <section className="relative overflow-hidden bg-[#1E3A2F] text-[#FAF9F6] py-16 sm:py-22 px-4 sm:px-6">
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.34, 0.18] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#DFC484]/20 blur-3xl"
        />
        <CornerBotanicalFlourish className="pointer-events-none absolute bottom-2 left-2 w-24 h-24 text-[#DFC484]/30" />
        <CornerBotanicalFlourish className="pointer-events-none absolute top-2 right-2 w-24 h-24 rotate-180 text-[#DFC484]/30" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <BotanicalSprig className="w-36 h-12 mx-auto text-[#DFC484] mb-6" />
          <blockquote className="font-serif italic text-lg sm:text-2xl leading-relaxed text-[#FAF9F6]">
            “Semoga Allah SWT. menghimpun yang terserak dari keduanya, dan kiranya Allah
            memberkahi dan memberi mereka berdua keturunan yang lebih baik, menjadikannya
            pembuka pintu rahmat, sumber ilmu dan hikmah serta pemberi rasa aman bagi ummat.”
          </blockquote>
          <p className="mt-5 text-xs tracking-[0.12em] text-[#DFC484] leading-relaxed">
            Doa Nabi Muhammad SAW. pada pernikahan putri beliau Fatimah Azzahra dengan Ali bin Abi Thalib
          </p>
        </motion.div>
      </section>

      {/* Bride & Groom Editorial Profiles (Photo-free animated crest cards) */}
      <section id="mempelai" className="scroll-mt-16 md:scroll-mt-20 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
          >
            <p className="text-xs tracking-[0.2em] text-[#9A7B3E] font-semibold">
              Pasangan Mempelai
            </p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold text-[#1E3A2F]">
              Dua Jiwa dalam Satu Janji
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4A5A52] leading-relaxed">
              Dengan restu kedua orang tua, kami melangkah menuju ikatan suci pernikahan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {profiles.map((item, idx) => (
              <motion.article
                key={item.data.nickname}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, delay: idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="bg-white border border-[#1E3A2F]/12 rounded-3xl overflow-hidden shadow-xs flex flex-col"
              >
                <PortraitEmblemCard
                  initial={item.data.initial}
                  role={item.role}
                  nickname={item.data.nickname}
                />

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between text-center items-center">
                  <div>
                    <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E3A2F]">
                      {item.data.fullName}
                    </h3>

                    <motion.div
                      aria-hidden="true"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.65, delay: 0.15 }}
                      className="w-16 h-px mx-auto my-4 bg-[#9A7B3E]/45 origin-center"
                    />

                    <p className="text-xs font-medium text-[#6B7A72]">
                      {item.data.childOrder}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#1E3A2F]">
                      {item.data.parents}
                    </p>

                    <p className="mt-4 text-sm text-[#4A5A52] leading-relaxed max-w-md mx-auto">
                      {item.data.bio}
                    </p>
                  </div>

                  <p className="mt-6 pt-4 w-full border-t border-[#1E3A2F]/10 text-xs font-medium text-[#9A7B3E]">
                    {item.data.origin}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
