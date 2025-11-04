const { user } = useContext(AuthContext);
const navigate = useNavigate();

const handleAddToCart = async (product) => {
  if (!user) {
    // ⚠️ User not logged in → redirect to login
    navigate("/login");
    return;
  }

  try {
    // ✅ User is logged in → send request to backend
    const res = await axios.post("http://localhost:3000/users/add-to-cart", {
      userId: user.id,
      productId: product.id,
      quantity: 1,
    });

    if (res.data.success) {
      alert("✅ Added to cart successfully!");
    } else {
      alert("❌ Failed to add to cart");
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
    alert("⚠️ Something went wrong!");
  }
};
