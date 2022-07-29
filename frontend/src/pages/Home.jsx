import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const teacher = user?.result?.role === "teacher";
  const student = user?.result?.role === "student";
  const admin = user?.result?.role === "systemAdmin";
  return (
    <div className="mt-5">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        🎉 Welcome {`${user?.result?.name ? user.result.name : "Guest"}`} to
        Appointment System Home Page 🎉
      </h1>
      {/* teacher guideline section: */}
      {teacher && (
        <div className="text-bottom mt-2 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-900 italic">
            Your Guidelines for using Appointment System
          </h2>
          <div className="flex flex-col items-center">
            <tbody className="min-w-full">
              <h3 className="text-gray-900 mt-3">@Teacher Activity</h3>
              <tr className="border-b bg-green-100 border-green-200">
                <td className="text-gray-900">
                  #1. Teacher must have to Register as a teacher before using
                  the Appointment System.
                </td>
              </tr>
              <tr className="border-b bg-green-100 border-green-200">
                <td className="text-gray-900">
                  #2. Teacher must have to complete their profile after Login
                  for student appointment request.
                </td>
              </tr>
              <tr className="border-b bg-green-100 border-green-200">
                <td className="text-gray-900">
                  #3. Teacher can create a new appointment for their available
                  schedule.
                </td>
              </tr>
              <tr className="border-b bg-green-100 border-green-200">
                <td className="text-gray-900">
                  #4. Teacher can view all the appointment also edit and delete
                  appointment.
                </td>
              </tr>
              <tr className="border-b bg-green-100 border-green-200">
                <td className="text-gray-900">
                  #5. Teacher can send registration request to system for
                  approval.
                </td>
              </tr>
            </tbody>
          </div>
        </div>
      )}
      {/* student guideline section */}
      {student && (
        <div className="text-bottom mt-2 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-900 italic">
            Your Guidelines for using Appointment System as a Student
          </h2>
          <div className="flex flex-col items-center">
            <tbody className="min-w-full mt-3">
              <h3 className="text-gray-900 mt-5">@Student Activity</h3>

              <tr className="border-b bg-blue-100 border-blue-200">
                <td className="text-gray-900">
                  #1. Student must have to register as a student before using
                  the Appointment System.
                </td>
              </tr>
              <tr className="border-b bg-blue-100 border-blue-200">
                <td className="text-gray-900">
                  #2. Student can view their prifile and edit their profile,
                  it's not mandatory for student.
                </td>
              </tr>
              <tr className="border-b bg-blue-100 border-blue-200">
                <td className="text-gray-900">
                  #3. Student can view all the appointment but can not edit or
                  delete any appointment.
                </td>
              </tr>
              <tr className="border-b bg-blue-100 border-blue-200">
                <td className="text-gray-900">
                  #4. Student can send appointment request to system for desired
                  teacher and department.
                </td>
              </tr>
            </tbody>
          </div>
        </div>
      )}
      {/* admin guidelines here */}
      {admin && (
        <div className="text-bottom mt-2 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-900 italic">
            Your Guidelines for using Appointment System as a Admin, don't
            forget to read
          </h2>
          <div className="flex flex-col items-center">
            <tbody className="min-w-full">
              <h3 className="text-gray-900 mt-3">@Admin Activity</h3>

              <tr className="border-b bg-yellow-100 border-yellow-200">
                <td className="text-sm text-gray-900 font-medium whitespace-nowrap">
                  #1. Admin can Login as a system admin but can not make any
                  registration request.
                </td>
              </tr>
              <tr className="border-b bg-yellow-100 border-yellow-200">
                <td className="text-gray-900">
                  #2. Admin can view all the appointment also can add, edit or
                  delete any appointment.
                </td>
              </tr>
              <tr className="border-b bg-yellow-100 border-yellow-200">
                <td className="text-gray-900">
                  #3. Admin can view student and teacher registration request
                  also can approve and reject.
                </td>
              </tr>
              <tr className="border-b bg-yellow-100 border-yellow-200">
                <td className="text-gray-900">
                  #4. Admin can view student appointment request also can
                  approve and reject.
                </td>
              </tr>
              <tr className="border-b bg-yellow-100 border-yellow-200">
                <td className="text-gray-900">
                  #5. Admin can see all registered user and can add new user
                  also can edit and delete.
                </td>
              </tr>
            </tbody>
          </div>
        </div>
      )}

      {/* guest guideline section: */}
      {!user && (
        <div className="text-bottom mt-5 flex flex-col items-center">
          <ol className="border-l border-gray-300">
            <li>
              <div className="flex flex-start items-center pt-3">
                <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3"></div>
                <p className="text-gray-800 font-semibold text-xl mb-1.5">
                  Admin Activity
                </p>
              </div>
              <div className="mt-0.5 ml-4 mb-6">
                <p className="text-gray-500 mb-3">
                  Admin can Login as a system admin but can not make any
                  registration request.
                </p>
                <p className="text-gray-500 mb-3">
                  Admin can view all the appointment also can add, edit or
                  delete any appointment.
                </p>
                <p className="text-gray-500 mb-3">
                  Admin can view teacher and student registration request also
                  can approve and reject.
                </p>
                <p className="text-gray-500 mb-3">
                  Admin can view student appointment request also can approve
                  and reject.
                </p>
                <p className="text-gray-500 mb-3">
                  Admin can see all registered user and can add new user also
                  can edit and delete.
                </p>
              </div>
            </li>
            <li>
              <div className="flex flex-start items-center pt-2">
                <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3"></div>
                <p className="text-gray-800 font-semibold text-xl mb-1.5">
                  Teacher Activity
                </p>
              </div>
              <div className="mt-0.5 ml-4 mb-6">
                <p className="text-gray-500 mb-3">
                  Teacher must have to Register as a teacher before using the
                  Appointment System.
                </p>
                <p className="text-gray-500 mb-3">
                  Teacher must have to complete their profile after Login for
                  student appointment request.
                </p>
                <p className="text-gray-500 mb-3">
                  Teacher can create a new appointment for their available
                  schedule.
                </p>
                <p className="text-gray-500 mb-3">
                  Teacher can view all the appointment also edit and delete
                  appointment.
                </p>
                <p className="text-gray-500 mb-3">
                  Teacher can send registration request to system for approval.
                </p>
              </div>
            </li>
            <li>
              <div className="flex flex-start items-center pt-2">
                <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3"></div>
                <p className="text-gray-800 font-semibold text-xl mb-1.5">
                  Student Activity
                </p>
              </div>
              <div className="mt-0.5 ml-4 pb-5">
                <p className="text-gray-500 mb-3">
                  Student must have to register as a student before using the
                  Appointment System.
                </p>
                <p className="text-gray-500 mb-3">
                  Student can view their prifile and edit their profile, it's
                  not mandatory for student.
                </p>
                <p className="text-gray-500 mb-3">
                  Student can view all the appointment but can not edit or
                  delete any appointment.
                </p>
                <p className="text-gray-500 mb-3">
                  Student can send appointment request to system for desired
                  teacher and department.
                </p>
              </div>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default Home;

// <div className="text-bottom mt-5">
//   <h2 className="text-2xl font-bold text-gray-900 italic">
//     Guest if you wanna know about using the Appointment System.
//   </h2>
//   <table className="table-auto">
//     <tbody className="min-w-full">
//       <h3 className="text-gray-900 mt-3">@Admin Activity</h3>
//       <tr className="border-b bg-yellow-100 border-yellow-200">
//         <td className="text-sm text-gray-900 font-medium whitespace-nowrap">
//           #1. Admin can Login as a system admin but can not make any
//           registration request.
//         </td>
//       </tr>
//       <tr className="border-b bg-yellow-100 border-yellow-200">
//         <td className="text-gray-900">
//           #2. Admin can view all the appointment also can add, edit or
//           delete any appointment.
//         </td>
//       </tr>
//       <tr className="border-b bg-yellow-100 border-yellow-200">
//         <td className="text-gray-900">
//           #3. Admin can view student and teacher registration request
//           also can approve and reject.
//         </td>
//       </tr>
//       <tr className="border-b bg-yellow-100 border-yellow-200">
//         <td className="text-gray-900">
//           #4. Admin can view student appointment request also can
//           approve and reject.
//         </td>
//       </tr>
//     </tbody>

//     <tbody className="min-w-full">
//       <h3 className="text-gray-900 mt-5">@Student Activity</h3>
//       <tr className="border-b bg-blue-100 border-blue-200">
//         <td className="text-gray-900">
//           #1. Student must have to register as a student before using
//           the Appointment System.
//         </td>
//       </tr>
//       <tr className="border-b bg-blue-100 border-blue-200">
//         <td className="text-gray-900">
//           #2. Student can view their prifile and edit their profile,
//           it's not mandatory for student.
//         </td>
//       </tr>
//       <tr className="border-b bg-blue-100 border-blue-200">
//         <td className="text-gray-900">
//           #3. Student can view all the appointment but can not edit or
//           delete any appointment.
//         </td>
//       </tr>
//       <tr className="border-b bg-blue-100 border-blue-200">
//         <td className="text-gray-900">
//           #4. Student can send appointment request to system for desired
//           teacher and department.
//         </td>
//       </tr>
//     </tbody>

//     <tbody className="min-w-full">
//       <h3 className="text-gray-900 mt-5">@Teacher Activity</h3>
//       <tr className="border-b bg-green-100 border-green-200">
//         <td className="text-gray-900">
//           #1. Teacher must have to Register as a teacher before using
// the Appointment System.
//         </td>
//       </tr>
//       <tr className="border-b bg-green-100 border-green-200">
//         <td className="text-gray-900">
//           #2. Teacher must have to complete their profile after Login
//           for student appointment request.
//         </td>
//       </tr>
//       <tr className="border-b bg-green-100 border-green-200">
//         <td className="text-gray-900">
//           #3. Teacher can create a new appointment for their available
//           schedule.
//         </td>
//       </tr>
//       <tr className="border-b bg-green-100 border-green-200">
//         <td className="text-gray-900">
//           #4. Teacher can view all the appointment also edit and delete
//           appointment.
//         </td>
//       </tr>
//       <tr className="border-b bg-green-100 border-green-200">
//         <td className="text-gray-900">
//           #5. Teacher can send registration request to system for
//           approval.
//         </td>
//       </tr>
//     </tbody>
//   </table>
// </div>
