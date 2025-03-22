import { useNavigate } from "react-router-dom";
import "./cancel.css";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="cancel-container">
      <div className="cancel-box">
        <div className="cancel-icon">&#10008;</div>
        <h1>Payment Failed!</h1>
        <p>
          Oops! Something went wrong with your transaction. Please try again.
        </p>
        <button onClick={() => navigate("/tour")} className="retry-button">
          Try Again
        </button>
      </div>
    </div>
  );
};
export default Cancel;
