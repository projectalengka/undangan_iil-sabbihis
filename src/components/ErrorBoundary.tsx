import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message || 'Terjadi kesalahan pada aplikasi.' };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF9F6] text-[#1A2420] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border border-[#1E3A2F]/15 rounded-2xl p-8 text-center shadow-sm">
            <p className="text-xs tracking-[0.2em] text-[#9A7B3E] mb-3">I&apos;il &amp; Sabbihis</p>
            <h2 className="font-serif text-3xl text-[#1E3A2F] mb-3">Halaman Sedang Disegarkan</h2>
            <p className="text-sm text-[#4A5A52] mb-6 leading-relaxed">
              Mohon muat ulang halaman untuk melanjutkan melihat undangan pernikahan.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-xl bg-[#1E3A2F] text-[#FAF9F6] text-sm font-medium hover:bg-[#162C23] transition-colors cursor-pointer"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
