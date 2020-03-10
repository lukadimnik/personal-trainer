import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import _ from "lodash";

const Statistics = props => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`https://customerrest.herokuapp.com/gettrainings`)
      .then(response => response.json())
      .then(data => {
        const arrayOfActivities = data.map(training => ({
          activity: training.activity,
          duration: training.duration
        }));

        // group activites based on type of activity
        const groupArray = _.groupBy(arrayOfActivities, "activity");
        console.log("m", groupArray);
        // make an array of objects
        const arrayOfObjects = Object.keys(groupArray).map(
          key => groupArray[key]
        );
        console.log("x", arrayOfObjects);

        const durations = [];
        const activities = [];
        // iterate through the array of objects and make
        // two new arrays of summed up durations and activities
        let sum = 0;
        for (let i = 0; i < arrayOfObjects.length; i++) {
          for (let y = 0; y < arrayOfObjects[i].length; y++) {
            sum += arrayOfObjects[i][y].duration;
          }
          durations.push(sum);
          activities.push(arrayOfObjects[i][0].activity);
          sum = 0;
        }

        console.log("durations", durations);
        console.log("activities", activities);

        setChartData({
          labels: activities,
          datasets: [
            {
              label: "Durations",
              data: durations,
              backgroundColor: [
                "rgb(179, 217, 255)",
                "rgb(153, 255, 204)",
                "rgb(194, 214, 214)",
                "rgb(255, 255, 179)",
                "rgb(255, 194, 179)",
                "rgb(230, 179, 255)",
                "rgb(179, 236, 255)",
                "rgb(194, 214, 214)",
                "rgb(255, 255, 179)",
                "rgb(255, 194, 179)",
                "rgb(230, 179, 255)",
                "rgb(179, 236, 255)"
              ],
              borderWidth: 1,
              borderColor: "#777",
              hoverBorderWidth: 3,
              hoverBorderColor: "black"
            }
          ]
        });
      });
  };

  // const arrayOfActivities = props.chartData.map(training => ({
  //   activity: training.activity,
  //   duration: training.duration
  // }));

  // // group activites based on type of activity
  // const groupArray = _.groupBy(arrayOfActivities, "activity");
  // console.log("m", groupArray);
  // // make an array of objects
  // const arrayOfObjects = Object.keys(groupArray).map(key => groupArray[key]);
  // console.log("x", arrayOfObjects);

  // const durations = [];
  // const activities = [];
  // // iterate through the array of objects and make
  // // two new arrays of summed up durations and activities
  // let sum = 0;
  // for (let i = 0; i < arrayOfObjects.length; i++) {
  //   for (let y = 0; y < arrayOfObjects[i].length; y++) {
  //     sum += arrayOfObjects[i][y].duration;
  //   }
  //   durations.push(sum);
  //   activities.push(arrayOfObjects[i][0].activity);
  //   sum = 0;
  // }

  // console.log("durations", durations);
  // console.log("activities", activities);

  // const setChart = () => {
  //   setChartData({
  //     labels: activities,
  //     datasets: [
  //       {
  //         label: "Durations",
  //         data: durations,
  //         backgroundColor: [
  //           "rgb(179, 217, 255)",
  //           "rgb(153, 255, 204)",
  //           "rgb(194, 214, 214)",
  //           "rgb(255, 255, 179)",
  //           "rgb(255, 194, 179)",
  //           "rgb(230, 179, 255)",
  //           "rgb(179, 236, 255)",
  //           "rgb(194, 214, 214)",
  //           "rgb(255, 255, 179)",
  //           "rgb(255, 194, 179)",
  //           "rgb(230, 179, 255)",
  //           "rgb(179, 236, 255)"
  //         ],
  //         borderWidth: 1,
  //         borderColor: "#777",
  //         hoverBorderWidth: 3,
  //         hoverBorderColor: "black"
  //       }
  //     ]
  //   });
  // };

  return (
    <div>
      <h1>Statistics</h1>
      <div className="chart">
        {/* <button onClick={setChart}> Populate Chart</button> */}
        <Bar
          data={chartData}
          width={100}
          height={50}
          options={{
            title: {
              display: true,
              text: "Minutes in total per activity",
              fontSize: 25
            },
            legend: {
              display: false,
              position: "right"
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontSize: 20
                  }
                }
              ]
            }
          }}
        />
      </div>
    </div>
  );
};

export default Statistics;
