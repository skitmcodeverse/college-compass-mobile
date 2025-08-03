import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.df95e9c254e64fa390b783e89055b20e',
  appName: 'college-compass-mobile',
  webDir: 'dist',
  server: {
    url: 'https://df95e9c2-54e6-4fa3-90b7-83e89055b20e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      showSpinner: false
    }
  }
};

export default config;