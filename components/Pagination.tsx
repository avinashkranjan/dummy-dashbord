import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationO = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  var pageNumber = totalPosts / 10;

  return (
    <div className="py-4 flex justify-center md:justify-between">
      <div className="hidden md:block">
        <p className="text-md text-gray-500">
          Showing
          <span className="font-medium">
            {" "}
            {currentPage * postsPerPage - postsPerPage === 0
              ? 1
              : currentPage * postsPerPage - postsPerPage}{" "}
          </span>
          to
          <span className="font-medium">
            {" "}
            {currentPage === parseInt(pageNumber.toString(), 10)
              ? totalPosts
              : currentPage * postsPerPage}{" "}
          </span>
          of
          <span className="font-semibold"> {totalPosts} </span>
          results
        </p>
      </div>
      <nav className="block">
        <ul className="flex pl-0 rounded list-none flex-wrap">
          <Stack spacing={2}>
            <Pagination
              count={
                parseInt(pageNumber.toString(), 10) % 10 === 0
                  ? parseInt(pageNumber.toString(), 10)
                  : parseInt(pageNumber.toString(), 10) + 1
              }
              size="large"
              page={currentPage}
              variant="outlined"
              shape="rounded"
              color="primary"
              onChange={(e, page) => paginate(page)}
            />
          </Stack>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationO;
