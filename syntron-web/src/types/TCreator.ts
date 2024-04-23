export type TCreator = {
    name: string
    platform: TCreatorPlatform
}

export type TCreatorPlatform = {
    name: "Twitch" | "YouTube" | "TikTok"
    url: string
}