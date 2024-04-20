import { AxiosResponse } from "axios";

export type TCreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type TCreateUserResponse = {
  token: string;
};

export type TGetUsersResponse = {
  users: {
    name: string;
    email: string;
  }[];
};

export type TGetRanksResponse = AxiosResponse<TRanking[]>;

export type TServersMetadata = {
  time: number,
  players_online: number,
  servers_online: number,
  servers_active: number,
};

export type TServerInfo = {
  host: string;
  port: number;
  version_min: number;
  version_max: number;
  version: string;
  max_players: number;
  players: string[];
  options: string;
  uri: string;
  num_players: number;
  gid: string[];
  server_name: string;
};


export type TRanking = {
  rank: string;
  name: string;
  elo: string;
  latestChange: string;
  winrate: string;
  avgPlace: string;
  netPoints: string;
  avgScore: string;
  highScore: string;
  kd: string;
  lastSeen: string;
};