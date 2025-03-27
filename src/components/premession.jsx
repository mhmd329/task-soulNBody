import React, { useState } from 'react';
import { Plus, Minus, Edit, Trash2, Printer, Save, X } from 'lucide-react';

const Permission = () => {
  const [permissions, setPermissions] = useState([
    {
      id: 101,
      date: "2023-05-15",
      employee: "محمد أحمد",
      from: "08:00",
      to: "12:00",
      reason: "زيارة طبيب",
      deduction: "120",
      type: "استئذان",
      status: "موافق"
    },
    {
      id: 102,
      date: "2023-05-16",
      employee: "أحمد علي",
      from: "09:00",
      to: "11:00",
      reason: "ظروف عائلية",
      deduction: "120",
      type: "استئذان",
      status: "قيد المراجعة"
    },
    {
      id: 103,
      date: "2023-05-17",
      employee: "سامي خالد",
      from: "10:00",
      to: "14:00",
      reason: "موعد رسمي",
      deduction: "120",
      type: "استئذان",
      status: "مرفوض"
    },
  ]);

  const [newPermission, setNewPermission] = useState({
    employee: '',
    type: '',
    duration: '1',
    status: 'قيد المراجعة'
  });

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPermission(prev => ({ ...prev, [name]: value }));
  };

  const handleDurationChange = (value) => {
    const numValue = Math.max(1, parseInt(value) || 1);
    setNewPermission(prev => ({ ...prev, duration: numValue.toString() }));
  };

  const handleAddPermission = () => {
    if (newPermission.employee && newPermission.type) {
      const permission = {
        id: Date.now(),
        ...newPermission
      };
      setPermissions([...permissions, permission]);
      setNewPermission({
        employee: '',
        type: '',
        duration: '1',
        status: 'قيد المراجعة'
      });
      setShowForm(false);
    }
  };



  const handleUpdatePermission = () => {
    setPermissions(permissions.map(p =>
      p.id === editingId ? { ...newPermission, id: editingId } : p
    ));
    setNewPermission({
      employee: '',
      type: '',
      duration: '1',
      status: 'قيد المراجعة'
    });
    setEditingId(null);
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingId(null);
    setNewPermission({
      employee: '',
      type: '',
      duration: '1',
      status: 'قيد المراجعة'
    });
  };

  const filteredPermissions = permissions.filter(p =>
    p.employee.includes(searchTerm) ||
    p.type.includes(searchTerm) ||
    p.duration.includes(searchTerm) ||
    p.status.includes(searchTerm)
  );

  return (
    <div className="container mx-auto mt-10 px-2 sm:px-5">
      <div className="text-right mb-6 px-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">سجل استئذانات</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-1 items-left mb-4 justify-between px-2">
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 cursor-pointer sm:px-6 py-2 rounded-md shadow transition text-sm sm:text-base flex items-center gap-2 ${!showForm
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            onClick={() => setShowForm(false)}
          >
            عرض الاستئذانات
          </button>
          <button
            className={`px-4 cursor-pointer sm:px-6 py-2 rounded-md shadow transition text-sm sm:text-base flex items-center gap-2 ${showForm
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            onClick={toggleForm}
          >
            <Plus size={18} /> {editingId ? 'تعديل' : 'إضافة'}
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
            {editingId ? 'تعديل الاستئذان' : 'إضافة استئذان جديد'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 text-right">اسم الموظف</label>
              <input
                type="text"
                name="employee"
                value={newPermission.employee}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                placeholder="اسم الموظف"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-right">نوع الاستئذان</label>
              <select
                name="type"
                value={newPermission.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                required
              >
                <option value="">اختر النوع</option>
                <option value="إجازة">إجازة</option>
                <option value="إجازة مرضية">إجازة مرضية</option>
                <option value="استئذان">استئذان</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-right">المدة (أيام)</label>
              <div className="flex items-stretch h-10 border rounded-md focus-within:ring-2 focus-within:ring-green-500 overflow-hidden">
                <button
                  onClick={() => handleDurationChange(parseInt(newPermission.duration || 1) - 1)}
                  className="px-3 hover:bg-gray-100 border-r border-gray-300 flex items-center justify-center bg-gray-50 transition-colors"
                  type="button"
                >
                  <Minus size={16} className="text-gray-600" />
                </button>

                <input
                  type="number"
                  name="duration"
                  value={newPermission.duration}
                  onChange={(e) => handleDurationChange(e.target.value)}
                  className="flex-1 px-3 py-2 outline-none text-center font-medium"
                  min="1"
                  required
                />

                <button
                  onClick={() => handleDurationChange(parseInt(newPermission.duration || 1) + 1)}
                  className="px-3 hover:bg-gray-100 border-l border-gray-300 flex items-center justify-center bg-gray-50 transition-colors"
                  type="button"
                >
                  <Plus size={16} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-right">الحالة</label>
              <select
                name="status"
                value={newPermission.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
              >
                <option value="قيد المراجعة">قيد المراجعة</option>
                <option value="موافق">موافق</option>
                <option value="مرفوض">مرفوض</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={toggleForm}
              className="bg-gray-200 text-gray-800 px-4 sm:px-6 py-2 rounded-md shadow hover:bg-gray-300 transition flex items-center justify-center gap-2"
            >
              <X size={18} /> إلغاء
            </button>
            <button
              onClick={editingId ? handleUpdatePermission : handleAddPermission}
              className={`px-4 sm:px-6 py-2 rounded-md shadow transition flex items-center justify-center gap-2 ${(!newPermission.employee || !newPermission.type)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              disabled={!newPermission.employee || !newPermission.type}
            >
              <Save size={18} /> {editingId ? 'تحديث' : 'حفظ'}
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto mx-2 sm:mx-0">
        {filteredPermissions.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
            لا توجد استئذانات متاحة
          </div>
        ) : (
          <div className="shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-green-100 text-gray-700">
                  <th className="py-3 px-2 sm:px-4 border-b text-sm sm:text-base">الحالة</th>
                  <th className="py-3 px-2 sm:px-4 border-b text-sm sm:text-base">الاسم</th>
                  <th className="py-3 px-2 sm:px-4 border-b text-sm sm:text-base">من</th>
                  <th className="py-3 px-2 sm:px-4 border-b text-sm sm:text-base">إلى</th>
                  <th className="py-3 px-2 sm:px-4 border-b text-sm sm:text-base">السبب</th>
                  <th className="py-3 px-2 sm:px-4 border-b text-sm sm:text-base">الخصم</th>
                  <th className="py-3 px-2 sm:px-4 border-b text-sm sm:text-base">التاريخ</th>

                </tr>
              </thead>
              <tbody>
                {filteredPermissions.map((permission, index) => (
                  <tr
                    key={`${permission.id}-${index}`}
                    className={`text-center border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-green-50'
                      }`}
                  >
                    <td className="py-3 px-2 sm:px-4 text-sm sm:text-base">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${permission.status === 'موافق' ? 'bg-green-100 text-green-800 px-15' :
                        permission.status === 'مرفوض' ? 'bg-red-100 text-red-800 px-15' :
                          'bg-yellow-100 text-yellow-800 px-10'
                        }`} style={{ display: 'inline-block', minWidth: '80px', textAlign: 'center' }}>
                        {permission.status}
                      </span>
                    </td>

                    <td className="py-3 px-2 sm:px-4 text-sm sm:text-base font-medium text-gray-800">
                      {permission.employee}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-sm sm:text-base">
                      {permission.from}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-sm sm:text-base">
                      {permission.to}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-sm sm:text-base">
                      {permission.reason}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-sm sm:text-base">
                      {permission.deduction}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-sm sm:text-base">
                      {new Date(permission.date).toLocaleDateString('ar-EG')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Permission;