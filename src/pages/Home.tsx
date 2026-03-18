import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ShoppingBag, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Home = () => {
  const { profiles, videos, isLoading, fetchData } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);

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
          {profiles.slice(0, 4).map((p, idx) => (
             <img
               key={p.id}
               src={p.avatar_url || 'https://images.unsplash.com/photo-1613310023042-ad79bb239d29?auto=format&fit=crop&q=80&w=2000'}
               alt={p.name}
               className="w-1/4 h-full object-cover opacity-50"
             />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/80 to-zinc-950"></div>
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

      {/* Latest Video Section */}
      {latestVideo && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Latest <span className="text-pink-500">Video</span></h2>
          </div>
          
          <div className="relative group rounded-2xl overflow-hidden aspect-video bg-zinc-900 border border-zinc-800">
            <img
              src={latestVideo.thumbnail_url}
              alt={latestVideo.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
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
