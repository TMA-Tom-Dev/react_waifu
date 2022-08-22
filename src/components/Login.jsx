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

function Login() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { value: email, bind: bindEmail } = UseInput("");
    const { value: password, bind: bindPassword } = UseInput("");

    const formik= useFormik({
        initialValues:{
            email:email,
            password:password
        },
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await Auth.signIn(
                    values.email,
                    values.password
                );
                history.push("/dashboard");

            } catch (error) {
              <Alert
              variation='error'
              isDismissible={false}
              hasIcon={true}
              >
                {error}
              </Alert>
            }
            setLoading(false);
        }
    })

    return (
        <>
            <Card
            style={{ width: 500, margin: "100px auto", padding: "40px" }}
            >
                <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                    onClick={formik.handleSubmit}
                >
                    <h1 style={{ fontSize: "22px", fontWeight: 800 }}>Sign In</h1>
                    <Field label="Email" {...bindEmail} type="email" />
                    <Field label="Password" type="password" {...bindPassword} />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={loading}
                    >
                        Login to Your Account
                    </Button>
                    <DLink to="/signup">make a new account</DLink>
                </form>
            </Card>
        </>
    )
}

export default Login