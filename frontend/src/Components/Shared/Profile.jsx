import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  return (
    <>
      <div class="p-8">
        <div class="bg-white shadow">
          <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="relative"></div>
          </div>

          <div class="mt-10 text-center border-b pb-12">
            <h1 class="text-4xl font-medium text-gray-700">
              Jessica Jones, <span class="font-light text-gray-500">27</span>
            </h1>
            <p class="font-light text-gray-600 mt-3">Bucharest, Romania</p>

            <p class="mt-8 text-gray-500">
              Solution Manager - Creative Tim Officer
            </p>
            <p class="mt-2 text-gray-500">University of Computer Science</p>
          </div>
        </div>
      </div>
      <div class="h-screen py-5 px-3 bg-white items-center">
        <div class="bg-white">
          <h4 class="flex justify-center p-3 text-[22px]">Edit Your Profile</h4>
          <div class="md:grid grid-cols-12 flex flex-col md:items-center gap-4 p-4">
            <div class="col-span-6 relative">
              <span class="absolute bg-white left-3 -top-[12px] px-2">
                Name
              </span>
              <input
                type="name"
                placeholder="enter your name"
                class="text-[13px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
              />
            </div>

            <div class="col-span-6 relative">
              <span class="absolute bg-white left-3 -top-[12px] px-2">
                Email
              </span>
              <input
                type="email"
                placeholder="enter your email"
                class="text-[13px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
              />
            </div>

            <div class="col-span-6 relative">
              <span class="absolute bg-white left-3 -top-[12px] px-2">
                Course
              </span>
              <input
                type="text"
                placeholder="enter your course name"
                class="text-[13px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
              />
            </div>

            <div class="col-span-6 relative">
              <span class="absolute bg-white left-3 -top-[12px] px-2">
                Department
              </span>
              <input
                type="text"
                placeholder="enter your department name"
                class="text-[13px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
              />
            </div>

            <div class="col-span-6 relative">
              <span class="absolute bg-white left-3 -top-[12px] px-2">
                Agenda
              </span>
              <input
                type="text"
                placeholder="enter your agenda name"
                class="text-[13px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
              />
            </div>

            <div class="col-span-6 relative">
              <span class="absolute bg-white left-3 -top-[12px] px-2">
                Available Date
              </span>
              <input
                type="text"
                placeholder="available date"
                class="text-[13px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
              />
            </div>

            <div class="col-span-6 relative">
              <span class="absolute bg-white left-3 -top-[12px] px-2">
                Available Time
              </span>
              <input
                type="text"
                placeholder="available time"
                class="text-[13px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
              />
            </div>

            <div class="col-span-6 relative">
              <span class="absolute bg-white left-3 -top-[12px] px-2">
                Role
              </span>
              <input
                type="text"
                placeholder="is that any mistake"
                class="text-[13px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
              />
            </div>
          </div>

          <div class="px-4 text-right py-2">
            <button class="h-10 w-32 rounded-sm shadow-md text-white text-[16px] hover:bg-green-700 bg-green-600">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
