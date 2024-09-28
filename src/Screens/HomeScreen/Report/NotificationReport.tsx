import { CloseOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useToken } from "../../../Utility/Token";
import { useEffect, useState } from "react";
import { Card, Pagination, Table, Tooltip } from "antd";
import { Item, PaginatedResponse } from "../../../@Types/Report/Report";
import React from "react";
import { ColumnsType } from "antd/es/table";
import { FormikValues, useFormik } from "formik";
import CustomDatePicker from "../../../Component/CustomDatePicker";
import CustomButton from "../../../Component/CustomButton";
import { notificationreport } from "../../../Services/Services";
import moment, { Moment } from "moment";
import dayjs, { Dayjs } from "dayjs";
import { IoMdDownload } from "react-icons/io";

export default function NotificationReport() {
  const token = useToken();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showinputsfilter, setShowInputsFilter] = useState<boolean>(false);
  const [rowSpanDate, setRowSpanDate] = useState<number>(10);

  const [failuredata, setFailureData] = useState<PaginatedResponse>({
    page: 1,
    size: 0,
    total_page: 0,
    total_count: 0,
    items: [],
  });
  const [notificationdata, setNotificationData] = useState([]);

  const { handleSubmit, resetForm, setFieldValue, values } =
    useFormik<FormikValues>({
      initialValues: {
        fromDatetime: "",
        toDatetime: "",
      },
      onSubmit: (values) => {
        handleFailureAnalysis(1, 10, values);
        console.log(values, "FailureData");
      },
    });

  useEffect(() => {
    if (token) {
      handleFailureAnalysis(currentPage, rowSpanDate, {});
    }
  }, [token, currentPage, rowSpanDate]);

  const handleFailureAnalysis = (
    page: number = 1,
    size: number = 10,
    data: { fromDatetime?: string; toDatetime?: string } = {}
  ) => {
    let formdata = new FormData();
    formdata.append("token", token || "");
    formdata.append("fromDatetime", data?.fromDatetime || "");
    formdata.append("toDatetime", data?.toDatetime || "");
    notificationreport(page, size, formdata)
      .then((response) => {
        setNotificationData(response?.data?.data?.items[0].data);
        setFailureData(response?.data?.data);
        console.log(response, "response");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setRowSpanDate(pageSize);
    setCurrentPage(page);
  };

  const toggleInputs = () => setShowInputsFilter((pre) => !pre);

  const handleReset = () => {
    const emptyValues: FormikValues = {
      fromDatetime: "",
      toDatetime: "",
    };

    handleFailureAnalysis(1, 10, emptyValues);
    resetForm();
  };

  const columns: ColumnsType<Item> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      onCell: (text: Item, index?: number) => {
        if (index === 0) {
          return {
            rowSpan: rowSpanDate,
          };
        }
        if (index && index > 0) {
          return {
            rowSpan: 0,
          };
        }
        return {};
      },
    }, // Format date

    {
      title: "S.No",
      dataIndex: "sl_no",
      key: "sl_no",
    },
    {
      title: "Alert Type",
      dataIndex: "typeName",
      key: "typeName",
    },
    {
      title: "On Time",
      dataIndex: "on_time",
      key: "on_time",
    },
    {
      title: "Off Time",
      dataIndex: "off_time",
      key: "off_time",
      render: (text: string) => new Date(text).toLocaleTimeString(),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (seconds: number) =>
        `${Math.floor(seconds / 60)} min ${seconds % 60} sec`, // Convert duration to minutes and seconds
    },
    {
      title: "Alarm Value",
      dataIndex: "alert_start_value",
      key: "alert_start_value",
    },
    {
      title: "Difference Value (min/max)",
      dataIndex: "max_value",
      key: "max_value",
      render: (value: string, record: any) =>
        `${record.alert_start_value}/${value}`,
    },
    {
      title: "Phase",
      dataIndex: "max_phase_name",
      key: "max_phase_name",
    },
  ];

  console.log(failuredata, "failuredata");

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-center">
          <Col lg={6} className="text-start">
            <h3>Notification Report </h3>
          </Col>

          <Col lg={6} className="d-flex justify-content-end align-items-end">
            <Button className="bg-warning mx-3">
              <IoMdDownload />
              Download
            </Button>
            <Button
              className="rounded-5 bg-white text-black"
              onClick={toggleInputs}
            >
              {showinputsfilter ? (
                <Tooltip title="close" placement="bottom">
                  <CloseOutlined />
                </Tooltip>
              ) : (
                <Tooltip title="close" placement="bottom">
                  <SearchOutlined />
                </Tooltip>
              )}
            </Button>
          </Col>
        </Row>

        <div>
          <Card className="mt-2">
            <h6>
              Showing {currentPage}-{rowSpanDate} of {failuredata?.total_count}{" "}
              items
            </h6>

            <Row>
              {showinputsfilter && (
                <>
                  <Col lg={6} md={6}>
                    <Row>
                      <Col lg={4} md={6}>
                        <CustomDatePicker
                          title={"Start Date"}
                          value={values.fromDatetime}
                          onChange={(date, dateString) => {
                            setFieldValue("fromDatetime", dateString);
                          }}
                        />
                      </Col>
                      <Col lg={4} md={6}>
                        <CustomDatePicker
                          title={"End Date"}
                          value={values.toDatetime}
                          onChange={(date, dateString) => {
                            setFieldValue("toDatetime", dateString);
                          }}
                          disabledDate={(current: Dayjs) => {
                            return (
                              current &&
                              current.isBefore(
                                dayjs(values.fromDatetime),
                                "day"
                              )
                            );
                          }}
                          disabledTime={(current: Dayjs | null) => {
                            if (!current) return {};
                            console.log(current, "currenttt");

                            const startDate = dayjs(values.fromDatetime);
                            console.log(startDate, "start");
                            if (current.isSame(startDate, "day")) {
                              return {
                                disabledHours: () =>
                                  Array.from(
                                    { length: startDate.hour() },
                                    (_, i) => i
                                  ),
                                disabledMinutes: () =>
                                  Array.from(
                                    { length: startDate.minute() },
                                    (_, i) => i
                                  ),
                                disabledSeconds: () =>
                                  Array.from(
                                    { length: startDate.second() },
                                    (_, i) => i
                                  ),
                              };
                            }
                            return {};
                          }}
                        />
                      </Col>

                      <Col
                        lg={2}
                        md={2}
                        sm={3}
                        className=" d-flex align-items-end mt-2 "
                      >
                        <CustomButton
                          type="submit"
                          style={{
                            width: "100px",
                            height: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "30px",
                          }}
                        >
                          Submit
                        </CustomButton>
                      </Col>
                      <Col
                        lg={2}
                        md={2}
                        sm={3}
                        className="d-flex align-items-end mt-2"
                      >
                        <CustomButton
                          onClick={handleReset}
                          style={{
                            width: "100px",
                            height: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "10px",
                          }}
                        >
                          Reset
                        </CustomButton>
                      </Col>
                    </Row>
                  </Col>
                </>
              )}
            </Row>

            <div className="mt-2">
              <Table
                columns={columns}
                dataSource={notificationdata}
                pagination={false}
                rowKey={(record, index) =>
                  record.id ? record.id.toString() : `row-${index}`
                }
                bordered
                size="middle"
                className="table-responsive mx-auto"
              />
              <Pagination
                current={currentPage}
                pageSize={rowSpanDate}
                onChange={handlePageChange}
                total={failuredata?.total_count || 0}
                className="float-end mt-4"
              />
            </div>
          </Card>
        </div>
      </Form>
    </div>
  );
}
