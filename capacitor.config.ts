import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "whp.app",
  appName: "WHP",
  webDir: "public",
  server: {
    url: "http://localhost:3000",
    cleartext: true,
  },
};

export default config;
