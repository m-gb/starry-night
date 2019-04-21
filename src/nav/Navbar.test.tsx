import React from 'react';
import { create } from 'react-test-renderer';
import NavBar from './NavBar';

it('matches the snapshot', () => {
  const component = create(<NavBar convertUnit={jest.fn()} submitSearch={jest.fn()} unit={'C'} />);
  expect(component.toJSON()).toMatchSnapshot();
});
