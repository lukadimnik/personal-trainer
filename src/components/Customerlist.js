import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Addcustomer from "./Addcustomer";
import Editcustomer from "./Editcustomer";

const Customerlist = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch(`https://customerrest.herokuapp.com/api/customers`)
      .then(response => response.json())
      .then(data => setCustomers(data.content));
  };

  const deleteCustomer = link => {
    if (window.confirm("Are you sure?")) {
      fetch(link, { method: "DELETE" })
        .then(response => fetchData())
        .catch(err => console.error(err));
    }
  };

  const saveCustomer = customer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then(res => fetchData())
      .catch(err => console.error(err));
  };

  const editCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then(res => fetchData())
      .catch(err => console.error(err));
  };

  const columns = [
    {
      Header: "Firstname",
      accessor: "firstname"
    },
    {
      Header: "Lastname",
      accessor: "lastname"
    },
    {
      Header: "Street",
      accessor: "streetaddress"
    },
    {
      Header: "Postcode",
      accessor: "postcode"
    },
    {
      Header: "City",
      accessor: "city"
    },
    {
      Header: "Email",
      accessor: "email"
    },
    {
      Header: "Phone",
      accessor: "phone"
    },
    {
      sortable: false,
      filterable: false,
      width: 100,
      Cell: row => (
        <Editcustomer customer={row.original} editCustomer={editCustomer} />
      )
    },
    {
      sortable: false,
      filterable: false,
      width: 100,
      Cell: row => (
        <Button
          color="secondary"
          size="small"
          variant="contained"
          onClick={() => deleteCustomer(row.original.links[1].href)}
        >
          Delete
        </Button>
      )
    }
  ];

  return (
    <div>
      <h1>Customer List</h1>
      <Addcustomer saveCustomer={saveCustomer} />
      <ReactTable
        data={customers}
        columns={columns}
        sortable={true}
        filterable={true}
      />
    </div>
  );
};

export default Customerlist;
