export default function Channels() {
    const channels = [
      { name: "WhatsApp", status: "متصل" },
      { name: "Instagram", status: "غير متصل" },
      { name: "Facebook", status: "متصل" },
      { name: "TikTok", status: "Beta" },
    ];
  
    return (
      <section dir="rtl" className="p-6">
        <h1 className="text-xl font-bold mb-4">إدارة القنوات</h1>
  
        <table className="w-full bg-white rounded-xl shadow">
          <thead>
            <tr>
              <th>القناة</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((c) => (
              <tr key={c.name}>
                <td>{c.name}</td>
                <td>{c.status}</td>
                <td>⚙️ إعادة ربط</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
  