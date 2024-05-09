import { Request } from 'express';

// syntron.uk/web/types/index.ts

// AuthRequest

// Comes from the client with an authenticated session, either via discord, google or email/password
// The server will use this to create or update a user in the database
// The server will then return a JWT token to the client

export type UserProfile = {
    id: string;
    name: string;
    imageUrl: string;
    email: string;
}