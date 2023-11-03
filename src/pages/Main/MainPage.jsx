import { Row, Col } from "antd";
import { Header } from "components/Header/Header";
import { Sidebar } from "components/Sidebar/Sidebar";
import { Content } from "components/Content/Content";

export const MainPage = () => {
  return (
    <div>
      <Row>
        <Col span={24}>
          <Header />
        </Col>
      </Row>
      <Row gutter={16} justify="center">
        <Col span={6}>
          <Sidebar />
        </Col>
        <Col span={10}>
          <Content />
        </Col>
      </Row>
    </div>
  );
};
