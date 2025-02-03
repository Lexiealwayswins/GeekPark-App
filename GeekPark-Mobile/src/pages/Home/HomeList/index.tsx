import { Image, InfiniteScroll, List } from 'antd-mobile'
// mock数据
import { useEffect, useState } from 'react'
import { fetchListAPI, ListRes } from '@/apis/list'
import { useNavigate } from 'react-router-dom'

type Props = {
  channelId: string
}

const HomeList = (props: Props) => {
  const { channelId } = props
  const [listRes, setListRes] = useState<ListRes>({
    results: [],
    pre_timestamp: '' + new Date().getTime()
  })
  useEffect(() => {
    const getList = async () => {
      try {
        const res = await fetchListAPI({
          channel_id: channelId,
          timestamp: '' + new Date().getTime(),
        })
        setListRes(res.data.data)
      } catch (err) {
        throw new Error('Fetch list error')
      }
    }
    getList()
  }, [channelId])

  // lazy load
  const [hasMore, setHasMore] = useState(true)
  const loadMore = async () => {
    try {
      const res = await fetchListAPI({
        channel_id: channelId,
        timestamp: listRes.pre_timestamp,
      })
      if (res.data.data.results.length === 0) {
        setHasMore(false)
      }
      setListRes({
        // stitching old and new data
        results: [...listRes.results, ...res.data.data.results],
        pre_timestamp: '' + new Date().getTime()
      })
    } catch (err) {
      throw new Error('Fetch list error')
    }
  }

  const navigate = useNavigate()
  const navigateToDetail = (id: string) => {
    navigate(`/detail?id=${id}`)
  }
  return (
    <>
      <List>
        {listRes.results.map((item) => (
          <List.Item
            onClick={() => navigateToDetail(item.art_id)}
            key={item.art_id}
            prefix={
              <Image
                src={item.cover.images?.[0]}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={item.pubdate}
            >
            {item.title}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}/>
    </>
  )
}

export default HomeList