import { Alert } from '@aws-amplify/ui-react';
import styled from '@emotion/styled';
import { Button, Card, TextField } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import UseInput from './UseInput';

const Field = styled(TextField)({
  margin: "10px 0",
});

const DLink = styled(Link)({
  margin: "15px 0",
  textAlign: "right",
});

function SignUp() {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { value: name, bind: bindName } = UseInput("");
  const { value: email, bind: bindEmail } = UseInput("");
  const { value: password, bind: bindPassword } = UseInput("");
  const { value: confirmPassword, bind: bindConfirmPassword } = UseInput("");


  const formik = useFormik({
    initialValues:{
      email:email,
      name:name,
      password:password,
      confirmPassword: confirmPassword,
    },
    validate:{

    },
    onSubmit: async (values) => {
      setLoading(true);

      if (password !== confirmPassword) {
        return;
      }
      try {
        await Auth.signUp({
          username: email,
          password: confirmPassword,
          attributes: {
            email,
            name,
          },
        });
       
        history.push("/confirmation");
      } catch (error) {
        <Alert
        variation='error'
        isDismissible={true}
        hasIcon={true}
        >
          {error}
        </Alert>
       
      }
      setLoading(false);
    }
  })

  
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
      onSubmit={formik.handleSubmit}
    >
      <h1 style={{ fontSize: "22px", fontWeight: 800 }}>
        {" "}
        New Account Registration
      </h1>
      <Field label="Name" {...bindName} />
      <Field label="Email" {...bindEmail} type="email" />
      <Field label="Password" type="password" {...bindPassword} />
      <Field
        label="Confirm Password"
        type="password"
        {...bindConfirmPassword}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        disabled={loading}
      >
        {loading}
        Sign Up
      </Button>
      <DLink to="/login">go to login &rarr;</DLink>
    </form>
    </Card>
  )
}

export default SignUp