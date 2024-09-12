import { Link } from "react-router-dom";
import CarouselImage1 from "../assets/carousel/Image1.jpg";
import CarouselImage2 from "../assets/carousel/Image2.jpg";
import CarouselImage3 from "../assets/carousel/Image3.jpg";
import CarouselImage4 from "../assets/carousel/Image4.jpg";
import CarouselImage5 from "../assets/carousel/Image5.jpg";
import SignUpImage from "../assets/signup-bg.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const [sponsor, setSponsor] = useState([]);

  async function getSponsor() {
    try {
      const res = await axios.get("/api/sponsor");
      setSponsor(res.data);
    } catch (err) {}
  }

  useEffect(() => {
    getSponsor();
  }, []);

  return (
    <div className="grid">
      <section className="shadow border rounded my-4 p-3">
        <h2>มารู้จักกับ ค่ายเส้นทางสู่หมอศิริราช</h2>
        <p>
          &emsp;&emsp;ค่ายเส้นทางสู่หมอศิริราช
          คือค่ายที่จัดทำโดยนักศึกษาแพทย์ศิริราช โดยมีจุดประสงค์เพื่อให้น้องๆ
          มัธยมศึกษาตอนปลายได้เข้ามารู้จักและสัมผัสกับคณะแพทยศาสตร์ศิริราชพยาบาล
          มหาวิทยาลัยมหิดลมากยิ่งขึ้น ทั้งในด้านหลักสูตรการเรียนการสอน
          กิจกรรมนอกหลักสูตรและ lifestyle ของนักศึกษาแพทย์ศิริราช
          รวมถึงเพื่อให้น้องๆ
          มัธยมศึกษาตอนปลายได้ใช้เป็นแนวทางการตัดสินใจเลือกศึกษาต่อในหลักสูตรแพทยศาสตรบัณฑิตในระดับชั้นอุดมศึกษาและประกอบอาชีพแพทย์ต่อไปในอนาคต
          <br />
          &emsp;&emsp;ในปีนี้ค่ายของเราจัดขึ้นในวันเสาร์ที่ 7 และวันอาทิตย์ที่ 8
          ธันวาคม 2567 ที่คณะแพทยศาสตร์ศิริราชพยาบาลในรูปแบบค้างคืน
          ภายในค่ายประกอบด้วยกิจกรรมมากมายที่คัดสรรมาเป็นอย่างดีว่าน้องๆ
          มัธยมศึกษาตอนปลายจะได้รับประโยชน์สูงสุด เช่น การผ่า Gross anatomy,
          การใช้เครื่อง Ultrasound,
          รูปแบบการสอบซักประวัติและตรวจร่างกายในหลักสูตรแพทยศาสตร์บัณฑิตหรือ
          OSCE เป็นต้น
        </p>
      </section>

      <section className="shadow border rounded my-4 p-3">
        <h2>บรรยากาศค่ายเส้นทางสู่หมอศิริราชครั้งที่ 24</h2>
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={CarouselImage2}
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={CarouselImage1}
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={CarouselImage3}
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={CarouselImage4}
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={CarouselImage5}
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      <section className="shadow border rounded my-4 p-3">
        <div className="row">
          <div className="col-md-6">
            <h2>Invitation from president</h2>
            <p>
              “ สวัสดีน้องๆ มัธยมศึกษาตอนปลายทุกคน
              พี่ทั้งสองคนเป็นประธานค่ายเส้นทางสู่หมอศิริราชครั้งที่ 25
              นะครับ/ค่ะ ในปีนี้ค่ายเส้นทางฯ ของเรากลับมาพร้อมกับ concept Inside
              out ที่จะทำให้น้องๆ ได้เข้าถึงอารมณ์และความรู้สึกของตัวเองมากขึ้น
              ตั้งแต่เริ่มต้นจากเด็กนักเรียนคนหนึ่งที่มีความฝันในการเรียนหมอ
              จนเข้ามาสัมผัสกับชีวิตของนักศึกษาในคณะแพทย์แล้วมีอารมณ์ความรู้สึกเปลี่ยนแปลงไปอย่างไร
              จะสนุกหรือเหนื่อยยากอย่างที่คาดไว้หรือไม่ ทั้งนี้น้องๆ
              จะได้รับทั้งข้อคิด ความรู้ และแรงบันดาลใจ
              ผ่านกิจกรรมภายในค่ายมากมายที่พี่ๆ
              ในคณะแพทยศาสตร์ศิริราชพยาบาลตั้งใจจัดเตรียมขึ้นมาเพื่อน้องๆ
              มัธยมศึกษาตอนปลายทุกคน สุดท้ายนี้เตรียมเอกสารการสมัครให้พร้อม
              แล้วมาเจอกันที่ค่ายเส้นทางสู่หมอศิริราชครั้งที่ 25 นะครับ/ค่ะ :))
              ” - Great & Ingfa SI132
            </p>
          </div>
          <div className="col-md-6">
            <div
              style={{
                backgroundImage: `url(${SignUpImage})`,
                backgroundSize: "cover",
                minHeight: "200px",
                height: "100%",
                display: "grid",
                justifyItems: "center",
                alignItems: "center",
              }}
              className="rounded"
            >
              <h1>มาสมัครกันเลย</h1>
              <Link
                to="/signup"
                className="btn btn-primary"
              >
                ลงทะเบียน
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="shadow border rounded my-4 p-3">
        <h2>ตารางกำหนดการ</h2>
        <table className="table table-bordered key-dates-table">
          <thead>
            <tr>
              <th>กิจกรรม</th>
              <th>เริ่ม</th>
              <th>สิ้นสุด</th>
              <th>ผ่านทาง</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>รับสมัคร</td>
              <td>วันพุธที่ 13 กันยายน 2567</td>
              <td>วันพุธที่ 6 ตุลาคม 2567 เวลา 23.59 น.</td>
              <td>
                <Link to="/">website</Link>
              </td>
            </tr>
            <tr>
              <td>ประกาศผล</td>
              <td colSpan={2}>วันพฤหัสบดีที่ 7 พฤศจิกายน 2567</td>
              <td>
                <Link to="/">website</Link> |{" "}
                <a href="https://www.facebook.com/sirirajmedcamp25th">
                  facebook
                </a>{" "}
                | <a href="https://www.instagram.com/sirirajmedcamp25th">ig</a>
              </td>
            </tr>
            <tr>
              <td>วันงาน</td>
              <td>วันเสาร์ที่ 7 ธันวาคม 2567</td>
              <td>วันอาทิตย์ที่ 8 ธันวาคม 2567</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="shadow border rounded my-4 p-3">
        <h2>เกณฑ์การคัดเลือก</h2>
        <p>
          เกณฑ์: พิจารณาจากคะแนนในการทำข้อสอบ โดย 260 คนแรกที่ได้คะแนนสูงสุด
          จะเป็นผู้ที่ได้รับเลือก
        </p>
      </section>

      <section className="shadow border rounded my-4 p-3">
        <h2>คำชี้แจงในการทำข้อสอบ</h2>
        <p>
          ข้อสอบชุดนี้
          จัดขึ้นเพื่อคัดเลือกนักเรียนระดับชั้นมัธยมศึกษาตอนปลายในการเข้าร่วมโครงการ
          “ค่ายเส้นทางสู่หมอศิริราช ครั้งที่ 25” เท่านั้น
          โดยให้เวลาในการทำแบบทดสอบระหว่างวันพุธที่ 13 กันยายน 2567 ถึงวันพุธที่
          6 ตุลาคม 2567 เวลา 23.59 น. และไม่อนุญาตให้นำไปใช้ในเชิงพาณิชย์
        </p>
        <h6>
          1. ข้อสอบคัดเลือกผู้เข้าร่วมค่ายเส้นทางสู่หมอศิริราช ครั้งที่ 25
          แบ่งออกเป็น 5 ส่วน ดังนี้
        </h6>
        <table className="table table-bordered exam-table">
          <thead>
            <tr>
              <th>ชุดข้อสอบ</th>
              <th>จำนวนข้อ</th>
              <th>คะแนนต่อข้อ</th>
              <th>รูปแบบการตอบ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>เชาวน์ปัญญา</td>
              <td>15</td>
              <td>1</td>
              <td>ปรนัย 5 ตัวเลือก</td>
            </tr>
            <tr>
              <td rowSpan={2}>จริยธรรมทางการแพทย์</td>
              <td>5</td>
              <td>1.6</td>
              <td>ปรนัย 5 ตัวเลือก</td>
            </tr>
            <tr>
              <td>2</td>
              <td>6</td>
              <td>เติมคำตอบอย่างสั้น</td>
            </tr>
            <tr>
              <td>จริยธรรมทางการแพทย์</td>
              <td>15</td>
              <td>1</td>
              <td>ปรนัย 5 ตัวเลือก</td>
            </tr>
            <tr>
              <td rowSpan={3}>เกี่ยวกับศิริราช</td>
              <td>7</td>
              <td>1</td>
              <td>ปรนัย 7 ตัวเลือก</td>
            </tr>
            <tr>
              <td>4</td>
              <td>1.5</td>
              <td>ปรนัย 7 ตัวเลือก</td>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>เติมคำตอบอย่างสั้น</td>
            </tr>
            <tr>
              <td>ความคิดสร้างสรรค์</td>
              <td>7</td>
              <td>5</td>
              <td>เติมคำตอบอย่างยาว</td>
            </tr>
          </tbody>
        </table>
        <h6>
          2. ในข้อสอบทุกส่วน เมื่อกดปุ่ม “ถัดไป”
          แล้วระบบจะเข้าสู่ข้อสอบข้อถัดไปทันที
          ไม่สามารถย้อนกลับมาแก้ไขคำตอบข้อนั้น ๆ ได้อีก
        </h6>
        <h6>3. ข้อสอบทุกส่วนไม่จำกัดเวลาในการทำข้อสอบ</h6>
        <h6>4. เวลาที่ใช้ในการทำข้อสอบแต่ละส่วนไม่มีผลต่อการพิจารณาคะแนน</h6>
        <h6>
          5. ผู้สมัครจะต้องทำข้อสอบและส่งคำตอบผ่านระบบสอบภายในวันจันทร์ที่ 6
          ต.ค. 2567 เวลา 23.59 น. จึงจะได้รับการพิจารณาผลสอบ
        </h6>
        <h6>
          6. อนุญาตให้ผู้สมัครสืบค้นข้อมูลจากอินเทอร์เน็ตและแหล่งความรู้อื่นได้
        </h6>
        <h6>
          7. ไม่อนุญาตให้ผู้สมัครปรึกษาหรือเผยแพร่ข้อสอบให้กับผู้อื่น
          หากพบการทุจริตในการสอบ ผู้สมัครจะถูกตัดสิทธิ์การพิจารณาผลสอบ
        </h6>
      </section>

      <section className="shadow border rounded my-4 p-3 row row-cols-2 row-cols-lg-4 g-4">
        {sponsor.map(({ id, name, imageId }) => (
          <div key={id}>
            <img
              className="rounded"
              src={`https://drive.google.com/thumbnail?id=${imageId}`}
              alt={name}
            />
          </div>
        ))}
      </section>
    </div>
  );
}

export default HomePage;
