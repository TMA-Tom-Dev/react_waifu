import { Badge, Card, Image, Skeleton, Tooltip, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import axios from 'axios'
import MaterialIconsReact from 'material-icons-react'
import moment from 'moment'
import React, { Fragment, useEffect, useState } from 'react'

export default function RandomWaifu() {
    const [loading, setLoading] = useState(true)
    const [waifuResult, setWaifuResult] = useState({})
    const [waifuTag, setWaifuTag] = useState('');


    useEffect(() => {
        getRandomWaifu()
    }, [])

    const getRandomWaifu = () => {
        axios.get("https://api.waifu.im/random").then(response => {
            setLoading(false)
            
            let waifuRandom = response.data.images[0];
            let WaifuTags = waifuRandom.tags;
            let newTagArray = [];

           WaifuTags.map((tag) => {
                return newTagArray.push(tag.name)
            });
            setWaifuTag(newTagArray.toString())

            setWaifuResult(waifuRandom)
        })
    }
    
    return (
        <Fragment>
            <Badge count={waifuResult.favourites}>
                <Card
                hoverable
                    style={{ width: 210 }}
                    cover={
                        <Image src={`${waifuResult.url}`} alt={`${waifuResult.image_id}`} width={"200px"}/>
                    }
                    loading={loading}
                    actions={[
                        <MaterialIconsReact icon={"favorite_border"} />
                    ]}
                >
                    <Skeleton loading={loading} avatar active>
                        
                        <Meta
                            title={
                                <Tooltip placement="top" color={waifuResult.dominant_color} title={<Typography.Text mark>{waifuTag.slice(', ')}</Typography.Text>}>
                                    <Typography.Link>#{waifuResult.image_id}</Typography.Link>
                                </Tooltip>
                            }
                            description={`Uploaded ${moment(waifuResult.uploaded_at).fromNow()}`}
                        />
                    </Skeleton>
                </Card>
            </Badge>
        </Fragment>
    )
}
