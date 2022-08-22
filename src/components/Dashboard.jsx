import { ExitToApp } from '@material-ui/icons'
import { Button, Card } from '@mui/material'
import { Auth } from 'aws-amplify';
import React from 'react'
import { useHistory } from 'react-router-dom';

function Dashboard() {
    const history = useHistory();

    const handleLogout = async () => {
        try {
          await Auth.signOut();
        
          history.push("/login");
        } catch (error) {
          
        }
      };
      
    return (
        <>
            <Card>

                <p>
                
                </p>    
                <Button
                    variant="contained"
                    
                    style={{ "marginRight": "20px" }}
                    
                >
                    Go to CV
                </Button>
                <Button variant="contained" onClick={handleLogout}>
                    <ExitToApp /> Logout
                </Button>
            </Card>
        </>
    )
}

export default Dashboard