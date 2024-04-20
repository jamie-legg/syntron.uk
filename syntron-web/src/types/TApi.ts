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