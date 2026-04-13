const users = [
  { name: "John Smith", role: "Admin", phone: "1234567890" },
  { name: "Emily", role: "User", phone: "9876543210" },
];

export default function UsersTable() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      <h2 className="mb-4 text-lg font-semibold">Users</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Name</th>
            <th>Role</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i} className="border-t">
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>{u.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}