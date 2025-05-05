import { useNavigate } from "react-router-dom";
import "./success.css";

function Success() {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-box">
        <div className="success-icon">&#10004;</div>
        <h1>Payment Successful!</h1>
        <p>
          Your transaction has been completed successfully. Thank you for your
          booking!
        </p>
        <button onClick={() => navigate("/tour")} className="back-button">
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Success;
