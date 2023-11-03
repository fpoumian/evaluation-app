import { Card, Typography } from "antd";

const { Title } = Typography;

export function Header() {
  return (
    <Card className="mt-5 mb-5">
      <Title level={5} strong className="mt-0">
        Hello Gaby!
      </Title>
      <Title level={3} className="mb-0">
        Welcome to the Evaluation App!
      </Title>
    </Card>
  );
}
