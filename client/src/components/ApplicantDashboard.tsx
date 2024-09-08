import { Link } from "react-router-dom";

function ApplicantDashboard() {
  return (
    <section>
      <div>
        <Link to="/exam/IQ">IQ</Link>
      </div>
      <div>
        <Link to="/exam/ETHICS">ETHICS</Link>
      </div>
      <div>
        <Link to="/exam/KNOWLEDGE">KNOWLEDGE</Link>
      </div>
      <div>
        <Link to="/exam/SIRIRAJ">SIRIRAJ</Link>
      </div>
      <div>
        <Link to="/exam/CREATIVE">CREATIVE</Link>
      </div>
    </section>
  );
}

export default ApplicantDashboard;
