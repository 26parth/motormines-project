// frontend/src/pages/Admin/AdminProducts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../api/axiosInstance";  // ✅ axiosInstance use karenge


const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "", description: "" });
  const [editId, setEditId] = useState(null);

  // 🧠 Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/products", {
        withCredentials: true,
      });
      if (res.data.success) setProducts(res.data.products);
      else toast.error("Failed to fetch products");
    } catch (error) {
      console.log("❌ Fetch products error:", error);
      toast.error("Error fetching products!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🧩 Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🧩 Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (editId) {
        res = await axios.put(`http://localhost:3000/api/admin/products/${editId}`, form, {
          withCredentials: true,
        });
      } else {
        res = await axios.post("http://localhost:3000/api/admin/products", form, {
          withCredentials: true,
        });
      }

      if (res.data.success) {
        toast.success(editId ? "Product Updated!" : "Product Added!");
        setForm({ name: "", price: "", image: "", description: "" });
        setEditId(null);
        fetchProducts();
      }
    } catch (error) {
      console.log("❌ Add/Update error:", error);
      toast.error("Error saving product!");
    }
  };

  // 🧩 Edit product
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    });
    setEditId(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🧩 Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.delete(`http://localhost:3000/api/admin/products/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Product Deleted!");
        fetchProducts();
      }
    } catch (error) {
      console.log("❌ Delete error:", error);
      toast.error("Error deleting product!");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Admin Products</h2>

      {/* 🔹 Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* 🔹 Products Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Price (₹)</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-100">
                  <td className="p-3 border">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-contain mx-auto"
                    />
                  </td>
                  <td className="p-3 border font-semibold">{product.name}</td>
                  <td className="p-3 border text-gray-700">{product.price}</td>
                  <td className="p-3 border text-gray-600">{product.description}</td>
                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-3 py-1 bg-yellow-400 rounded-md text-white hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 bg-red-500 rounded-md text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No products found 😕
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
