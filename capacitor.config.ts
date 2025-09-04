import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.a8c89bb821bf41878a2ee9a3374ee486',
  appName: 'Virtual Garden',
  webDir: 'dist',
  server: {
    url: 'https://a8c89bb8-21bf-4187-8a2e-e9a3374ee486.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;