import { Row, Col, Typography, Rate, Flex } from "antd";

import styles from "./ItemDescription.module.css";

const { Title, Paragraph } = Typography;

export function ItemDescription() {
  return (
    <>
      <Row display="flex" align="middle">
        <Col span={10}>
          <Title level={2}>Beautiful View of Moraine Lake</Title>
        </Col>
        <Col span={13} pull={1}>
          <Flex justify="flex-end">
            <Rate style={{ fontSize: "40px" }} />
          </Flex>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Paragraph className={styles.itemDescriptionText}>
            A landscape lake is a serene and picturesque body of water nestled
            amidst the beauty of the natural world. It is often characterized by
            its stunning visual appeal, with crystal-clear waters reflecting the
            surrounding landscape. The lake is typically framed by a variety of
            natural elements, creating a harmonious and tranquil scene.
          </Paragraph>
        </Col>
      </Row>
    </>
  );
}
