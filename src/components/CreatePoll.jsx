import React, { useState } from "react";
import { createProposal } from "../utils/snapshot/index";
import { Form, Input, Button, DatePicker, Card, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useMoralisWeb3Api } from "react-moralis";
import { Popup } from "./Popup";

const styles = {
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
    alignText: "center",
  },
  title: {
    alignText: "center",
  },
};

export default function CreatePoll(props) {
  const address = props.members;
  const Web3Api = useMoralisWeb3Api();
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");

  const handleSubmit = async (values) => {
    try {
      const timestamp = Math.round(new Date().getTime() / 1000);

      const fetchDateToBlock = async () => {
        const options = { chain: "rinkeby", date: timestamp };
        const date = await Web3Api.native.getDateToBlock(options);
        return date.block;
      };

      const currentBlock = await fetchDateToBlock();

      const { title, body, date, choices } = values;
      const res = await createProposal(
        title,
        body,
        date,
        choices,
        currentBlock,
        address,
      );
      if (res) {
        setContent("Poll Created!");
        setShow(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Space
      direction="horizontal"
      style={{ width: "100%", justifyContent: "center" }}
    >
      <Popup show={show} content={content} />
      <Card style={styles.card} title={"Create a poll"}>
        <Form name="dynamic_form_item" onFinish={handleSubmit}>
          <Form.Item name="title" label="Title">
            <Input placeholder="Poll title" />
          </Form.Item>

          <Form.Item name="body" label="Body">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="date" label="Date">
            <DatePicker showTime />
          </Form.Item>

          <Form.Item>
            <p className="ant-form-text">Choices:</p>
          </Form.Item>

          <Form.Item extra="Enter poll choices up to 10">
            <Form.List
              name="choices"
              initialValue={["A", "B"]}
              rules={[
                {
                  validator: async (_, choices) => {
                    if (!choices || choices.length < 2) {
                      return Promise.reject(new Error("At least 2 choices"));
                    }

                    if (!choices || choices.length > 10) {
                      return Promise.reject(
                        new Error("No more then 10 choices"),
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input a poll choice or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="choice" style={{ width: "80%" }} />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "60%" }}
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );
}
