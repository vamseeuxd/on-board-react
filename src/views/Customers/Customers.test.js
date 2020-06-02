import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Customers from './Customers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Customers /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
