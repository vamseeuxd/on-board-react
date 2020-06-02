import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { mount } from 'enzyme'
import Application from './Application';


it('renders without crashing', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Application match={{params: {id: "1"}, isExact: true, path: "/applications/:id", name: "Application details"}}/>
    </MemoryRouter>
  );
  expect(wrapper.containsMatchingElement(<strong>Samppa Nori</strong>)).toEqual(true)
  wrapper.unmount()
});
