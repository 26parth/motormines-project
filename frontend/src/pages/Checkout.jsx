import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { user, fetchProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");

  const [savedAddress, setSavedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const loadAddress = async () => {
      if (!user) return setLoading(false);
      try {
        const res = await axios.get("http://localhost:3000/users/profile", { withCredentials: true });
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

  // ✅ Correct mapping for backend
  const itemsForBackend = cartItems.map(i => ({
    productId: i._id, // MongoDB ObjectId
    title: i.name || i.title,
    img: i.image || i.img,
    quantity: i.quantity,
    price: Number(String(i.price).replace(/[₹,]/g, "")),
  }));

  const total = itemsForBackend.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSaveAddress = async () => {
    if (!state || !city || !street || !pincode || !phone) return alert("Please fill all fields");
    const newAddress = { country, state, city, street, pincode, phone };
    try {
      const res = await axios.put("http://localhost:3000/users/address", newAddress, { withCredentials: true });
      if (res.data.success) {
        setSavedAddress(res.data.user.address);
        setIsEditing(false);
        await fetchProfile();
        alert("Address saved ✅");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save address ❌");
    }
  };

  // COD order placement
  const handlePlaceCodOrder = async () => {
    if (!savedAddress) return alert("Please save address before placing order");
    if (cartItems.length === 0) return alert("Your cart is empty!");
    setProcessing(true);
    try {
      const res = await axios.post(
      "http://localhost:3000/api/create-cod",
        {
          items: itemsForBackend,
          shippingAddress: savedAddress,
          totalAmount: total,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("✅ COD Order placed!");
        setCartItems([]);
        navigate("/orders");
      }
    } catch (err) {
      console.error("COD order error:", err);
      alert("Failed to place COD order");
    } finally {
      setProcessing(false);
    }
  };

  // Razorpay online payment
  const handleProceedToPayment = async () => {
    if (!savedAddress) return alert("Save address first");
    if (total <= 0) return alert("Invalid total");

    setProcessing(true);
    try {
      const createRes = await axios.post(
        "http://localhost:3000/payment/create-order",
        { amount: total },
        { withCredentials: true }
      );

      if (!createRes.data.success) throw new Error("Order creation failed");
      const razorOrder = createRes.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorOrder.amount,
        currency: razorOrder.currency,
        name: "MotorMines",
        description: "Purchase",
        order_id: razorOrder.id,
        prefill: { name: user.fullname, email: user.email, contact: savedAddress.phone },
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              "http://localhost:3000/payment/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderItems: itemsForBackend,
                address: savedAddress,
              },
              { withCredentials: true }
            );
            if (verifyRes.data.success) {
              alert("Payment successful ✅");
              setCartItems([]);
              navigate("/orders");
            } else alert("Payment verification failed ❌");
          } catch (err) {
            console.error(err);
            alert("Error verifying payment ❌");
          }
        },
        modal: { ondismiss: () => setProcessing(false) },
      };

      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => new window.Razorpay(options).open();
      } else {
        new window.Razorpay(options).open();
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed ❌");
      setProcessing(false);
    }
  };

  if (!user) return <p className="text-center mt-10">Login first</p>;
  if (cartItems.length === 0) return <p className="text-center mt-10">Cart empty 🛒</p>;
  if (loading) return <p className="text-center mt-10">Loading address...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Checkout 🧾</h2>

      {/* Address */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold mb-2 flex justify-between items-center">
          Delivery Address
          {!isEditing && <button onClick={() => setIsEditing(true)} className="text-blue-600 underline text-sm">Edit</button>}
        </h3>

        {isEditing ? (
          <div className="space-y-3">
            <input type="text" value={state} placeholder="State" onChange={e => setState(e.target.value)} className="border p-2 w-full rounded" />
            <input type="text" value={city} placeholder="City" onChange={e => setCity(e.target.value)} className="border p-2 w-full rounded" />
            <input type="text" value={street} placeholder="Street" onChange={e => setStreet(e.target.value)} className="border p-2 w-full rounded" />
            <input type="text" value={pincode} placeholder="Pincode" onChange={e => setPincode(e.target.value)} className="border p-2 w-full rounded" maxLength={6} />
            <input type="text" value={phone} placeholder="Phone" onChange={e => setPhone(e.target.value)} className="border p-2 w-full rounded" />
            <button onClick={handleSaveAddress} className="bg-blue-600 text-white px-4 py-2 rounded">Save Address</button>
          </div>
        ) : (
          <div className="border p-4 bg-gray-50 rounded">
            <p>{savedAddress.street}, {savedAddress.city}, {savedAddress.state} - {savedAddress.pincode}</p>
            <p>Phone: {savedAddress.phone}</p>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
      <ul className="divide-y">
        {cartItems.map(i => (
          <li key={i._id} className="flex justify-between py-2">{i.title} x{i.quantity} <span>₹{i.price}</span></li>
        ))}
      </ul>
      <div className="flex justify-between mt-4 font-bold">Total: ₹{total.toLocaleString()}</div>

      {/* Payment */}
      <div className="mt-4 space-y-2">
        <button onClick={handlePlaceCodOrder} disabled={processing} className="w-full bg-yellow-600 text-white py-2 rounded">Place Order (COD)</button>
        <button onClick={handleProceedToPayment} disabled={processing} className="w-full bg-blue-600 text-white py-2 rounded">Pay Online</button>
      </div>
    </div>
  );
};

export default Checkout;
