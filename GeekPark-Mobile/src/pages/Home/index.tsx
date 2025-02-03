import { Tabs } from 'antd-mobile'
import './style.css'
import { useTabs } from './useTabs'
import HomeList from './HomeList'

const Home = () => {
  const { channels } = useTabs()
  return (
    <div className="tabContainer">
       <Tabs defaultActiveKey="0">
       {
          channels.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              <div className="listContainer">
                {/* HomeList列表 */}
                <HomeList channelId={'' + item.id} />
              </div>
            </Tabs.Tab>
          ))
        }
      </Tabs>
    </div>
  )
}

export default Home