import { Card } from 'antd'
import { Formik } from 'formik'
import React from 'react'

export default function LoginWaifu() {
    const formikConfig = {}
    const formik = Formik(formikConfig)
  return (
    <>
      <Card
        style={{width:500}}
      >
            <Form
                name="login-waifu"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: false
                }}
                autoComplete="off"
            >

            </Form>
        </Card>  
    </>
    )
}
