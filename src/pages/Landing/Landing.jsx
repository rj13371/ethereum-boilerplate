import React from "react";
import About from "./About";
import Hero from "./Hero";
import { Space } from "antd";

export default function Landing() {
  return (
    <Space size={"large"}>
      <Hero />
    </Space>
  );
}
