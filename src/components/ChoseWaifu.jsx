import { Badge, Card, Image, Skeleton, Tooltip, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import axios from 'axios'
import MaterialIconsReact from 'material-icons-react'
import moment from 'moment'
import React, { Fragment, useEffect, useState } from 'react'
import Blur from 'react-css-blur'

export default function ChoseWaifu({ waifu, loadingWaifu, isBlur }) {
    const [loading, setLoading] = useState(true)
    const [waifuResult, setWaifuResult] = useState({})
    const [tags, setTags] = useState('')
    const [isFavorite, setIsFavorite] = useState(false);
    const [onBlur, setOnBlur] = useState(true);

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
            setLoading(loading);
            
            setTimeout(() => {
                setLoading(loading)

                const imageResult = response.data.images[0]
                const tagsResult = imageResult.tags;
                const newTagArr = [];

                tagsResult.map((tag) => {
                    return newTagArr.push(tag.name);
                });

                setTags(newTagArr.toString());
                setWaifuResult(imageResult)
            }, 100);

            clearTimeout()
        })

    }

    const handleChoseWaifuClick = (value) => {
        setIsFavorite(true)
        console.log(value.target);
    }

    return (
        <Fragment>
            <Badge count={waifuResult.favourites}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={
                        isBlur  === true ? 
                        <Blur radius={onBlur ? '25px' : 0} transition="2400ms">
                            <div 
                            onMouseEnter={() =>  setOnBlur(false)}
                            onMouseLeave={() => setOnBlur(true)}
                            >
                                <Image src={`${waifuResult.url}`} alt={`${waifuResult.source}`} width={"200px"} />
                            </div>
                        </Blur> : 
                        <Image src={`${waifuResult.url}`} alt={`${waifuResult.source}`} width={"200px"} />

                    }
                    loading={loadingWaifu}
                    actions={[
                        <MaterialIconsReact icon={`${isFavorite === true ? 'favorite_border' : 'favorite'}`} />
                    ]}
                    onClick={(event) => handleChoseWaifuClick(event)}
                >
                    <Skeleton loading={loadingWaifu} active={loadingWaifu}>
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
