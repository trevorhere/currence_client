import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('app renders', () => {
  const { getByTitle } = render(<App />);
  const linkElement = getByTitle("currence");
  expect(linkElement).toBeInTheDocument();
});
