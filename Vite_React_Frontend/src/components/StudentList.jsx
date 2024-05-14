import React, { useEffect, useState } from "react";
import EditStudent from "./EditStudent";
import { deleteStudent } from "../service/StudentService";
import AddStudent from "./AddStudent";
import { Link } from "react-router-dom";
import { Table } from "flowbite-react";
import { api } from "../api/api";
import { Button } from "flowbite-react";
import ReactPaginate from "react-paginate";

const StudentList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [showAddAlert, setShowAddAlert] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("http://localhost:8080/studentList");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStData = async (studentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmed) {
      try {
        await deleteStudent(studentId);
        setShowDeleteAlert(true);
        setTimeout(() => {
          setShowDeleteAlert(false);
        }, 3000);
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateStudentList = () => {
    fetchData();
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const showAlertMessage = (type) => {
    if (type === "add") {
      setShowAddAlert(true);
      setTimeout(() => {
        setShowAddAlert(false);
      }, 3000);
    } else if (type === "edit") {
      setShowEditAlert(true);
      setTimeout(() => {
        setShowEditAlert(false);
      }, 3000);
    }
  };

  const indexOfLastStudent = (currentPage + 1) * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
  const currentStudents = data.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div>
      <div
        className="md:mx-10 lg:mx-12 md:p-3 md:p-6 justify-content-center d-flex"
        style={{ backgroundColor: "#B3C7E6" }}
      >
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl ">
          WELCOME TO STUDENT MANAGEMENT SYSTEM
        </h1>
      </div>

      <div className="flex justify-between items-center mt-8 mx-5">
        <div className="flex items-center space-x-4">
          <AddStudent
            updateStudentList={fetchData}
            showAlertMessage={showAlertMessage}
          />
          <Link to="/studentListView">
            <Button type="button" color="purple" style={{ marginTop: "-20px" }}>
              ALL <span className="ms-1 d-none d-md-inline">Student</span>
            </Button>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <label
            htmlFor="itemsPerPage"
            className="text-md font-medium text-gray-700 whitespace-nowrap"
          >
            Items per Page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
      </div>

      {(showDeleteAlert || showEditAlert || showAddAlert) && (
        <div
          className={`flex items-center p-4 mb-4 text-sm rounded-lg justify-center mx-auto ${
            showDeleteAlert
              ? "bg-red-50 dark:bg-gray-800 dark:text-red-400"
              : showEditAlert
              ? "bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              : "bg-green-50 dark:bg-gray-800 dark:text-green-400"
          }`}
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">
            {showDeleteAlert
              ? "Alert!"
              : showEditAlert
              ? "Info Alert!"
              : "Success Alert!"}
          </span>
          <div>
            <span className="font-medium">
              {showDeleteAlert
                ? "Alert!"
                : showEditAlert
                ? "Info Alert!"
                : "Success Alert!"}
            </span>{" "}
            {showDeleteAlert
              ? "Data Deleted!"
              : showEditAlert
              ? "Successfully Edited!"
              : "Student Added Successfully!"}
          </div>
        </div>
      )}

      <div className="overflow-x-auto mt-3">
        <Table hoverable striped style={{ backgroundColor: "blue" }}>
          <Table.Head style={{ backgroundColor: "blue" }}>
            <Table.HeadCell
              style={{ backgroundColor: "#CEDCF1", color: "black" }}
            >
              No.
            </Table.HeadCell>
            <Table.HeadCell
              style={{ backgroundColor: "#CEDCF1", color: "black" }}
            >
              ID
            </Table.HeadCell>
            <Table.HeadCell
              style={{ backgroundColor: "#CEDCF1", color: "black" }}
            >
              Name
            </Table.HeadCell>
            <Table.HeadCell
              style={{ backgroundColor: "#CEDCF1", color: "black" }}
            >
              Age
            </Table.HeadCell>
            <Table.HeadCell
              style={{ backgroundColor: "#CEDCF1", color: "black" }}
            >
              Email
            </Table.HeadCell>
            <Table.HeadCell
              style={{ backgroundColor: "#CEDCF1", color: "black" }}
            >
              Address
            </Table.HeadCell>
            <Table.HeadCell
              style={{ backgroundColor: "#CEDCF1", color: "black" }}
            >
              Phone
            </Table.HeadCell>
            <Table.HeadCell
              style={{ backgroundColor: "#CEDCF1", color: "black" }}
            >
              Action
            </Table.HeadCell>
          </Table.Head>
          <Table.Body hoverable>
            {currentStudents.map((datas, index) => (
              <Table.Row
                key={datas.studentId || index}
                hoverable
                className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
              >
                <Table.Cell>{indexOfFirstStudent + index + 1}</Table.Cell>
                <Table.Cell>{datas.studentId}</Table.Cell>
                <Table.Cell>{datas.studentName}</Table.Cell>
                <Table.Cell>{datas.studentAge}</Table.Cell>
                <Table.Cell>{datas.studentEmail}</Table.Cell>
                <Table.Cell>{datas.studentAddress}</Table.Cell>
                <Table.Cell>{datas.studentPhone}</Table.Cell>
                <Table.Cell>
                  <div className="flex">
                    <EditStudent
                      key={index}
                      studentName={datas.studentName}
                      className="me-4 w-100 "
                      updateStudentList={updateStudentList}
                      showAlertMessage={showAlertMessage}
                    />
                    <Button
                      type="button"
                      onClick={() => deleteStData(datas.studentId)}
                      className="ms-1"
                      color="failure"
                    >
                      Delete
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div className="flex justify-center items-center mx-5 lg:mx-10 py-2 sm:px-6 lg:px-8 mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={Math.ceil(data.length / itemsPerPage)}
          previousLabel="< previous"
          containerClassName="pagination"
          activeClassName="active"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default StudentList;
