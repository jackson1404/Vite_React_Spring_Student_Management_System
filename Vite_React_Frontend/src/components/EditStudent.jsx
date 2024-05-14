import React, { useState } from "react";
import { Link } from "react-router-dom";
import { editStudent, studentById } from "../service/StudentService";

const EditStudent = ({
  studentName,
  className,
  updateStudentList,
  showAlertMessage,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [stData, setStData] = useState({
    studentName: "",
    studentAge: "",
    studentEmail: "",
    studentAddress: "",
    studentPhone: "",
  });

  const StudentById = async () => {
    setOpenModal(true);
    const student = await studentById(studentName);
    setStData(student.data);
  };

  const handleInputChange = (e) => {
    setStData({
      ...stData,
      [e.target.name]: e.target.value,
    });
  };
  const EditStData = async () => {
    const stEdidData = {
      studentId: stData.studentId,
      studentName: stData.studentName,
      studentAge: stData.studentAge,
      studentEmail: stData.studentEmail,
      studentAddress: stData.studentAddress,
      studentPhone: stData.studentPhone,
    };

    // Update the student data
    await editStudent(stEdidData);

    // Update the student list
    await updateStudentList();

    // Show the alert message in StudentList component
    showAlertMessage("edit");

    // Close the modal
    onCloseModal();

    // Hide the alert after 3 seconds
    setTimeout(() => {
      showAlertMessage(false);
    }, 3000);
  };

  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Link to="/editStudent">
        <button
          className={`btn btn-warning ${className}`}
          onClick={() => StudentById()}
        >
          Edit
        </button>
      </Link>

      {openModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Student</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="space-y-3">
                  <div className="mt-2 flex items-center">
                    <div
                      className="border rounded-l-md ps-3 pe-5 pt-1 bg-slate-100"
                      style={{ paddingRight: "20px", minWidth: "120px" }}
                    >
                      <label htmlFor="studentName">Name</label>
                    </div>
                    <input
                      name="studentName"
                      value={stData.studentName}
                      onChange={handleInputChange}
                      type="text"
                      className="w-full border-slate-300 rounded-r-md mt-2 w-100"
                      required
                    />
                  </div>
                  <div className="mt-2 flex items-center">
                    <div
                      className="border rounded-l-md ps-3 pe-5 pt-1 bg-slate-100"
                      style={{ paddingRight: "20px", minWidth: "120px" }}
                    >
                      <label htmlFor="studentName">Age</label>
                    </div>
                    <input
                      name="studentAge"
                      value={stData.studentAge}
                      onChange={handleInputChange}
                      type="number"
                      className="w-full border-slate-300 rounded-r-md mt-2 w-100"
                      min="5"
                      max="45"
                      required
                    />
                  </div>

                  <div className="mt-2 flex items-center">
                    <div
                      className="border rounded-l-md ps-3 pe-5 pt-1 bg-slate-100"
                      style={{ paddingRight: "20px", minWidth: "120px" }}
                    >
                      <label htmlFor="studentName">Email</label>
                    </div>
                    <input
                      name="studentEmail"
                      value={stData.studentEmail}
                      onChange={handleInputChange}
                      type="text"
                      className="w-full border-slate-300 rounded-r-md mt-2 w-100"
                      required
                    />
                  </div>

                  <div className="mt-2 flex items-center">
                    <div
                      className="border rounded-l-md ps-3 pe-5 pt-1 bg-slate-100"
                      style={{ paddingRight: "20px", minWidth: "120px" }}
                    >
                      <label htmlFor="studentName">Address</label>
                    </div>
                    <input
                      name="studentAddress"
                      value={stData.studentAddress}
                      onChange={handleInputChange}
                      type="text"
                      className="w-full border-slate-300 rounded-r-md mt-2 w-100"
                      required
                    />
                  </div>
                  <div className="mt-2 flex items-center">
                    <div
                      className="border rounded-l-md ps-3 pe-5 pt-1 bg-slate-100"
                      style={{ paddingRight: "20px", minWidth: "120px" }}
                    >
                      <label htmlFor="studentName">Phone</label>
                    </div>
                    <input
                      name="studentPhone"
                      value={stData.studentPhone}
                      onChange={handleInputChange}
                      type="text"
                      className="w-full border-slate-300 rounded-r-md mt-2 w-100"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={EditStData}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditStudent;
