import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { mount } from 'enzyme'
import Search from './Search';


it('renders without crashing', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Search match={{params: {id: "1"}, isExact: true, path: "/products/:id", name: "Product details"}}/>
    </MemoryRouter>
  );
  expect(wrapper.containsMatchingElement(<strong>Samppa Nori</strong>)).toEqual(true)
  wrapper.unmount()
});
