const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1/POP1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const appointmentSchema = new mongoose.Schema({
  patientType: String,
  patientName: String,
  date: String,
  selectedPatient: String,
  selectedDoctor: String,
  selectedChair: String,
  selectedTreatment: String,
  notes: String,
  startTime: String,
  duration: String,
  mobileNumber: String,
  patientTitle: String,
});

const Appointment = mongoose.model('POP1', appointmentSchema);

app.route('/patients')
  .get(async (req, res) => {
    try {
      const patients = await Appointment.find();
      console.log('Patients:', patients);
      res.status(200).json(patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  .post(async (req, res) => {
    try {
      const newAppointmentData = req.body;
      const newAppointment = new Appointment(newAppointmentData);
      await newAppointment.save();
      console.log('New appointment added:', newAppointment);
      res.status(201).json(newAppointment);
    } catch (error) {
      console.error('Error adding new appointment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
