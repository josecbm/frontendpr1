import React, {Component , useState} from 'react';
import axios from "axios"
import { useEffect } from "react";
import Chart from "chart.js";
import interval from "react-interval";

export default function Graph(){
    useEffect(() => {
        const ctx = document.getElementById("myChart");
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
              {
                label: "# of Votes",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  "Red",
                  "Blue",
                  "Yellow",
                  "Green",
                  "Purple",
                  "Orange"
                ],
                borderColor: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                borderWidth: 1
              }
            ]
          }
        });
      });
      return (
        
        <div className="App">
            <h1>Grafica</h1>
            <canvas id="myChart" width="800" height="800" />
        </div>
      );
}