import { Badge, Card, Image, Skeleton, Tooltip, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import axios from 'axios'
import moment from 'moment'
import React, { Fragment, useEffect, useState } from 'react'

export default function ChoosenWaifu({ waifu }) {
    const [loading, setLoading] = useState(true)
    const [waifuResult, setWaifuResult] = useState({})
    const [tags, setTags] = useState('')
    useEffect(() => {
        getChoosenWaifu(waifu)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waifu])


    const getChoosenWaifu = () => {
        axios.get(`https://api.waifu.im/random/`, {
            params: {
                selected_tags: waifu === "" ? "maid" : waifu
            }
        }).then(response => {
            setLoading(true);

            setTimeout(() => {
                setLoading(false)
                const imageResult = response.data.images[0]
                const tagsResult = imageResult.tags;
                const newTagArr = [];
                tagsResult.map((tag) => {
                    return newTagArr.push(tag.name);
                })
                setTags(newTagArr.toString());
                setWaifuResult(imageResult)
            }, 500);

            clearTimeout()
        })

    }

    return (
        <Fragment>
            <Badge count={waifuResult.favourites}>
                <Card
                    style={{ width: 210 }}
                    cover={
                        <Image src={`${waifuResult.url}`} alt={`${waifuResult.image_id}`} width={"200px"} />
                    }
                    loading={loading}
                >
                    <Skeleton loading={loading} avatar active>
                        <Meta
                            title={
                                <Tooltip placement="top" color={waifuResult.dominant_color} title={<Typography.Text type='secondary' mark>{tags.slice(',')}</Typography.Text>}>
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
