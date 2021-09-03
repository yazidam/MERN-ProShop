import styled from "styled-components";

export const UsersContainer = styled.div`
  width: 100%;
  .ant-card-body {
    padding: 8px;
  }
  .content .ant-avatar {
    cursor: pointer;
  }
`;
export const InfoUser = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .banner {
    margin-top: 4px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    box-sizing: border-box;
  }
  .avatar {
    background-color: #fff;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
    //transform: translateY(50%);
    transition: transform 200ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }

  h2 {
    cursor: pointer;
  }
  .follow-info h2 {
    cursor: default;
  }
  h2.name {
    text-align: center;
    padding: 0 2rem 0.5rem;
    margin: 0;
    margin-top: 0.5rem;
  }
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #a0a0a0;
    font-size: 0.85rem;
    text-align: center;
    padding: 0 2rem 1.2rem;
  }
  .title span {
    margin-left: 0.5rem;
  }
  .actions {
    //padding: 0 2rem 1.2rem;
    display: flex;
    flex-direction: column;
    order: 99;
  }
  .actions .follow-info {
    padding: 0 0 1rem;
    display: flex;
  }
  .actions .follow-info h2 {
    text-align: center;
    width: 50%;
    margin: 0;
    box-sizing: border-box;
  }
  .actions .follow-info h2 > span {
    text-decoration: none;
    padding: 0.8rem;
    display: flex;
    flex-direction: column;
    border-radius: 0.8rem;
    transition: background-color 100ms ease-in-out;
  }
  .actions .follow-info h2 > span span {
    color: #1c9eff;
    font-weight: bold;
    transform-origin: bottom;
    transform: scaleY(1.3);
    transition: color 100ms ease-in-out;
  }
  .actions .follow-info h2 > span small {
    color: #afafaf;
    font-size: 0.85rem;
    font-weight: normal;
  }
  .actions .follow-info h2 > span:hover {
    background-color: #f2f2f2;
  }
  .actions .follow-info h2 > span:hover span {
    color: #007ad6;
  }
  .desc {
    text-align: justify;
    padding: 0 2rem 2.5rem;
    order: 100;
  }
`;
