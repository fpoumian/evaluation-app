import { useEffect, useState, useMemo } from "react";
import { Row, Col } from "antd";
import { Header } from "components/Header/Header";
import { Sidebar } from "components/Sidebar/Sidebar";
import { Content } from "components/Content/Content";
import keyBy from "lodash/keyBy";
import get from "lodash/get";

import { db } from "config/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export const MainPage = () => {
  const [pictureList, setPictureList] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);

  const pictureCollectionRef = collection(db, "pictures");

  useEffect(() => {
    const colQuery = query(pictureCollectionRef, orderBy("createdAt", "desc"));
    return onSnapshot(colQuery, (snapshot) => {
      const filteredData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPictureList(filteredData);
    });
  }, []);

  useEffect(() => {
    if (!selectedPicture && pictureList.length > 0) {
      setSelectedPicture(pictureList[0].id);
    }
  }, [pictureList, selectedPicture]);

  const picturesDict = useMemo(() => {
    if (!pictureList || !pictureList.length) {
      return {};
    }
    return keyBy(pictureList, "id");
  }, [pictureList]);

  const handlePreviewCardClick = (pictureId) => {
    setSelectedPicture(pictureId);
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <Header />
        </Col>
      </Row>
      <Row gutter={16} justify="center">
        <Col span={6}>
          <Sidebar
            onPreviewCardClick={handlePreviewCardClick}
            pictureList={pictureList}
          />
        </Col>
        <Col span={10}>
          <Content picture={get(picturesDict, selectedPicture, null)} />
        </Col>
      </Row>
    </div>
  );
};
