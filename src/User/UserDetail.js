import React, { useState ,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import {getUser,clearErrors,clearMessage,addAmount} from "../redux/userSlice"
import Spinner from "../BaseFile/comman/Spinner"
const UserDetail = () => {
    const dispatch=useDispatch()
    const{singleuser,loading,error,message} = useSelector((state)=>state.allusers)
  const [amountToAdd, setAmountToAdd] = useState(0);

  useEffect(() => {
    dispatch(getUser(1))
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);
      return () => clearTimeout(timer);
    }
    
  }, [error, message,dispatch]);


  const handleAddAmount = () => {
    if (amountToAdd > 0) {
        dispatch(addAmount({amount:amountToAdd , action : "plus"}));
      setAmountToAdd(0); 
    }
    else{
        window.alert("Amount should be greater than 0")
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">User Details</h2>
        <div className="mb-4">
          <p className="text-sm text-gray-500">ID:</p>
          <p className="text-lg font-semibold">{singleuser?.id}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-500">Username:</p>
          <p className="text-lg font-semibold">{singleuser?.username}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-500">Email:</p>
          <p className="text-lg font-semibold">{singleuser?.email}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-500">Role:</p>
          <p className="text-lg font-semibold capitalize">{singleuser?.role}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-500">BEP20 Address:</p>
          <p className="text-lg font-semibold">{singleuser?.bep20}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-500">TRC20 Address:</p>
          <p className="text-lg font-semibold">{singleuser?.trc20}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-500">Balance:</p>
          <p className="text-xl font-bold text-green-600">${singleuser?.amount.toFixed(2)}</p>
        </div>

        {/* Add Amount */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Add Amount</h3>
          <input
            type="number"
            value={amountToAdd}
            onChange={(e) => setAmountToAdd(Number(e.target.value))}
            placeholder="Enter amount to add"
            className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddAmount}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
          >
           {loading ? <Spinner/> : `Add ${amountToAdd || 0}`} 
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
