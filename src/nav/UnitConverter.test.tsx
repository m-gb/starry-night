import React from 'react';
import { create } from 'react-test-renderer';
import UnitConverter from './UnitConverter';

it('matches the snapshot', () => {
  const component = create(<UnitConverter convertUnit={jest.fn()} unit={'C'} />);
  expect(component.toJSON()).toMatchSnapshot();
});
