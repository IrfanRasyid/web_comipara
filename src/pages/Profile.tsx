import { useStore } from '../store/useStore';
import { Youtube, Twitter, Instagram, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const { profiles } = useStore();

  if (!profiles || profiles.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-20">
        <span className="neo-tag bg-manga-yellow text-manga-black mb-4 inline-block">MEET THE TEAM</span>
        <h1 className="text-6xl md:text-8xl font-manga text-manga-black dark:text-manga-white mb-6 drop-shadow-[4px_4px_0_#4A90E2]">OUR MEMBERS</h1>
        <div className="w-full max-w-md h-2 bg-manga-black dark:bg-manga-white mx-auto mb-6"></div>
        <p className="text-2xl font-bold uppercase tracking-wide text-manga-black dark:text-manga-white">The amazing talents behind GPS Group.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {profiles.map((profile, i) => (
          <div key={profile.id} className="neo-card flex flex-col group relative bg-manga-white dark:bg-[#222]">
            <div className="absolute top-0 left-0 w-full h-full bg-manga-yellow -z-10 translate-x-3 translate-y-3 neo-border pointer-events-none"></div>
            <Link to={`/profile/${profile.id}`} className={`block relative aspect-square overflow-hidden border-b-4 border-manga-black dark:border-manga-white p-2 ${i % 2 === 0 ? 'bg-manga-blue' : 'bg-manga-red'}`}>
              <div className="w-full h-full border-4 border-manga-black dark:border-manga-white overflow-hidden relative bg-manga-white">
                <img
                  src={profile.avatar_url}
                  alt={profile.name}
                  className="w-full h-full object-cover grayscale-[30%] mix-blend-luminosity group-hover:mix-blend-normal group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>
            </Link>
            
            <div className="p-8 flex flex-col flex-grow relative z-10">
              <Link to={`/profile/${profile.id}`} className="block mb-6 text-center">
                <h2 className="text-4xl font-manga text-manga-black dark:text-manga-white mb-2 uppercase drop-shadow-[1px_1px_0_#F4C430] group-hover:text-manga-blue transition-colors">{profile.name}</h2>
                <p className="text-manga-red dark:text-manga-yellow font-bold tracking-widest uppercase mb-4">{profile.persona}</p>
                <div className="w-full h-1 bg-manga-black dark:bg-manga-white mx-auto mb-4 border-t-4 border-manga-black dark:border-manga-white border-dashed"></div>
                <p className="text-manga-black dark:text-manga-white font-bold uppercase text-sm line-clamp-3">
                  {profile.description}
                </p>
              </Link>
              
              <div className="flex items-center justify-between mt-auto px-2">
                <div className="flex space-x-2">
                  {profile.social_links?.youtube && (
                    <a
                      href={profile.social_links.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 neo-border bg-manga-white dark:bg-[#222] hover:bg-manga-red hover:text-manga-white text-manga-black dark:text-manga-white transition-all shadow-neo-sm dark:shadow-neo-white hover:shadow-neo hover:-translate-y-1"
                    >
                      <Youtube className="w-5 h-5" strokeWidth={2.5} />
                    </a>
                  )}
                  {profile.social_links?.twitter && (
                    <a
                      href={profile.social_links.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 neo-border bg-manga-white dark:bg-[#222] hover:bg-manga-blue hover:text-manga-white text-manga-black dark:text-manga-white transition-all shadow-neo-sm dark:shadow-neo-white hover:shadow-neo hover:-translate-y-1"
                    >
                      <Twitter className="w-5 h-5" strokeWidth={2.5} />
                    </a>
                  )}
                  {profile.social_links?.instagram && (
                    <a
                      href={profile.social_links.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 neo-border bg-manga-white dark:bg-[#222] hover:bg-manga-yellow hover:text-manga-black text-manga-black dark:text-manga-white transition-all shadow-neo-sm dark:shadow-neo-white hover:shadow-neo hover:-translate-y-1"
                    >
                      <Instagram className="w-5 h-5" strokeWidth={2.5} />
                    </a>
                  )}
                </div>
                
                <Link 
                  to={`/profile/${profile.id}`}
                  className="neo-btn bg-manga-white dark:bg-[#222] text-manga-black dark:text-manga-white hover:bg-manga-yellow hover:text-manga-black text-sm px-4"
                >
                  VIEW <ChevronRight className="w-4 h-4 ml-1" strokeWidth={3} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
