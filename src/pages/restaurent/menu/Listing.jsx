import { useState } from "react";

const menuData = [
  {
    id: 1,
    name: "Grilled Salmon Steak",
    price: 80,
    category: "Sea Food",
    tag: "Trending",
    type: "Non Veg",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
  },
  {
    id: 2,
    name: "Cheese Burst Pizza",
    price: 66,
    category: "Pizza",
    tag: "Must Try",
    type: "Veg",
    img: "https://images.unsplash.com/photo-1601924582975-7aa6b55a4c0f?w=500",
  },
  {
    id: 3,
    name: "Garlic Butter Shrimp",
    price: 25,
    category: "Sea Food",
    type: "Non Veg",
    img: "https://images.unsplash.com/photo-1625944525903-c6b0b1fae9a6?w=500",
  },
  {
    id: 4,
    name: "Chicken Taco",
    price: 33,
    category: "Tacos",
    type: "Non Veg",
    img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500",
  },
];

export default function Listing() {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const decreaseItem = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  return (
    <div className="flex h-screen bg-[#F6F8FB]">
      {/* LEFT */}
      <div className="w-2/3 p-6 overflow-y-auto">
        {/* Recent Orders */}
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {["James Smith", "Maria Gonzalez", "Liam O'Connor"].map(
            (name, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow-sm"
              >
                <p className="text-gray-400 text-sm">#56{i}98</p>
                <h3 className="font-semibold">{name}</h3>
                <p className="text-sm text-gray-500">11:45 AM</p>

                <div className="mt-3 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 w-2/3 rounded-full"></div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Categories */}
        <h2 className="font-semibold mb-3">Menu Categories</h2>
        <div className="flex gap-3 mb-5">
          {["All Menus", "Sea Food", "Pizza", "Salads", "Tacos"].map(
            (cat, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-lg border ${
                  i === 0 ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 gap-4">
          {menuData.map((item) => {
            const cartItem = cart.find((i) => i.id === item.id);

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <img
                  src={item.img}
                  className="h-36 w-full object-cover"
                />

                <div className="p-3">
                  <p className="text-xs text-gray-500">
                    {item.category}
                  </p>
                  <h3 className="font-semibold">{item.name}</h3>

                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">${item.price}</span>

                    {!cartItem ? (
                      <button
                        onClick={() => addItem(item)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        +
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseItem(item.id)}
                          className="px-2 bg-gray-200 rounded"
                        >
                          -
                        </button>
                        <span>{cartItem.qty}</span>
                        <button
                          onClick={() => addItem(item)}
                          className="px-2 bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT PANEL */}
      {cart.length > 0 && (
        <div className="w-1/3 bg-white border-l p-4">
          <h2 className="font-bold text-lg mb-4">
            Ordered Menus
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between mb-3 border-b pb-2"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ${item.price} × {item.qty}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseItem(item.id)}
                  className="px-2 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => addItem(item)}
                  className="px-2 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="mt-4 border-t pt-3 font-bold">
            Total: $
            {cart.reduce(
              (acc, i) => acc + i.price * i.qty,
              0
            )}
          </div>
        </div>
      )}
    </div>
  );
}