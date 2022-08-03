import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  approveStudentRequest,
  rejectStudentRequest,
} from "../../redux/features/appointmentSlice";

const RequestInfo = ({ appointmentRequest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleApprove = (id) => {
    dispatch(approveStudentRequest({ id, navigate, toast }));
  };

  const handleReject = (id) => {
    dispatch(rejectStudentRequest({ id, navigate, toast }));
  };
  return (
    // <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 w-48">
    //   <td className="">
    //     <p className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
    //       {appointmentRequest?.name}
    //     </p>
    //   </td>
    //   <td className="">
    //     <p className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
    //       {appointmentRequest?.role ? appointmentRequest?.role : "student"}
    //     </p>
    //   </td>
    //   <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
    //     <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-yellow-500 text-white rounded-full">
    //       {appointmentRequest?.status}
    //     </span>
    //   </td>
    //   <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
    //     <p className="">
    //       {moment(appointmentRequest?.createdAt).format("MMM Do YYYY")}
    //     </p>
    //   </td>
    //   <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
    //     <button
    //       type="button"
    //       onClick={() => handleApprove(appointmentRequest._id)}
    //       className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded-full hover:bg-red-700"
    //     >
    //       Approve
    //     </button>
    //   </td>
    //   <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
    //     <button
    //       type="button"
    //       onClick={() => handleReject(appointmentRequest._id)}
    //       className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded-full hover:bg-pink-700"
    //     >
    //       Reject
    //     </button>
    //   </td>
    // </tr>

    <div className="pl-2 flex">
      <div className="flex-1 mb-5">
        <div className="flex items-center justify-between">
          <p className="text-sm leading-none py-1 w-20">
            <span className="text-indigo-700 uppercase">
              {appointmentRequest?.name}
            </span>
          </p>
          <p className="text-sm leading-none py-1 w-20">
            <span className="text-black">
              {appointmentRequest?.role ? appointmentRequest?.role : "student"}
            </span>
          </p>

          <p className="text-sm leading-none py-1">
            <span className="text-xs inline-block py-1 px-1 leading-none text-center whitespace-nowrap align-baseline font-bold bg-yellow-500 text-white rounded-full">
              {appointmentRequest?.status}
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleApprove(appointmentRequest._id)}
          className="text-xs w-20 inline-block py-1 px-2.5 mr-3 leading-none text-center whitespace-nowrap font-bold bg-blue-600 text-white rounded-full hover:bg-red-700"
        >
          Approve
        </button>
        <button
          type="button"
          onClick={() => handleReject(appointmentRequest._id)}
          className="text-xs w-20 inline-block py-1 px-2.5 mr-3 leading-none text-center whitespace-nowrap font-bold bg-red-600 text-white rounded-full hover:bg-pink-700"
        >
          Reject
        </button>
        <p className="text-xs w-20 leading-3 mt-3 py-1 text-gray-500">
          {moment(appointmentRequest.createdAt).startOf().fromNow()}
        </p>
      </div>
    </div>
  );
};

export default RequestInfo;
