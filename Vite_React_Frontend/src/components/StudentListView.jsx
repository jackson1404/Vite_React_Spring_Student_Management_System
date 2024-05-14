import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../api/api";
import { Button, TextInput } from "flowbite-react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import jsPDF from "jspdf";
import ReactPaginate from "react-paginate";

const StudentListView = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [originalDataList, setOriginalDataList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(5);
  const [exportType, setExportType] = useState(null);

  // Fetch Student Data List
  useEffect(() => {
    api
      .get("/studentList")
      .then((res) => {
        setDataList(res.data);
        setOriginalDataList(res.data); // Store the original list
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);
    const filteredData = originalDataList.filter(
      (student) =>
        student.studentId.toString().includes(inputValue) ||
        student.studentName.toLowerCase().includes(inputValue)
    );
    setDataList(inputValue === "" ? originalDataList : filteredData);
    setCurrentPage(0);
  };

  const exportAsCSV = () => {
    const csvContent =
      "ID,Name,Age,Email,Address,Phone\n" +
      dataList
        .map(
          (student) =>
            `${student.studentId},${student.studentName},${student.studentAge},${student.studentEmail},${student.studentAddress},${student.studentPhone}`
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "student_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportAsPDF = () => {
    const doc = new jsPDF();
    const columns = ["ID", "Name", "Age", "Email", "Address", "Phone"];
    const rows = dataList.map((student) => [
      student.studentId,
      student.studentName,
      student.studentAge,
      student.studentEmail,
      student.studentAddress,
      student.studentPhone,
    ]);
    const tableX = 10;
    const tableY = 10;
    const cellWidth = 30;
    const cellHeight = 10;
    const fontSize = 12;

    doc.setFontSize(fontSize);
    doc.text(tableX, tableY, columns.join(","));
    rows.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const xPos = tableX + cellIndex * cellWidth;
        const yPos = tableY + (rowIndex + 1) * cellHeight;
        doc.text(xPos, yPos, String(cell), {
          align: "left",
          baseline: "middle",
        });
      });
    });
    doc.save("student_data.pdf");
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setSelectedDropdownValue(value);
    setCurrentPage(0);
  };

  const handleExportTypeChange = (type) => {
    switch (type) {
      case "csv":
        exportAsCSV();
        break;
      case "pdf":
        exportAsPDF();
        break;
      default:
        break;
    }
  };

  const handleDropdownChange = (event) => {
    const value = parseInt(event.target.value);
    handleItemsPerPageChange(value);
  };

  const handleGoToPage = (event) => {
    const pageNumber = parseInt(event.target.value);
    if (
      !isNaN(pageNumber) &&
      pageNumber > 0 &&
      pageNumber <= Math.ceil(dataList.length / itemsPerPage)
    ) {
      setCurrentPage(pageNumber - 1);
    }
  };

  const indexOfLastStudent = (currentPage + 1) * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
  const currentStudents = dataList.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  return (
    <div
      className="w-screen h-full"
      style={{ backgroundColor: "#C4D1E7", marginTop: "-15px" }}
    >
      <div className="m-3 md:mx-10 lg:mx-12 md: p-3 md:p-6 flex justify-center text-white">
        <h1 className="font-bold mt-4 text-dark text-xl md:text-2xl lg:text-3xl">
          WELCOME TO STUDENT MANAGEMENT SYSTEM
        </h1>
      </div>

      <div className="flex justify-around items-center mt-5">
        <div style={{ marginLeft: "60px", marginRight: "-90px" }}>
          <Button
            onClick={() => navigate("/")}
            className=" ms-4 md:ms-10"
            color="purple"
          >
            Back
          </Button>
        </div>
        <div style={{ marginLeft: "100px" }}>
          <TextInput
            className="w-full"
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Name.... or Id...."
          />
        </div>
        <div className="mx-5 lg:mx-10 py-2 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center md:justify-start">
            <div className="ml-6 me-2 md:ml-0 md:mr-4">
              <DropdownButton title="Export" variant="primary">
                <Dropdown.Item onClick={() => handleExportTypeChange("csv")}>
                  CSV
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleExportTypeChange("pdf")}>
                  PDF
                </Dropdown.Item>
                <Dropdown.Item onClick={handlePrint}>Print</Dropdown.Item>
              </DropdownButton>
            </div>
            <div>
              {" "}
              {/* No margin for medium and small screens */}
              <DropdownButton
                title={`Items per Page: ${selectedDropdownValue}`}
                variant="primary"
              >
                <Dropdown.Item
                  onClick={() => handleDropdownChange({ target: { value: 5 } })}
                >
                  5
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    handleDropdownChange({ target: { value: 10 } })
                  }
                >
                  10
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    handleDropdownChange({ target: { value: 15 } })
                  }
                >
                  15
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full overflow-x-auto">
        <div className="mx-5 lg:mx-10 py-2 sm:px-6 lg:px-8">
          <table className="table table-hover text-white">
            <thead className="bg-gradient">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.length > 0 ? (
                currentStudents.map((student, index) => (
                  <tr key={student.studentId}>
                    <td>{student.studentId}</td>
                    <td>{student.studentName}</td>
                    <td>{student.studentAge}</td>
                    <td>{student.studentEmail}</td>
                    <td>{student.studentAddress}</td>
                    <td>{student.studentPhone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    NO Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={Math.ceil(dataList.length / itemsPerPage)}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default StudentListView;
