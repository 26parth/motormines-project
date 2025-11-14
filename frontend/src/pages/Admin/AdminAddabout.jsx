// frontend/src/pages/Admin/AdminAddabout.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axiosInstance"; // ✅ Using axiosInstance for auto token refresh

const AdminAddabout = () => {
  const [addabouts, setAddabouts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "", description: "" });
  const [editId, setEditId] = useState(null);

  // 🧠 Fetch all Addabouts
  const fetchAddabouts = async () => {
    try {
      const res = await api.get("/admin/addabout");
      if (res.data.success) {
        setAddabouts(res.data.features || []);
      } else {
        toast.error("Failed to fetch addabout data!");
      }
    } catch (error) {
      console.log("❌ Fetch Addabout error:", error);
      toast.error("Error fetching addabout data!");
    }
  };

  useEffect(() => {
    fetchAddabouts();
  }, []);

  // 🧩 Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 // 🧩 Add or Update Addabout
const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    name: form.name,
    price: form.price,
    image: form.image,
    description: form.description,
  };

  try {
    let res;
    if (editId) {
      res = await api.put(`/admin/addabout/${editId}`, payload);
    } else {
      res = await api.post("/admin/addabout", payload);
    }

    if (res.data.success) {
      toast.success(editId ? "Item Updated!" : "Item Added!");
      setForm({ name: "", price: "", image: "", description: "" });
      setEditId(null);
      fetchAddabouts();
    } else {
      toast.error("Something went wrong!");
    }
  } catch (error) {
    console.log("❌ Add/Update Addabout error:", error);
    toast.error("Error saving item!");
  }
};


  // 🧩 Edit Addabout
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
    });
    setEditId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🧩 Delete Addabout
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await api.delete(`/admin/addabout/${id}`);
      if (res.data.success) {
        toast.success("Item Deleted!");
        fetchAddabouts();
      } else {
        toast.error("Failed to delete item!");
      }
    } catch (error) {
      console.log("❌ Delete Addabout error:", error);
      toast.error("Error deleting item!");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Manage About Section
      </h2>

      {/* 🔹 Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
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
          {editId ? "Update Item" : "Add Item"}
        </button>
      </form>

      {/* 🔹 Addabout Table */}
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
            {addabouts.length > 0 ? (
              addabouts.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-100">
                  <td className="p-3 border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain mx-auto rounded-lg"
                    />
                  </td>
                  <td className="p-3 border font-semibold">{item.name}</td>
                  <td className="p-3 border text-gray-700">{item.price}</td>
                  <td className="p-3 border text-gray-600">{item.description}</td>
                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 bg-yellow-400 rounded-md text-white hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
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
                  No data found 😕
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAddabout;
