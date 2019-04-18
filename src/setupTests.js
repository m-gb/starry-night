export const mockGeolocation = {
  getCurrentPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;
