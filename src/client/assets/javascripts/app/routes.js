import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from './App';
// import FriendsView from 'features/friends/components/FriendsView';
import Map from 'features/map/index';
import Users from 'features/users/index';
import Items from 'features/items/index';
import Login from 'features/fb/index';
import Examples from 'features/examples/index';
import Examples2 from 'features/examples2/index';
import Location from 'features/location/index';
import NotFoundView from 'components/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Users} />
    <Route path="/map" component={Map} />
    <Route path="/users" component={Users} />
    <Route path="/items/:list_id" component={Items} />
    <Route path="/login" component={Login} />
    <Route path="/examples" component={Examples} />
    <Route path="/examples2" component={Examples2} />
    <Route path="/location" component={Location} />
    <Route path="404" component={NotFoundView} />
    <Redirect from="*" to="404" />
  </Route>
)
