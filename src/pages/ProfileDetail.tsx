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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-manga-black dark:text-manga-white px-4">
        <h2 className="text-4xl font-manga font-bold mb-4 uppercase drop-shadow-[2px_2px_0_#F4C430]">Talent not found</h2>
        <button 
          onClick={() => navigate('/profile')}
          className="neo-btn bg-manga-white dark:bg-[#222] text-manga-black dark:text-manga-white hover:bg-manga-yellow hover:text-manga-black"
        >
          <ArrowLeft className="w-5 h-5 mr-2" strokeWidth={2.5} /> BACK TO TEAM
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
        className="inline-flex items-center gap-2 text-manga-black dark:text-manga-white hover:text-manga-blue dark:hover:text-manga-yellow transition-colors mb-8 group font-bold uppercase tracking-wider"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" strokeWidth={2.5} />
        RETURN TO TEAM
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Image & Basic Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="neo-card relative overflow-hidden aspect-[3/4] bg-manga-yellow">
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-full h-full object-cover mix-blend-multiply grayscale-[20%]"
            />
            {/* Comic halftone overlay */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{
              backgroundImage: 'radial-gradient(#111 2px, transparent 2px)',
              backgroundSize: '8px 8px'
            }}></div>
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-manga-black via-manga-black/80 to-transparent border-t-4 border-manga-black mt-auto">
              <h1 className="text-5xl font-manga text-manga-white mb-1 drop-shadow-[2px_2px_0_#111] leading-none">{profile.name}</h1>
              <p className="text-manga-yellow font-bold uppercase tracking-widest text-sm">{profile.persona}</p>
            </div>
          </div>

          <div className="neo-card bg-manga-white dark:bg-[#222] p-6">
            <h3 className="text-manga-black dark:text-manga-white font-manga text-3xl mb-4 text-center uppercase drop-shadow-[1px_1px_0_#F4C430] dark:drop-shadow-[1px_1px_0_#4A90E2]">
              SOCIAL MEDIA
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {profile.social_links?.youtube && (
                <a
                  href={profile.social_links.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 p-3 neo-border bg-manga-white dark:bg-[#222] hover:bg-manga-red hover:text-manga-white text-manga-black dark:text-manga-white transition-all shadow-neo-sm dark:shadow-neo-white hover:shadow-neo hover:-translate-y-1"
                >
                  <Youtube className="w-5 h-5" strokeWidth={2.5} />
                  <span className="text-sm font-bold uppercase">YouTube</span>
                </a>
              )}
              {profile.social_links?.twitter && (
                <a
                  href={profile.social_links.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 p-3 neo-border bg-manga-white dark:bg-[#222] hover:bg-manga-blue hover:text-manga-white text-manga-black dark:text-manga-white transition-all shadow-neo-sm dark:shadow-neo-white hover:shadow-neo hover:-translate-y-1"
                >
                  <Twitter className="w-5 h-5" strokeWidth={2.5} />
                  <span className="text-sm font-bold uppercase">Twitter</span>
                </a>
              )}
              {profile.social_links?.instagram && (
                <a
                  href={profile.social_links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 p-3 neo-border bg-manga-white dark:bg-[#222] hover:bg-manga-yellow hover:text-manga-black text-manga-black dark:text-manga-white transition-all shadow-neo-sm dark:shadow-neo-white hover:shadow-neo hover:-translate-y-1"
                >
                  <Instagram className="w-5 h-5" strokeWidth={2.5} />
                  <span className="text-sm font-bold uppercase">Instagram</span>
                </a>
              )}
              {profile.social_links?.tiktok && (
                <a
                  href={profile.social_links.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 p-3 neo-border bg-manga-white dark:bg-[#222] hover:bg-manga-black hover:text-manga-white text-manga-black dark:text-manga-white transition-all shadow-neo-sm dark:shadow-neo-white hover:shadow-neo hover:-translate-y-1"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.89-.39-2.82-.14-1.4.33-2.62 1.49-3.01 2.88-.14.49-.18 1-.18 1.5 0 .5.16 1 .41 1.43.35.65.91 1.17 1.57 1.5.43.23.9.37 1.39.42.51.04 1.03.01 1.52-.11.85-.21 1.62-.77 2.12-1.49.56-.82.83-1.81.82-2.81V0z"/>
                  </svg>
                  <span className="text-sm font-bold uppercase">TikTok</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Lore & Video & Sheet */}
        <div className="lg:col-span-2 space-y-12">
          {/* About & Lore Section */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-4xl font-manga text-manga-black dark:text-manga-white drop-shadow-[2px_2px_0_#F4C430]">ABOUT & LORE</h2>
              <div className="flex-1 h-1 bg-manga-black dark:bg-manga-white"></div>
            </div>
            <div className="neo-card bg-manga-white dark:bg-[#222] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-manga-yellow -z-0 opacity-50 border-b-4 border-l-4 border-manga-black dark:border-manga-white"></div>
              <p className="text-manga-black dark:text-manga-white text-xl font-bold uppercase tracking-wide leading-relaxed mb-6 relative z-10">
                "{profile.description}"
              </p>
              {profile.lore && (
                <div className="prose prose-stone max-w-none relative z-10 border-t-4 border-manga-black dark:border-manga-white border-dashed pt-6">
                  <h4 className="text-manga-blue dark:text-manga-yellow font-manga text-3xl mb-4">THE STORY</h4>
                  <div className="text-manga-black dark:text-manga-white font-medium whitespace-pre-line leading-relaxed">
                    {profile.lore}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Featured Video Section */}
          {embedUrl && (
            <section>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-4xl font-manga text-manga-black dark:text-manga-white drop-shadow-[2px_2px_0_#EF476F]">FEATURED MEMORY</h2>
                <div className="flex-1 h-1 bg-manga-black dark:bg-manga-white"></div>
              </div>
              <div className="neo-card aspect-video p-2 bg-manga-black dark:bg-manga-white">
                <iframe
                  src={embedUrl}
                  title={`${profile.name} Featured Video`}
                  className="w-full h-full border-4 border-manga-white dark:border-manga-black"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          )}

          {/* Character Sheet Section */}
          {profile.character_sheet_url && (
            <section>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-4xl font-manga text-manga-black dark:text-manga-white drop-shadow-[2px_2px_0_#4A90E2]">PORTRAIT</h2>
                <div className="flex-1 h-1 bg-manga-black dark:bg-manga-white"></div>
              </div>
              <div className="neo-card relative group bg-manga-yellow">
                <img
                  src={profile.character_sheet_url}
                  alt={`${profile.name} Character Sheet`}
                  className="w-full h-auto mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-manga-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <a
                    href={profile.character_sheet_url}
                    target="_blank"
                    rel="noreferrer"
                    className="neo-btn bg-manga-white dark:bg-[#222] text-manga-black dark:text-manga-white hover:bg-manga-yellow hover:text-manga-black"
                  >
                    VIEW FULL SIZE <ExternalLink className="w-5 h-5 ml-2" strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </section>
          )}

          <section>
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-4xl font-manga text-manga-black dark:text-manga-white drop-shadow-[2px_2px_0_#F4C430] flex items-center gap-4">
                COLLECTION
                <div className="h-1 w-12 bg-manga-black dark:bg-manga-white"></div>
              </h2>
              <Link
                to="/merchandise"
                className="shrink-0 neo-btn bg-manga-white dark:bg-[#222] text-manga-black dark:text-manga-white hover:bg-manga-yellow hover:text-manga-black text-sm py-1 px-4"
              >
                VIEW ALL
              </Link>
            </div>

            {highlightMerch.length === 0 ? (
              <div className="neo-card bg-manga-white dark:bg-[#222] p-8 text-center">
                <div className="text-manga-black dark:text-manga-white font-manga text-2xl uppercase">No collections available for {profile.name} yet</div>
                <div className="mt-2 text-manga-black dark:text-manga-white font-bold">Check back soon for new items!</div>
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
                      className="neo-card bg-manga-white dark:bg-[#222] flex flex-col"
                    >
                      <div className="aspect-square overflow-hidden border-b-4 border-manga-black dark:border-manga-white bg-manga-yellow relative">
                        <img
                          src={imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          loading="lazy"
                        />
                      </div>

                      <div className="p-4 flex flex-col flex-grow text-center">
                        <div className="text-manga-black dark:text-manga-white font-bold uppercase tracking-tight line-clamp-1 mb-1" title={item.name}>
                          {item.name}
                        </div>
                        <div className="text-xs font-bold text-manga-red dark:text-manga-yellow uppercase mb-2" title={profile.name}>
                          BY {profile.name}
                        </div>

                        <div className="mt-auto pt-3 flex flex-col items-center gap-2 border-t-4 border-manga-black dark:border-manga-white border-dashed">
                          <div className="text-lg font-manga tracking-wider text-manga-black dark:text-manga-white">
                            Rp {item.price.toLocaleString('id-ID')}
                          </div>
                          {item.order_url ? (
                            <a
                              href={item.order_url}
                              target="_blank"
                              rel="noreferrer"
                              className={`neo-btn w-full text-sm py-1.5 ${
                                item.is_available
                                  ? 'bg-manga-blue text-manga-white hover:bg-manga-yellow hover:text-manga-black dark:hover:text-manga-black'
                                  : 'bg-manga-gray text-manga-black opacity-50 pointer-events-none'
                              }`}
                            >
                              BUY
                            </a>
                          ) : (
                            <Link
                              to="/merchandise"
                              className="neo-btn w-full bg-manga-white dark:bg-[#222] text-manga-black dark:text-manga-white hover:bg-manga-yellow dark:hover:bg-manga-yellow dark:hover:text-manga-black text-sm py-1.5"
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
            )}
          </section>

          <div className="neo-card bg-manga-white dark:bg-[#222] p-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-manga-black dark:text-manga-white font-bold uppercase tracking-widest mb-1">DEBUT DATE</p>
              <p className="text-manga-blue dark:text-manga-yellow font-manga text-3xl">
                {new Date(profile.debut_date).toLocaleDateString(undefined, { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-manga-black dark:text-manga-white font-bold uppercase tracking-widest mb-1">STATUS</p>
              <p className="text-manga-red font-manga text-3xl flex items-center justify-end gap-2 drop-shadow-[1px_1px_0_#111] dark:drop-shadow-[1px_1px_0_#F5EBDD]">
                <span className="w-3 h-3 bg-manga-red rounded-full border-2 border-manga-black dark:border-manga-white"></span>
                ACTIVE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
