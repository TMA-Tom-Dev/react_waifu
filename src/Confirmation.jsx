import styled from '@emotion/styled';
import { Button, Card, TextField } from '@mui/material';
import { Auth } from 'aws-amplify';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import UseInput from './components/UseInput';


const Field = styled(TextField)({
    margin: "10px 0",
  });
  
  const DLink = styled(Link)({
    margin: "15px 0",
    textAlign: "right",
  });

function Confirmation() {
    const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { value: email, bind: bindEmail } = UseInput("");
  const { value: code, bind: bindCode } = UseInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Auth.confirmSignUp(email, code);
      
      history.push("/signin");
    } catch (error) {
      
    }
    setLoading(false);
  };
  return (
    <Card
    style={{ width: 500, margin: "100px auto", padding: "40px" }}
    >

    <form
    style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    }}
    onSubmit={handleSubmit}
    >
    <h1 style={{ fontSize: "22px", fontWeight: 800 }}>
      {" "}
      Verify Your Account
    </h1>
    <Field label="Email" {...bindEmail} type="email" />
    <Field label="Verification Code" {...bindCode} />
    <Button
      variant="contained"
      color="primary"
      size="large"
      type="submit"
      disabled={loading}
      >
      
      Verify your account
    </Button>
    <DLink to="/login">make an account &rarr;</DLink>
  </form>
        </Card>
  )
}

export default Confirmation