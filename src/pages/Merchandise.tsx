import { useEffect, useMemo, useState } from 'react';
import { useStore } from '../store/useStore';
import { ExternalLink, ShoppingBag, ShoppingCart, X } from 'lucide-react';

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
  const [memberId, setMemberId] = useState<string | 'all'>('all');

  const filteredMerchandise = useMemo(() => {
    if (memberId === 'all') return merchandise;
    return merchandise.filter((m) => m.vtuber_id === memberId);
  }, [merchandise, memberId]);

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

  useEffect(() => {
    setSelectedId(null);
  }, [memberId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 neo-border border-t-manga-yellow rounded-full animate-spin"></div>
          <p className="mt-4 text-manga-black dark:text-manga-white font-manga tracking-widest text-2xl uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-16 text-center">
        <span className="neo-tag bg-manga-yellow text-manga-black mb-4 inline-block">EXCLUSIVE ITEM</span>
        <h1 className="text-6xl md:text-8xl font-manga text-manga-black dark:text-manga-white mb-6 drop-shadow-[4px_4px_0_#EF476F]">
          MERCHANDISE
        </h1>
        <div className="w-full max-w-md h-2 bg-manga-black dark:bg-manga-white mx-auto mb-6"></div>
        <p className="text-2xl font-bold uppercase tracking-wide text-manga-black dark:text-manga-white">
          Grab your official GPS Group merch here!
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 pb-8 mb-8">
        <button
          onClick={() => setMemberId('all')}
          className={`px-6 py-2.5 font-manga text-xl tracking-widest uppercase transition-all duration-200 border-4 border-manga-black dark:border-manga-white ${
            memberId === 'all'
              ? 'bg-manga-blue text-manga-white shadow-neo-sm dark:shadow-neo-white -translate-y-1'
              : 'bg-manga-white dark:bg-[#222] text-manga-black dark:text-manga-white hover:bg-manga-yellow hover:text-manga-black hover:shadow-neo-sm dark:hover:shadow-neo-white hover:-translate-y-1'
          }`}
        >
          ALL
        </button>
        {profiles.map((p) => (
          <button
            key={p.id}
            onClick={() => setMemberId(p.id)}
            className={`px-6 py-2.5 font-manga text-xl tracking-widest uppercase transition-all duration-200 border-4 border-manga-black dark:border-manga-white whitespace-nowrap ${
              memberId === p.id
                ? 'bg-manga-red text-manga-white shadow-neo-sm dark:shadow-neo-white -translate-y-1'
                : 'bg-manga-white dark:bg-[#222] text-manga-black dark:text-manga-white hover:bg-manga-yellow hover:text-manga-black hover:shadow-neo-sm dark:hover:shadow-neo-white hover:-translate-y-1'
            }`}
            title={p.name}
          >
            {p.name}
          </button>
        ))}
      </div>

      {filteredMerchandise.length === 0 ? (
        <div className="text-center py-24 neo-card bg-manga-white dark:bg-[#222]">
          <ShoppingCart className="w-16 h-16 text-manga-black dark:text-manga-white mx-auto mb-6" strokeWidth={2} />
          <h3 className="text-4xl font-manga text-manga-black dark:text-manga-white">NO MERCH FOUND</h3>
          <p className="text-manga-black dark:text-manga-white mt-2 font-bold uppercase tracking-widest">Try selecting another member.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMerchandise.map((item) => {
            const vtuber = profiles.find(p => p.id === item.vtuber_id);
            const imageUrls = normalizeImageUrls(item.images_url);
            const imageUrl = imageUrls[0] || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=800';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className="neo-card bg-manga-white dark:bg-[#222] flex flex-col text-left group"
              >
                <div className="aspect-square overflow-hidden relative border-b-4 border-manga-black dark:border-manga-white bg-manga-yellow">
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow bg-manga-white dark:bg-[#222] relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-manga-blue rounded-full flex items-center justify-center neo-border z-10 text-manga-white group-hover:bg-manga-red transition-colors">
                    <ShoppingBag className="w-6 h-6" strokeWidth={2.5} />
                  </div>

                  <h3 className="text-2xl font-manga text-manga-black dark:text-manga-white mt-4 mb-1 line-clamp-2 leading-tight uppercase text-center" title={item.name}>
                    {item.name}
                  </h3>

                  {vtuber && (
                    <div className="text-sm font-bold text-manga-red dark:text-manga-yellow text-center uppercase tracking-widest mb-4">
                      BY {vtuber.name}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-4 border-t-4 border-manga-black dark:border-manga-white border-dashed">
                    <span className="text-2xl font-manga tracking-wider text-manga-black dark:text-manga-white">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                    <span className="px-3 py-1 bg-manga-yellow text-manga-black font-bold text-xs uppercase neo-border">
                      VIEW
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
          className="fixed inset-0 z-50 bg-manga-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedId(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-4xl neo-card bg-manga-white dark:bg-[#222] p-0 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-8 py-6 border-b-4 border-manga-black dark:border-manga-white bg-manga-yellow">
              <div className="min-w-0">
                <h2 className="text-4xl font-manga text-manga-black truncate drop-shadow-[2px_2px_0_#F5EBDD]">{selectedItem.name}</h2>
                {selectedVtuber && (
                  <div className="flex items-center text-sm font-bold text-manga-black mt-1 uppercase tracking-widest">
                    <span className="truncate">BY {selectedVtuber.name}</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                aria-label="Close"
                className="p-2 neo-border bg-manga-white dark:bg-[#222] hover:bg-manga-red hover:text-manga-white text-manga-black dark:text-manga-white transition-colors"
                onClick={() => setSelectedId(null)}
              >
                <X className="w-8 h-8" strokeWidth={3} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-manga-white dark:bg-[#222]">
              <div>
                {(() => {
                  const imageUrls = normalizeImageUrls(selectedItem.images_url);
                  const imageUrl = imageUrls[0] || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=800';
                  return (
                    <>
                      <div className="aspect-square overflow-hidden neo-border bg-manga-yellow">
                        <img
                          src={imageUrl}
                          alt={selectedItem.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {imageUrls.length > 1 && (
                        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                          {imageUrls.map((url, idx) => (
                            <img
                              key={`${selectedItem.id}-${idx}`}
                              src={url}
                              alt={`${selectedItem.name} ${idx + 1}`}
                              className="w-20 h-20 object-cover neo-border bg-manga-yellow"
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
                  <div className="text-5xl font-manga text-manga-blue drop-shadow-[2px_2px_0_#111]">
                    Rp {selectedItem.price.toLocaleString('id-ID')}
                  </div>
                  <div
                    className={`neo-tag ${
                      selectedItem.is_available
                        ? 'bg-manga-yellow text-manga-black'
                        : 'bg-manga-red text-manga-white'
                    }`}
                  >
                    {selectedItem.is_available ? 'AVAILABLE' : 'SOLD OUT'}
                  </div>
                </div>

                <div className="mt-8 space-y-4 text-manga-black dark:text-manga-white font-bold uppercase">
                  <div className="flex justify-between gap-4 border-b-4 border-manga-black dark:border-manga-white border-dashed pb-3">
                    <span>Category</span>
                    <span className="text-manga-blue dark:text-manga-yellow">{selectedItem.category || '-'}</span>
                  </div>
                </div>

                {selectedItem.description && (
                  <div className="mt-8 text-base text-manga-black dark:text-manga-white bg-manga-light dark:bg-[#111] neo-border p-6 font-bold uppercase leading-relaxed relative">
                    <div className="absolute top-0 left-0 w-4 h-4 bg-manga-yellow border-r-4 border-b-4 border-manga-black dark:border-manga-white"></div>
                    {selectedItem.description}
                  </div>
                )}

                <div className="mt-auto pt-8 flex gap-4">
                  {selectedItem.order_url ? (
                    <a
                      href={selectedItem.order_url}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex-1 neo-btn ${
                        selectedItem.is_available
                          ? 'bg-manga-blue hover:bg-manga-yellow text-manga-white hover:text-manga-black dark:hover:text-manga-black'
                          : 'bg-manga-gray dark:bg-[#333] text-manga-black dark:text-manga-white opacity-50 pointer-events-none'
                      }`}
                    >
                      <span>RESERVE NOW</span>
                      <ExternalLink className="w-5 h-5 ml-2" strokeWidth={2.5} />
                    </a>
                  ) : (
                    <div className="flex-1 neo-btn bg-manga-gray dark:bg-[#333] text-manga-black dark:text-manga-white opacity-50">
                      LINK UNAVAILABLE
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="neo-btn bg-manga-white dark:bg-[#222] text-manga-black dark:text-manga-white hover:bg-manga-red hover:text-manga-white"
                  >
                    CLOSE
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
