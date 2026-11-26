import { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarPlus, Check, Clock, Compass, ExternalLink, MapPin } from 'lucide-react';
import { COUPLE, EVENTS, LOCATION_LANDMARKS } from '../data/weddingData';
import { generateIcsContent } from '../utils/weddingUtils';

export function EventSection() {
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const handleSaveCalendar = (ev: (typeof EVENTS)[number]) => {
    const ics = generateIcsContent({
      title: `${ev.title} — ${COUPLE.shortTitle}`,
      description: ev.notes,
      location: `${ev.venue}, ${ev.address}`,
      startIso: ev.startIso,
      endIso: ev.endIso,
    });

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `iil-sabbihis-${ev.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedId(ev.id);
    window.setTimeout(() => setDownloadedId(null), 3000);
  };

  return (
    <section id="acara" className="scroll-mt-16 md:scroll-mt-20 py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <p className="text-xs tracking-[0.2em] text-[#9A7B3E] font-semibold">
            Rangkaian Acara
          </p>
          <h2 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold text-[#1E3A2F]">
            Waktu &amp; Lokasi Bahagia
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A5A52] leading-relaxed">
            Kehadiran dan doa restu Anda adalah kehormatan terbesar bagi keluarga kami.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {EVENTS.map((ev, idx) => {
            const isDownloaded = downloadedId === ev.id;
            return (
              <motion.article
                key={ev.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5 }}
                className="relative overflow-hidden bg-white border border-[#1E3A2F]/12 rounded-3xl p-6 sm:p-9 shadow-xs flex flex-col justify-between"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#9A7B3E]/55 to-transparent"
                />
                <div className="text-center">
                  <div className="flex flex-col items-center gap-1 pb-4 border-b border-[#1E3A2F]/10">
                    <span className="text-xs font-semibold tracking-[0.16em] text-[#9A7B3E]">
                      {ev.date}
                    </span>
                    <span className="text-xs text-[#6B7A72] tabular-nums">{ev.time}</span>
                  </div>

                  <h3 className="mt-5 font-serif text-3xl sm:text-4xl font-semibold text-[#1E3A2F]">
                    {ev.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#4A5A52] leading-relaxed">{ev.notes}</p>

                  <dl className="mt-6 space-y-4 text-sm">
                    <div className="flex flex-col items-center gap-1">
                      <dt className="inline-flex items-center gap-1.5 text-xs text-[#6B7A72]">
                        <Clock className="w-3.5 h-3.5 text-[#9A7B3E]" aria-hidden="true" />
                        <span>Pukul</span>
                      </dt>
                      <dd className="font-medium text-[#1E3A2F] tabular-nums">{ev.time}</dd>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <dt className="inline-flex items-center gap-1.5 text-xs text-[#6B7A72]">
                        <MapPin className="w-3.5 h-3.5 text-[#9A7B3E]" aria-hidden="true" />
                        <span>Lokasi</span>
                      </dt>
                      <dd className="font-medium text-[#1E3A2F]">{ev.venue}</dd>
                      <dd className="text-xs text-[#5C6B63] max-w-xs">{ev.address}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-8 pt-5 border-t border-[#1E3A2F]/10 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => handleSaveCalendar(ev)}
                    className="min-h-[44px] flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E3A2F] text-[#FAF9F6] text-xs font-semibold hover:bg-[#152A22] transition-colors cursor-pointer"
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="w-4 h-4 text-[#DFC484]" aria-hidden="true" />
                        <span>Kalender Disimpan</span>
                      </>
                    ) : (
                      <>
                        <CalendarPlus className="w-4 h-4" aria-hidden="true" />
                        <span>Simpan ke Kalender</span>
                      </>
                    )}
                  </button>

                  <a
                    href={ev.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#1E3A2F]/15 text-[#1E3A2F] text-xs font-semibold hover:bg-[#EFECE4] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-[#9A7B3E]" aria-hidden="true" />
                    <span>Buka Google Maps</span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Centered Denah & Petunjuk Arah Lokasi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 bg-white border border-[#1E3A2F]/12 rounded-3xl p-6 sm:p-8 shadow-xs text-center"
        >
          <div className="inline-flex items-center justify-center gap-2 text-xs tracking-[0.18em] text-[#9A7B3E] font-semibold">
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span>Denah &amp; Petunjuk Lokasi</span>
          </div>
          <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#1E3A2F]">
            {COUPLE.fullAddress}
          </h3>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {LOCATION_LANDMARKS.map((landmark) => (
              <div
                key={landmark.title}
                className="rounded-2xl bg-[#FAF9F6] border border-[#1E3A2F]/10 p-4 text-center"
              >
                <p className="text-xs font-semibold tracking-[0.14em] text-[#9A7B3E]">
                  {landmark.title}
                </p>
                <p className="mt-1.5 text-sm text-[#3A4A42] leading-relaxed">
                  {landmark.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href={COUPLE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1E3A2F] text-[#FAF9F6] text-xs font-semibold hover:bg-[#152A22] transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#DFC484]" aria-hidden="true" />
              <span>Buka Lokasi di Google Maps</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
