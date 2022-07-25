import AppointmentModel from "../models/appointmentModel.js";
import RequestModel from "../models/requestedModel.js";
import UserModel from "../models/userModel.js";

/*
teacher and system admin appointment routes
*/
//add new appointment
export const addAppointment = async (req, res) => {
  const { name, course, department, agenda, date, time, userId } = req.body;
  try {
    const appointment = await AppointmentModel.create({
      name,
      course,
      department,
      agenda,
      date,
      time,
      userId,
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
    const appointments = await AppointmentModel.find({})
      .populate("userId", "name email")
      .sort({ date: -1, time: -1 });

    res.status(200).json(appointments);
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
    const appointments = await AppointmentModel.find({ teacher: id })
      .populate("userId", "name email")
      .sort({ date: -1, time: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//search appointments by name or department
export const searchAppointmentFields = async (req, res) => {
  const searchName = req.params.searchValue
    .toLowerCase()
    .replace(/\s/g, " ")
    .trim();

  try {
    const searchedAppointment = await AppointmentModel.find({
      $or: [
        { name: { $regex: searchName, $options: "i" } },
        { department: { $regex: searchName, $options: "i" } },
        { course: { $regex: searchName, $options: "i" } },
        { agenda: { $regex: searchName, $options: "i" } },
        { date: { $regex: searchName, $options: "i" } },
        { time: { $regex: searchName, $options: "i" } },
      ],
    })
      .populate("userId", "-password -__v")
      .sort({ date: -1, time: -1 });

    //check if there is any appointment found
    if (searchedAppointment.length === 0) {
      return res.status(404).json({
        message: `No appointment found with name or department ${searchName}`,
      });
    }

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

//search appointments by course and department
export const searchByCourseAndDepartment = async (req, res) => {
  const { course, department } = req.params;
  try {
    const searchedAppointment = await AppointmentModel.find({
      course,
      department,
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

/*
student appointment request
student appointment request approval
student appointment request rejection
*/

//The admin will allow students to make an appointment request by providing teachers, departments etc.
export const studentAppointmentRequest = async (req, res) => {
  const { name, course, department, agenda, date, time, userId } = req.body;
  try {
    //check teacher by department and id
    //there some issue i found below i commented it out
    //later i wanna implement get teacher using userId not _id, directly from the user.
    //userId isn't tracked in client side, so i can't use it to get teacher
    //agenda is sendable when student trying to make an appointment request
    const teacher = await UserModel.findOne({
      _id: userId,
    });

    if (!teacher)
      return res.status(404).json({
        message: `Teacher with name ${userId} does not exist`,
      });

    //check teacher is in the same department
    if (teacher.department !== department)
      return res.status(400).json({
        message: `Teacher with name ${name} is not in the same department`,
      });

    //send appointment to temporary appointment collection
    const requestAppointment = await RequestModel.create({
      name,
      course,
      department,
      agenda,
      date,
      time,
      userId,
    });

    return res.status(200).json({
      message: `Appointment request has been sent successfully`,
      result: requestAppointment,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//get all student appointments requests
export const getStudentAppointmentsRequests = async (req, res) => {
  try {
    const appointments = await RequestModel.find({})
      .populate("userId", "name email")
      .sort({ date: -1, time: -1 });

    if (appointments.length === 0) {
      return res.status(404).json({
        message: `No appointments requests found`,
      });
    }

    return res.status(200).json({
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

//approve student appointment request
export const approveStudentAppointmentRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await RequestModel.findById(id);
    if (!appointment)
      return res
        .status(404)
        .json({ message: `Appointment with id ${id} does not exist` });

    //get all appointments from request
    const {
      name: requestName,
      course: requestCourse,
      department: requestDepartment,
      agenda: requestAgenda,
      date: requestDate,
      time: requestTime,
      userId: requestUserId,
    } = appointment;

    //create appointment from request
    const newAppointment = await AppointmentModel.create({
      name: requestName,
      course: requestCourse,
      department: requestDepartment,
      agenda: requestAgenda,
      date: requestDate,
      time: requestTime,
      teacher: requestUserId,
    });

    //delete request
    await RequestModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: `Appointment request has been approved successfully`,
      result: newAppointment,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//reject student appointment request
export const rejectStudentAppointmentRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await RequestModel.findById(id);
    if (!appointment)
      return res
        .status(404)
        .json({ message: `Appointment with id ${id} does not exist` });

    //delete request
    await RequestModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: `Appointment request has been rejected successfully`,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

/* 
Extra Features for Appointment System
getAppointmentsByCourse
getAppointmentsByDepartment
getAppointmentsByDate
getAppointmentsByTime
getAppointmentsByAgenda
getAppointmentsByDateAndTime
*/
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
