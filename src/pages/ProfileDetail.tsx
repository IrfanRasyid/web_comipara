import { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Youtube, Twitter, Instagram, ArrowLeft, ExternalLink } from 'lucide-react';

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

export const ProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profiles, merchandise } = useStore();
  
  const profile = profiles.find((p) => p.id === id);

  const highlightMerch = useMemo(() => {
    if (!id) return [];
    return merchandise.filter((m) => m.vtuber_id === id).slice(0, 4);
  }, [id, merchandise]);

  if (!profile) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-white px-4">
        <h2 className="text-2xl font-bold mb-4">Talent not found</h2>
        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Profiles
        </button>
      </div>
    );
  }

  // Helper to extract YouTube video ID
  const getYoutubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1].split('?')[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const embedUrl = getYoutubeEmbedUrl(profile.youtube_video_url);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        to="/profile" 
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Profiles
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Image & Basic Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="relative rounded-3xl overflow-hidden aspect-[3/4] border border-zinc-800">
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl font-bold text-white mb-1">{profile.name}</h1>
              <p className="text-pink-500 font-medium text-lg">{profile.persona}</p>
            </div>
          </div>

          <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              Social Media
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {profile.social_links?.youtube && (
                <a
                  href={profile.social_links.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 bg-zinc-800/50 hover:bg-pink-500/20 rounded-xl transition-all border border-transparent hover:border-pink-500/50 text-zinc-300 hover:text-white"
                >
                  <Youtube className="w-5 h-5 text-red-500" />
                  <span className="text-sm">YouTube</span>
                </a>
              )}
              {profile.social_links?.twitter && (
                <a
                  href={profile.social_links.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 bg-zinc-800/50 hover:bg-blue-400/20 rounded-xl transition-all border border-transparent hover:border-blue-400/50 text-zinc-300 hover:text-white"
                >
                  <Twitter className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">Twitter</span>
                </a>
              )}
              {profile.social_links?.instagram && (
                <a
                  href={profile.social_links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 bg-zinc-800/50 hover:bg-purple-500/20 rounded-xl transition-all border border-transparent hover:border-purple-500/50 text-zinc-300 hover:text-white"
                >
                  <Instagram className="w-5 h-5 text-pink-500" />
                  <span className="text-sm">Instagram</span>
                </a>
              )}
              {profile.social_links?.tiktok && (
                <a
                  href={profile.social_links.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 bg-zinc-800/50 hover:bg-white/10 rounded-xl transition-all border border-transparent hover:border-white/50 text-zinc-300 hover:text-white"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.89-.39-2.82-.14-1.4.33-2.62 1.49-3.01 2.88-.14.49-.18 1-.18 1.5 0 .5.16 1 .41 1.43.35.65.91 1.17 1.57 1.5.43.23.9.37 1.39.42.51.04 1.03.01 1.52-.11.85-.21 1.62-.77 2.12-1.49.56-.82.83-1.81.82-2.81V0z"/>
                  </svg>
                  <span className="text-sm">TikTok</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Lore & Video & Sheet */}
        <div className="lg:col-span-2 space-y-12">
          {/* About & Lore Section */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-pink-500 rounded-full"></span>
              About & Lore
            </h2>
            <div className="bg-zinc-900/30 rounded-3xl p-8 border border-zinc-800">
              <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                {profile.description}
              </p>
              {profile.lore && (
                <div className="prose prose-invert max-w-none">
                  <h4 className="text-white font-semibold mb-4 text-xl">The Story</h4>
                  <div className="text-zinc-400 whitespace-pre-line leading-relaxed">
                    {profile.lore}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Featured Video Section */}
          {embedUrl && (
            <section>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-pink-500 rounded-full"></span>
                Featured Video
              </h2>
              <div className="aspect-video rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900">
                <iframe
                  src={embedUrl}
                  title={`${profile.name} Featured Video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          )}

          {/* Character Sheet Section */}
          {profile.character_sheet_url && (
            <section>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-pink-500 rounded-full"></span>
                Character Sheet
              </h2>
              <div className="relative group rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900">
                <img
                  src={profile.character_sheet_url}
                  alt={`${profile.name} Character Sheet`}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a
                    href={profile.character_sheet_url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-pink-500 hover:text-white transition-all"
                  >
                    View Full Size <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>
          )}

          <section>
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-1 bg-pink-500 rounded-full"></span>
                Merch Highlight
              </h2>
              <Link
                to="/merchandise"
                className="shrink-0 inline-flex items-center px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors border border-zinc-700"
              >
                Lihat semua
              </Link>
            </div>

            {highlightMerch.length === 0 ? (
              <div className="bg-zinc-900/30 rounded-3xl p-8 border border-zinc-800">
                <div className="text-white font-semibold">Belum ada merch untuk {profile.name}</div>
                <div className="mt-2 text-zinc-400">Cek halaman merchandise untuk item terbaru.</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {highlightMerch.map((item) => {
                  const imageUrls = normalizeImageUrls(item.images_url);
                  const imageUrl =
                    imageUrls[0] ||
                    'https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=800';

                  return (
                    <div
                      key={item.id}
                      className="bg-zinc-900 rounded-2xl overflow-hidden border border-pink-500/20 hover:border-pink-500/60 transition-colors flex flex-col"
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
                        <div className="mt-2 text-xs text-zinc-400 line-clamp-1" title={profile.name}>
                          {profile.name}
                        </div>

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
            )}
          </section>

          <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Debut Date</p>
              <p className="text-white font-medium text-xl">
                {new Date(profile.debut_date).toLocaleDateString(undefined, { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Status</p>
              <p className="text-green-500 font-medium text-xl flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
