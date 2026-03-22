import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Play, ShoppingBag, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

const firstMerchImageUrl = (value: unknown): string | null => {
  if (Array.isArray(value)) {
    const url = value.find((v): v is string => typeof v === 'string' && v.length > 0);
    return url ?? null;
  }
  if (typeof value === 'string' && value.length > 0) return value;
  return null;
};

export const Home = () => {
  const { profiles, videos, merchandise, isLoading, fetchData } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const randomizedProfiles = useMemo(() => {
    if (!profiles || profiles.length === 0) return [];
    return [...profiles].sort(() => Math.random() - 0.5).slice(0, 4);
  }, [profiles]);

  const highlightMerch = useMemo(() => {
    if (!merchandise || merchandise.length === 0) return [];
    return [...merchandise].sort(() => Math.random() - 0.5).slice(0, 4);
  }, [merchandise]);

  const getYoutubeThumbnailUrl = (url?: string) => {
    if (!url) return null;
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1].split('?')[0];
    }
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (videos.length > 0) {
      const id = setInterval(() => {
        setCurrentIndex((i) => (i + 1) % videos.length);
      }, 6000);
      return () => clearInterval(id);
    } else {
      setCurrentIndex(0);
    }
  }, [videos.length]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-pink-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const latestVideo = videos[currentIndex];

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 flex">
          {randomizedProfiles.map((p) => (
             <div key={p.id} className="w-1/4 h-full relative overflow-hidden group/hero">
               <img
                 src={p.avatar_url || 'https://images.unsplash.com/photo-1613310023042-ad79bb239d29?auto=format&fit=crop&q=80&w=2000'}
                 alt={p.name}
                 className="w-full h-full object-cover opacity-70 group-hover/hero:opacity-100 group-hover/hero:scale-110 transition-all duration-700 ease-out grayscale-[20%] group-hover/hero:grayscale-0"
               />
               <Link 
                 to={`/profile/${p.id}`}
                 className="absolute inset-0 z-10"
                 title={`View ${p.name}'s Profile`}
               />
             </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/50 to-zinc-950/80 pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">
              Welcome to <span className="text-pink-500">GPS</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-2xl">
              We are GPS (Gepeng Punya Sovenir) a virtual youtuber group consisting of 7 amazing members! Let's make some amazing memories together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/profile"
                className="inline-flex items-center px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-medium transition-all hover:scale-105"
              >
                <Users className="w-5 h-5 mr-2" />
                Meet The Members
              </Link>
              <Link
                to="/merchandise"
                className="inline-flex items-center px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-all hover:scale-105 border border-zinc-700"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shop Merch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {highlightMerch.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Our <span className="text-pink-500">Merchandise</span></h2>
            <Link
              to="/merchandise"
              className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors border border-zinc-700"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Lihat semua
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlightMerch.map((item) => {
              const vtuber = profiles.find((p) => p.id === item.vtuber_id);
              const imageUrl =
                firstMerchImageUrl(item.images_url) ||
                'https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=800';

              return (
                <div
                  key={item.id}
                  className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-pink-500/50 transition-colors flex flex-col"
                >
                  <div className="aspect-square overflow-hidden bg-zinc-950">
                    <img
                      src={imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="text-white font-bold line-clamp-1" title={item.name}>
                      {item.name}
                    </div>
                    {vtuber && (
                      <div className="mt-2 text-xs text-zinc-400 line-clamp-1" title={vtuber.name}>
                        {vtuber.name}
                      </div>
                    )}

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-zinc-800/50">
                      <div className="text-lg font-extrabold text-white">
                        Rp {item.price.toLocaleString('id-ID')}
                      </div>
                      {item.order_url ? (
                        <a
                          href={item.order_url}
                          target="_blank"
                          rel="noreferrer"
                          className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                            item.is_available
                              ? 'bg-pink-500 hover:bg-pink-600 text-white'
                              : 'bg-zinc-800 text-zinc-500 pointer-events-none'
                          }`}
                        >
                          Order
                        </a>
                      ) : (
                        <Link
                          to="/merchandise"
                          className="px-3 py-2 rounded-xl text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                        >
                          Detail
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Latest Video Section */}
      {latestVideo && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Latest <span className="text-pink-500">Video</span></h2>
          </div>
          
          <div className="relative group rounded-2xl overflow-hidden aspect-video bg-zinc-950 border border-zinc-800 shadow-2xl">
            <img
              src={getYoutubeThumbnailUrl(latestVideo.video_url) || latestVideo.thumbnail_url}
              alt={latestVideo.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              onError={(e) => {
                const youtubeThumb = getYoutubeThumbnailUrl(latestVideo.video_url);
                if (youtubeThumb && e.currentTarget.src.includes('maxresdefault.jpg')) {
                  e.currentTarget.src = e.currentTarget.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-2xl font-bold text-white mb-2">{latestVideo.title}</h3>
              <p className="text-zinc-300">{new Date(latestVideo.published_at).toLocaleDateString()} • {latestVideo.views.toLocaleString()} views</p>
            </div>
            <a
              href={latestVideo.video_url}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-20 h-20 bg-pink-500/90 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-300">
                <Play className="w-8 h-8 ml-1" />
              </div>
            </a>
            <button
              aria-label="Previous video"
              onClick={() => setCurrentIndex((i) => (i - 1 + videos.length) % videos.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-zinc-900/70 hover:bg-zinc-800 text-white p-2 rounded-full border border-zinc-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Next video"
              onClick={() => setCurrentIndex((i) => (i + 1) % videos.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-zinc-900/70 hover:bg-zinc-800 text-white p-2 rounded-full border border-zinc-700"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
