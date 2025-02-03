import { ChannelItem, fetchChannelAPI } from "@/apis/list"
import { useEffect, useState } from "react"

const useTabs = () => {
  const [channels, setChannels] = useState<ChannelItem[]>([])

  useEffect(() => {
    const getChannels = async () => {
      try {
        const res = await fetchChannelAPI()
        const { data } = res.data
        setChannels(data.channels)
      } catch (err) {
        throw new Error('fetch channels error')
      }
    }
    getChannels()
  }, [])

  return {
    channels
  }
}

export { useTabs }