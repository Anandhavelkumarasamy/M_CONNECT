import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useToken } from "../../../Utility/Token";
import { failureanalysis } from "../../../Services/Services";
import { useEffect, useState } from "react";
import { Card, Pagination, Table, Tooltip } from "antd";
import { Item, PaginatedResponse } from "../../../@Types/Report/Report";
import React from "react";
import { ColumnsType } from "antd/es/table";
import { FormikValues, useFormik } from "formik";
import CustomDatePicker from "../../../Component/CustomDatePicker";
import CustomButton from "../../../Component/CustomButton";
import dayjs, { Dayjs } from "dayjs";

export default function FailureAnalysis() {
  const token = useToken();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isParms, setIsParams] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showinputsfilter, setshowinputsfilter] = useState<boolean>(false);
  const [rowSpanDate, setRowSpanDate] = useState<number>(10);

  const itemsPerPage = 10;
  const [failuredata, setfailuredata] = useState<PaginatedResponse>({
    page: 1,
    size: 0,
    total_page: 0,
    total_count: 0,
    items: [],
  });

  const { handleSubmit, resetForm, setFieldValue, values } =
    useFormik<FormikValues>({
      initialValues: {
        fromDatetime: "",
        toDatetime: "",
      },
      onSubmit: (values) => {
        handlefailureanalysis(1, 10, values);
        console.log(values, "FailureData");
      },
    });

  const toggleMore = () => {
    setIsParams(!isParms);
  };

  const toggleShowMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (token) {
      handlefailureanalysis(currentPage, itemsPerPage, {});
    }
  }, [token]);

  const handlefailureanalysis = (
    page: number = 1,
    size: number = 10,
    data: { fromDatetime?: string; toDatetime?: string } = {}
  ) => {
    let formdata = new FormData();
    formdata.append("token", token || "");
    formdata.append(
      "fromDatetime",
      data?.fromDatetime ? data?.fromDatetime : ""
    );
    formdata.append("toDatetime", data?.toDatetime ? data?.toDatetime : "");
    failureanalysis(page, size, formdata)
      .then((response) => {
        if (response.data.data) {
          const itemsWithSno = response?.data?.data.items.map(
            (item: any, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          setfailuredata({ ...response.data.data, items: itemsWithSno });

          console.log(response, "response");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setRowSpanDate(pageSize);
    setCurrentPage(page);
    handlefailureanalysis(page, pageSize, {});
  };
  const toggleInputs = () => setshowinputsfilter((pre) => !pre);

  const handlereset = () => {
    const emptyValues: FormikValues = {
      fromDatetime: "",
      toDatetime: "",
    };
    resetForm();
    handlefailureanalysis(1, 10, emptyValues);
  };

  const columns: ColumnsType<Item> = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      render: (text: any, record: Item, index: number) =>
        (currentPage - 1) * itemsPerPage + index + 1,
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "datetime",
      key: "datetime",
    },
    {
      title: "Api",
      dataIndex: "api",
      key: "api",
      render: (text: string, record: Item) => {
        const shortenedApi =
          record.api.length > 20
            ? `${record.api.substring(0, 20)}...`
            : record.api;

        return (
          <>
            <span>{isExpanded ? record.api : shortenedApi}</span>
            {record.api.length > 20 && (
              <p className="text-end underlined">
                <a className="primary" onClick={toggleShowMore}>
                  {isExpanded ? "Show Less" : "Show More"}
                </a>
              </p>
            )}
          </>
        );
      },
    },
    {
      title: "Api Response",
      dataIndex: "api_response",
      key: "api_response",
      render: (text: string, record: Item) => {
        const shortenedApi =
          record.api_response.length > 20
            ? `${record.api_response.substring(0, 20)}...`
            : record.api_response;

        return (
          <>
            <span>{isExpanded ? record.api_response : shortenedApi}</span>
            {record.api_response.length > 20 && (
              <p className="text-end underlined">
                <a className="primary" onClick={toggleShowMore}>
                  {isExpanded ? "Show Less" : "Show More"}
                </a>
              </p>
            )}
          </>
        );
      },
    },
    {
      title: "Call Method",
      dataIndex: "call_method",
      key: "call_method",
    },
    {
      title: "Params",
      dataIndex: "params",
      key: "params",
      render: (text: string, record: Item) => {
        const shortenedParms =
          record.params.length > 20
            ? `${record.params.substring(0, 20)}...`
            : record.params;

        return (
          <>
            <span>{isParms ? record.params : shortenedParms}</span>
            {record.params.length > 20 && (
              <p className="text-end underlined">
                <a className="primary" onClick={toggleMore}>
                  {isParms ? "Show Less" : "Show More"}
                </a>
              </p>
            )}
          </>
        );
      },
    },
    {
      title: "Response Time",
      dataIndex: "response_time",
      key: "response_time",
    },
  ];

  console.log(showinputsfilter, "failuredata");

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-center">
          <Col lg={6} className="text-start">
            <h3>Failure Analysis</h3>
          </Col>

          <Col lg={6} className="d-flex justify-content-end align-items-end">
            <Button
              className="rounded-5 bg-white text-black"
              onClick={toggleInputs}
            >
              {showinputsfilter ? (
                <Tooltip title="close" placement="bottom">
                  <CloseOutlined />
                </Tooltip>
              ) : (
                <Tooltip title="Filter" placement="bottom">
                  <SearchOutlined />
                </Tooltip>
              )}
            </Button>
          </Col>
        </Row>
      </Form>
      <Card className="mt-2">
        <h6>
          Showing {currentPage}-{rowSpanDate} of {failuredata?.total_count}items
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
                          current.isBefore(dayjs(values.fromDatetime), "day")
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
                        marginRight: "10px",
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
                      onClick={handlereset}
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
            dataSource={failuredata?.items}
            pagination={false}
            rowKey={(record) => record.id}
            bordered
            size="middle"
            className="table-responsive mx-auto"
          />

          <Pagination
            current={currentPage}
            pageSize={rowSpanDate}
            onChange={handlePageChange}
            total={failuredata?.total_count || 0}
            className=" float-end mt-4"
          />
        </div>
      </Card>
    </div>
  );
}
