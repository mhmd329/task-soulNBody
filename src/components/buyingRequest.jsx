import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { Plus, Minus, Edit, Trash2, Printer, Save, X, List, FilePlus } from 'lucide-react';

const BuyingRequest = () => {
  const [orders, setOrders] = useState([
    { id: 101, name: "لاب توب", code: "125", quantity: "7", supplier: "شركة المورد 1" },
    { id: 102, name: "لاب توب", code: "125", quantity: "7", supplier: "شركة المورد 1" },
    { id: 103, name: "هاتف", code: "126", quantity: "10", supplier: "شركة المورد 2" },
    { id: 104, name: "هاتف", code: "126", quantity: "10", supplier: "شركة المورد 2" },
    { id: 105, name: "هاتف", code: "126", quantity: "10", supplier: "شركة المورد 2" },
    { id: 106, name: "طابعة", code: "127", quantity: "5", supplier: "شركة المورد 3" },
    { id: 107, name: "طابعة", code: "127", quantity: "5", supplier: "شركة المورد 3" },
    { id: 108, name: "طابعة", code: "127", quantity: "5", supplier: "شركة المورد 3" },
  ]);

  const [newOrder, setNewOrder] = useState({ name: '', quantity: '1', code: '' });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order =>
        order.name.includes(searchTerm) ||
        order.code.includes(searchTerm) ||
        order.quantity.includes(searchTerm) ||
        order.supplier.includes(searchTerm)
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (value) => {
    const numValue = Math.max(1, parseInt(value) || 1);
    setNewOrder(prev => ({ ...prev, quantity: numValue.toString() }));
  };

  const handleAddOrder = () => {
    if (newOrder.name && newOrder.quantity) {
      const order = {
        id: Date.now(),
        name: newOrder.name,
        quantity: newOrder.quantity,
        code: newOrder.code || 'N/A',
        supplier: 'غير محدد'
      };
      setOrders([...orders, order]);
      setNewOrder({ name: '', quantity: '1', code: '' });
      setShowForm(false);
    }
  };

  const handleDeleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleEditOrder = (order) => {
    setEditingId(order.id);
    setNewOrder({
      name: order.name,
      quantity: order.quantity,
      code: order.code
    });
    setShowForm(true);
  };

  const handleUpdateOrder = () => {
    setOrders(orders.map(order =>
      order.id === editingId ? {
        ...order,
        name: newOrder.name,
        quantity: newOrder.quantity,
        code: newOrder.code
      } : order
    ));
    setNewOrder({ name: '', quantity: '1', code: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingId(null);
    setNewOrder({ name: '', quantity: '1', code: '' });
  };

  return (
    <>
      <NavBar onSearch={handleSearch} />
      <div className="container mx-auto mt-10 px-2 sm:px-5">
        <div className="text-right mb-6 px-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">طلبات الشراء</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-1 items-left mb-4 justify-between px-2">
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 sm:px-6 py-2 rounded-md shadow transition text-sm sm:text-base flex items-center gap-2 ${!showForm
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              onClick={() => setShowForm(false)}
            >
              <List size={18} /> عرض الطلبات
            </button>
            <button
              className={`px-4 sm:px-6 py-2 rounded-md shadow transition text-sm sm:text-base flex items-center gap-2 ${showForm
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              onClick={toggleForm}
            >
              {editingId ? <><Edit size={18} /> تعديل الطلب</> : <><FilePlus size={18} /> إضافة طلب</>}
            </button>
          </div>
          <div className="mt-2 sm:mt-0">
            <button className='bg-green-300 px-3 sm:px-4 py-2 rounded-md shadow text-sm sm:text-base flex items-center gap-2'>
              <Printer size={18} /> طباعة
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 mx-2 sm:mx-0">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-right">
              {editingId ? 'تعديل الطلب' : 'إضافة طلب جديد'}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <button
                onClick={editingId ? handleUpdateOrder : handleAddOrder}
                className={`w-full sm:w-24 h-12 rounded-md shadow transition flex items-center justify-center gap-2 ${(!newOrder.name || !newOrder.quantity)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                disabled={!newOrder.name || !newOrder.quantity}
              >
                {editingId ? <><Save size={18} /> تحديث</> : <><Plus size={18} /> إضافة</>}
              </button>

              <div className="w-full sm:w-1/3">
                <label className="block text-gray-700 mb-2 text-right">اسم المنتج</label>
                <input
                  type="text"
                  name="name"
                  value={newOrder.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                  placeholder="اسم المنتج"
                  required
                />
              </div>

              <div className="w-full sm:w-1/3">
                <label className="block text-gray-700 mb-2 text-right">الكمية</label>
                <div className="flex items-stretch h-10 border rounded-md focus-within:ring-2 focus-within:ring-green-500 overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(Math.max(1, parseInt(newOrder.quantity || 1) - 1))}
                    className="px-3 hover:bg-gray-100 border-r border-gray-300 flex items-center justify-center bg-gray-50 transition-colors"
                    type="button"
                  >
                    <Minus size={16} className="text-gray-600" />
                  </button>

                  <input
                    type="number"
                    name="quantity"
                    value={newOrder.quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    className="flex-1 px-3 py-2 outline-none text-center font-medium"
                    min="1"
                    required
                  />

                  <button
                    onClick={() => handleQuantityChange(parseInt(newOrder.quantity || 1) + 1)}
                    className="px-3 hover:bg-gray-100 border-l border-gray-300 flex items-center justify-center bg-gray-50 transition-colors"
                    type="button"
                  >
                    <Plus size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="w-full sm:w-1/3">
                <label className="block text-gray-700 mb-2 text-right">كود (اختياري)</label>
                <input
                  type="text"
                  name="code"
                  value={newOrder.code}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                  placeholder="كود المنتج"
                />
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto mx-2 sm:mx-0">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
              {searchTerm ? 'لا توجد نتائج مطابقة للبحث' : 'لا توجد طلبات متاحة'}
            </div>
          ) : (
            <div className="shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-green-100 text-gray-700">
                    <th className="py-3 px-2 sm:px-4 border-b text-sm sm:text-base">خيارات</th>
                    <th className="py-3 px-2 sm:px-4 border-b text-sm sm:text-base">الكمية</th>
                    <th className="py-3 px-2 sm:px-4 border-b text-sm sm:text-base">اسم المنتج</th>
                    <th className="py-3 px-2 sm:px-4 border-b text-sm sm:text-base">كود المنتج</th>
                    <th className="py-3 px-2 sm:px-4 border-b text-sm sm:text-base">المورد</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr
                      key={`${order.id}-${index}`}
                      className={`text-center border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-green-50'
                        }`}
                    >
                      <td className="py-3 px-2 sm:px-4 flex flex-col sm:flex-row justify-center gap-1 sm:gap-2">
                        <button
                          className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-green-600 transition flex items-center justify-center gap-1 text-xs sm:text-sm"
                          onClick={() => handleEditOrder(order)}
                        >
                          <Edit size={14} /> تعديل
                        </button>
                        <button
                          className="text-red-500 border border-red-500 px-2 sm:px-3 py-1 rounded-md hover:bg-red-50 transition flex items-center justify-center gap-1 text-xs sm:text-sm"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          <Trash2 size={14} /> حذف
                        </button>
                      </td>
                      <td className="py-3 px-2 sm:px-4 text-sm sm:text-base">{order.quantity}</td>
                      <td className="py-3 px-2 sm:px-4 text-sm sm:text-base">{order.name}</td>
                      <td className="py-3 px-2 sm:px-4 text-sm sm:text-base">{order.code}</td>
                      <td className="py-3 px-2 sm:px-4 text-sm sm:text-base">{order.supplier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4 px-2 sm:px-0">
          <button className="bg-gray-200 text-gray-800 px-4 sm:px-6 py-2 rounded-md shadow hover:bg-gray-300 transition flex items-center justify-center gap-2 order-2 sm:order-1">
            <X size={18} /> إلغاء
          </button>
          <button className="bg-green-500 text-white px-4 sm:px-6 py-2 rounded-md shadow hover:bg-green-600 transition flex items-center justify-center gap-2 order-1 sm:order-2">
            <Save size={18} /> حفظ
          </button>
        </div> */}
      </div>
    </>
  );
};
export default BuyingRequest;