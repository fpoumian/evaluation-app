import { Input } from "antd";

import styles from "./ItemComments.module.css";

const { TextArea } = Input;

export function ItemComments(props) {
  const { comments = "", onCommentsTextAreaChange } = props;
  return (
    <div className={styles.itemComments}>
      <div className={styles.itemCommentsLabel}>Comments</div>
      <TextArea
        className="mb-5"
        maxLength={200}
        value={comments}
        autoSize={{
          minRows: 6,
        }}
        onChange={onCommentsTextAreaChange}
      />
    </div>
  );
}
