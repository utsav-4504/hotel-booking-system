import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaTrash,
  FaCheckCircle
} from "react-icons/fa";
import { deleteUser, getUsers, updateUser } from "../services/userService";

function UsersManage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const loadUsers = async () => {
    const response = await getUsers({ limit: 100 });
    setUsers(response.users || []);
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.id.toLowerCase().includes(search.toLowerCase())
  ), [users, search]);

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-yellow-500 font-semibold uppercase tracking-widest">
            Admin Panel
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3">
            Manage Users
          </h1>
        </div>

        {/* Search */}
        <div className="bg-white rounded-3xl shadow-lg p-5 mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search by name, email or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-237.5">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="text-left px-6 py-4">User</th>
                  <th className="text-left px-6 py-4">Email</th>
                  <th className="text-left px-6 py-4">Phone</th>
                  <th className="text-left px-6 py-4">Role</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-left px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    {/* User */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xl">
                          <FaUserCircle />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {user.name}
                          </p>

                          <p className="text-sm text-slate-500">
                            {user.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-5 text-slate-700">
                      <span className="inline-flex items-center gap-2">
                        <FaEnvelope className="text-slate-400" />
                        {user.email}
                      </span>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-5 text-slate-700">
                      <span className="inline-flex items-center gap-2">
                        <FaPhone className="text-slate-400" />
                        {user.phone}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        <FaCheckCircle />
                        {user.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex gap-3">
                        <button
                          onClick={async () => {
                            await updateUser(user.id, {
                              role: user.role === "customer" ? "staff" : "customer"
                            });
                            loadUsers();
                          }}
                          className="w-10 h-10 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition flex items-center justify-center"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={async () => {
                            await deleteUser(user.id);
                            loadUsers();
                          }}
                          className="w-10 h-10 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 transition flex items-center justify-center"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UsersManage;