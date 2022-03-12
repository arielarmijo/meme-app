import data from '../../secrets.json';

export const environment = {
  production: true,
  imgFlipBaseUrl: 'https://api.imgflip.com',
  username: data.imgFlipUsername,
  password: data.imgFlipPassword,
  auth: {
    domain: data.domain,
    clientId: data.clientId,
    redirectUri: window.location.origin
  }
};
