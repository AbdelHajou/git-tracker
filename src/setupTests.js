import '@testing-library/jest-dom';
import { createMemoryHistory}  from 'history';
import { render } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';

global.renderWithRouter = (
  ui,
  {
    path = "/",
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) => {
  return {
    ...render(
      <Router history={history}>
        <Route path={path} children={ui} />
      </Router>
    )
  };
}