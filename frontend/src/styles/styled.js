import styled from "styled-components";

export const StatisticCardContainer = styled.div`
  margin: 8px;
  max-height: 653;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-width: 180px;
  border-radius: 5%;
  transition: 0.5s ease-in-out;
  background-color: #f8f9fb;
  &:hover {
    background-color: #f8f9fb;
    -webkit-box-shadow: 3px 5px 27px -5px rgba(0, 0, 0, 0.59);
    box-shadow: 3px 5px 27px -5px rgba(0, 0, 0, 0.59);
    transition: box-shadow 0.5s ease-in-out;
    background-color: #f8f9fb;
  }

  #card {
    color: black;
    border: 2px solid transparent;
    width: auto !important;
    background-color: #f8f9fb;
    height: 650px;
    border-radius: 21px;
  }

  #title {
    font-size: 20px;
    text-align: center;
    background-color: #f8f9fb;

    font-style: normal;
    font-size: 35px;
    font-family: Inter;
  }

  #value {
    font-size: 200px;
    text-align: center;

    font-weight: bold;
    color: #ff720d;
    background-color: #f8f9fb;
  }
  .data {
    height: 400px;
  }
  @media only screen and (max-width: 1480px) {
    .data {
      height: 380px;
    }
    #title {
      font-size: 30px;
    }
    #value {
      font-size: 140px;
    }
  }
  @media only screen and (max-width: 750px) {
    //small sreen
    .data {
      height: 215px;
    }
    #title {
      font-size: 16px;
    }
    #value {
      font-size: 115px;
    }
    #card {
      height: unset;
    }
    width: 300px;
    margin: auto;
    margin-bottom: 14px;
  }
`;
