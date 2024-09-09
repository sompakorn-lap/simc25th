import { Link } from "react-router-dom";

function SelectedDashboard() {
  return (
    <section className="container py-5">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">กรอกข้อมูล</h5>
              <ul className="card-text">
                <li>ข้อมูลทั่วไป</li>
                <li>ข้อมูลสำหรับติดต่อ</li>
                <li>ข้อมูลผู้ปกครอง</li>
                <li>ข้อมูลทางการแพทย์</li>
              </ul>
            </div>
            <div className="card-footer">
              <Link
                className="btn btn-primary w-100"
                to="/profile"
              >
                ไปกรอกข้อมูลกัน
              </Link>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">upload เอกสาร</h5>
              <ul className="card-text">
                <li>หลักฐานการชำระเงิน</li>
                <li>ปพ</li>
                <li>ใบขออนุญาติผู้ปกครอง</li>
              </ul>
            </div>
            <div className="card-footer">
              <Link
                className="btn btn-primary w-100"
                to="/document"
              >
                upload เอกสาร
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SelectedDashboard;
