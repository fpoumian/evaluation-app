import { List, Avatar, Rate } from "antd";
import avatar from "./defaultavatar.png";
import PropTypes from "prop-types";
import { useMemo } from "react";

export function AllComments(props) {
  const { comments = [] } = props;
  const data = useMemo(() => {
    return comments.map((comment) => ({
      title: comment.email,
      content: comment.comments,
      rating: comment.rating,
    }));
  }, [comments]);
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => {
        return (
          <List.Item extra={<Rate disabled value={item.rating} />}>
            <List.Item.Meta
              avatar={<Avatar src={avatar} />}
              title={item.title}
              description={item.content}
            />
          </List.Item>
        );
      }}
    />
  );
}

AllComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
