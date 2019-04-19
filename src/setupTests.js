export const mockGeolocation = {
  getCurrentPosition: jest.fn()
};
global.navigator.geolocation = mockGeolocation;

export const dateNowStub = jest.fn(() => 1555664754176); // Friday 19 April 2019
global.Date.now = dateNowStub;
