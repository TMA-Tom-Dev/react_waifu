import { Badge, Card, Image, Skeleton, Tooltip, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import axios from 'axios'
import moment from 'moment'
import React, { Fragment, useEffect, useState } from 'react'

export default function ChoosenWaifu({ waifu }) {
    const [loading, setLoading] = useState(true)
    const [waifuResult, setWaifuResult] = useState({})

    useEffect(() => {
        getChoosenWaifu(waifu)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waifu])


    const getChoosenWaifu = () => {
        axios.get(`https://api.waifu.im/random/`, {
            params: {
                selected_tags: waifu
            }
        }).then(response => {
            setLoading(true);

            setTimeout(() => {
                setLoading(false)
                const tagResult = response.data.images[0]
                setWaifuResult(tagResult)
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
                                <Tooltip placement="top" color={waifuResult.dominant_color} title={<Typography.Text type='secondary'>Waifu#{waifuResult.image_id}</Typography.Text>}>
                                    <Typography.Link>Waifu#{waifuResult.image_id}</Typography.Link>
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
