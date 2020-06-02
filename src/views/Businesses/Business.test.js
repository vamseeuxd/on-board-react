import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { mount } from 'enzyme'
import Business from './Business';


it('renders without crashing', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Business match={{params: {id: "1"}, isExact: true, path: "/businesses/:id", name: "Businesses details"}}/>
    </MemoryRouter>
  );
  expect(wrapper.containsMatchingElement(<strong>Samppa Nori</strong>)).toEqual(true)
  wrapper.unmount()
});
