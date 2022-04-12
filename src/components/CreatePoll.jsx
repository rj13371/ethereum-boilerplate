import React from "react";
import { createProposal } from "../utils/snapshot/index";
import { Form, Input, Button, DatePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useMoralisWeb3Api } from "react-moralis";

export default function CreatePoll() {
  const Web3Api = useMoralisWeb3Api();
  const handleSubmit = async (values) => {
    try {
      console.log(values);
      const timestamp = Math.round(new Date().getTime() / 1000);

      const fetchDateToBlock = async () => {
        const options = { chain: "rinkeby", date: timestamp };
        const date = await Web3Api.native.getDateToBlock(options);
        return date.block;
      };

      const currentBlock = await fetchDateToBlock();

      const { title, body, date, choices } = values;
      await createProposal(title, body, date, choices, currentBlock);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Form name="dynamic_form_item" onFinish={handleSubmit}>
        <Form.Item name="title" label="Poll title">
          <Input placeholder="Poll title" />
        </Form.Item>

        <Form.Item name="body" label="body">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="date" label="date">
          <DatePicker showTime />
        </Form.Item>
        <Form.Item>
          <Form.List
            name="choices"
            rules={[
              {
                validator: async (_, choices) => {
                  if (!choices || choices.length < 2) {
                    return Promise.reject(new Error("At least 2 choices"));
                  }

                  if (!choices || choices.length > 10) {
                    return Promise.reject(new Error("No more then 10 choices"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={index === 0 ? "Choices" : ""}
                    required={false}
                    key={field.key}
                  >
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
                      <Input placeholder="choice" style={{ width: "60%" }} />
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
    </>
  );
}
