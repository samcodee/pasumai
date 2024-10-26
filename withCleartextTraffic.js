const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function withCleartextTraffic(config) {
  return withAndroidManifest(config, async (config) => {
    const app = config.modResults.manifest.application.find(
      (a) => a.$['android:networkSecurityConfig'] === undefined
    );

    if (app) {
      app.$['android:usesCleartextTraffic'] = 'true';
    }

    return config;
  });
};
