import { Card, Typography, Button } from 'antd'
import styles from './Header.module.css';

const { Title, Text } = Typography;

export function Header() {
    return (
        <Card className='mt-2 mb-3'>
            <Text strong>Hello Gaby!</Text>
            <Title level={4}>Welcome to the Evaluation App!</Title>
        </Card>
    )
}