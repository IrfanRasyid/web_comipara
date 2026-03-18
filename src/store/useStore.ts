import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { VtuberProfile, Merchandise, StreamingSchedule, VideoContent } from '../types';

interface AppState {
  profiles: VtuberProfile[];
  merchandise: Merchandise[];
  schedules: StreamingSchedule[];
  videos: VideoContent[];
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useStore = create<AppState>((set) => ({
  profiles: [],
  merchandise: [],
  schedules: [],
  videos: [],
  isLoading: false,
  error: null,
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [profilesRes, merchRes, scheduleRes, videoRes] = await Promise.all([
        supabase.from('vtuber_profile').select('*').order('created_at', { ascending: true }),
        supabase.from('merchandise').select('*').order('created_at', { ascending: false }),
        supabase.from('streaming_schedule').select('*').order('schedule_time', { ascending: true }),
        supabase.from('video_content').select('*').order('published_at', { ascending: false }),
      ]);

      if (profilesRes.error) throw profilesRes.error;

      set({
        profiles: profilesRes.data || [],
        merchandise: merchRes.data || [],
        schedules: scheduleRes.data || [],
        videos: videoRes.data || [],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      const message = error instanceof Error ? error.message : String(error);
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
export default useStore;
