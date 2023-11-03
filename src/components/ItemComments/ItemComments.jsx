import { Input } from "antd";

import styles from "./ItemComments.module.css";

const { TextArea } = Input;

export function ItemComments() {
  return (
    <div className={styles.itemComments}>
      <div className={styles.itemCommentsLabel}>Comments</div>
      <TextArea
        className="mb-5"
        maxLength={200}
        autoSize={{
          minRows: 6,
        }}
      />
    </div>
  );
}
