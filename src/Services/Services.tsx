import instance from "./Axios";

export const signin = (login: FormData) => {
  return instance.post("/login", login);
};
export const failureanalysis = (page: number, size: number, data: FormData) => {
  return instance.post(
    `/report/failureAnalysisReport?page=${page}&size=${size}`,
    data
  );
};
export const notificationreport = (
  page: number,
  size: number,
  data: FormData
) => {
  return instance.post(
    `/report/NotificationHistoryReport?page=${page}&size=${size}`,
    data
  );
};
export const historyreport = (data: FormData) => {
  return instance.post("/report/consumptionHistoryReport", data);
};
