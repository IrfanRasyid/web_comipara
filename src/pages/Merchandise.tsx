import { useEffect, useMemo, useState } from 'react';
import { useStore } from '../store/useStore';
import { ExternalLink, ShoppingCart, User, X } from 'lucide-react';

const normalizeImageUrls = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === 'string' && v.length > 0);
  }
  if (typeof value === 'string' && value.length > 0) {
    const trimmed = value.trim();
    if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
      try {
        const parsed = JSON.parse(trimmed) as unknown;
        if (Array.isArray(parsed)) {
          return parsed.filter((v): v is string => typeof v === 'string' && v.length > 0);
        }
      } catch {
        return [value];
      }
    }
    return [value];
  }
  return [];
};

export const Merchandise = () => {
  const { merchandise, profiles, isLoading } = useStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedItem = useMemo(
    () => merchandise.find((m) => m.id === selectedId) ?? null,
    [merchandise, selectedId],
  );

  const selectedVtuber = useMemo(() => {
    if (!selectedItem) return null;
    return profiles.find((p) => p.id === selectedItem.vtuber_id) ?? null;
  }, [profiles, selectedItem]);

  useEffect(() => {
    if (!selectedItem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedItem]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Official <span className="text-pink-500">Merchandise</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Support us by grabbing some of these exclusive items! Available for a limited time at Comipara.
        </p>
      </div>

      {merchandise.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <ShoppingCart className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-zinc-300">No merchandise available right now</h3>
          <p className="text-zinc-500 mt-2">Check back later for new drops!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {merchandise.map((item) => {
            const vtuber = profiles.find(p => p.id === item.vtuber_id);
            const imageUrls = normalizeImageUrls(item.images_url);
            const imageUrl = imageUrls[0] || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=800';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-pink-500/50 transition-all hover:-translate-y-1 flex flex-col text-left"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1" title={item.name}>
                    {item.name}
                  </h3>

                  {vtuber && (
                    <div className="flex items-center text-xs text-zinc-500 mb-4 bg-zinc-950 p-2 rounded-lg border border-zinc-800">
                      <User className="w-3 h-3 mr-1.5 text-pink-500" />
                      <span className="truncate">{vtuber.name}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-800/50">
                    <span className="text-2xl font-bold text-white">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                    <span className="px-4 py-2 bg-zinc-800 text-zinc-200 rounded-xl">
                      Detail
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedId(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
              <div className="min-w-0">
                <h2 className="text-xl font-bold text-white truncate">{selectedItem.name}</h2>
                {selectedVtuber && (
                  <div className="flex items-center text-xs text-zinc-400 mt-1">
                    <User className="w-3 h-3 mr-1.5 text-pink-500" />
                    <span className="truncate">{selectedVtuber.name}</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                aria-label="Close"
                className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-300"
                onClick={() => setSelectedId(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div>
                {(() => {
                  const imageUrls = normalizeImageUrls(selectedItem.images_url);
                  const imageUrl = imageUrls[0] || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=800';
                  return (
                    <>
                      <div className="aspect-square rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                        <img
                          src={imageUrl}
                          alt={selectedItem.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {imageUrls.length > 1 && (
                        <div className="mt-3 flex gap-2 overflow-x-auto">
                          {imageUrls.map((url, idx) => (
                            <img
                              key={`${selectedItem.id}-${idx}`}
                              src={url}
                              alt={`${selectedItem.name} ${idx + 1}`}
                              className="w-16 h-16 rounded-lg object-cover border border-zinc-800"
                              loading="lazy"
                            />
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

              <div className="flex flex-col">
                <div className="flex items-end justify-between gap-4">
                  <div className="text-3xl font-extrabold text-white">
                    Rp {selectedItem.price.toLocaleString('id-ID')}
                  </div>
                  <div
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      selectedItem.is_available
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                        : 'text-red-400 bg-red-500/10 border-red-500/20'
                    }`}
                  >
                    {selectedItem.is_available ? 'AVAILABLE' : 'SOLD OUT'}
                  </div>
                </div>

                <div className="mt-4 space-y-3 text-sm text-zinc-300">
                  <div className="flex justify-between gap-4">
                    <span className="text-zinc-500">Kategori</span>
                    <span className="text-zinc-200">{selectedItem.category || '-'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-zinc-500">Stok</span>
                    <span className="text-zinc-200">{selectedItem.stock ?? 0}</span>
                  </div>
                </div>

                {selectedItem.description && (
                  <div className="mt-4 text-sm text-zinc-300 bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                    {selectedItem.description}
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  {selectedItem.order_url ? (
                    <a
                      href={selectedItem.order_url}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-colors ${
                        selectedItem.is_available
                          ? 'bg-pink-500 hover:bg-pink-600 text-white'
                          : 'bg-zinc-800 text-zinc-500 pointer-events-none'
                      }`}
                    >
                      <span>Pesan Sekarang</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <div className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl bg-zinc-800 text-zinc-500">
                      Link pemesanan belum tersedia
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
