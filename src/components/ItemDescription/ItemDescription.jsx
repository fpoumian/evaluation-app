import { Row, Col, Typography, Rate, Flex } from "antd";
import PropTypes from "prop-types";

import styles from "./ItemDescription.module.css";

const { Title, Paragraph } = Typography;

export function ItemDescription(props) {
  const { title, description, pictureRating, onPictureRatingChange } = props;
  return (
    <>
      <Row display="flex" align="middle">
        <Col span={10}>
          <Title level={2}>{title}</Title>
        </Col>
        <Col span={13} pull={1}>
          <Flex justify="flex-end">
            <Rate
              allowClear={false}
              style={{ fontSize: "40px" }}
              onChange={onPictureRatingChange}
              value={pictureRating}
            />
          </Flex>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Paragraph className={styles.itemDescriptionText}>
            {description}
          </Paragraph>
        </Col>
      </Row>
    </>
  );
}

ItemDescription.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  pictureRating: PropTypes.number.isRequired,
  onPictureRatingChange: PropTypes.func.isRequired,
};

ItemDescription.defaultProps = {
  title: "",
  description: "",
};
