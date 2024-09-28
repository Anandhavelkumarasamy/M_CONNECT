import React from "react";
import { PaginationProps } from "./Component";
import { Pagination } from "antd";

export default function CustomPagination({
  current,
  pageSize,
  total,
  onPageChange,
}: PaginationProps) {
  return (
    <div>
      <Pagination
        className="mt-4"
        current={current}
        pageSize={pageSize}
        align="end"
        onChange={onPageChange}
        total={total}
      />
    </div>
  );
}
