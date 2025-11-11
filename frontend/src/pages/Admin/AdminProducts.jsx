import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:3000/api/admin/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.success) setProducts(res.data.products);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/api/admin/products/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Product updated successfully!");
      } else {
        await axios.post("http://localhost:3000/api/admin/products", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Product added successfully!");
      }
      setForm({ name: "", description: "", price: "", stock: "", image: "" });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      toast.error("Failed to save product!");
    }
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditingId(p._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Product deleted!");
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-2">
        <input className="border p-1" placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
        <input className="border p-1" placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
        <input className="border p-1" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} />
        <input className="border p-1" type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} />
        <input className="border p-1" placeholder="Image URL" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="p-2 border">
                <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
              </td>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">₹{p.price}</td>
              <td className="p-2 border">{p.stock}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => handleEdit(p)} className="text-blue-600">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
