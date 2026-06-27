export interface BannerSettings {
  acceptText: string;
  rejectText: string;
  message: string;
  themePrimary: string;
  themeBackground: string;
  themeText: string;
  position: "top" | "bottom";
  cookieDays: number;
  cookieName: string;
  apiKey?: string;
}
