import { Empty, Table } from 'antd'
import Search from 'antd/lib/input/Search'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function FBISearch() {
    const [searchResult, setSearchResult] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        onSearch()
    }, [])
    

    const onSearch = (value) => {
        console.log(value);
       axios.get("https://api.fbi.gov/wanted/v1/list",{
        responseType: 'json',
        params:{
            'field_offices': value
        }
       }).then(response => {
        setIsLoading(false);

        const resultModified = response.data.items.map((item) => {
            return (
                {
                    key:item.uid,
                    ...item
                }
            )
        })

        setSearchResult(resultModified);
       })
    }
    
    const dataColumns = [
        {
            title: 'NCIC',
            dataIndex: 'ncic',
            key: 'ncic',
          },
          {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: 'Officer',
            dataIndex: 'field_offices',
            key: 'field_offices',
          },
    ]


  return (
    <>
       <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={(e)=>onSearch(e)}
    />

    {
        searchResult === [] ? <Empty/>: <Table dataSource={searchResult} columns={dataColumns} loading={isLoading} size="small" scroll={{y:300}}/>
    }
   
    </>
  )
}
