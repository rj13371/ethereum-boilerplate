import React, { useState } from "react";
import { Popup } from "components/Popup.jsx";
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../../constants.js";
import Moralis from "moralis";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Card,
  Row,
  Col,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const styles = {
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
};

export default function CreateGuild() {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");

  const createGuild = async (guildName, file, maxMembers) => {
    setShow(false);
    const ipfsFile = new Moralis.File(file[0].name, file[0].originFileObj);
    await ipfsFile.saveIPFS();
    const fileURL = ipfsFile._ipfs;

    const sendOptions = {
      contractAddress: NFT_CONTRACT_ADDRESS,
      abi: NFT_CONTRACT_ABI,
      functionName: "createGuild",
      chain: "rinkeby",
      params: {
        guildName: guildName,
        guildNFTURI: fileURL,
        maxGuildMembers: maxMembers,
      },
    };

    const transaction = await Moralis.executeFunction(sendOptions);
    if (transaction) {
      setContent("Transaction sent! Guild creation pending...");
      setShow(true);
    }
  };

  const handleSubmit = async (values) => {
    const { guildName, file, maxMembers } = values;
    try {
      await createGuild(guildName, file, maxMembers);
    } catch (e) {
      console.log(e);
    }
  };

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Space
      direction="horizontal"
      style={{ width: "100%", justifyContent: "center" }}
    >
      <Popup show={show} content={content} />
      <Card style={styles.card} title={"Create Guild"}>
        <Form
          name="validate_other"
          onFinish={handleSubmit}
          initialValues={{
            "input-number": 3,
          }}
        >
          <Form.Item name="guildName" label="Guild-Name">
            <Input placeholder="Guild Name" />
          </Form.Item>

          <Form.Item label="Max-Guild-Members">
            <Form.Item name="maxMembers" noStyle>
              <InputNumber min={1} max={10000} />
            </Form.Item>
          </Form.Item>
          <Row>
            <Col>
              <Form.Item
                name="file"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="Upload Guild Logo to IPFS"
              >
                <Upload
                  customRequest={dummyRequest}
                  name="logo"
                  listType="picture"
                  accept="image/*"
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Space>
  );
}
