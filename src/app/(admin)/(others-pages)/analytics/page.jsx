export default function Analytics() {
    return (
      <section dir="rtl" className="p-6 space-y-4">
        <h1 className="text-xl font-bold">لوحة المؤشرات</h1>
  
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat title="إجمالي الرسائل" value="120k" />
          <Stat title="الواردة" value="70k" />
          <Stat title="الصادرة" value="50k" />
          <Stat title="سرعة الاستجابة" value="2.4s" />
        </div>
  
        <div className="bg-white rounded-xl p-6 shadow">
          📈 رسوم بيانية (Line / Bar / Pie)
        </div>
      </section>
    );
  }
  
  const Stat = ({ title, value }) => (
    <div className="bg-white rounded-xl p-4 shadow text-center">
      <p className="text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
  