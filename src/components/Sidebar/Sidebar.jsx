import { Space, Typography, Skeleton, Button, message } from "antd";
import styles from "./Sidebar.module.css";
import { PreviewCard } from "components/PreviewCard/PreviewCard";
import { AddNewItemModal } from "components/AddNewItemModal/AddNewItemModal";
import { useState } from "react";

const { Text } = Typography;

export function Sidebar(props) {
  const { pictureList, onPreviewCardClick } = props;
  const [isAddNewItemVisible, setIsAddNewItemVisible] = useState(false);
  const { messageApi } = message.useMessage();

  const handleAddNewItemBtnClick = () => {
    setIsAddNewItemVisible(true);
  };

  const handleModalCancelClick = () => {
    setIsAddNewItemVisible(false);
  };

  const handleModalSuccess = () => {
    setIsAddNewItemVisible(false);
    messageApi.open({
      type: "success",
      content: "Pictured successfully submitted!",
    });
  };

  return (
    <>
      <aside>
        <Space
          className={styles.sidebarSpace}
          direction="vertical"
          size="middle"
        >
          <Text strong className={styles.sidebarInstructionText}>
            Select the cards in order to evaluate them
          </Text>
          {!pictureList?.length && <Skeleton active />}
          {pictureList?.length > 0 &&
            pictureList.map((item) => (
              <PreviewCard
                onClick={onPreviewCardClick}
                pictureId={item?.id}
                title={item?.title}
                avgRating={item?.avgRating}
                thumbnail={item?.pictureUrl}
              />
            ))}
          <Button
            block
            size="large"
            type="dashed"
            onClick={handleAddNewItemBtnClick}
          >
            Add New
          </Button>
        </Space>
      </aside>
      <AddNewItemModal
        visible={isAddNewItemVisible}
        onCancel={handleModalCancelClick}
        onSuccess={handleModalSuccess}
      />
    </>
  );
}
