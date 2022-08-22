import { Auth0Provider } from '@auth0/auth0-react';
import Amplify from 'aws-amplify';
import { Link, Route, Switch, } from 'react-router-dom';
import './App.css';
import { awsCognito } from './cognito';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import LoginButton from './components/LoginButton';
import SignUp from './components/SignUp';
import Waifu from './components/Waifu';
import Confirmation from './Confirmation';

Amplify.configure({
  aws_cognito_region: awsCognito.REGION,
  aws_user_pools_id: awsCognito.USER_POOL_ID,
  aws_user_pools_web_client_id: awsCognito.APP_CLIENT_ID,

})

function App() {
  return (
    <Auth0Provider
      domain='dev-0xe9aint.us.auth0.com'
      clientId='yRP2iic5uFjlCbT9O68o6pkEe11wy8qg'
      redirectUri={window.location.origin}
    >

      <div className="App">
        <LoginButton/>
        <ul>
          <li>
            <Link to="/" children={<h3>Index page</h3>}>Home</Link>
          </li>
          <li>
            <Link to="/waifu" children={<Waifu/>}>
              Waifu
            </Link>
          </li>
          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup">
              SignUp
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/">
            <h3>Index page</h3>
          </Route>
          <Route path="/waifu">
            <Waifu />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path={"/dashboard"}>
            <Dashboard />
          </Route>
          <Route path={"/confirmation"}>
            <Confirmation/>
          </Route>
        </Switch>

      </div>
      </Auth0Provider>
  );
}

export default App;
