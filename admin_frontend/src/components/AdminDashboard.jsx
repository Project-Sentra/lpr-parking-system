import React from "react";
import Sidebar from "../../components/Sidebar";
import ParkingMap from "../../components/ParkingMap";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-sentraBlack text-white overflow-hidden">
      <Sidebar facilityName="Downtown Parking" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold">Overview</h1>
            <p className="text-gray-400 text-sm mt-1">Real-time facility status</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Total Vehicles</p>
            <p className="text-3xl font-bold text-[#e2e600]">324</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats Cards */}
          <div className="bg-[#171717] border border-[#232323] p-6 rounded-2xl">
            <p className="text-gray-400 text-sm">Slots Occupied</p>
            <p className="text-4xl font-bold mt-2">17<span className="text-gray-600 text-xl">/26</span></p>
          </div>
          <div className="bg-[#171717] border border-[#232323] p-6 rounded-2xl">
            <p className="text-gray-400 text-sm">Today's Revenue</p>
            <p className="text-4xl font-bold mt-2 text-[#e2e600]">LKR 87,000</p>
          </div>
          <div className="bg-[#171717] border border-[#232323] p-6 rounded-2xl">
            <p className="text-gray-400 text-sm">Active Alerts</p>
            <p className="text-4xl font-bold mt-2 text-red-400">0</p>
          </div>
        </div>

        <div className="h-96">
          <ParkingMap rows={4} cols={8} busyIndices={[0, 2, 5, 8, 9, 15, 20]} />
        </div>
      </main>
    </div>
  );
}