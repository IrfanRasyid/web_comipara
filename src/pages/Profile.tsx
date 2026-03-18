import { useStore } from '../store/useStore';
import { Youtube, Twitter, Instagram } from 'lucide-react';

export const Profile = () => {
  const { profiles } = useStore();

  if (!profiles || profiles.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Our <span className="text-pink-500">Members</span></h1>
        <p className="text-xl text-zinc-400">Meet the amazing virtual members of our group.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {profiles.map((profile) => (
          <div key={profile.id} className="bg-zinc-900/50 rounded-3xl overflow-hidden border border-zinc-800 flex flex-col hover:border-pink-500/50 transition-colors duration-300">
            <div className="aspect-square relative">
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow -mt-20 relative z-10">
              <h2 className="text-3xl font-bold text-white mb-1">{profile.name}</h2>
              <p className="text-pink-500 font-medium mb-4">{profile.persona}</p>
              
              <p className="text-zinc-300 mb-6 flex-grow">
                {profile.description}
              </p>
              
              <div className="bg-zinc-950 rounded-xl p-4 mb-6">
                <p className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Debut Date</p>
                <p className="text-white font-medium">
                  {new Date(profile.debut_date).toLocaleDateString(undefined, { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              <div className="flex space-x-3 mt-auto">
                {profile.social_links?.youtube && (
                  <a
                    href={profile.social_links.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-zinc-800 hover:bg-pink-500 hover:text-white rounded-xl transition-all"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                )}
                {profile.social_links?.twitter && (
                  <a
                    href={profile.social_links.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-zinc-800 hover:bg-blue-400 hover:text-white rounded-xl transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {profile.social_links?.instagram && (
                  <a
                    href={profile.social_links.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-zinc-800 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white rounded-xl transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
