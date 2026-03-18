import useStore from '../store/useStore';
import { useMemo, useState } from 'react';
import { Play, User } from 'lucide-react';

export const Content = () => {
  const { profiles, videos, isLoading } = useStore();
  const [memberId, setMemberId] = useState<string | 'all'>('all');

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

  const filteredVideos = useMemo(() => {
    if (memberId === 'all') return videos;
    return videos.filter(v => v.vtuber_id === memberId);
  }, [videos, memberId]);

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
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Video <span className="text-pink-500">Content</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          Jelajahi video dari setiap member grup.
        </p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4">
        <button
          onClick={() => setMemberId('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            memberId === 'all'
              ? 'bg-pink-500/10 text-pink-500 border-pink-500/40'
              : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
          }`}
        >
          Semua
        </button>
        {profiles.map((p) => (
          <button
            key={p.id}
            onClick={() => setMemberId(p.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${
              memberId === p.id
                ? 'bg-pink-500/10 text-pink-500 border-pink-500/40'
                : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
            }`}
            title={p.name}
          >
            {p.name}
          </button>
        ))}
      </div>

      {filteredVideos.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <h3 className="text-xl font-medium text-zinc-300">Belum ada video untuk filter yang dipilih</h3>
          <p className="text-zinc-500 mt-2">Coba pilih member lain atau kembali ke Semua.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => {
            const vtuber = profiles.find(p => p.id === video.vtuber_id);
            const youtubeThumb = getYoutubeThumbnailUrl(video.video_url);
            const thumbnailSrc = youtubeThumb || video.thumbnail_url;
            
            return (
              <div key={video.id} className="group rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-pink-500/50 transition-all shadow-lg hover:shadow-pink-500/10">
                <div className="relative aspect-video bg-zinc-950">
                  <img
                    src={thumbnailSrc}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    onError={(e) => {
                      // Fallback to hqdefault if maxresdefault is not available
                      if (youtubeThumb && e.currentTarget.src.includes('maxresdefault.jpg')) {
                        e.currentTarget.src = e.currentTarget.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
                      }
                    }}
                  />
                  <a
                    href={video.video_url}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-pink-500/90 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-300">
                      <Play className="w-7 h-7 ml-1" />
                    </div>
                  </a>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2" title={video.title}>
                    {video.title}
                  </h3>
                  <div className="flex items-center text-xs text-zinc-400 mb-4 flex-wrap gap-2">
                    <span>{new Date(video.published_at).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{video.views.toLocaleString()} views</span>
                    {video.channel && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                          Channel: {video.channel}
                        </span>
                      </>
                    )}
                  </div>
                  {vtuber && (
                    <div className="flex items-center text-xs text-zinc-500 bg-zinc-950 p-2 rounded-lg border border-zinc-800">
                      <User className="w-3 h-3 mr-1.5 text-pink-500" />
                      <span className="truncate">{vtuber.name}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}
