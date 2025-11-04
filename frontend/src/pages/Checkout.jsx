import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const { user, fetchProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🧠 Address fields
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");

  const [savedAddress, setSavedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [loading, setLoading] = useState(true);

  // 🧩 Load saved address from backend
  useEffect(() => {
    const loadAddress = async () => {
      if (!user) return;
      try {
        const res = await axios.get("http://localhost:3000/users/profile", {
          withCredentials: true,
        });
        if (res.data.success && res.data.user.address) {
          setSavedAddress(res.data.user.address);
          setIsEditing(false);
        }
      } catch (err) {
        console.error("Error fetching address:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAddress();
  }, [user]);

  // 🧮 Total price
  const total = cartItems.reduce(
    (sum, item) =>
      sum + parseInt(item.price.replace("₹", "").replace(",", "")) * item.quantity,
    0
  );

  // 💾 Save or Update address (backend)
  const handleSaveAddress = async () => {
    if (!state || !city || !street || !pincode || !phone) {
      return alert("Please fill all address details!");
    }

    const newAddress = { country, state, city, street, pincode, phone };

    try {
      const res = await axios.put("http://localhost:3000/users/address", newAddress, {
        withCredentials: true,
      });

      if (res.data.success) {
        setSavedAddress(res.data.user.address);
        setIsEditing(false);
        await fetchProfile(); // update user context
        alert("✅ Address saved successfully!");
      }
    } catch (err) {
      console.error("Address save error:", err);
      alert("❌ Failed to save address");
    }
  };

  // 🧾 Confirm order
  const handleOrder = () => {
    if (!savedAddress) {
      return alert("Please save your address before placing order!");
    }
    alert("✅ Order placed successfully!");
    navigate("/orders");
  };

  if (!user) {
    return <p className="text-center mt-10">Please login to continue checkout.</p>;
  }

  if (cartItems.length === 0) {
    return <p className="text-center mt-10">Your cart is empty 🛒</p>;
  }

  if (loading) {
    return <p className="text-center mt-10">Loading your address...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Checkout 🧾</h2>

      {/* ADDRESS SECTION */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
          Delivery Address
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 text-sm underline hover:text-blue-800"
            >
              Edit Address
            </button>
          )}
        </h3>

        {isEditing ? (
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-sm font-medium">Country</label>
              <input
                type="text"
                value={country}
                readOnly
                className="border rounded w-full p-2 bg-gray-100 text-gray-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="border rounded w-full p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border rounded w-full p-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Street / Area / House No.</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Pincode</label>
              <input
                type="text"
                value={pincode}
                maxLength="6"
                onChange={(e) => setPincode(e.target.value)}
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border rounded w-full p-2"
              />
            </div>

            <button
              onClick={handleSaveAddress}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700"
            >
              Save Address
            </button>
          </div>
        ) : (
          // 🏠 Display saved address
          <div className="border rounded-md p-4 bg-gray-50">
            <p>
              <strong>Address:</strong> {savedAddress.street}, {savedAddress.city},{" "}
              {savedAddress.state}, {savedAddress.pincode}, {savedAddress.country}
            </p>
            <p>
              <strong>Contact:</strong> {savedAddress.phone}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <input type="radio" name="address" defaultChecked />
              <label className="text-sm text-gray-700">Use this address</label>
            </div>
          </div>
        )}
      </div>

      {/* ORDER SUMMARY */}
      <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
      <ul className="divide-y">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between py-2">
            <span>
              {item.title} (x{item.quantity})
            </span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-4 font-bold">
        <span>Total:</span>
        <span>₹{total.toLocaleString()}</span>
      </div>

      <button
        onClick={handleOrder}
        className="w-full mt-5 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default Checkout;
