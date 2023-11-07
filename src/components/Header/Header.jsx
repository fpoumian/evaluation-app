import { Card, Typography, Flex, Button } from "antd";
import { AppContext } from "App";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "config/firebase";

const { Title } = Typography;

export function Header() {
  const { user } = useContext(AppContext);

  const handleSignOutBtnClick = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card className="mt-5 mb-5">
      <Flex justify="space-between" align="center">
        <div>
          <Title level={5} strong className="mt-0">
            Hello {user?.email}
          </Title>
          <Title level={3} className="mb-0">
            Welcome to the Evaluation App!
          </Title>
        </div>
        <div>
          <Button onClick={handleSignOutBtnClick}>Log out</Button>
        </div>
      </Flex>
    </Card>
  );
}
