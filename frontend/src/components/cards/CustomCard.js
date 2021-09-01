import styled from "styled-components";
import { Card } from "antd";
export const CustomCard = styled(Card)`
  width: 100%;
  height: 400px;
  margin-top: 64px;
  margin-bottom: 64px;
  background: #ffffff;
  background-color: #f8f9fb;
  box-shadow: -1px 13px 17px rgba(0, 0, 0, 0.06);
  border-radius: 50px;
  border: transparent;

  &:hover {
    background-color: #f8f9fb;
    -webkit-box-shadow: 3px 5px 27px -5px rgba(0, 0, 0, 0.59);
    box-shadow: 3px 5px 27px -5px rgba(0, 0, 0, 0.59);
    transition: box-shadow 0.5s ease-in-out;
    background-color: #f8f9fb;
  }
`;
