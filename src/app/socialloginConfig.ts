import {
  AuthServiceConfig,
  FacebookLoginProvider
} from 'angularx-social-login';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('304188790404608')
    }
  ]);
  return config;
}
