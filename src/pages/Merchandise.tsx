import { useStore } from '../store/useStore';
import { ShoppingCart, User } from 'lucide-react';

export const Merchandise = () => {
  const { merchandise, profiles, isLoading } = useStore();

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
            return (
              <div key={item.id} className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-pink-500/50 transition-all hover:-translate-y-1 flex flex-col">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={item.images_url?.[0] || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=400'}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                    {item.order_url ? (
                      <a
                        href={item.order_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition-colors"
                      >
                        Order
                      </a>
                    ) : (
                      <span className="px-4 py-2 bg-zinc-800 text-zinc-500 rounded-xl">
                        No Link
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
