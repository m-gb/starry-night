import React from 'react';
import { create } from 'react-test-renderer';
import SearchBar from './SearchBar';

it('matches the snapshot', () => {
  const component = create(<SearchBar submitSearch={jest.fn()} />);
  expect(component.toJSON()).toMatchSnapshot();
});
