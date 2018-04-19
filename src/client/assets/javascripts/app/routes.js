import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import App from './App'
// import FriendsView from 'features/friends/components/FriendsView'
import Map from 'features/map/index'
import Users from 'features/users/index'
import Lists from 'features/lists/index'
import Items from 'features/items/index'
// import SignUp from 'features/fb/index'
// import FBLogin from 'features/fb/index'
import Login from 'components/login/index'
import Sharing from 'features/sharing/index'
import Examples from 'features/examples/index'
import Examples2 from 'features/examples2/index'
import Location from 'features/location/index'
import NotFoundView from 'components/NotFound'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Users} />
    <Route path="/map/:list_id" component={Map} />
    <Route path="/users" component={Users} />
    <Route path="/lists" component={Lists} />
    <Route path="/items/:list_id" component={Items} />
    <Route path="/login" component={Login} />
    <Route path="/sharing" component={Sharing} />
    <Route path="/location" component={Location} />
    <Route path="/examples" component={Examples} />
    <Route path="/examples2" component={Examples2} />
    <Route path="404" component={NotFoundView} />
    <Redirect from="*" to="404" />
    {/*<Route path="/sign-up" component={SignUp} />*/}
    {/*<Route path="/fb-login" component={FBLogin} />*/}
  </Route>
)
