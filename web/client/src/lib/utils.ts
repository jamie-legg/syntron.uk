import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nocache = () => {
  return {
      headers: {
        "content-type": "application/json",
        "Cache-Control": "public, s-maxage=1",
        "CDN-Cache-Control": "public, s-maxage=1",
        "Vercel-CDN-Cache-Control": "public, s-maxage=1",
      },
    }
};
