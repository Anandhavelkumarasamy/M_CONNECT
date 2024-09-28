export interface Item {
  id: number;
  api: string;
  call_method: string;
  params: string;
  ip: string;
  datetime: string;
  api_response: string;
  response_time: string;
  response_status: number;
  sno: number;
  status: number;
  data?: Item[];
}

export interface PaginatedResponse {
  page: number;
  size: number;
  total_page: number;
  total_count: number;
  items: Item[];
}

interface ReportFilterProps {
  handlefailureanalysis: (
    page: number,
    size: number,
    items: ReportFilterItems
  ) => void;
}
interface ReportFilterItems {
  fromDatetime: string;
  toDatetime: string;
}
