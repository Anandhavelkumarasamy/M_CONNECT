import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Button, DatePicker, Space, Table } from "antd";
import classes from "./DashBoard.module.css";
import lightningimage from "../../Assests/Jpg/lightning.jpeg";
import { ColumnType } from "antd/es/table";
interface DataType {
  key: string;
  sno: string;
  date: string;
  startTime: string;
  endTime: string;
  reading: string;
  consumed: string;
  eb: string;
  sump: string;
  borewell: string;
}

export default function DashBoard() {
  const [chartOptions, setChartOptions] = useState({
    options: {
      colors: ["#6BB5B0"], // Color for the bars
      chart: {
        id: "basic-bar", // Chart identifier
        toolbar: {
          show: false, // Hide toolbar
        },
      },
      xaxis: {
        categories: [
          "2",
          "4",
          "6",
          "8",
          "10",
          "12",
          "14",
          "16",
          "18",
          "20",
          "22",
          "24",
        ], // X-axis categories
        title: {
          text: "Day", // X-axis title
        },
      },
      yaxis: {
        title: {
          text: "KWH", // Y-axis title (unit of data)
        },
      },
    },
    series: [
      {
        name: "Leads Data", // Name for the data series
        data: [30, 40, 45, 50, 49, 60, 70, 91, 75, 34, 56, 89], // The data itself
      },
    ],
  });

  const [chartsecondOptions, setChartsecondOptions] = useState({
    options: {
      colors: ["#FFDB58"],
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          "2",
          "4",
          "6",
          "8",
          "10",
          "12",
          "14",
          "16",
          "18",
          "20",
          "22",
          "24",
        ], // X-axis categories
        title: {
          text: "Day", // X-axis title
        },
      },
      yaxis: {
        title: {
          text: "KWH", // Y-axis title (unit of data)
        },
      },
    },
    series: [
      {
        name: "Leads Data", // Name for the data series
        data: [30, 40, 45, 50, 49, 60, 70, 91, 75, 34, 56, 89], // The data itself
      },
    ],
  });

  const consumptionChartOptions: ApexOptions = {
    chart: {
      type: "radialBar",
      height: 600,
      width: 300,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,

        // track: {
        //   background: "#6bb5b0",
        //   strokeWidth: "100%",
        //   margin: 5,
        // },
        dataLabels: {
          name: {
            show: true,
            fontSize: "16px",
            color: "black",
            offsetY: 60,
          },
          value: {
            show: true,
            fontSize: "22px",
            offsetY: -10,
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    series: [30],
    colors: ["#6bb5b0"],
    labels: ["Average Consumption of Last Week "],

    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
  };

  const powerHoursChartOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    colors: ["#6bb5b0"],
    fill: {
      type: "gradient",
    },
    series: [99, 1],
    labels: ["EB", "SUMP", "BOREWELL"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
    },
  };

  const columns: ColumnType<DataType>[] = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      width: 60,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Reading (kWh)",
      dataIndex: "reading",
      key: "reading",
    },
    {
      title: "Consumed (kWh)",
      dataIndex: "consumed",
      key: "consumed",
    },
    {
      title: "EB",
      dataIndex: "eb",
      key: "eb",
    },
    {
      title: "Sump",
      dataIndex: "sump",
      key: "sump",
    },
    {
      title: "Borewell",
      dataIndex: "borewell",
      key: "borewell",
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      sno: "1",
      date: "2024-09-24",
      startTime: "00:00 AM",
      endTime: "--",
      reading: "12833.56",
      consumed: "10.36",
      eb: "--",
      sump: "--",
      borewell: "--",
    },
    {
      key: "2",
      sno: "2",
      date: "2024-09-23",
      startTime: "00:00 AM",
      endTime: "23:59 PM",
      reading: "12757.51",
      consumed: "76.06",
      eb: "23 hr 59 mins",
      sump: "--",
      borewell: "0 hr 32 mins",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Row>
        <Col lg={4} md={6}>
          <Row>
            <Card style={{ minHeight: "22vh" }}>
              <Card.Body className="d-flex flex-column">
                <Card.Title className={classes.cardtitle}>
                  Device Details
                </Card.Title>
                <Row className={`text-center mt-4 ${classes.cardcontent}`}>
                  <Col>
                    <span className={classes.cardtitle}>EB:</span> ON
                  </Col>
                  <Col>
                    <span className={classes.cardtitle}>SUMP:</span> OFF
                  </Col>
                  <Col>
                    <span className={classes.cardtitle}>BOREWELL:</span> OFF
                  </Col>
                  <Col>
                    <span className={classes.cardtitle}>Relay1:</span> OFF
                  </Col>
                  <Col>
                    <span className={classes.cardtitle}>Relay2:</span> OFF
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card style={{ minHeight: "22vh" }} className="g-3 text-center">
              <Card.Body
                className={`d-flex flex-column ${classes.cardcontent}`}
              >
                <p>
                  <span className={classes.cardtitle}>
                    Last Communicated Date:
                  </span>
                  <br />
                  (24-09-2024 09:57 AM)
                </p>
                <p>
                  <span className={classes.cardtitle}>
                    Device date not Received
                  </span>
                  : -1
                </p>
                <p>
                  Read Error Time:
                  <span className={classes.cardtitle}> hr 0 mins</span>
                </p>
              </Card.Body>
            </Card>
          </Row>
        </Col>

        <Col lg={4} md={6}>
          <Card
            style={{ height: "100%" }}
            className={`g-3 ${classes.responsivemargintop}`}
          >
            <Card.Body>
              <Card.Title className={classes.cardtitle}>
                Electrical Running Hours
              </Card.Title>
              <Chart
                options={consumptionChartOptions}
                series={consumptionChartOptions?.series}
                type="radialBar"
                height={300}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card
            style={{ height: "100%" }}
            className={`g-3 ${classes.responsivemargintophours}`}
          >
            <Card.Body>
              <Card.Title className={classes.cardtitle}>
                Power Running Hours
              </Card.Title>
              <Chart
                options={powerHoursChartOptions}
                series={powerHoursChartOptions?.series}
                type="donut"
                height={300}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={3} md={6}>
          <Card
            style={{
              width: "100%",
              height: "200px",
              border: "3px solid rgb(107, 181, 176)",
            }}
          >
            <Card.Body className="d-flex flex-column">
              <Card.Title
                className={classes.cardtitle}
                style={{ marginBottom: "0" }}
              >
                Total Consumption
              </Card.Title>
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ flexGrow: 1 }}
              >
                <img
                  src={lightningimage}
                  alt="limage"
                  style={{
                    width: "80px",
                    height: "80px",
                    marginBottom: "10px",
                  }}
                />
                <h4>12843.78 kWh</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card
            style={{ border: "3px solid rgb(107, 181, 176)" }}
            className="mt-2"
          >
            <Card.Body>
              <Card.Title className={classes.cardtitle}>
                Total Watts:8.42
              </Card.Title>
              <Space size="small">
                <div>
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white mx-1  bg-danger "
                  >
                    R
                  </Button>
                  381.66
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white bg-warning mx-1"
                  >
                    Y
                  </Button>
                  382.54
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white bg-primary mx-1"
                  >
                    B
                  </Button>
                  386.51
                </div>
              </Space>
            </Card.Body>
          </Card>

          <Card
            className="mt-2 w-100 "
            style={{ border: "3px solid rgb(107, 181, 176)" }}
          >
            <Card.Body>
              <Card.Title className={classes.cardtitle}>
                AvgVolts:221.6
              </Card.Title>
              <Space size="small">
                <div>
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white mx-1  bg-danger"
                  >
                    R
                  </Button>
                  381.66
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white bg-warning mx-1"
                  >
                    Y
                  </Button>
                  382.54
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white bg-primary mx-1"
                  >
                    B
                  </Button>
                  386.51
                </div>
              </Space>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card
            style={{ border: "3px solid rgb(107, 181, 176)" }}
            className="mt-2"
          >
            <Card.Body>
              <Card.Title className={classes.cardtitle}>
                AvgVolts:383.57
              </Card.Title>
              <Space size="small">
                <div>
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white mx-1  bg-danger"
                  >
                    R
                  </Button>
                  381.66
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white bg-warning mx-1"
                  >
                    Y
                  </Button>
                  382.54
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white bg-primary mx-1"
                  >
                    B
                  </Button>
                  386.51
                </div>
              </Space>
            </Card.Body>
          </Card>

          <Card
            className="mt-3"
            style={{ border: "3px solid rgb(107, 181, 176)" }}
          >
            <Card.Body>
              <Card.Title className={classes.cardtitle}>
                AvgAmps:13.7A
              </Card.Title>

              <Space size="small">
                <div>
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white mx-1  bg-danger"
                  >
                    R
                  </Button>
                  381.66
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white bg-warning mx-1"
                  >
                    Y
                  </Button>
                  382.54
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white bg-primary mx-1"
                  >
                    B
                  </Button>
                  386.51
                </div>
              </Space>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card style={{ border: "3px solid rgb(107, 181, 176)" }}>
            <Card.Body>
              <Card.Title className={classes.cardtitle}>Avg PF :-1</Card.Title>
              <Space size="small">
                <div>
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white mx-1 bg-danger"
                  >
                    R
                  </Button>
                  381.66
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white bg-warning mx-1"
                  >
                    Y
                  </Button>
                  382.54
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white bg-primary mx-1"
                  >
                    B
                  </Button>
                  386.51
                </div>
              </Space>
            </Card.Body>
          </Card>

          <Card
            className="mt-3"
            style={{ border: "3px solid rgb(107, 181, 176)" }}
          >
            <Card.Body>
              <Card.Title className={classes.cardtitle}>Avg PF :-1</Card.Title>
              <Space size="small">
                <div>
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white mx-1 bg-danger"
                  >
                    R
                  </Button>
                  381.66
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white bg-warning mx-1"
                  >
                    Y
                  </Button>
                  382.54
                  <Button
                    shape="circle"
                    size="small"
                    className="text-white bg-primary mx-1"
                  >
                    B
                  </Button>
                  386.51
                </div>
              </Space>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex justify-content-center align-items-center">
            <div
              style={{
                backgroundColor: "white",
                padding: "16px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: "100%",
                maxWidth: "700px",
                marginTop: "35px",
              }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "start",
                  fontWeight: 500,
                }}
              >
                Hourly Energy Consumption
              </p>
              <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type="bar"
                width="100%"
                height="350"
              />
            </div>
          </div>
        </Col>
        <Col>
          <div className="d-flex justify-content-center align-items-center">
            <div
              style={{
                backgroundColor: "white",
                padding: "16px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: "100%",
                maxWidth: "700px",
                marginTop: "35px",
              }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "start",
                  fontWeight: 500,
                }}
              >
                Daywise Energy Consumption
              </p>
              <div className="float-end">
                <DatePicker className="mx-2" />
                <DatePicker />
              </div>
              <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type="line"
                width="100%"
                height="350"
              />
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={6} md={12} sm={12}>
          <div className="d-flex justify-content-center align-items-center">
            <div
              style={{
                backgroundColor: "white",
                padding: "16px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: "100%",
                maxWidth: "700px",
                marginTop: "35px",
              }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "start",
                  fontWeight: 500,
                }}
              >
                DealerWise Report
              </p>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                size="middle"
                className="table-responsive mx-auto"
              />
            </div>
          </div>
        </Col>
        <Col lg={6} md={12} sm={12}>
          <div className="d-flex justify-content-center align-items-center">
            <div
              style={{
                backgroundColor: "white",
                padding: "16px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: "100%",
                maxWidth: "700px",
                marginTop: "35px",
              }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "start",
                  fontWeight: 500,
                }}
              >
                DealerWise Report
              </p>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                size="middle"
                className="table-responsive mx-auto"
              />
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="d-flex justify-content-center align-items-center">
            <div
              style={{
                backgroundColor: "white",
                padding: "16px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: "100%",
                maxWidth: "700px",
                marginTop: "35px",
              }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "start",
                  fontWeight: 500,
                }}
              >
                Hourly Energy Consumption
              </p>
              <Chart
                options={chartsecondOptions.options}
                series={chartsecondOptions.series}
                type="bar"
                width="100%"
                height="350"
              />
            </div>
          </div>
        </Col>
        <Col>
          <div className="d-flex justify-content-center align-items-center">
            <div
              style={{
                backgroundColor: "white",
                padding: "16px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: "100%",
                maxWidth: "700px",
                marginTop: "35px",
              }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "start",
                  fontWeight: 500,
                }}
              >
                Daywise Energy Consumption
              </p>
              <div className="float-end">
                <DatePicker className="mx-2" />
                <DatePicker />
              </div>
              <Chart
                options={chartsecondOptions.options}
                series={chartsecondOptions.series}
                type="line"
                width="100%"
                height="350"
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
