import { Card } from '@mui/material';
import Amplify from 'aws-amplify';
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import { awsCognito } from './cognito';
import Waifu from './components/Waifu';

Amplify.configure({
  aws_cognito_region: awsCognito.REGION,
  aws_user_pools_id: awsCognito.USER_POOL_ID,
  aws_user_pools_web_client_id: awsCognito.APP_CLIENT_ID,

})

function App() {
  return (
    <Router>
      <Card style={{ width: 500, margin: "100px auto", padding: "40px" }}>
        <Routes>
          <Route path='/waifu'>
            <div className="App">
              <Waifu />
            </div>
          </Route>
        </Routes>
      </Card>
    </Router>
  );
}

export default App;
