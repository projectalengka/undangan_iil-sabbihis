import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronUp, Disc3, Pause, Play, SkipBack, SkipForward, Volume2, X } from 'lucide-react';
import { PLAYLIST, type MusicTrack } from '../utils/musicEngine';

interface MusicPlayerProps {
  isPlaying: boolean;
  trackIndex: number;
  elapsedSec: number;
  volume: number;
  mobileSheetOpen: boolean;
  onCloseMobileSheet: () => void;
  onTogglePlay: () => void;
  onSelectTrack: (index: number) => void;
  onChangeVolume: (val: number) => void;
}

function formatClock(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function MusicPlayer({
  isPlaying,
  trackIndex,
  elapsedSec,
  volume,
  mobileSheetOpen,
  onCloseMobileSheet,
  onTogglePlay,
  onSelectTrack,
  onChangeVolume,
}: MusicPlayerProps) {
  const [desktopExpanded, setDesktopExpanded] = useState(false);
  const currentTrack: MusicTrack = PLAYLIST[trackIndex] ?? PLAYLIST[0];
  const progressPct = Math.min(100, Math.round((elapsedSec / currentTrack.durationSec) * 100));

  const nextTrack = () => onSelectTrack((trackIndex + 1) % PLAYLIST.length);
  const prevTrack = () => onSelectTrack((trackIndex - 1 + PLAYLIST.length) % PLAYLIST.length);

  return (
    <>
      {/* Desktop Floating Vinyl Music Widget (bottom-right) */}
      <aside
        aria-label="Pemutar Musik Latar"
        className="hidden md:block fixed bottom-6 right-6 z-40"
      >
        <AnimatePresence>
          {desktopExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 w-80 bg-white border border-[#1E3A2F]/15 rounded-2xl p-5 shadow-xl text-[#1A2420]"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold tracking-wider text-[#9A7B3E]">
                  Daftar Putar Pernikahan
                </p>
                <button
                  type="button"
                  onClick={() => setDesktopExpanded(false)}
                  aria-label="Tutup panel pemutar musik"
                  className="min-h-[36px] min-w-[36px] inline-flex items-center justify-center rounded-lg text-[#5C6B63] hover:bg-[#1E3A2F]/5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Active track & progress */}
              <div className="flex items-center gap-3 pb-4 border-b border-[#1E3A2F]/10">
                <div
                  className={`w-12 h-12 rounded-full bg-[#1E3A2F] text-[#DFC484] flex items-center justify-center shrink-0 ${
                    isPlaying ? 'animate-spin-slow' : 'animate-spin-paused'
                  }`}
                >
                  <Disc3 className="w-7 h-7" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-lg font-semibold text-[#1E3A2F] truncate">
                    {currentTrack.title}
                  </p>
                  <p className="text-xs text-[#5C6B63] truncate">{currentTrack.subtitle}</p>
                </div>
              </div>

              <div className="mt-3">
                <div className="h-1.5 w-full bg-[#1E3A2F]/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#9A7B3E] transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#5C6B63] tabular-nums">
                  <span>{formatClock(elapsedSec)}</span>
                  <span>{formatClock(currentTrack.durationSec)}</span>
                </div>
              </div>

              {/* Transport controls */}
              <div className="mt-3 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={prevTrack}
                  aria-label="Lagu sebelumnya"
                  className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-full hover:bg-[#1E3A2F]/8 text-[#1E3A2F] cursor-pointer"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onTogglePlay}
                  aria-label={isPlaying ? 'Jeda lagu' : 'Putar lagu'}
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-[#1E3A2F] text-[#FAF9F6] hover:bg-[#152A22] transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={nextTrack}
                  aria-label="Lagu berikutnya"
                  className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-full hover:bg-[#1E3A2F]/8 text-[#1E3A2F] cursor-pointer"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Volume */}
              <div className="mt-4 flex items-center gap-2.5">
                <Volume2 className="w-4 h-4 text-[#5C6B63] shrink-0" aria-hidden="true" />
                <label htmlFor="desktop-music-volume" className="sr-only">
                  Volume musik
                </label>
                <input
                  id="desktop-music-volume"
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
                  className="w-full accent-[#1E3A2F] cursor-pointer"
                />
              </div>

              {/* Playlist */}
              <div className="mt-4 space-y-1">
                {PLAYLIST.map((track, idx) => {
                  const selected = idx === trackIndex;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => onSelectTrack(idx)}
                      className={`w-full min-h-[40px] px-3 py-2 rounded-xl text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#1E3A2F] text-[#FAF9F6]'
                          : 'text-[#3A4A42] hover:bg-[#1E3A2F]/6'
                      }`}
                    >
                      <span className="font-medium truncate">{track.title}</span>
                      <span className={`tabular-nums text-[11px] ${selected ? 'text-[#DFC484]' : 'text-[#6D7D75]'}`}>
                        {formatClock(track.durationSec)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact floating bar */}
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md border border-[#1E3A2F]/15 rounded-2xl p-2 pr-3 shadow-lg">
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-[#1E3A2F] text-[#DFC484] flex items-center justify-center hover:bg-[#152A22] transition-colors cursor-pointer"
          >
            <Disc3
              className={`w-5 h-5 ${isPlaying ? 'animate-spin-slow' : 'animate-spin-paused'}`}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={() => setDesktopExpanded((v) => !v)}
            aria-expanded={desktopExpanded}
            aria-label="Tampilkan detail pemutar musik"
            className="min-h-[44px] px-2 text-left flex items-center gap-3 cursor-pointer"
          >
            <div>
              <p className="text-xs font-semibold text-[#1E3A2F] leading-tight whitespace-nowrap">
                {currentTrack.title}
              </p>
              <p className="text-[11px] text-[#5C6B63] leading-tight whitespace-nowrap flex items-center gap-1.5">
                {isPlaying && (
                  <span className="inline-flex items-end gap-0.5 h-2.5" aria-hidden="true">
                    <motion.span
                      animate={{ height: ['35%', '100%', '45%'] }}
                      transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-0.5 bg-[#9A7B3E] rounded-full"
                    />
                    <motion.span
                      animate={{ height: ['90%', '40%', '95%'] }}
                      transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-0.5 bg-[#9A7B3E] rounded-full"
                    />
                    <motion.span
                      animate={{ height: ['50%', '95%', '35%'] }}
                      transition={{ duration: 0.65, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-0.5 bg-[#9A7B3E] rounded-full"
                    />
                  </span>
                )}
                <span>{isPlaying ? 'Sedang diputar' : 'Musik dijeda'}</span>
              </p>
            </div>
            <ChevronUp
              className={`w-4 h-4 text-[#5C6B63] transition-transform ${desktopExpanded ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Sheet Music Drawer */}
      <AnimatePresence>
        {mobileSheetOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end"
            onClick={onCloseMobileSheet}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-[#FAF9F6] rounded-t-3xl p-6 pb-8 border-t border-[#1E3A2F]/15 shadow-2xl"
            >
              <div className="w-10 h-1.5 bg-[#1E3A2F]/20 rounded-full mx-auto mb-4" aria-hidden="true" />
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-2xl font-semibold text-[#1E3A2F]">
                  Pemutar Musik
                </h3>
                <button
                  type="button"
                  onClick={onCloseMobileSheet}
                  aria-label="Tutup pemutar musik"
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-[#1E3A2F]/8 text-[#1E3A2F]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-4 bg-white border border-[#1E3A2F]/10 rounded-2xl p-4">
                <div
                  className={`w-14 h-14 rounded-full bg-[#1E3A2F] text-[#DFC484] flex items-center justify-center shrink-0 ${
                    isPlaying ? 'animate-spin-slow' : 'animate-spin-paused'
                  }`}
                >
                  <Disc3 className="w-8 h-8" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-xl font-semibold text-[#1E3A2F] truncate">
                    {currentTrack.title}
                  </p>
                  <p className="text-xs text-[#5C6B63]">{currentTrack.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={onTogglePlay}
                  aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
                  className="min-h-[48px] min-w-[48px] rounded-full bg-[#1E3A2F] text-[#FAF9F6] flex items-center justify-center shrink-0"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
              </div>

              <div className="mt-4">
                <div className="h-1.5 w-full bg-[#1E3A2F]/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#9A7B3E] transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-xs text-[#5C6B63] tabular-nums">
                  <span>{formatClock(elapsedSec)}</span>
                  <span>{formatClock(currentTrack.durationSec)}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-[#5C6B63]" aria-hidden="true" />
                <label htmlFor="mobile-music-volume" className="sr-only">
                  Volume musik
                </label>
                <input
                  id="mobile-music-volume"
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
                  className="w-full accent-[#1E3A2F]"
                />
              </div>

              <div className="mt-5 space-y-2">
                {PLAYLIST.map((track, idx) => {
                  const selected = idx === trackIndex;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => onSelectTrack(idx)}
                      className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl text-left flex items-center justify-between text-sm ${
                        selected
                          ? 'bg-[#1E3A2F] text-[#FAF9F6] font-medium'
                          : 'bg-white border border-[#1E3A2F]/10 text-[#1E3A2F]'
                      }`}
                    >
                      <span>{track.title}</span>
                      <span className="tabular-nums text-xs opacity-75">
                        {formatClock(track.durationSec)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
