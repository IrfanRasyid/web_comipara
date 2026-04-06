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
          <div className="w-16 h-16 neo-border border-t-manga-yellow rounded-full animate-spin"></div>
          <p className="mt-4 text-manga-black dark:text-manga-white font-manga tracking-widest text-2xl uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  const latestVideo = videos[currentIndex];

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-manga-yellow dark:bg-[#141922] neo-border mx-4 sm:mx-6 lg:mx-8 mt-4 shadow-neo dark:shadow-[10px_10px_0_#F5E6A8]">
        <div className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-4 gap-1 p-1 bg-manga-black dark:bg-[#F5E6A8]">
          {randomizedProfiles.map((p, i) => (
             <div key={p.id} className={`w-full h-full relative overflow-hidden group/hero bg-manga-white dark:bg-[#222] ${i % 2 === 0 ? 'bg-manga-blue' : 'bg-manga-red'}`}>
               <img
                 src={p.avatar_url || 'https://images.unsplash.com/photo-1613310023042-ad79bb239d29?auto=format&fit=crop&q=80&w=2000'}
                 alt={p.name}
                 className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover/hero:mix-blend-normal group-hover/hero:opacity-100 group-hover/hero:scale-110 transition-all duration-500 ease-out"
               />
               <Link 
                 to={`/profile/${p.id}`}
                 className="absolute inset-0 z-10"
                 title={`View ${p.name}'s Profile`}
               />
             </div>
          ))}
        </div>
        
        {/* Comic style starburst or solid block for text */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="neo-card !bg-manga-white/55 dark:!bg-[#111827]/70 dark:!border-[#F5E6A8] backdrop-blur-md backdrop-saturate-150 max-w-4xl mx-auto flex flex-col items-center justify-center p-12 -rotate-2 hover:rotate-0 dark:shadow-[8px_8px_0_#4A90E2]">
            <span className="text-3xl md:text-5xl font-manga text-manga-red mb-2 tracking-widest drop-shadow-[2px_2px_0_#111] dark:drop-shadow-[2px_2px_0_#F4C430]">
              WELCOME TO
            </span>
            <h1 className="text-6xl md:text-9xl font-manga text-manga-black dark:text-[#FFF8E7] mb-6 tracking-tight leading-none drop-shadow-[4px_4px_0_#F4C430] dark:drop-shadow-[4px_4px_0_#4A90E2]">
              GEPENG PUNYA SOVENIR!
            </h1>
            <div className="w-full h-2 bg-manga-black dark:bg-[#F5E6A8] mb-8"></div>
            <p className="text-lg md:text-2xl text-manga-black dark:text-[#E8EDF5] mb-10 max-w-2xl font-bold uppercase tracking-wide">
              We are GPS (Gepeng Punya Sovenir) a virtual youtuber group consisting of 7 amazing members! Let's make some amazing memories together.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/profile"
                className="neo-btn bg-manga-blue text-manga-white hover:bg-manga-yellow hover:text-manga-black dark:hover:bg-[#F4C430] dark:hover:text-manga-black"
              >
                <Users className="w-6 h-6 mr-3" strokeWidth={2.5} />
                MEET THE MEMBERS
              </Link>
              <Link
                to="/merchandise"
                className="neo-btn bg-manga-red text-manga-white hover:bg-manga-yellow hover:text-manga-black dark:hover:bg-[#F4C430] dark:hover:text-manga-black"
              >
                <ShoppingBag className="w-6 h-6 mr-3" strokeWidth={2.5} />
                SHOP MERCH
              </Link>
            </div>
          </div>
        </div>
      </section>

      {highlightMerch.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 border-b-4 border-manga-black dark:border-manga-white pb-6">
            <div>
              <span className="neo-tag bg-manga-blue text-manga-white mb-2 inline-block">EXCLUSIVE</span>
              <h2 className="text-4xl md:text-5xl font-manga text-manga-black dark:text-manga-white drop-shadow-[2px_2px_0_#F4C430] dark:drop-shadow-[2px_2px_0_#4A90E2]">OUR MERCHANDISE</h2>
            </div>
            <Link
              to="/merchandise"
              className="neo-btn bg-manga-yellow text-manga-black dark:text-manga-black mt-4 md:mt-0"
            >
              <ShoppingBag className="w-5 h-5 mr-2" strokeWidth={2.5} />
              VIEW ALL
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlightMerch.map((item) => {
              const vtuber = profiles.find((p) => p.id === item.vtuber_id);
              const imageUrl =
                firstMerchImageUrl(item.images_url) ||
                'https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=800';

              return (
                <div
                  key={item.id}
                  className="neo-card flex flex-col"
                >
                  <div className="aspect-square overflow-hidden border-b-4 border-manga-black dark:border-manga-white relative bg-manga-yellow">
                    <img
                      src={imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow bg-manga-white dark:bg-[#222]">
                    <div className="text-manga-black dark:text-manga-white font-bold text-xl uppercase tracking-tight line-clamp-2 mb-2" title={item.name}>
                      {item.name}
                    </div>
                    {vtuber && (
                      <div className="text-sm font-bold text-manga-red dark:text-manga-yellow uppercase tracking-wider mb-4" title={vtuber.name}>
                        BY {vtuber.name}
                      </div>
                    )}

                    <div className="mt-auto pt-4 flex flex-col gap-4 border-t-4 border-manga-black dark:border-manga-white border-dashed">
                      <div className="text-2xl font-manga tracking-wider text-manga-black dark:text-manga-white">
                        Rp {item.price.toLocaleString('id-ID')}
                      </div>
                      {item.order_url ? (
                        <a
                          href={item.order_url}
                          target="_blank"
                          rel="noreferrer"
                          className={`neo-btn w-full ${
                            item.is_available
                              ? 'bg-manga-blue text-manga-white hover:bg-manga-yellow hover:text-manga-black dark:hover:text-manga-black'
                              : 'bg-manga-gray text-manga-black opacity-50 pointer-events-none'
                          }`}
                        >
                          BUY NOW
                        </a>
                      ) : (
                        <Link
                          to="/merchandise"
                          className="neo-btn w-full bg-manga-white dark:bg-[#222] text-manga-black dark:text-manga-white hover:bg-manga-yellow dark:hover:bg-manga-yellow dark:hover:text-manga-black"
                        >
                          DETAILS
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
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 border-b-4 border-manga-black dark:border-manga-white pb-6">
            <div>
              <span className="neo-tag bg-manga-red text-manga-white mb-2 inline-block">NEW RELEASE</span>
              <h2 className="text-4xl md:text-5xl font-manga text-manga-black dark:text-manga-white drop-shadow-[2px_2px_0_#4A90E2] dark:drop-shadow-[2px_2px_0_#EF476F]">LATEST VIDEO</h2>
            </div>
          </div>
          
          <div className="neo-card p-2 bg-manga-black dark:bg-[#F5E6A8] relative group aspect-video">
            <div className="relative w-full h-full border-4 border-manga-white dark:border-manga-black overflow-hidden bg-manga-yellow">
              <img
                src={getYoutubeThumbnailUrl(latestVideo.video_url) || latestVideo.thumbnail_url}
                alt={latestVideo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                onError={(e) => {
                  const youtubeThumb = getYoutubeThumbnailUrl(latestVideo.video_url);
                  if (youtubeThumb && e.currentTarget.src.includes('maxresdefault.jpg')) {
                    e.currentTarget.src = e.currentTarget.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
                  }
                }}
              />
              {/* Comic halftone overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(#111 2px, transparent 2px)',
                backgroundSize: '8px 8px'
              }}></div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-manga-black to-transparent border-t-4 border-manga-black dark:border-manga-white mt-auto translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl md:text-4xl font-manga text-manga-white mb-2 tracking-wide uppercase drop-shadow-[2px_2px_0_#111]">{latestVideo.title}</h3>
                <p className="text-manga-yellow font-bold uppercase tracking-widest text-sm drop-shadow-[1px_1px_0_#111]">{new Date(latestVideo.published_at).toLocaleDateString()} • {latestVideo.views.toLocaleString()} VIEWS</p>
              </div>
              <a
                href={latestVideo.video_url}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="w-24 h-24 neo-border bg-manga-red rounded-full flex items-center justify-center text-manga-white opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-110 shadow-neo dark:shadow-neo-white hover:bg-manga-yellow hover:text-manga-black">
                  <Play className="w-10 h-10 ml-2" strokeWidth={2.5} />
                </div>
              </a>
              <button
                aria-label="Previous video"
                onClick={() => setCurrentIndex((i) => (i - 1 + videos.length) % videos.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 neo-btn bg-manga-white dark:bg-[#F5E6A8] text-manga-black p-3 hover:bg-manga-yellow z-20"
              >
                <ChevronLeft className="w-8 h-8" strokeWidth={3} />
              </button>
              <button
                aria-label="Next video"
                onClick={() => setCurrentIndex((i) => (i + 1) % videos.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 neo-btn bg-manga-white dark:bg-[#F5E6A8] text-manga-black p-3 hover:bg-manga-yellow z-20"
              >
                <ChevronRight className="w-8 h-8" strokeWidth={3} />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
