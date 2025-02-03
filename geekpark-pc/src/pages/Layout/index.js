import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo, clearUserInfo } from '@/store/modules/user'

const { Header, Sider } = Layout

const items = [
  {
    label: 'Home',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Article Management',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: 'Create Ariticles',
    key: '/publish',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
  const navigate = useNavigate()
  const onMenuClick = (route) => {
    // console.log('菜单被点击了', route)
    const path = route.key
    navigate(path)
  }

  // 反向高亮
  // 1. 获取当前路由路径
  const location = useLocation()
  // console.log(location.pathname)
  const selectedkey = location.pathname

  // 触发个人用户信息action
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  // 退出登录确认回调
  const onConfirm = () => {
    // console.log('确认退出')
    dispatch(clearUserInfo())
    navigate('/login')
  }

  const name = useSelector(state => state.user.userInfo.name)
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="Are you sure to log out?" okText="Yes" cancelText="Cancel" onConfirm={onConfirm}>
              <LogoutOutlined /> Log out
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedkey}
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由的出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout