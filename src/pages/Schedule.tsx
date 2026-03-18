import { useStore } from '../store/useStore';
import { Calendar as CalendarIcon, Clock, MonitorPlay, Youtube, Twitch, User } from 'lucide-react';

export const Schedule = () => {
  const { schedules, profiles, isLoading } = useStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'twitch':
        return <Twitch className="w-5 h-5" />;
      default:
        return <MonitorPlay className="w-5 h-5" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'twitch':
        return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      default:
        return 'text-pink-500 bg-pink-500/10 border-pink-500/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-zinc-900 rounded-full mb-6 border border-zinc-800">
          <CalendarIcon className="w-8 h-8 text-pink-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Streaming <span className="text-pink-500">Schedule</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Don't miss out on our upcoming streams! Mark your calendars and let's hang out together.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {schedules.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <h3 className="text-xl font-medium text-zinc-300">No upcoming streams</h3>
            <p className="text-zinc-500 mt-2">We might be taking a break. See you soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {schedules.map((schedule) => {
              const scheduleDate = new Date(schedule.schedule_time);
              const isToday = new Date().toDateString() === scheduleDate.toDateString();
              const vtuber = profiles.find(p => p.id === schedule.vtuber_id);
              
              return (
                <div 
                  key={schedule.id}
                  className={`flex flex-col md:flex-row gap-6 p-6 rounded-2xl border transition-all ${
                    schedule.is_live 
                      ? 'bg-pink-500/5 border-pink-500/50 shadow-[0_0_30px_-10px_rgba(236,72,153,0.3)]' 
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex flex-col md:w-48 shrink-0">
                    <span className={`text-sm font-bold uppercase tracking-wider mb-1 ${isToday ? 'text-pink-500' : 'text-zinc-500'}`}>
                      {isToday ? 'Today' : scheduleDate.toLocaleDateString(undefined, { weekday: 'long' })}
                    </span>
                    <span className="text-2xl font-bold text-white">
                      {scheduleDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                    <div className="flex items-center text-zinc-400 mt-2">
                      <Clock className="w-4 h-4 mr-2" />
                      {scheduleDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  <div className="flex-grow flex flex-col justify-center">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {schedule.title}
                      </h3>
                      {schedule.is_live && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white animate-pulse shrink-0">
                          LIVE NOW
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${getPlatformColor(schedule.platform)}`}>
                        {getPlatformIcon(schedule.platform)}
                        <span className="ml-2">{schedule.platform}</span>
                      </span>
                      {vtuber && (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                          <User className="w-4 h-4 mr-2" />
                          {vtuber.name}
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
    </div>
  );
};
