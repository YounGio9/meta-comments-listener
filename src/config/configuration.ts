export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  instagram: {
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    businessId: process.env.INSTAGRAM_BUSINESS_ID,
  },
});

interface InstagramConfig {
  accessToken: string;
  businessId: string;
}

export interface AppConfig {
  port: number;
  instagram: InstagramConfig;
}
