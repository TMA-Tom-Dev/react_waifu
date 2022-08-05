import { Form, message, Select, Switch, Tabs, Tooltip, Typography } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ChoosenWaifu from './ChoosenWaifu'
import RandomWaifu from './randomWaifu'

export default function Waifu() {
    const [tags, setTags] = useState([])
    const [isClear, setIsClear] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [choosenTag, setChoosenTag] = useState('maid')

    useEffect(() => {
        axios.get(`https://api.waifu.im/tags/?full=on`)
            .then(response => {
                if (isClear === true) {
                    setIsLoading(false)
                    const fullResults = response.data.versatile.concat(response.data.nsfw);
                    setTags(fullResults)
                } else {
                    setIsLoading(false)
                    const versatileResults = response.data.versatile;
                    setTags(versatileResults)
                    
                }
            }
            )
    }, [isClear])

    const handleOnChangeSwitch = (e) => {
        message.info(isClear ? 'tags full is off' : 'tags full is on');
        setIsClear(e);
    }

    const handleOnChangeSelectTag = (value) => {
        setChoosenTag(value)
    }

    return (
        <>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="vertical"
                size='small'
                style={{ marginTop: "20px", width: 500, padding: "40px 0 0 40px" }}
            >
                <Form.Item label="content clear">
                    <Switch onChange={(e) => handleOnChangeSwitch(e)} loading={isLoading ? true : false} />
                </Form.Item>
                <Form.Item label="Tag">
                    <Select
                        onSelect={handleOnChangeSelectTag}
                        defaultValue={true}
                    >
                        {
                            tags.map((tag) => (
                                <Select.Option value={tag.name} key={tag.tag_id}>
                                    <Tooltip title={tag.description} placement="right">
                                        <Typography.Text type={tag.is_nsfw === true ? "danger" : ""}>{tag.name}</Typography.Text>
                                    </Tooltip> - <Typography.Text type='secondary'>{tag.description}</Typography.Text>
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Form>
            <div className='tabs-wrapper'>
            <Tabs
                defaultActiveKey='1'
                type='card'
                centered
            >
                <Tabs.TabPane
                    tab={`Tag ${choosenTag}`}
                    key={1}
                >
                    <ChoosenWaifu waifu={choosenTag} />
                </Tabs.TabPane>

                <Tabs.TabPane
                    tab='Tag Random'
                    key={2}
                >
                    <RandomWaifu />
                </Tabs.TabPane>
            </Tabs>
            </div>
            
        </>
    )
}
