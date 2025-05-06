import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PackageDetails = () => {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tours/${id}`)
      .then((res) => {
        setPackageDetails(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching package details:", err);
      });
  }, [id]);

  if (!packageDetails) return <p>Loading...</p>;

  return (
    <div>
      <h1>{packageDetails.name}</h1>
      <p>{packageDetails.description}</p>
      <p>Budget: ${packageDetails.budget}</p>
      <p>Duration: {packageDetails.duration}</p>
      <p>Highlights: {packageDetails.highlights.join(", ")}</p>
      <img src={packageDetails.image} alt={packageDetails.name} />
    </div>
  );
};

export default PackageDetails;
