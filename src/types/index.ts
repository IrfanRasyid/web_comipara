export interface VtuberProfile {
  id: string;
  name: string;
  persona: string;
  debut_date: string;
  description: string;
  avatar_url: string;
  social_links: {
    youtube?: string;
    twitter?: string;
    instagram?: string;
    tiktok?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Merchandise {
  id: string;
  vtuber_id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images_url: string[];
  is_available: boolean;
  order_url?: string;
  created_at: string;
  updated_at?: string;
  currency?: string;
}

export interface StreamingSchedule {
  id: string;
  vtuber_id: string;
  schedule_time: string;
  platform: string;
  title: string;
  is_live: boolean;
  created_at: string;
}

export interface VideoContent {
  id: string;
  vtuber_id: string;
  title: string;
  video_url: string;
  thumbnail_url: string;
  views: number;
  published_at: string;
  channel?: string;
  created_at: string;
}
