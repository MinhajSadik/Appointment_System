import AppointmentModel from "../models/appointmentModel.js";

//add new appointment
export const addAppointment = async (req, res) => {
  const { name, course, department, agenda, date, time } = req.body;
  try {
    const appointment = await AppointmentModel.create({
      name,
      course,
      department,
      agenda,
      date,
      time,
    });
    res.status(200).json({
      message: `Appointment has been added successfully`,
      result: appointment,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find({}).sort({
      date: -1,
      time: -1,
    });
    res.status(200).json({
      message: `All appointments has been retrieved successfully`,
      result: appointments,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//get appointment by id
export const getAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await AppointmentModel.findById(id).sort({
      date: -1,
      time: -1,
    });
    res.status(200).json({
      message: `Appointment with id ${id} has been retrieved successfully`,
      result: appointment,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//update appointment by id
export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { name, course, department, agenda, date, time } = req.body;
  try {
    const appointment = await AppointmentModel.findById(id);
    if (!appointment) {
      return res
        .status(404)
        .json({ message: `Appointment with id ${id} does not exist` });
    }
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      id,
      {
        name,
        course,
        department,
        agenda,
        date,
        time,
      },
      { new: true }
    );
    res.status(200).json({
      message: `Appointment with id ${id} has been updated successfully`,
      result: updatedAppointment,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//delete appointment by id
export const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await AppointmentModel.findById(id);
    if (!appointment) {
      return res
        .status(404)
        .json({ message: `Appointment with id ${id} does not exist` });
    }
    await AppointmentModel.findByIdAndDelete(id);
    res.status(200).json({
      message: `Appointment with id ${id} has been deleted successfully`,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//get appointments by teacher
export const getAppointmentsByTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const appointments = await AppointmentModel.find({ teacher: id });
    res.status(200).json({
      message: `All appointments has been retrieved successfully`,
      result: appointments,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//get appointments by course
export const getAppointmentsByCourse = async (req, res) => {
  const { course } = req.params;
  try {
    const appointments = await AppointmentModel.find({ course });
    res.status(200).json({
      message: `All appointments has been retrieved successfully`,
      result: appointments,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//get appointments by department
export const getAppointmentsByDepartment = async (req, res) => {
  const { department } = req.params;
  try {
    const appointments = await AppointmentModel.find({ department });
    res.status(200).json({
      message: `All appointments has been retrieved successfully`,
      result: appointments,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//get appointments by date name
export const getAppointmentsByDate = async (req, res) => {
  const { date } = req.params;
  try {
    const appointments = await AppointmentModel.find({ date });
    res.status(200).json({
      message: `All appointments has been retrieved successfully`,
      result: appointments,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//get appointments by time
export const getAppointmentsByTime = async (req, res) => {
  const { time } = req.params;
  try {
    const appointments = await AppointmentModel.find({ time });
    res.status(200).json({
      message: `All appointments has been retrieved successfully`,
      result: appointments,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//get appointments by agenda
export const getAppointmentsByAgenda = async (req, res) => {
  const { agenda } = req.params;
  try {
    const appointments = await AppointmentModel.find({ agenda });
    res.status(200).json({
      message: `All appointments has been retrieved successfully`,
      result: appointments,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//get appointments by date and time
export const getAppointmentsByDateAndTime = async (req, res) => {
  const { date, time } = req.params;
  try {
    const appointments = await AppointmentModel.find({ date, time });
    res.status(200).json({
      message: `All appointments has been retrieved successfully`,
      result: appointments,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//search appointments by name or department
export const searchByNameOrDepartment = async (req, res) => {
  const searchName = req.params.searchValue
    .toLowerCase()
    .replace(/\s/g, " ")
    .trim();
  try {
    const searchedAppointment = await AppointmentModel.find({
      $or: [
        { name: { $regex: searchName, $options: "i" } },
        { department: { $regex: searchName, $options: "i" } },
      ],
    });
    res.status(200).json({
      message: `${searchedAppointment.length} appointments has been retrieved successfully`,
      result: searchedAppointment,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};
