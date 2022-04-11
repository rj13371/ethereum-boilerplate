import React from "react";
import createProposal from "../utils/snapshot/index";
import { Form, Input, Button, DatePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function CreatePoll() {
  const handleSubmit = async (values) => {
    try {
      console.log(values);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Form name="dynamic_form_item" onFinish={handleSubmit}>
        <Form.Item name="pollName" label="Poll Name">
          <Input placeholder="Poll Name" />
        </Form.Item>

        <Form.Item name="description" label="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <DatePicker showTime name="date" />
        </Form.Item>
        <Form.List
          name="names"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 2) {
                  return Promise.reject(new Error("At least 2 passengers"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? "Passengers" : ""}
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
                          "Please input passenger's name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="passenger name"
                      style={{ width: "60%" }}
                    />
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
