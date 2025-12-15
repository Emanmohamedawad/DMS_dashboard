export default function Tickets() {
    return (
      <section dir="rtl" className="p-6">
        <h1 className="text-xl font-bold mb-4">نظام التذاكر (PRO)</h1>
  
        <ul className="space-y-3">
          <li className="bg-white p-4 rounded shadow">
            🔴 تذكرة جديدة – عميل: أحمد
          </li>
          <li className="bg-white p-4 rounded shadow">
            🟡 قيد المعالجة – عميل: محمد
          </li>
          <li className="bg-white p-4 rounded shadow">
            🟢 مغلقة – عميل: سارة
          </li>
        </ul>
      </section>
    );
  }
  