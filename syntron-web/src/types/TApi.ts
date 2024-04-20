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

// Path: syntron-web/src/types/TApi.ts