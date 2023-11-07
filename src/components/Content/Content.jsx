import { Card, Flex, Image, Divider, Button, message } from "antd";
import { ItemDescription } from "components/ItemDescription/ItemDescription";
import { ItemComments } from "components/ItemComments/ItemComments";
import { AllComments } from "components/AllComments/AllComments";
import PropTypes from "prop-types";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "config/firebase";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "App";

export function Content(props) {
  const { picture } = props;

  const { user } = useContext(AppContext);
  const [messageApi, contextHolder] = message.useMessage();

  const [pictureRating, setPictureRating] = useState(0);
  const [pictureComments, setPictureComments] = useState("");
  const [allPictureComments, setAllPictureComments] = useState([]);

  let pictureDocRef = null;
  let pictureCommentsCollectionRef = null;

  if (picture) {
    pictureDocRef = doc(db, "pictures", picture.id);
    pictureCommentsCollectionRef = collection(pictureDocRef, "comments");
  }

  useEffect(() => {
    if (!pictureCommentsCollectionRef) return;
    const colQuery = query(
      pictureCommentsCollectionRef,
      orderBy("createdAt", "desc"),
    );
    return onSnapshot(colQuery, (snapshot) => {
      const filteredData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllPictureComments(filteredData);
    });
  }, [picture]);

  const handlePictureRatingChange = (newRatingValue) => {
    setPictureRating(newRatingValue);
  };

  const handleCommentsTextAreaChange = (event) => {
    setPictureComments(event?.target.value);
  };
  const handleSubmitBtnClick = async () => {
    try {
      const docData = {
        email: user?.email,
        userId: user?.userId,
        rating: pictureRating,
        comments: pictureComments,
        createdAt: Timestamp.now(),
      };
      const result = await addDoc(pictureCommentsCollectionRef, docData);
      const parentCollectionRef = result?.parent.parent;
      const previousRatingsAggr =
        allPictureComments.length > 0
          ? allPictureComments.reduce((acc, item) => acc + item.rating, 0)
          : 0;
      const newRatingAggr = previousRatingsAggr + pictureRating;
      const newPictureAvgRating =
        allPictureComments.length > 0
          ? newRatingAggr / (allPictureComments.length + 1)
          : pictureRating;

      await updateDoc(parentCollectionRef, {
        avgRating: newPictureAvgRating,
      });
      messageApi.open({
        type: "success",
        content: "Comments submitted!",
      });
      setPictureRating(0);
      setPictureComments("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {contextHolder}
      <main>
        <Card loading={!picture}>
          <Flex vertical justify="space-between">
            <div>
              {picture?.pictureUrl && (
                <Image src={picture.pictureUrl} placeholder={true} />
              )}
            </div>
            <div className="mb-5">
              <ItemDescription
                onPictureRatingChange={handlePictureRatingChange}
                pictureRating={pictureRating}
                title={picture?.title}
                description={picture?.description}
              />
            </div>
            <div>
              <ItemComments
                comments={pictureComments}
                onCommentsTextAreaChange={handleCommentsTextAreaChange}
              />
            </div>
            <div>
              <Button
                type="primary"
                size="large"
                block
                onClick={handleSubmitBtnClick}
                disabled={!pictureRating}
              >
                Submit
              </Button>
            </div>
            <div className="mt-16">
              <Divider orientation="left">All Users Comments:</Divider>
              <AllComments comments={allPictureComments || []} />
            </div>
          </Flex>
        </Card>
      </main>
    </>
  );
}

Content.propTypes = {
  picture: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
  }).isRequired,
};
