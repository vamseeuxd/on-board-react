import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { mount } from 'enzyme'
import Product from './Product';


it('renders without crashing', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Product match={{params: {id: "1"}, isExact: true, path: "/products/:id", name: "Product details"}}/>
    </MemoryRouter>
  );
  expect(wrapper.containsMatchingElement(<strong>Samppa Nori</strong>)).toEqual(true)
  wrapper.unmount()
});
