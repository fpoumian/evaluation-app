import { Space, Typography, Skeleton } from "antd";
import styles from "./Sidebar.module.css";
import { PreviewCard } from "components/PreviewCard/PreviewCard";

const { Text } = Typography;

export function Sidebar(props) {
  const { pictureList, onPreviewCardClick } = props;

  return (
    <aside>
      <Space className={styles.sidebarSpace} direction="vertical" size="middle">
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
              thumbnail={item?.thumbnail}
            />
          ))}
      </Space>
    </aside>
  );
}
