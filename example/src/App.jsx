import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import styled from 'styled-components';

import { AboutPage } from './AboutPage';
import { HomePage } from './HomePage';
import { Nav } from './Nav';
import { VariateProvider } from '@variate/react';

import variateConfig from './variate.json';

const history = createBrowserHistory();

const Container = styled.section`
  
`;

const App = () => (
  <VariateProvider 
    debug={true} 
    tracking={true}
    reporter={event => true}
    config={variateConfig}
    onViewChange={activate => {
      activate({
        view: {
          path: window.location.pathname,
          query: {},
        },
        targeting: {
          country: 'Canada',
          state: 'BC'
        }
      });
      history.listen(location => activate({
        view: {
          path: location.pathName,
          query: {},
        }
      }));
    }}>
    <Container>
      <Router history={history}>
        <Nav />
        <Route exact path='/' render={() => <HomePage/>} />
        <Route exact path='/about' render={AboutPage} />
      </Router>
    </Container>
  </VariateProvider>
);

export default App;