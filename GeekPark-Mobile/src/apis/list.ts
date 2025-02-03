import http from "@/utils/http"
import { ResType } from "./shared"

// Define API type
export type ChannelItem = {
  id: string
  name: string
}

// Because we need to return a list
type ChannelRes = {
  channels: ChannelItem[]
}

// request channel list
export const fetchChannelAPI = () => http.request<ResType<ChannelRes>>({
    url: '/channels',
  })

// request article list
type ListItem = {
  art_id: string
  title: string
  aut_id: string
  comm_count: number
  pubdate: string
  aut_name: string
  is_top: number
  cover: {
    type: number
    images: string[]
  }
}

export type ListRes = {
  results: ListItem[]
  pre_timestamp: string
}

export type reqParams = {
  channel_id: String
  timestamp: string
}

export const fetchListAPI = (params: reqParams) => http.request<ResType<ListRes>>({ 
  url: '/articles',
  params
})

