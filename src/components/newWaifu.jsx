import { Form, Select } from 'antd'
import React from 'react'

export default function newWaifu() {
  return (
   <>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="vertical"
      size='small'

    >
        <Form.Item label="Waifu Tag">
            <Select>
                <Select.Option>
                    Waifu
                </Select.Option>
            </Select>
        </Form.Item>
    </Form>
   </>
  )
}
