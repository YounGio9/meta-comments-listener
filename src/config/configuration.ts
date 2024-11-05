export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  instagram: {
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    businessId: process.env.INSTAGRAM_BUSINESS_ID,
    webhookSecret: process.env.INSTAGRAM_WEBHOOK_SECRET,
  },
  facebook: {
    accessToken: process.env.FACEBOOK_ACCESS_TOKEN,
    pageId: process.env.FACEBOOK_PAGE_ID,
    webhookSecret: process.env.FACEBOOK_WEBHOOK_SECRET,
  },
});

interface InstagramConfig {
  accessToken: string;
  businessId: string;
  webhookSecret: string;
}

interface FacebookConfig {
  accessToken: string;
  pageId: string;
  webhookSecret: string;
}

export interface AppConfig {
  port: number;
  instagram: InstagramConfig;
  facebook: FacebookConfig;
}
