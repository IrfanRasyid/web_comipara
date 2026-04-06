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
          <div className="w-16 h-16 neo-border border-t-manga-yellow rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-16 text-center">
        <span className="neo-tag bg-manga-red text-manga-white mb-4 inline-block">WATCH NOW</span>
        <h1 className="text-6xl md:text-8xl font-manga text-manga-black dark:text-manga-white mb-6 drop-shadow-[4px_4px_0_#4A90E2] dark:drop-shadow-[4px_4px_0_#EF476F]">
          VIDEO CONTENT
        </h1>
        <div className="w-full max-w-md h-2 bg-manga-black dark:bg-manga-white mx-auto mb-6"></div>
        <p className="text-2xl font-bold uppercase tracking-wide text-manga-black dark:text-manga-white">
          Explore all videos from GPS Group members!
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 pb-8 mb-8">
        <button
          onClick={() => setMemberId('all')}
          className={`px-6 py-2.5 font-manga text-xl tracking-widest uppercase transition-all duration-200 border-4 border-manga-black dark:border-manga-white ${
            memberId === 'all'
              ? 'bg-manga-yellow text-manga-black shadow-neo-sm dark:shadow-neo-white -translate-y-1'
              : 'bg-manga-white dark:bg-[#222] text-manga-black dark:text-manga-white hover:bg-manga-blue hover:text-manga-white hover:shadow-neo-sm dark:hover:shadow-neo-white hover:-translate-y-1'
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
                ? 'bg-manga-blue text-manga-white shadow-neo-sm dark:shadow-neo-white -translate-y-1'
                : 'bg-manga-white dark:bg-[#222] text-manga-black dark:text-manga-white hover:bg-manga-red hover:text-manga-white hover:shadow-neo-sm dark:hover:shadow-neo-white hover:-translate-y-1'
            }`}
            title={p.name}
          >
            {p.name}
          </button>
        ))}
      </div>

      {filteredVideos.length === 0 ? (
        <div className="text-center py-24 neo-card bg-manga-white dark:bg-[#222]">
          <h3 className="text-4xl font-manga text-manga-black dark:text-manga-white mb-2">NO VIDEOS FOUND</h3>
          <p className="text-manga-black dark:text-manga-white font-bold uppercase tracking-widest">Try selecting another member.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredVideos.map((video, idx) => {
            const vtuber = profiles.find(p => p.id === video.vtuber_id);
            const youtubeThumb = getYoutubeThumbnailUrl(video.video_url);
            const thumbnailSrc = youtubeThumb || video.thumbnail_url;
            const bgColors = ['bg-manga-yellow', 'bg-manga-blue', 'bg-manga-red'];
            const bgClass = bgColors[idx % bgColors.length];
            
            return (
              <div key={video.id} className="neo-card bg-manga-white dark:bg-[#222] flex flex-col group relative">
                <div className={`relative aspect-video overflow-hidden border-b-4 border-manga-black dark:border-manga-white ${bgClass}`}>
                  <img
                    src={thumbnailSrc}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100 mix-blend-multiply grayscale-[20%] group-hover:grayscale-0"
                    onError={(e) => {
                      if (youtubeThumb && e.currentTarget.src.includes('maxresdefault.jpg')) {
                        e.currentTarget.src = e.currentTarget.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
                      }
                    }}
                  />
                  <a
                    href={video.video_url}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 flex items-center justify-center z-10"
                  >
                    <div className="w-16 h-16 neo-border bg-manga-red rounded-full flex items-center justify-center text-manga-white opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-110 shadow-neo dark:shadow-neo-white hover:bg-manga-yellow hover:text-manga-black">
                      <Play className="w-6 h-6 ml-1" strokeWidth={3} />
                    </div>
                  </a>
                </div>
                <div className="p-6 flex flex-col flex-grow bg-manga-white dark:bg-[#222] relative z-10">
                  <h3 className="text-2xl font-manga text-manga-black dark:text-manga-white mb-2 line-clamp-2 leading-tight uppercase drop-shadow-[1px_1px_0_#F4C430] dark:drop-shadow-[1px_1px_0_#4A90E2]" title={video.title}>
                    {video.title}
                  </h3>
                  <div className="flex items-center text-xs font-bold text-manga-black dark:text-manga-white mb-4 flex-wrap gap-2 uppercase tracking-widest">
                    <span>{new Date(video.published_at).toLocaleDateString()}</span>
                    <span className="mx-1">•</span>
                    <span>{video.views.toLocaleString()} VIEWS</span>
                    {video.channel && (
                      <>
                        <span className="mx-1">•</span>
                        <span className="inline-flex items-center px-2 py-1 bg-manga-yellow text-manga-black border-2 border-manga-black">
                          {video.channel}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="mt-auto pt-4 border-t-4 border-manga-black dark:border-manga-white border-dashed">
                    {vtuber && (
                      <div className="flex items-center text-sm font-bold text-manga-red dark:text-manga-yellow uppercase tracking-widest">
                        <User className="w-4 h-4 mr-2" strokeWidth={2.5} />
                        <span className="truncate">BY {vtuber.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}
