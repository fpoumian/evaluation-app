import { Row, Col, Card } from "antd";
import { AuthForm } from "components/AuthForm/AuthForm";

export function AuthPage() {
  return (
    <div>
      <Row justify="center" align="middle" className="mt-16">
        <Col span={6}>
          <Card>
            <AuthForm />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
