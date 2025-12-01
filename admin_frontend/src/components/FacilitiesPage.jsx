import React from "react";
import Navbar from "../../components/Navbar";
import FacilityCard from "../../components/FacilityCard";

export default function Facilities() {
  // Mock data for facilities
  const facilities = [
    { id: 1, name: "Downtown Parking", revenueLKR: 87000, capacityPct: 42, status: "Active" },
    { id: 2, name: "Monte Carlo", revenueLKR: 53000, capacityPct: 65, status: "Active" },
    { id: 3, name: "Airport Zone A", revenueLKR: 120000, capacityPct: 89, status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-sentraBlack text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Parking Facilities</h1>
        <p className="text-gray-400 mb-8">Select a facility to manage</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac) => (
            <FacilityCard key={fac.id} facility={fac} />
          ))}
        </div>
      </div>
    </div>
  );
}