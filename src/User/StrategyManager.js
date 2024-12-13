import React, { useState, useEffect } from "react";
import {strategySave} from "../redux/gameslice"
import { useDispatch, useSelector } from "react-redux";

const StrategyManager = () => {
  const dispatch = useDispatch();
  const { error,message,loading } = useSelector((state) => state.game);
  const [strategyName, setStrategyName] = useState("");
  const [betCount, setBetCount] = useState(1);
  const [onProfitInc, setOnProfitInc] = useState(0);
  const [onLossDec, setOnLossDec] = useState(0);
  const [stopProfit, setStopProfit] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const saveStrategy = async () => {
    if (!strategyName.trim()) {
      return alert("Please provide a name for your strategy.");
    }
    const newStrategy = {
      name: strategyName,
      betCount,
      onProfitInc,
      onLossDec,
      stopProfit,
      stopLoss,
    };

      dispatch(strategySave(newStrategy))
      if(error){
          alert(error)
      }
      if(message){
          alert(message)
      }
   
  };

  return (
    <div className="mt-6 bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Manage Strategies</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">Strategy Name:</label>
        <input
          type="text"
          value={strategyName}
          onChange={(e) => setStrategyName(e.target.value)}
          className="w-full mt-2 p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter strategy name"
        />
      </div>
      <label className="block text-sm font-medium">Number of Bets:</label>
      <input
        type="number"
        value={betCount}
        onChange={(e) => setBetCount(Number(e.target.value))}
        className="w-full mt-2 p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Number of bets"
      />
      <label className="block text-sm font-medium mt-4">
        Add to bet on win:
      </label>
      <input
        type="number"
        value={onProfitInc}
        onChange={(e) => setOnProfitInc(Number(e.target.value))}
        className="w-full mt-2 p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Amount to add on win"
      />
      <label className="block text-sm font-medium mt-4">
        Reduce from bet on loss:
      </label>
      <input
        type="number"
        value={onLossDec}
        onChange={(e) => setOnLossDec(Number(e.target.value))}
        className="w-full mt-2 p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Amount to reduce on loss"
      />
      <label className="block text-sm font-medium mt-4">
        Stop Auto-Bet on Profit:
      </label>
      <input
        type="number"
        value={stopProfit}
        onChange={(e) => setStopProfit(Number(e.target.value))}
        className="w-full mt-2 p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Profit to stop at"
      />
      <label className="block text-sm font-medium mt-4">
        Stop Auto-Bet on Loss:
      </label>
      <input
        type="number"
        value={stopLoss}
        onChange={(e) => setStopLoss(Number(e.target.value))}
        className="w-full mt-2 p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Loss to stop at"
      />

      <button
        onClick={saveStrategy}
        className="bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 px-4 rounded-lg shadow-md mt-4 w-full"
      >
       {loading ? "... Loading" : "Save Strategy"} 
      </button>
    </div>
  );
};

export default StrategyManager;
