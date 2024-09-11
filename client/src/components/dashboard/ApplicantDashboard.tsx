import { Link } from "react-router-dom";
import { useGetApplicantStatus } from "../../api/applicant.api";

const questionSet = [
  {
    title: "เชาวน์ปัญญา",
    to: "/exam/IQ",
    keyword: "IQ",
    detail: [{ questionType: "MCQ", amount: 15, score: 1 }],
  },
  {
    title: "จริยธรรม",
    to: "/exam/ETHICS",
    keyword: "ETHICS",
    detail: [
      { questionType: "Short answer", amount: 2, score: 6 },
      { questionType: "MCQ", amount: 5, score: 1.6 },
    ],
  },
  {
    title: "ความรู้ทางการแพทย์",
    to: "/exam/KNOWLEDGE",
    keyword: "KNOWLEDGE",
    detail: [{ questionType: "MCQ", amount: 15, score: 1 }],
  },
  {
    title: "ศิริราช",
    to: "/exam/SIRIRAJ",
    keyword: "SIRIRAJ",
    detail: [
      { questionType: "MCQ", amount: 7, score: 1 },
      { questionType: "MCQ", amount: 4, score: 1.5 },
      { questionType: "Short answer", amount: 1, score: 2 },
    ],
  },
  {
    title: "สร้างสรรค์",
    to: "/exam/CREATIVE",
    keyword: "CREATIVE",
    detail: [{ questionType: "Long answer", amount: 7, score: 5 }],
  },
];

function ApplicantDashboard() {
  const getApplicantStatus = useGetApplicantStatus();
  const { data = {} } = getApplicantStatus;

  return (
    <section className="container py-5">
      <div className="mb-4 rounded border p-3 bg-dark">
        <h3>คำชี้แจงทำข้อสอบ</h3>
        ข้อสอบ มีคะแนนเต็ม 100 คะแนน ประกอบไปด้วยโจทย์ที่หลากหลาย
        ไม่จำกัดเวลาในการทำ{" "}
        <b className="text-danger">
          แต่เมื่อกดไปข้อถัดไป จะไม่สามารถย้อนกลับมาทำข้อก่อนหน้าได้
          โปรดตรวจสอบคำตอบก่อนกดข้อถัดไปทุกครั้ง
        </b>{" "}
        <b className="text-warning">(ระบบมีการบันทึกคำตอบให้อัตโนมัติ)</b>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {questionSet.map(({ title, to, detail, keyword }) => (
          <div
            className="col col-md-6 col-lg-3"
            key={`card-${title}`}
          >
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <table className="card-text table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ประเภทข้อสอบ</th>
                      <th>จำนวนข้อสอบ</th>
                      <th>คะแนน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.map(({ questionType, amount, score }, index) => (
                      <tr key={`${index}-${questionType}-${amount}-${score}`}>
                        <td>{index + 1}</td>
                        <td>{questionType}</td>
                        <td className="text-end">{amount}</td>
                        <td className="text-end">{score}</td>
                      </tr>
                    ))}
                    <tr>
                      <td>รวม</td>
                      <td></td>
                      <td className="text-end">
                        {detail.reduce((sum, { amount }) => sum + amount, 0)}
                      </td>
                      <td className="text-end">
                        {detail.reduce(
                          (sum, { amount, score }) => sum + amount * score,
                          0
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                {data[keyword] === "SUBMITTED" ? (
                  <div className="bg-success p-2 rounded text-dark text-center">
                    บักทึกคำตอบสำเร็จ
                  </div>
                ) : (
                  <Link
                    className="btn btn-primary w-100"
                    to={to}
                  >
                    ไปทำข้อสอบกันเลย
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ApplicantDashboard;
