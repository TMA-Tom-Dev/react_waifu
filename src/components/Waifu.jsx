import { Form, message, Select, Switch, Tabs, Tooltip, Typography } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ChoosenWaifu from './ChoosenWaifu'
import RandomWaifu from './randomWaifu'

export default function Waifu() {
    const [tags, setTags] = useState([])
    const [isClear, setIsClear] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [choosenTag, setChoosenTag] = useState('')
    const [selectedOption, setSelectedOption] = useState({
        key: 13,
        value: 'maid',
        description: 'Cute womans or girl employed to do domestic work in their working uniform.'
    })

    useEffect(() => {
        axios.get(`https://api.waifu.im/tags/?full=on`)
            .then(response => {
                if (isClear === true) {
                    setTimeout(() => {
                        setIsLoading(false)
                        const fullResults = response.data.versatile.concat(response.data.nsfw);
                        setTags(fullResults)
                    }, 3000);

                } else {
                    setTimeout(() => {
                        setIsLoading(false)
                        const versatileResults = response.data.versatile;
                        setTags(versatileResults)
                    }, 3000);

                }
            }
            )
    }, [isClear])

    const handleOnChangeSwitch = (e) => {

        message.loading({ content: 'Loading...', key:'update'});
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false)
            message.info({ content: isClear ? 'NSFW off' : 'NSFW on',key:'update', duration: 4});
        }, 3000);

        setIsClear(e);

    }

    const handleOnSelectTag = (value) => {
        setChoosenTag(value)
    }

    const handleOnChangeTag = (value) => {
        setSelectedOption(value)
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
                <Form.Item label="NSFW">
                    <Switch onChange={(e) => handleOnChangeSwitch(e)} loading={isLoading} />
                </Form.Item>
                <Form.Item label="Tag">
                    <Select
                        onSelect={handleOnSelectTag}
                        loading={isLoading}
                        onChange={handleOnChangeTag}
                        labelInValue={false}
                        value={selectedOption}
                        defaultValue={
                            selectedOption
                        }
                        disabled={isLoading}
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
                    defaultActiveKey='2'
                    type='card'
                    centered
                >
                    <Tabs.TabPane
                        tab={`Tag ${choosenTag === '' ? selectedOption.value : choosenTag}`}
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
