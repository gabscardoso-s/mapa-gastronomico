import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'mapa-gastronomico',
  webDir: 'www',
  plugins: {
    Geolocation: {},
  },
};

export default config;
