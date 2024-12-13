import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LeaderBoard } from "../redux/gameslice";
export default function ResultBoard(){
    const dispatch = useDispatch();
    const { allresult } = useSelector((state) => state.game);
    useEffect(() => {
        dispatch(LeaderBoard());
      }, [dispatch]);
    return (
       
        <>
         <div className="mt-6 bg-gray-700 rounded-lg shadow-lg p-4 w-full max-w-6xl">
        <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
        {allresult?.length > 0 ? (
          <table className="w-full table-auto text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Result</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Bet</th>
                <th className="px-4 py-2 text-left">Action</th>
                <th className="px-4 py-2 text-left">Multiplier</th>
              </tr>
            </thead>
            <tbody>
              {allresult?.slice(0)?.map((entry, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{entry?.user_id}</td>
                    <td className="px-4 py-2">{entry?.result}</td>
                    <td className="px-4 py-2">${entry?.amount}</td>
                    <td className="px-4 py-2">${entry?.bet}</td>
                    <td className="px-4 py-2">{entry?.action}</td>
                    <td className="px-4 py-2">{entry?.multiplier}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No leaderboard entries found.</p>
        )}
      </div>
        </>
    )
}