import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/userSlice";
import { updateresult, getstrategy } from "../redux/gameslice";

const UserGame = () => {
  const dispatch = useDispatch();
  const { singleuser } = useSelector((state) => state.allusers);
  const { strategy } = useSelector((state) => state.game);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [diceRoll, setDiceRoll] = useState(null);
  const [betAmount, setBetAmount] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(50);
  const [gameMode, setGameMode] = useState("rollOver");
  const [result, setResult] = useState(null);
  const [autoBet, setAutoBet] = useState(true);
  const [betCount, setBetCount] = useState(1);
  const [onProfitInc, setOnProfitInc] = useState(0);
  const [onLossDec, setOnLossDec] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);
  const [stopProfit, setStopProfit] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);

  useEffect(() => {
    dispatch(getUser(1));
    dispatch(getstrategy());
  }, [dispatch]);

  const rollDice = async (currentBetAmount) => {
    if (currentBetAmount <= 0) {
      return window.alert("Bet amount should be greater than 0");
    } else if (currentBetAmount > singleuser?.amount) {
      return window.alert(
        `Bet amount should not exceed your balance of $${singleuser?.amount.toFixed(
          2
        )}`
      );
    }
    if (selectedNumber <= 0) {
      return window.alert("Number should be greater than 0");
    } else if (selectedNumber > 99) {
      return window.alert(`Number should not exceed 99`);
    }

    const roll = Math.floor(Math.random() * 99) + 1;
    setDiceRoll(roll);
    const isWin =
      gameMode === "rollUnder" ? roll < selectedNumber : roll > selectedNumber;
    const gameResult = isWin ? "Win" : "Loss";
    const winProbability = calculateWinProbability();
    const multiplier = (1 / (winProbability / 100)).toFixed(2);
    const winningAmount = isWin
      ? (currentBetAmount * multiplier).toFixed(2)
      : 0;
    setResult(
      isWin ? `🎉 You win! You earned $${winningAmount}` : `😞 You lose!`
    );
    const payload = {
      result: gameResult,
      amount: winningAmount,
      bet: currentBetAmount, // Use the correct bet amount
      action: gameMode,
      multiplier: multiplier,
    };
    console.log(payload);
    try {
      dispatch(updateresult(payload));
    } catch (error) {
      console.error("Error saving result:", error);
    }
    return { isWin, winningAmount };
  };
  const calculateWinProbability = () => {
    return gameMode === "rollOver"
      ? ((99 - selectedNumber) / 99) * 100
      : (selectedNumber / 99) * 100;
  };
  const calculatePotentialWinnings = () => {
    const winProbability = calculateWinProbability();
    const multiplier = 1 / (winProbability / 100);
    return (betAmount * multiplier).toFixed(2);
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const startAutoBet = async () => {
    setAutoBet(true);
    let i = 0;
    let localBetAmount = betAmount;
    let localTotalProfit = totalProfit;
    let localTotalLoss = totalLoss;

    while (autoBet && i < betCount) {
      const { isWin, winningAmount } = await rollDice(localBetAmount);
      if (isWin) {
        localBetAmount += onProfitInc;
        localTotalProfit += parseFloat(winningAmount);
        console.log("Win! New Bet Amount:", localBetAmount);
      } else {
        localBetAmount = Math.max(0, localBetAmount - onLossDec);
        localTotalLoss += betAmount;
        console.log("Loss. New Bet Amount:", localBetAmount);
      }
      setBetAmount(localBetAmount);
      setTotalProfit(localTotalProfit);
      setTotalLoss(localTotalLoss);
      if (localTotalProfit >= stopProfit || localTotalLoss >= stopLoss) {
        console.log("Stopping auto-bet due to profit/loss threshold");
        break;
      }
      i++;
      await delay(1000);
    }
    setAutoBet(false);
  };

  const handleSelectChange = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const selected = strategy.find((item) => item.id === selectedId);
    setSelectedStrategy(selected);
  };

  useEffect(() => {
    if (selectedStrategy) {
      setBetCount(selectedStrategy?.betCount);
      setOnProfitInc(selectedStrategy?.onProfitInc);
      setOnLossDec(selectedStrategy?.onLossDec);
      setStopProfit(selectedStrategy?.stopProfit);
      setStopLoss(selectedStrategy?.stopLoss);
    }
  }, [selectedStrategy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">🎲 Dice Game</h1>

      {/* Game Settings */}
      <div className="w-full lg:flex justify-around">
        <div>
          <div className="bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Bet Amount (Your wallet : {singleuser?.amount}):
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value))}
                  className="w-full mt-2 p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your bet"
                  max={singleuser?.amount}
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Select Number (1-99):
                <input
                  type="number"
                  value={selectedNumber}
                  onChange={(e) => setSelectedNumber(Number(e.target.value))}
                  min="1"
                  max="99"
                  className="w-full mt-2 p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter a number"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Game Mode:
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gameMode"
                    value="rollOver"
                    checked={gameMode === "rollOver"}
                    onChange={() => setGameMode("rollOver")}
                    className="text-purple-500"
                  />
                  Roll Over
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gameMode"
                    value="rollUnder"
                    checked={gameMode === "rollUnder"}
                    onChange={() => setGameMode("rollUnder")}
                    className="text-purple-500"
                  />
                  Roll Under
                </label>
              </div>
            </div>
          </div>

          {/* Game Actions */}
          <button
            onClick={() => rollDice(betAmount)}
            className="bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 px-4 rounded-lg shadow-md mt-6"
          >
            Roll Dice
          </button>

          {/* Results */}
          {diceRoll !== null && (
            <div className="mt-6 bg-gray-700 rounded-lg shadow-lg p-4 w-full max-w-md">
              <p className="text-xl font-bold">Dice Roll: {diceRoll}</p>
              <p className="text-lg font-semibold mt-2">{result}</p>
            </div>
          )}

          {/* Statistics */}
          <div className="mt-6 bg-gray-700 rounded-lg shadow-lg p-4 w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">Details</h2>
            <p>Win Probability: {calculateWinProbability().toFixed(2)}%</p>
            <p>Potential Winnings: ${calculatePotentialWinnings()}</p>
          </div>
        </div>

        <div className="mt-6 bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Auto-Bet Settings</h2>

          <div className="p-6 bg-gray-700 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4 text-white">
              Select a Strategy
            </h2>
            <label
              htmlFor="strategySelect"
              className="block text-sm font-medium text-gray-300"
            >
              Strategy:
            </label>
            <select
              id="strategySelect"
              onChange={handleSelectChange}
              className="w-full mt-2 p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a strategy
              </option>
              {strategy?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </select>
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
            onClick={() => startAutoBet(!autoBet)}
            className="bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 px-4 rounded-lg shadow-md mt-4 w-full"
          >
            {autoBet ? "Start Auto-Bet" : "Stop Auto-Bet"}
          </button>
        </div>
      </div>

    </div>
  );
};

export default UserGame;
