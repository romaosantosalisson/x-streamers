export type StreamerFavorite = {
  player_id: number;
  avatar: string;
  "@id": string;
  url: string;
  name: string;
  username: string;
  title: string;
  followers: number;
  country: string;
  location: string;
  last_online: number;
  joined: number;
  status: string;
  is_streamer: boolean;
  twitch_url: string;
  verified: boolean;
  league: string;
  streaming_platforms: [
    {
      type: string;
      channel_url: string;
    },
  ];
};
