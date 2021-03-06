import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Addtraining from "./Addtraining";
import moment from "moment";
import Dialogbox from "./Dialogbox";

const Traininglist = () => {
  const [trainings, setTrainings] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`https://customerrest.herokuapp.com/gettrainings`)
      .then(response => response.json())
      .then(data => {
        setTrainings(data);
      });
  };

  const fetchCustomers = () => {
    fetch(`https://customerrest.herokuapp.com/api/customers`)
      .then(response => response.json())
      .then(data => setCustomers(data.content));
  };

  const deleteTraining = link => {
    fetch(link, { method: "DELETE" })
      .then(response => fetchData())
      .catch(err => console.error(err));
  };

  const saveTraining = training => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(training)
    })
      .then(res => fetchData())
      .catch(err => console.error(err));
  };

  const columns = [
    {
      Header: "Activity",
      accessor: "activity"
    },
    {
      Header: "Duration",
      accessor: "duration"
    },
    {
      Header: "Date",
      accessor: "date",
      Cell: row => <span>{moment(row.value).format("MMM Do YY")}</span>
    },
    {
      Header: "Customer",
      accessor: "customer",
      Cell: row => (
        <span>
          {row.original.customer.firstname} {row.original.customer.lastname}
        </span>
      )
    },
    {
      sortable: false,
      filterable: false,
      width: 100,
      Cell: row => (
        <Dialogbox
          deletionLink={`https://customerrest.herokuapp.com/api/trainings/${row.original.id}`}
          deleteCustomer={deleteTraining}
          title="Delete"
          description={`Are you sure you want to delete ${row.original.activity}?`}
        />
      )
    }
  ];

  return (
    <div>
      <h1>Training List</h1>
      <Addtraining saveTraining={saveTraining} customers={customers} />
      <ReactTable
        data={trainings}
        columns={columns}
        sortable={true}
        filterable={true}
      />
    </div>
  );
};

export default Traininglist;

// ,
//     {
//       sortable: false,
//       filterable: false,
//       width: 100,
//       Cell: row => (
//         <Button
//           color="secondary"
//           size="small"
//           variant="contained"
//           onClick={() => {
//             return deleteTraining(
//               `https://customerrest.herokuapp.com/api/trainings/${row.original.id}`
//             );
//           }}
//         >
//           Delete
//         </Button>
//       )
//     }
