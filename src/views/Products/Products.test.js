import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Products from './Products';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Products /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
