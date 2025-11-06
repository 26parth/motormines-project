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

  // compute numeric price for each cart item for backend
  const itemsForBackend = cartItems.map(i => ({
    id: i.id,
    title: i.title,
    img: i.img,
    quantity: i.quantity,
    priceNumeric: Number(String(i.price).replace(/[₹,]/g, "")),
  }));

  const total = itemsForBackend.reduce((sum, item) => sum + item.priceNumeric * item.quantity, 0);

  // Save address to backend
  const handleSaveAddress = async () => {
    if (!state || !city || !street || !pincode || !phone) {
      return alert("Please fill all address details!");
    }
    const newAddress = { country, state, city, street, pincode, phone };
    try {
      const res = await axios.put("http://localhost:3000/users/address", newAddress, { withCredentials: true });
      if (res.data.success) {
        setSavedAddress(res.data.user.address);
        setIsEditing(false);
        await fetchProfile();
        alert("✅ Address saved successfully!");
      }
    } catch (err) {
      console.error("Address save error:", err);
      alert("❌ Failed to save address");
    }
  };

  // COD order
  const handlePlaceCodOrder = async () => {
    if (!savedAddress) return alert("Please save address before placing order");
    setProcessing(true);
    try {
      const res = await axios.post("http://localhost:3000/orders/create-cod", {
        cartItems: itemsForBackend,
        address: savedAddress,
      }, { withCredentials: true });
      if (res.data.success) {
        alert("✅ COD Order placed!");
        // optionally clear cart
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

  // Razorpay flow
  const handleProceedToPayment = async () => {
    if (!savedAddress) return alert("Please save your address before payment");
    setProcessing(true);
    try {
      // 1) ask backend to create razorpay order
      const createRes = await axios.post("http://localhost:3000/payment/create-order", { amount: total }, { withCredentials: true });
      if (!createRes.data.success) throw new Error("Order creation failed");
      const razorOrder = createRes.data.order;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_xxx",
        amount: razorOrder.amount,
        currency: razorOrder.currency,
        name: "MotorMines",
        description: "MotorMines Purchase",
        order_id: razorOrder.id,
        prefill: {
          name: user.fullname,
          email: user.email,
          contact: savedAddress?.phone || "",
        },
        handler: async function (response) {
          // call backend to verify and create order record
          try {
            const verifyRes = await axios.post("http://localhost:3000/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cartItems: itemsForBackend,
              address: savedAddress,
            }, { withCredentials: true });

            if (verifyRes.data.success) {
              alert("✅ Payment successful and order created!");
              setCartItems([]);
              navigate("/orders");
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.error("Verification/Order creation error:", err);
            alert("Error verifying payment");
          }
        },
        modal: { ondismiss: () => { setProcessing(false); } },
      };

      // load script if needed
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
          const rzp = new window.Razorpay(options);
          rzp.open();
        };
      } else {
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      console.error("Payment init error:", err);
      alert("Payment failed to start");
      setProcessing(false);
    }
  };

  if (!user) return <p className="text-center mt-10">Please login to continue checkout.</p>;
  if (cartItems.length === 0) return <p className="text-center mt-10">Your cart is empty 🛒</p>;
  if (loading) return <p className="text-center mt-10">Loading your address...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Checkout 🧾</h2>

      <div className="mb-5">
        <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
          Delivery Address
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="text-blue-600 text-sm underline">Edit Address</button>
          )}
        </h3>

        {isEditing ? (
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-sm font-medium">Country</label>
              <input type="text" value={country} readOnly className="border rounded w-full p-2 bg-gray-100" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label>State</label>
                <input value={state} onChange={e => setState(e.target.value)} className="border rounded w-full p-2" />
              </div>
              <div>
                <label>City</label>
                <input value={city} onChange={e => setCity(e.target.value)} className="border rounded w-full p-2" />
              </div>
            </div>
            <div>
              <label>Street / Area / House No.</label>
              <input value={street} onChange={e => setStreet(e.target.value)} className="border rounded w-full p-2" />
            </div>
            <div>
              <label>Pincode</label>
              <input value={pincode} onChange={e => setPincode(e.target.value)} className="border rounded w-full p-2" maxLength={6}/>
            </div>
            <div>
              <label>Phone</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} className="border rounded w-full p-2" />
            </div>
            <button onClick={handleSaveAddress} className="bg-blue-600 text-white px-4 py-2 rounded mt-3">Save Address</button>
          </div>
        ) : (
          <div className="border rounded-md p-4 bg-gray-50">
            <p><strong>Address:</strong> {savedAddress.street}, {savedAddress.city}, {savedAddress.state} - {savedAddress.pincode}, {savedAddress.country}</p>
            <p><strong>Phone:</strong> {savedAddress.phone}</p>
            <div className="flex items-center gap-2 mt-2">
              <input type="radio" name="address" defaultChecked />
              <label>Use this address</label>
            </div>
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
      <ul className="divide-y">
        {cartItems.map(item => (
          <li key={item.id} className="flex justify-between py-2">
            <span>{item.title} (x{item.quantity})</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-4 font-bold">
        <span>Total:</span>
        <span>₹{total.toLocaleString()}</span>
      </div>

      {/* Buttons */}
      <div className="mt-4 space-y-2">
        <button onClick={handlePlaceCodOrder} className="w-full bg-yellow-600 text-white py-2 rounded" disabled={processing}>Place Order (Cash on Delivery)</button>
        <button onClick={handleProceedToPayment} className="w-full bg-blue-600 text-white py-2 rounded" disabled={processing}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default Checkout;
