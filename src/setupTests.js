import '@testing-library/jest-dom';
import { createMemoryHistory}  from 'history';
import { render } from '@testing-library/react';
import { Route, Router, Switch, MemoryRouter } from 'react-router-dom';

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
      <MemoryRouter initialEntries={[route]}>
        <Switch>
          <Route path={path} children={ui} />
        </Switch>
      </MemoryRouter>
    )
  };
}