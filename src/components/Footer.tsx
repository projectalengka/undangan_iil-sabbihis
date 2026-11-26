import { COUPLE } from '../data/weddingData';
import { BotanicalSprig } from './BotanicalOrnaments';

export function Footer() {
  return (
    <footer className="bg-[#15261F] text-[#FAF9F6] pt-14 pb-24 md:pb-14 px-4 sm:px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <BotanicalSprig className="w-32 h-10 mx-auto text-[#DFC484]" />
        <p className="mt-5 text-sm text-[#D3CFC4] leading-relaxed max-w-lg mx-auto">
          Atas kehadiran serta doa restu Bapak/Ibu/Saudara/i kami ucapkan terima kasih.
        </p>
        <p className="mt-3 font-serif italic text-lg text-[#DFC484]">
          Wassalamu&apos;alaikum Wr. Wb.
        </p>
        <h2 className="mt-5 font-serif text-4xl sm:text-5xl font-medium text-[#FAF9F6]">
          I&apos;il <span className="italic font-normal text-[#DFC484]">&amp;</span> Sabbihis
        </h2>
        <p className="mt-2 text-xs text-[#C8C3B8] max-w-md mx-auto">
          {COUPLE.fullAddress}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-[#B6B0A3]">
          <span>{COUPLE.dateLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{COUPLE.hashtag}</span>
        </div>
      </div>
    </footer>
  );
}
