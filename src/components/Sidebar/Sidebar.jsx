import { Space, Typography } from "antd";
import styles from './Sidebar.module.css'
import { PreviewCard } from "components/PreviewCard/PreviewCard";

const { Text } = Typography;

export function Sidebar() {
    return (
        <aside>
            <Space
                className={styles.sidebarSpace}
                direction="vertical"
                size="middle"
        >
                <Text strong className={styles.sidebarInstructionText}>
                    Select the cards in order to evaluate them
                </Text>
                <PreviewCard
                    title="Beautiful View of Moraine Lake"
                    avgRating={3}
                />
                <PreviewCard
                    title="Watercolor Painting"
                    avgRating={5}
                />
            </Space>
        </aside>
    )
}