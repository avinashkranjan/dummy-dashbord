import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectSearch } from "../slices/searchSlice";

const Table: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [sortMenu, setSortMenu] = useState(false);
  const [sortType, setSortType] = useState("title");
  const [refresh, setRefresh] = useState(false);

  const search = useSelector(selectSearch);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [refresh]);

  useEffect(() => {
    if (search) {
      console.log("search", search);
      setLoading(true);
      axios
        .get(`https://jsonplaceholder.typicode.com/posts?title_like=${search}`)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        });
    }
  }, [search]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentOrders = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  useEffect(() => {
    const sortArray = (type: any) => {
      const types: any = {
        title: "title",
        body: "body",
      };
      const sortProperty = types[type];
      const sorted = [...data].sort((a, b) =>
        a[sortProperty].localeCompare(b[sortProperty])
      );
      console.log("Sorted:", sorted);
      setData(sorted);
    };
    sortArray(sortType);
  }, [sortType]);

  const editPost = (id: any) => {
    Swal.fire({
      title: "Edit Post",
      html: `
      <input type="text" id="swal-input1" class="swal2-input" placeholder="Title">
      <input id="swal-input2" class="swal2-input" placeholder="Body">`,
      focusConfirm: false,
      preConfirm: () => {
        const title = (
          document.getElementById("swal-input1") as HTMLInputElement
        ).value;
        const body = (
          document.getElementById("swal-input2") as HTMLInputElement
        ).value;
        return { title, body };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            title: result.value!.title,
            body: result.value!.body,
          })
          .then((result) => {
            setData(
              data.map((post) => {
                if (post.id === id) {
                  post.title = result.data.title;
                  post.body = result.data.body;
                }
                return post;
              })
            );
            Swal.fire("Updated!", "Your post has been updated.", "success");
          });
      }
    });
  };

  const deletePost = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
          .then((res) => {
            setData(data.filter((post) => post.id !== id));
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
          });
      }
    });
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="w-full">
          <div className="flex justify-center items-center h-screen">
            <CircularProgress />
          </div>
        </div>
      ) : (
        <div className="md:mx-4">
          <h1 className="pt-6 text-4xl text-slate-700 font-semibold">
            Customer Details
          </h1>
          <div className="mt-10 flex justify-between">
            <p className="text-2xl">The terms you're tracking</p>
            <div className="flex">
              <button
                type="button"
                className="flex text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                onClick={() => setSortMenu(!sortMenu)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                  />
                </svg>
                Sort by
              </button>
              <div
                id="dropdown"
                className={`${
                  sortMenu ? "" : "hidden"
                } absolute mt-12 right-32 border-2 border-gray-300 z-10 w-36 bg-white rounded-lg divide-y divide-gray-100 shadow dark:bg-gray-700`}
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefault"
                >
                  <li>
                    <a
                      href="#"
                      className="flex py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => [setSortType("title"), setSortMenu(false)]}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="mt-0.5 w-4 h-4 mr-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                        />
                      </svg>
                      Title
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => [setSortType("body"), setSortMenu(false)]}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="mt-0.5 w-4 h-4 mr-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                        />
                      </svg>
                      Body
                    </a>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                className="flex focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
                Add
              </button>
            </div>
          </div>
          <table className="table-auto">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Body</th>
                <th className="px-4 py-2">Phone No</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((item: any, index) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">
                    {currentPage === 1
                      ? index + 1
                      : currentPage * 10 + index + 1 - 10}
                  </td>

                  <td className="border px-4 py-2">{item.title}</td>

                  <td className="border px-4 py-2">{item.body}</td>
                  <td className="border px-4 py-2">
                    {Math.floor(1000000000 + Math.random() * 9000000000)}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mx-2 w-5 h-5 hover:cursor-pointer hover:text-blue-600"
                        onClick={() => editPost(item.id)}
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 hover:cursor-pointer hover:text-red-600"
                        onClick={() => deletePost(item.id)}
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={data.length}
            paginate={paginate}
            paginateBack={paginateBack}
            paginateFront={paginateFront}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
