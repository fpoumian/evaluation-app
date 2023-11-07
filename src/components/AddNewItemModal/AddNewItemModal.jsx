import { Modal, Button, Form, Input, Upload } from "antd";
import kebabCase from "lodash/kebabCase";
import { v4 } from "uuid";
import { db, storage } from "config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import get from "lodash/get";
import PropTypes from "prop-types";

import { PlusOutlined } from "@ant-design/icons";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export function AddNewItemModal(props) {
  const { visible, onCancel, onSuccess } = props;
  const [form] = Form.useForm();
  const pictureCollectionRef = collection(db, "pictures");

  const handleSubmitBtnClick = async () => {
    try {
      const values = await form.validateFields();
      const { picture, title, description } = values;
      const fileName = `${kebabCase(title)}-${v4()}`;
      const imageRef = ref(storage, `images/${fileName}`);
      const fileToUpload = get(picture, ["0", "originFileObj"], null);
      const snapshot = await uploadBytes(imageRef, fileToUpload);
      const fullPathUrl = await getDownloadURL(snapshot.ref);

      const docData = {
        title,
        description,
        avgRating: 0,
        pictureUrl: fullPathUrl,
        createdAt: Timestamp.now(),
      };

      const result = await addDoc(pictureCollectionRef, docData);

      if (result.id) {
        alert("Success!");
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (e) {
      console.log(e.code);
      console.error(e);
    }
  };

  return (
    <Modal open={visible} footer={null} onCancel={onCancel}>
      <div className="px-10 my-2">
        <Form form={form} layout="vertical">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please add a title for this picture",
              },
            ]}
            label="Title"
            required
            name="title"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please add a description for this picture",
              },
            ]}
            label="Description"
            required
            name="description"
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Upload Picture"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            name="picture"
            rules={[
              {
                required: true,
                message: "Please add the picture you wish to submit",
              },
            ]}
          >
            <Upload
              multiple={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              accept="image/png"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              block
              size="large"
              type="primary"
              onClick={handleSubmitBtnClick}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

AddNewItemModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
