import { APIURL } from "../../../services/http";

const ApiImage = ({ path, alt, className = "h-32 w-32 object-contain" }) => {
  return (
    <img
      src={`${APIURL}/${path}`}
      alt={alt || path || "Book cover"}
      className={className}
    />
  );
};

export default ApiImage;