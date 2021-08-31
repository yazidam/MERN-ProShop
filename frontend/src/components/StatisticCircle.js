import React from "react";
import "antd/dist/antd.css";
import { Card, Avatar } from "antd";
import { StatisticCardContainer } from "../styles/styled";
import { theme } from "../colorConstants/colors";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { TeamOutlined, TransactionOutlined } from "@ant-design/icons";

function AdminStatisticCard({ data, title }) {
  const { secondary } = theme;
  return (
    <StatisticCardContainer>
      <Card id="card">
        <p style={{ padding: "inherit", fontSize: "large" }}>
          <Avatar
            shape="square"
            style={{
              backgroundColor: secondary,

              borderRadius: 24,
              color: "#090702",
            }}
            size={61}
            icon={<TeamOutlined />}
          />
        </p>
        <div className="data">
          <span id="value">{data}</span>
        </div>

        <span id="title"> {title}</span>
      </Card>
    </StatisticCardContainer>
  );
}

export default AdminStatisticCard;
