import React from "react";
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../../constants.js";
import Moralis from "moralis";
import { Form, Input, InputNumber, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function CreateGuild() {
  const createGuild = async (guildName, file, maxMembers) => {
    const ipfsFile = new Moralis.File(file[0].name, file[0].originFileObj);
    await ipfsFile.saveIPFS();
    console.log(ipfsFile);
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
    console.log(transaction);
  };

  const handleSubmit = async (values) => {
    const { guildName, file, maxMembers } = values;
    try {
      await createGuild(guildName, file, maxMembers);
    } catch (e) {
      console.log(e);
    }
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      <Form
        name="validate_other"
        onFinish={handleSubmit}
        initialValues={{
          "input-number": 3,
        }}
      >
        <Form.Item label="Plain Text">
          <span className="ant-form-text">Create Guild</span>
        </Form.Item>

        <Form.Item name="guildName" label="Guild-Name">
          <Input placeholder="input placeholder" />
        </Form.Item>

        <Form.Item label="Max-Guild-Members">
          <Form.Item name="maxMembers" noStyle>
            <InputNumber min={1} max={10000} />
          </Form.Item>
          <span className="ant-form-text"> Max guild members</span>
        </Form.Item>

        <Form.Item
          name="file"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="Upload to IPFS"
        >
          <Upload name="logo" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
