import { Card, Flex, Rate, Typography } from "antd";
import PropTypes from "prop-types";
import styles from "./PreviewCard.module.css";

const { Text } = Typography;

export function PreviewCard(props) {
  const { title, avgRating, thumbnail, onClick, pictureId } = props;
  return (
    <Card
      onClick={() => onClick(pictureId)}
      className={styles.previewCard}
      bodyStyle={{ padding: "12px" }}
      hoverable
      cover={
        <img
          alt="placeholder"
          src={require(`../../assets/pictures/${thumbnail}`)}
        />
      }
    >
      <Flex justify="space-between" align="center">
        <Text strong>{title}</Text>
        <AverageRating rating={Number(avgRating).toFixed(2)} />
      </Flex>
    </Card>
  );
}

PreviewCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  avgRating: PropTypes.number.isRequired,
};

function AverageRating(props) {
  const { rating } = props;
  return (
    <div className={styles.averageRating}>
      <div>{rating}</div>
      <Rate disabled defaultValue={1} count={1} />
    </div>
  );
}

AverageRating.propTypes = {
  rating: PropTypes.string.isRequired,
};
