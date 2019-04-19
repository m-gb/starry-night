import React from 'react';
import ReactDOM from 'react-dom';
import { create } from 'react-test-renderer';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('matches the snapshot', () => {
  const component = create(<App />);
  expect(component.toJSON()).toMatchSnapshot();
});
