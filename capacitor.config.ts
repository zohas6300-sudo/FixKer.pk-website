import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fixker.pk',
  appName: 'FixKer',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
