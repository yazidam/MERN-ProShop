import styled from "styled-components";
export const AdminDashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 100%;

  .admin-dashbord:first-child {
    margin-top: 30px;
  }
  @media only screen and (max-width: 913px) {
    display: block;
    width: fit-content;
    margin: auto;
  }
`;
