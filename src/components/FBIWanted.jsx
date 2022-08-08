import { Image, Table, Tag, Typography } from 'antd'
import Column from 'antd/lib/table/Column'
import { isNull, } from 'lodash'
import React, { useEffect, useState } from 'react'

export default function FBIWanted() {
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetch("https://api.fbi.gov/wanted/v1/list")
            .then(response => response.json())
            .then(listData => {
                setIsLoading(false)

                const modifiedData = listData.items.map((data) => {
                    return ({
                        ...data,
                        key: data.uid
                    })
                }
                )
                setList(modifiedData)
            })
    }, [])

    return (
        <Table
            dataSource={list}
            expandable={{
                expandedRowRender: (record) => (
                    <ul>
                        <li>
                            <div dangerouslySetInnerHTML={{ __html: record.caution }} />
                        </li>
                        <li>
                            <p>{record.hair_raw}</p>
                        </li>
                        <li>
                            <p>{record.nationality}</p>
                        </li>
                        <li>
                            <p>{record.place_of_birth}</p>
                        </li>
                        <li>
                            <p>{record.sex}</p>
                        </li>
                        <li>
                            <p>{record.hair_raw}</p>
                        </li>
                        <li>
                            <p>{record.weight}</p>
                        </li>
                        <li>
                            <p>{record.reward_text}</p>
                        </li>
                        <li>
                            <p>{record.scars_and_marks}</p>
                        </li>
                    </ul>),
                rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
            size='middle'
            loading={isLoading}
        >
            <Column title="NCIC" dataIndex="ncic" key={"ncic"}
                defaultSortOrder={"desc"}
                sorter={{
                    compare: (a, b) => a.ncic - b.ncic,
                    multiple: 2
                }}
                fixed='left'
            />

            <Column title="Title" dataIndex="title" key={"title"}
                defaultSortOrder={"desc"}
                sorter={{
                    compare: (a, b) => a.title.length - b.title.length,
                    multiple: 1

                }}
                render={(value, record) => (
                    <>
                        <a href={`${record['@id']}`}>{value}</a>
                    </>
                )}
                fixed='left'
            />
            <Column title="Description" dataIndex="description" key={"description"} />
            <Column title="Offices" dataIndex="field_offices" key={"field_offices"} />
            <Column title="Warning message" dataIndex={"warning_message"} key={"warning_message"} render={(_, { warning_message }) => {
                return (
                    <>
                        <Typography.Text type='danger' strong={true}>{warning_message}</Typography.Text>
                    </>
                )
            }} />
            <Column title="Remarks" dataIndex={"remarks"} key={"remarks"} render={(_, { remarks }) => {
                return (
                    <>
                        <div dangerouslySetInnerHTML={{ __html: remarks }} />
                    </>
                )
            }} />

            <Column title="Languages" dataIndex={"languages"} key={"languages"} render={(_, { languages }) => (
                <>
                    {
                        isNull(languages) ? [] : languages.map((lang) => {
                            return (
                                <Tag key={lang}>
                                    {lang.toUpperCase()}
                                </Tag>
                            )
                        })
                    }
                </>
            )} />
            <Column title="Date of birth used" dataIndex={"dates_of_birth_used"} key={"dates_of_birth_used"} render={(_, { dates_of_birth_used }) => (
                <>
                    {

                        isNull(dates_of_birth_used) ? [] : dates_of_birth_used.map((dob) => {
                            return (
                                <Tag key={dob}>
                                    {dob}
                                </Tag>
                            )
                        })
                    }
                </>
            )} />
            <Column title="Aliases" dataIndex={"aliases"} key={"aliases"} render={(_, { aliases }) => (
                <>
                    {
                        isNull(aliases) ? [] : aliases.map((alias) => {
                            return (
                                <Tag key={alias}>
                                    {alias}
                                </Tag>
                            )
                        })
                    }
                </>
            )} />
            <Column title="Subjects" dataIndex={"subjects"} key={"subjects"} render={(_, { subjects }) => (
                <>
                    {
                        isNull(subjects) ? [] : subjects.map((subject) => {
                            return (
                                <Tag key={subject}>
                                    {subject}
                                </Tag>
                            )
                        })
                    }
                </>
            )}
                onFilter={(value, record) => record.subjects.indexOf(value) === 0}
            />
            <Column title="Publication" dataIndex={"publication"} key={"publication"} />
            <Column title="Modified" dataIndex={"modified"} key={"modified"} />
            <Column title="Status" dataIndex={"status"} key={"status"} />
            <Column title="Images" dataIndex={"images"} key={"images"} render={(value, record) => {
                return (
                    <>
                        <Image.PreviewGroup>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {
                                    record.images.map((image) => {
                                        return (
                                            <Image width={100} height={100} src={image['original']} alt={image['caption']} key={image.thumb} />
                                        )
                                    })
                                }
                            </div>
                        </Image.PreviewGroup>
                    </>
                )
            }} />
        </Table>
    )
}
