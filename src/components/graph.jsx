import React, { Component, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Chart from "chart.js";
import interval from "react-interval";

export default function Graph() {
  const [data, setData] = useState([
    { tiempo: 0, Total: 0, Libre: 0, Utilizada: 0, Porcentaje: 0 },
  ]);
  let interval;
  let segundos = 0;

  useEffect(() => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((d) => d.tiempo),
        datasets: [
          {
            label: "Total",
            data: data.map((d) => d.Porcentaje),
            backgroundColor: ["Red"],
            borderColor: ["Red"],
            borderWidth: 1,
          },
          {
            label: "Libre",
            data: data.map((d) => d.Libre),
            backgroundColor: ["Blue"],
            borderColor: ["Blue"],
            borderWidth: 1,
          },
          {
            label: "Utilizada",
            data: data.map((d) => d.Utilizada),
            backgroundColor: ["Green"],
            borderColor: ["Green"],
            borderWidth: 1,
          },
        ],
      },
    });
  });

  const setInfo = (info) => {
    data.push({
      tiempo: segundos,
      Porcentaje: info.Porcentaje,
      Utilizada: info.Utilizada,
      Libre: info.Libre,
    });
    segundos = segundos + 3;
    setData([...data]);
  };

  const getInterval = async () => {
    let response = await axios
      .get("http://3.18.225.89:3000/getMem")
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
    setInfo(response);
  };
  useEffect(() => {
    interval = setInterval(() => getInterval(), 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="App">
      <h1>Grafica</h1>
      <canvas id="myChart" width="800" height="800" />
    </div>
  );
}
