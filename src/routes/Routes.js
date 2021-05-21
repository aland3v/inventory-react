import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { PageHome } from '../pages/PageHome';
import { PageLogin } from '../pages/PageLogin';
import { PageNew } from '../pages/PageNew';
import { PageMixTemp } from '../pages/PageMixTemp';
import { PrivateRoute, PublicRoute, MixRoute } from './helperRoutes';
import { Layout } from '../components/Layout';
import { PageUpdate } from '../pages/PageUpdate';

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthContext>
        <Layout>
          <Switch>
            <PrivateRoute exact path="/" component={PageHome} />
            <PrivateRoute exact path="/new/" component={PageNew} />
            <PrivateRoute exact path="/update/:id" component={PageUpdate} />
            <PublicRoute exact path="/login" component={PageLogin} />
            <MixRoute exact path="/mix" component={PageMixTemp} />
            <Route
              exact
              path="*"
              render={() => {
                return <Redirect to="/" />;
              }}
            />
          </Switch>
        </Layout>
      </AuthContext>
    </BrowserRouter>
  );
};

export default Routes;
