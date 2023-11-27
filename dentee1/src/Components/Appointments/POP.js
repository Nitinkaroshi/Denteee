import axios from "axios";
import React, { useState, useEffect } from "react";
import "./POP.css";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineClose } from "react-icons/ai";

function Viewport({ handleClose }) {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  const [patientType, setPatientType] = useState("existing");
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedChair, setSelectedChair] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [notes, setNotes] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("15");
  const [mobileNumber, setMobileNumber] = useState("");
  const [patientTitle, setPatientTitle] = useState("Mr.");
  const [existingPatients, setExistingPatients] = useState([]);

  useEffect(() => {
    const fetchExistingPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5001/patients");
        console.log("Existing Patients:", response.data);
        setExistingPatients(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (patientType === "existing") {
      fetchExistingPatients();
    }
  }, [patientType]);

  const handlePatientTypeChange = (event) => {
    setPatientType(event.target.value);
  };

  const handleFieldChange = (field) => (event) => {
    switch (field) {
      case "selectedPatient":
        setSelectedPatient(event.target.value);
        break;
      case "selectedDoctor":
        setSelectedDoctor(event.target.value);
        break;
      case "selectedChair":
        setSelectedChair(event.target.value);
        break;
      case "selectedTreatment":
        setSelectedTreatment(event.target.value);
        break;
      case "notes":
        setNotes(event.target.value);
        break;
      case "startTime":
        setStartTime(event.target.value);
        break;
      case "duration":
        setDuration(event.target.value);
        break;
      case "patientName":
        setPatientName(event.target.value);
        break;
      case "mobileNumber":
        setMobileNumber(event.target.value);
        break;
      case "patientTitle":
        setPatientTitle(event.target.value);
        break;
      case "date":
        setDate(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleClosePopup = () => {
    handleClose();
  };

  const saveAppointment = async () => {
    try {
      let response;
      if (patientType === "existing") {
        response = await axios.post("http://localhost:5001/patients", {
          patientType,
          patientName,
          date,
          selectedPatient,
          selectedDoctor,
          selectedChair,
          selectedTreatment,
          notes,
          startTime,
          duration,
        });
      } else {
        response = await axios.post("http://localhost:5001/patients", {
          patientType,
          patientName,
          date,
          mobileNumber,
          patientTitle,
          selectedChair,
          selectedDoctor,
          selectedTreatment,
          notes,
          startTime,
          duration,
        });
      }

      // Update calendar events
      setEvents([...events, newEvent]);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="asdd">
        <div className="Salam-11">
          <h1 className="Supriya-1">
            Appointment&nbsp;
            <AiOutlineClose className="Supriya-2" onClick={handleClosePopup} />
          </h1>
          <div className="View-sai-2">
            <label className="View-sai-2" style={{ color: "black" }}>
              <input
                type="radio"
                value="existing"
                checked={patientType === "existing"}
                onChange={handlePatientTypeChange}
              />
              Existing patient
            </label>
            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
            <label className="sai" style={{ color: "black" }}>
              <input
                type="radio"
                value="new"
                checked={patientType === "new"}
                onChange={handlePatientTypeChange}
              />
              New patient
            </label>
          </div>

          {patientType === "existing" && (
            <div>
              <div className="sai-up">
                <div className="sai-up22">Patient</div>
                <select
                  className="Saivanitha-1"
                  onChange={(event) =>
                    handleFieldChange("selectedPatient")(event)
                  }
                  value={selectedPatient}
                >
                  <option value="select patient">Select patient</option>
                  {existingPatients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.patientName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sai-up22-1">Doctor</div>
              <select
                className="Saivanitha"
                onChange={(event) => setSelectedDoctor(event.target.value)}
                value={selectedDoctor}
              >
                <option value="select doctor">Select doctor</option>
                <option value="s">Dr.Pavan</option>
                <option value="st">Dr.Gopi</option>
                <option value="t">Dr.Amith</option>
                <option value="t">Dr.Ratan</option>
              </select>

              <div className="sai-app-date">
                <div className="sai-app-time" style={{ color: "black" }}>
                  Date$Time
                </div>
                <input
                  type="date"
                  className="sai-app-both"
                  onChange={(event) => setDate(event.target.value)}
                  value={date}
                />
                <input
                  type="time"
                  className="ans"
                  onChange={(event) => setStartTime(event.target.value)}
                  value={startTime}
                />
                <select
                  className="sai-app-mins"
                  onChange={(event) => setDuration(event.target.value)}
                  value={duration}
                >
                  <option>15mins</option>
                  <option>20mins</option>
                  <option>30mins</option>
                  <option>40mins</option>
                  <option>50mins</option>
                  <option>60mins</option>
                </select>
              </div>

              <div className="sai-chairs">
                <div className="sai-chairs-pop" style={{ color: "black" }}>
                  Chairs
                </div>
                <select
                  className="sai-chairs-new"
                  onChange={(event) => setSelectedChair(event.target.value)}
                  value={selectedChair}
                >
                  <option value="select chair">Select chair</option>
                  <option value="s">Dr.Gopi</option>
                  <option value="st">Dr.Pavan</option>
                  <option value="t">Dr.Ratan</option>
                  <option value="t">Dr.Amith</option>
                </select>
              </div>

              <div className="sai-Selct-13">
                <div className="sai-Selct-pop" style={{ color: "black" }}>
                  Treatment
                </div>
                <select
                  className="sai-Selct"
                  onChange={(event) => setSelectedTreatment(event.target.value)}
                  value={selectedTreatment}
                >
                  <option>Select Treatment</option>
                  <option>diabetes</option>
                  <option>HIV</option>
                  <option>Cancer</option>
                </select>
              </div>

              <div className="sai-Note">
                <div className="sai-Note-1">Notes</div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="Remarks-page-tnx">
                  <input
                    className="rectangle-box"
                    type="text"
                    onChange={(event) => setNotes(event.target.value)}
                    value={notes}
                  />
                </div>
              </div>

              <div className="sai-app-buttons">
                <button onClick={saveAppointment}>Save</button>
                <button className="sai-app-onclick" onClick={handleClosePopup}>
                  CLOSE
                </button>
              </div>
            </div>
          )}

          {patientType === "new" && (
            <div>
              <div className="sai-app-direction">
                <div className="sai-app-flex">
                  <div className="sai-app-mobile" style={{ color: "black" }}>
                    Mobile no
                  </div>
                  <div className="sai-app-pick">+91</div>
                </div>
                <input
                  type="number"
                  placeholder="mobile.no"
                  className="sai-app-num"
                  onChange={(event) => handleFieldChange("mobileNumber")(event)}
                  value={mobileNumber}
                />
              </div>

              <div className="sai-app-sagar">
                <div className="sai-app-patient" style={{ color: "black" }}>
                  Patient
                </div>
                <select
                  className="sai-app-field"
                  onChange={(event) => setPatientTitle(event.target.value)}
                  value={patientTitle}
                >
                  <option>Mr.</option>
                  <option>Miss</option>
                  <option>Mrs</option>
                </select>
                <input
                  type="text"
                  placeholder="patient name"
                  className="sai-app-patientbutton"
                  onChange={(event) => setPatientName(event.target.value)}
                  value={patientName}
                />
              </div>

              <div className="sai-app-select">
                <div className="sai-app-doc" style={{ color: "black" }}>
                  Doctor
                </div>
                <select
                  className="sai-app-option"
                  onChange={(event) => setSelectedDoctor(event.target.value)}
                  value={selectedDoctor}
                >
                  <option>Dr.sagar</option>
                  <option>Dr.sunil</option>
                  <option>Dr.Pavan</option>
                  <option>Dr.Gopi</option>
                </select>
              </div>

              <div className="sai-app-date-1">
                <div className="sai-app-time-1" style={{ color: "black" }}>
                  Date$Time
                </div>
                <input
                  type="date"
                  className="sai-app-both-1"
                  onChange={(event) => setDate(event.target.value)}
                  value={date}
                />
                <input
                  type="time"
                  className="ans-1"
                  onChange={(event) => setStartTime(event.target.value)}
                  value={startTime}
                />
                <select
                  className="sai-app-min-1"
                  onChange={(event) => setDuration(event.target.value)}
                  value={duration}
                >
                  <option>15mins</option>
                  <option>20mins</option>
                  <option>30mins</option>
                  <option>40mins</option>
                  <option>50mins</option>
                  <option>60mins</option>
                </select>
              </div>

              <div className="sai-app-chairs">
                <div className="sai-app-sit" style={{ color: "black" }}>
                  Chairs
                </div>
                <select
                  className="sai-app-drop"
                  onChange={(event) => setSelectedChair(event.target.value)}
                  value={selectedChair}
                >
                  <option>Dr.Gopi</option>
                  <option>Dr.Pavan</option>
                  <option>Dr.Ratan</option>
                  <option>Dr.Amith</option>
                </select>
              </div>
              <div className="Note">
                <div className="Note-1">Notes</div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="Remarks-tnx">
                  <input
                    className="rectanglebox"
                    type="text"
                    onChange={(event) => setNotes(event.target.value)}
                    value={notes}
                  />
                </div>
              </div>

              <div className="sai-Popup-close">
                <button onClick={saveAppointment}>Save</button>
                <button className="sai-Close" onClick={handleClosePopup}>
                  CLOSE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Viewport;
