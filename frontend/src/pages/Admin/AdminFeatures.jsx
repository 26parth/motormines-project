import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminFeatures = () => {
  const [features, setFeatures] = useState([]);
  const [form, setForm] = useState({ title: "", image: "", path: "" });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  const fetchFeatures = async () => {
    const res = await axios.get("http://localhost:3000/api/admin/features", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.success) setFeatures(res.data.features);
  };

  useEffect(() => { fetchFeatures(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/api/admin/features/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Feature updated!");
      } else {
        await axios.post("http://localhost:3000/api/admin/features", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Feature added!");
      }
      setForm({ title: "", image: "", path: "" });
      setEditingId(null);
      fetchFeatures();
    } catch (err) {
      toast.error("Failed to save feature!");
    }
  };

  const handleEdit = (f) => {
    setForm(f);
    setEditingId(f._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/admin/features/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Feature deleted!");
    fetchFeatures();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Features</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-2">
        <input className="border p-1" placeholder="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
        <input className="border p-1" placeholder="Image URL" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} />
        <input className="border p-1" placeholder="Path (e.g. /anti-rust)" value={form.path} onChange={(e) => setForm({...form, path: e.target.value})} />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Path</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f) => (
            <tr key={f._id}>
              <td className="p-2 border"><img src={f.image} alt={f.title} className="w-12 h-12 object-cover rounded" /></td>
              <td className="p-2 border">{f.title}</td>
              <td className="p-2 border">{f.path}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => handleEdit(f)} className="text-blue-600">Edit</button>
                <button onClick={() => handleDelete(f._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFeatures;
