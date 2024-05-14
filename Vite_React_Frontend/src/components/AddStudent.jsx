import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addStudent } from "../service/StudentService";
import { Button } from "flowbite-react";

const AddStudent = ({ updateStudentList, showAlertMessage }) => {
  const [openModal, setOpenModal] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");

  const postStData = async () => {
    let isValid = true;

    setNameError("");
    setAgeError("");
    setPhoneError("");
    setEmailError("");
    setAddressError("");

    // Validation
    if (studentName.trim() === "") {
      setNameError("Name is required");
      isValid = false;
    }
    if (studentAge < 5 || studentAge > 40) {
      setAgeError("Age must be between 5 and 40");
      isValid = false;
    }
    if (studentPhone.trim() === "") {
      setPhoneError("Phone is required");
      isValid = false;
    }
    if (studentEmail.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!studentEmail.includes("@")) {
      setEmailError("Invalid email format, not including '@'");
      isValid = false;
    }
    if (studentAddress.trim() === "") {
      setAddressError("Address is required");
      isValid = false;
    }

    if (isValid) {
      const stData = {
        studentName: studentName,
        studentAge: studentAge,
        studentEmail: studentEmail,
        studentAddress: studentAddress,
        studentPhone: studentPhone,
      };

      await addStudent(stData);
      onCloseModal();
      updateStudentList();
      showAlertMessage("add"); // Show alert on add
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);

    setStudentName("");
    setStudentAge("");
    setStudentPhone("");
    setStudentEmail("");
    setStudentAddress("");
    setNameError("");
    setAgeError("");
    setPhoneError("");
    setEmailError("");
    setAddressError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Clear error messages as the user types
    switch (name) {
      case "studentName":
        setNameError("");
        break;
      case "studentAge":
        setAgeError("");
        break;
      case "studentPhone":
        setPhoneError("");
        break;
      case "studentEmail":
        setEmailError("");
        break;
      case "studentAddress":
        setAddressError("");
        break;
      default:
        break;
    }
    // Update state with the new input value
    switch (name) {
      case "studentName":
        setStudentName(value);
        break;
      case "studentAge":
        setStudentAge(value);
        break;
      case "studentPhone":
        setStudentPhone(value);
        break;
      case "studentEmail":
        setStudentEmail(value);
        break;
      case "studentAddress":
        setStudentAddress(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Link to="/addStudent">
        <Button
          color="blue"
          style={{ margin: "0px 10px 20px -40px" }}
          onClick={() => setOpenModal(true)}
        >
          Add <span className="ms-1 hidden md:block">Student</span>
        </Button>
      </Link>

      {openModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Student Register</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <input
                        placeholder="Name"
                        name="studentName"
                        value={studentName}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control"
                        required
                      />
                      <span
                        className="text-danger"
                        style={{ marginTop: "200px" }}
                      >
                        {nameError}
                      </span>

                      <input
                        placeholder="Age (5 - 40)"
                        name="studentAge"
                        value={studentAge}
                        onChange={handleInputChange}
                        type="number"
                        min="5"
                        max="40"
                        className="form-control mt-3"
                        required
                      />
                      <input
                        placeholder="Email"
                        name="studentEmail"
                        value={studentEmail}
                        onChange={handleInputChange}
                        type="email"
                        className="form-control mt-3"
                        required
                      />
                      <span className="text-danger">{emailError}</span>
                      <textarea
                        placeholder="Address..."
                        name="studentAddress"
                        value={studentAddress}
                        onChange={handleInputChange}
                        className="form-control mt-3"
                        rows={2}
                        required
                      ></textarea>
                      <span className="text-danger">{addressError}</span>
                      <input
                        placeholder="Phone"
                        name="studentPhone"
                        value={studentPhone}
                        onChange={handleInputChange}
                        type="tel"
                        className="form-control mt-3"
                        required
                      />
                      <span className="text-danger">{phoneError}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={postStData}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStudent;
