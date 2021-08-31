import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { statUser } from "../actions/userActions";
import Loader from "../components/Loader";
import "../styles/stat.css";
const StatScreen = () => {
  const dispatch = useDispatch();

  const userStat = useSelector((state) => state.userStat);
  const { stat, loading, error } = userStat;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const a = stat?.map((x) => x._id);
  const r = Object.assign([], a);
  console.log("r", r);
  console.log("aa", a);

  const b = stat?.map((x) => x.avregePriceGroupeBynumReviews.toFixed(2));
  console.log("bb", b);

  // const xx = Array.isArray(a);
  // console.log("xx", xx);
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
      dispatch(statUser());
    }
  }, [userInfo, dispatch]);
  return (
    <>
      <div
        className="bb "
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
          <ReactApexChart
            // className="bb"
            options={options}
            series={series}
            type="bar"
            width={450}
            height={500}
          />
        )}
      </div>
      {console.log("yyy", stat)}
    </>
  );
};

export default StatScreen;
