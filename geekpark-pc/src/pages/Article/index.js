import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
// 引入汉化包 时间选择器显示中文
// import locale from 'antd/es/date-picker/locale/zh_CN'

// 导入资源
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useChannel } from '@/hooks/useChannel'
import { useEffect, useState } from 'react'
import { delArticleAPI, getArticleListAPI } from '@/apis/article'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const navigate = useNavigate()
  const { channelList } = useChannel()
  // 准备列数据
  // 定义状态枚举
  const status = {
    1: <Tag color='warning'>Review</Tag>,
    2: <Tag color='success'>Approved</Tag>,
  }
  const columns = [
    {
      title: 'Cover',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 220
    },
    {
      title: 'Status',
      dataIndex: 'status',
      // data - 后端返回的状态status 根据它做条件渲染
      // data === 1 => 待审核
      // data === 2 => 审核通过
      render: data => status[data]
    },
    {
      title: 'Pub Date',
      dataIndex: 'pubdate'
    },
    {
      title: 'Read',
      dataIndex: 'read_count'
    },
    {
      title: 'Comment',
      dataIndex: 'comment_count'
    },
    {
      title: 'Like',
      dataIndex: 'like_count'
    },
    {
      title: 'Operation',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)} />
            <Popconfirm
              title="Delete"
              description="Are you sure to delete this article?"
              onConfirm={() => onConfirm(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  // 筛选功能
  // 1. 准备参数
  const [reqData, setReqData] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 4
  })

  // 获取文章列表
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    async function getList () {
      const res = await getArticleListAPI(reqData)
      setList(res.data.results)
      setCount(res.data.total_count)
    }
    getList()
  }, [reqData])


  // 2. 获取筛选数据
  const onFinish = (formValue) => {
    console.log(formValue)
    // 3. 把表单收集到数据放到参数中(不可变的方式)
    setReqData({
      ...reqData,
      channel_id: formValue.channel_id,
      status: formValue.status,
      begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
      end_pubdate: formValue.date[1].format('YYYY-MM-DD')
    })
    // 4. 重新拉取文章列表 + 渲染table逻辑重复的 - 复用
    // reqData依赖项发生变化 重复执行副作用函数 
  }

  // 分页
  const onPageChange = (page) => {
    console.log(page)
    // 修改参数依赖项 引发数据的重新获取列表渲染
    setReqData({
      ...reqData,
      page
    })
  }

  // 删除
  const onConfirm = async (data) => {
    // console.log('删除点击了', data)
    await delArticleAPI(data.id)
    setReqData({
      ...reqData
    })
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>Home</Link> },
            { title: 'Article List' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={''}>All</Radio>
              <Radio value={1}>Review</Radio>
              <Radio value={2}>Approved</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Channel" name="channel_id">
            <Select
              placeholder="Please select channel"
              style={{ width: 120 }}
            >
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              Apply
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`${count} results in total based on the filter:`}>
        <Table rowKey="id" columns={columns} dataSource={list} pagination={{
          total: count,
          pageSize: reqData.per_page,
          onChange: onPageChange
        }} />
      </Card>
    </div>
  )
}

export default Article