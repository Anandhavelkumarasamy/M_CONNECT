import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { IoMdDownload } from "react-icons/io";
import { Table } from "antd"; // Import Ant Design's Table component
import { useToken } from "../../../Utility/Token";
import { historyreport } from "../../../Services/Services";

export default function HistoryReport() {
  const token = useToken();
  const [data, setData] = useState([]);

  useEffect(() => {
    handleFailureAnalysis();
  }, [token]);

  const handleFailureAnalysis = () => {
    let formdata = new FormData();
    formdata.append("token", token || "");
    historyreport(formdata)
      .then((response) => {
        console.log(response, "response");
        // Assuming response contains the table data
        if (response && response.data) {
          setData(response.data);
        } else {
          setData([]); // Set empty array if response is undefined or null
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData([]); // Set empty array in case of error
      });
  };

  // Define columns for the Ant Design table with custom render for Date
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: any, row: any, index: any) => {
        if (!row || !row.date || !data || !data.length) {
          return {
            children: null,
            props: { rowSpan: 0 },
          };
        }

        const date = row.date;
        // Only show the date on the first row of each group of the same date
        // if (index === 0 || data[index - 1]?.date !== date) {
        //   return {
        //     children: <span>{date}</span>,
        //     props: { rowSpan: data.filter(item => item.date === date).length },
        //   };
        // }
        return {
          children: null,
          props: { rowSpan: 0 },
        };
      },
    },
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "On Time",
      dataIndex: "onTime",
      key: "onTime",
    },
    {
      title: "Off Time",
      dataIndex: "offTime",
      key: "offTime",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
  ];

  // Sample data structure, replace with your actual data
  const sampleData = [
    {
      key: "1",
      date: "2024-09-23",
      sno: 1,
      type: "BOREWELL",
      onTime: "14:02 PM",
      offTime: "14:10 PM",
      duration: "0 hr 8 mins",
    },
    {
      key: "2",
      date: "2024-09-23",
      sno: 2,
      type: "BOREWELL",
      onTime: "11:28 AM",
      offTime: "11:37 AM",
      duration: "0 hr 9 mins",
    },
    {
      key: "3",
      date: "2024-09-23",
      sno: 3,
      type: "BOREWELL",
      onTime: "07:32 AM",
      offTime: "07:39 AM",
      duration: "0 hr 7 mins",
    },
    {
      key: "4",
      date: "2024-09-23",
      sno: 4,
      type: "EB",
      onTime: "00:00 AM",
      offTime: "-",
      duration: "17 hr 13 mins",
    },
    {
      key: "5",
      date: "2024-09-22",
      sno: 5,
      type: "BOREWELL",
      onTime: "18:51 PM",
      offTime: "18:58 PM",
      duration: "0 hr 7 mins",
    },
    {
      key: "6",
      date: "2024-09-22",
      sno: 6,
      type: "BOREWELL",
      onTime: "13:09 PM",
      offTime: "13:17 PM",
      duration: "0 hr 8 mins",
    },
    {
      key: "7",
      date: "2024-09-22",
      sno: 7,
      type: "BOREWELL",
      onTime: "06:49 AM",
      offTime: "06:57 AM",
      duration: "0 hr 8 mins",
    },
    {
      key: "8",
      date: "2024-09-22",
      sno: 8,
      type: "EB",
      onTime: "00:00 AM",
      offTime: "23:59 PM",
      duration: "23 hr 59 mins",
    },
    // Add more data as needed
  ];

  return (
    <div>
      <Row className="align-items-center">
        <Col lg={6} className="text-start">
          <h3>History Report</h3>
        </Col>
        <Col
          lg={6}
          className="text-end  d-flex align-items-center justify-content-end"
        >
          <Button className=" mx-4  bg-warning text-black d-flex align-items-center">
            Download
            <IoMdDownload />
          </Button>
          <Button className="rounded-5 bg-white text-black">
            <SearchOutlined />
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={sampleData}
        pagination={{ pageSize: 20 }}
      />
    </div>
  );
}
