import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/Logo-pc.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    console.log(values)
    // 触发异步action fetchLogin
    await dispatch(fetchLogin(values))
    // 1. 跳转到首页
    navigate('/')
    // 2. 提示一下用户
    message.success('Successfully logged in')
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="mobile"
            // 多条校验逻辑 先校验第一条 第一条通过之后再校验第二条
            rules={[
              {
                required: true,
                message: 'Please input phone number',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: 'Incorrect input'
              }
            ]}>
            <Input size="large" placeholder="Please input phone number" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: 'Please input verification code',
              },
            ]}>
            <Input size="large" placeholder="Please input verification code" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login