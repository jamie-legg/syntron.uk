export interface GameHistory {
  name: string;
  date: string;
  server: string;
  region: string;
  quality: number;
  players: [
    {
      team: string;
      player: string;
      score: number;
      place: number;
    }
  ];
}