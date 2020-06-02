import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { mount } from 'enzyme'
import Customer from './Customer';


it('renders without crashing', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Customer match={{params: {id: "1"}, isExact: true, path: "/customers/:id", name: "Customer details"}}/>
    </MemoryRouter>
  );
  expect(wrapper.containsMatchingElement(<strong>Samppa Nori</strong>)).toEqual(true)
  wrapper.unmount()
});
