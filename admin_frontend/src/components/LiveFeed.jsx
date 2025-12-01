import React from "react";
import Sidebar from "../../components/Sidebar";
import CameraTile from "../../components/CameraTile";

export default function LiveFeed() {
  return (
    <div className="flex h-screen bg-sentraBlack text-white overflow-hidden">
      <Sidebar facilityName="Downtown Parking" />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8">Live Camera Feeds</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CameraTile title="Entry Gate 01" />
          <CameraTile title="Exit Gate 01" />
          <CameraTile title="Zone A - Overview" />
          <CameraTile title="Zone B - Overview" />
          <CameraTile title="Payment Kiosk" />
          <CameraTile title="Basement Entry" />
        </div>
      </main>
    </div>
  );
}