export interface GameStats {
  UserName: string;
  kills: number;
  deaths: number;
  timeAlive: number;
  totalTime: number;
  zonePoints: number;
  holesTaken: number;
  myHolesUsed: number;
  position: number;
  timeMaxRubber: number;
  TotalRubber: number;
  TotalSpeed: number;
  gridposCounter: number;
  turns: number;
  lols: number;
  soloGanks: number;
}

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

export type Rank = {
  login: string;
  points: number;
  matches: number;
  kd: number;
};

export type RoundPlayerEntry = {
  nickname: string;
  ip: string;
  auth: boolean;
  login: string;
  currentMatchPoints: number;
  kills: number;
  deaths: number;
  time: number;
  active: boolean;
};

export interface GridposLog {
  username: string;
  posX: number;
  posY: number;
  dirX: number;
  dirY: number;
  speed: number;
  rubber: number;
  team: string;
  braking: number;
  brakeReservoir: number;
  elapsedTime: number;
}

export interface CycleDestroyLog {
  username: string;
  posX: number;
  posY: number;
  elapsedTime: string;
  predator: string;
}

export interface ConquerLog {
  usernames: string[];
  score: number;
  elapsedTime: number;
}

export interface Round {
  stats: GameStats[];
  gridposLogs: GridposLog[];
  cycleDestroyLogs: CycleDestroyLog[];
  conquerLogs: ConquerLog[];
  sacrificeLogs: any[];
  chatLogs: any[];
  roundNum: number;
  totalTime: number;
}

export interface GameData {
  rounds: Round[];
  totalTime: number;
  date: string;
  teamStats: any[];
  players: RoundPlayerEntry[];
  playerCounts: number[];
}
