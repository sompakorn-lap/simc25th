import { Link } from "react-router-dom";

function AdminDashboard() {
  const list = [
    {
      title: "Create Question",
      to: "/admin/createQuestion",
      text: "สำหรับสร้างข้อสอบ",
    },
    { title: "Exam", to: "/admin/questions", text: "สำหรับตรวจข้อสอบ" },
    { title: "Profiles", to: "/admin/profiles", text: "สำหรับตรวจสอบข้อมูล" },
    { title: "Documents", to: "/admin/documents", text: "สำหรับตรวจสอบเอกสาร" },
  ];

  return (
    <section className="container py-5">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {list.map(({ title, to, text }) => (
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <Link
                  className="card-text"
                  to={to}
                >
                  {text}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminDashboard;
