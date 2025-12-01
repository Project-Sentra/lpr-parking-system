import React from "react";
import Sidebar from "../../components/Sidebar";

export default function InOut() {
  const transactions = Array.from({ length: 10 }).map((_, i) => ({
    plate: `CBH ${5120 + i}`,
    entry: "09:23",
    exit: i % 2 === 0 ? "10:45" : "-",
    duration: i % 2 === 0 ? "1h 22m" : "Active",
    amount: i % 2 === 0 ? "350.00" : "-",
  }));

  return (
    <div className="flex h-screen bg-sentraBlack text-white overflow-hidden">
      <Sidebar facilityName="Downtown Parking" />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8">In & Out Logs</h1>
        
        <div className="bg-[#171717] border border-[#232323] rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1f1f1f] text-gray-400 font-medium">
              <tr>
                <th className="p-4">License Plate</th>
                <th className="p-4">Time of Entry</th>
                <th className="p-4">Time of Exit</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Amount (LKR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232323]">
              {transactions.map((t, idx) => (
                <tr key={idx} className="hover:bg-[#1f1f1f] transition">
                  <td className="p-4 font-mono text-white">{t.plate}</td>
                  <td className="p-4 text-gray-400">{t.entry}</td>
                  <td className="p-4 text-gray-400">{t.exit}</td>
                  <td className="p-4 text-gray-400">{t.duration}</td>
                  <td className="p-4 text-[#e2e600]">{t.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}