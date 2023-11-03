
import { Row, Col } from 'antd';
import { Header } from 'components/Header/Header';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { Content } from 'components/Content/Content';

export const MainPage = () => {
    return (
        <div>
            <Row>
                <Col span={24}>
                    <Header />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col flex="394px" className="ml-5">
                    <Sidebar />
                </Col>
                <Col flex="auto">
                    <Content />
                </Col>
            </Row>
        </div>
    )
}