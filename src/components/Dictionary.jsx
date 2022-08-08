import { Form, Input } from 'antd'
import React from 'react'

// const API_URL = "https://od-api.oxforddictionaries.com/api/v2";
// const APP_ID = "3d49b9b0";
// const APP_KEYS = "4a7815df79f4baaf8a0d944e1d8139e1";

export default function Dictionary() {
  return (
    <>
        <Form>
            <Input.Search />
        </Form>
    </>
  )
}
