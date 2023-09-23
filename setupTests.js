import React from 'react'; // Make sure to import React

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const customRender = (ui, options) => render(<Provider store={store}>{ui}</Provider>, options);

export * from '@testing-library/react';

export { customRender as render };
