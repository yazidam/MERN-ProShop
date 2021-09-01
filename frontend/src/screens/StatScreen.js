import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { TeamOutlined } from "@ant-design/icons";
import { listUsers } from "../actions/userActions";
import { listProducts } from "../actions/producutActions";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import ListAltIcon from "@material-ui/icons/ListAlt";

// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { statUser } from "../actions/userActions";
import Loader from "../components/Loader";
import "../styles/stat.css";

import { AdminDashboardContainer } from "../components/AdminDashboardContainer";

import AdminStatisticCard from "../components/StatisticCircle";
import { CustomCard } from "../components/cards/CustomCard";
const StatScreen = () => {
  const dispatch = useDispatch();

  const userStat = useSelector((state) => state.userStat);
  const { stat, loading } = userStat;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const productList = useSelector((state) => state.productList);
  const { productNumber } = productList;

  const userss = users ? Object.values(users) : []; //The Object.values() method returns an array of a given object's own enumerable property values
  const numberOgUsers = userss.length;

  const numberOfProducts = productNumber?.map((x) => x.id);
  console.log("numberOfProducts", numberOfProducts);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const a = stat?.map((x) => x._id);
  const r = Object.assign([], a);
  console.log("r", r);
  console.log("aa", a);

  const b = stat?.map((x) => x.avregePriceGroupeBynumReviews.toFixed(2));
  console.log("bb", b);

  const options = {
    chart: {
      id: "apexchart-example",
    },
    yaxis: {
      title: {
        text: "avrege Price Groupe By number of Reviews",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },

    xaxis: {
      title: {
        text: "Reviews Number",
      },
      categories: r,
    },
  };
  const series = [
    {
      name: "AVG PRIX",
      data: b,
    },
  ];
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      // axios.get("/api/products/topproduct").then((res) => {
      //   setY(res.data);
      //   console.log("ress", res.data); //mahouch yjib f console 5ather 7atit protect f backend
      //   console.log("ojjjj");
      // });
      dispatch(listUsers());

      dispatch(statUser());
      dispatch(listProducts());
    }
  }, [userInfo, dispatch]);
  return (
    <>
      <div
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   margin: "150px",
      //   backgroundColor: "#f8f9fb",
      //   borderRadius: "20px",
      // }}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <marquee scrollamount="6">
              <div
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "50px",
                  fontFamily: "inherit",
                  fontStyle: "normal",
                  // backgroundColor: "#f8f9fb",
                }}
              >
                bienvenue à votre espace
              </div>
            </marquee>

            <AdminDashboardContainer>
              {/* <StatisticCircle
          data={2}
          labels={labels}
          text="Total des Utilisateurs"
          icon={<TeamOutlined />}
        /> */}
              <AdminStatisticCard
                title={"Total des Utilisateurs"}
                icon={<TeamOutlined />}
                data={numberOgUsers}
              />
              <AdminStatisticCard
                title={"Total des Orders"}
                icon={<ListAltIcon />}
                data={numberOgUsers}
              />{" "}
              <AdminStatisticCard
                title={"Total des Produits"}
                icon={<ShoppingCartOutlinedIcon />}
                data={numberOfProducts}
              />
            </AdminDashboardContainer>
          </>
        )}
      </div>
      {console.log("yyy", stat)}
      <div className="bb ">
        <CustomCard>
          <div>
            <ReactApexChart
              // className="bb"
              options={options}
              series={series}
              type="line"
              // width={1000}
              height={350}
            />
          </div>
        </CustomCard>
      </div>
    </>
  );
};

export default StatScreen;
