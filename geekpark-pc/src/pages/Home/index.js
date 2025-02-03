import { Button, Card } from "antd"
import logoPic from '@/assets/Logo-pic.png'
import { useNavigate } from "react-router-dom"
const { Meta } = Card

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="home" style={{ textAlign: 'center'}} alt="">
      <Card>
        <img src={logoPic} style={{ width: '450px', margin: '30px'}} alt="" />
        <Meta
        title="Welcome to the Article Management System!"
        description="Here, you can create, edit, and manage your articles with ease."
        />

        <h3>Quick Actions</h3>
        <Button onClick={() => navigate(`/article`)}
        color="primary" variant="outlined" style={{ width: '150px', margin: '5px'}}>
            Article Management
        </Button>
        <Button onClick={() => navigate(`/publish`)}
        color="primary" variant="outlined" style={{ width: '150px', margin: '5px'}}>
            Create Articles
        </Button>
      </Card>
    </div>
  )
}

export default Home