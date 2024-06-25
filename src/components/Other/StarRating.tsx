import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

interface StarProps {
  stars: number;
}

const StarRating: React.FC<StarProps> = ({ stars }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.3;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon" size={20} color="black" fill="#FDCC0D"/>
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon"  size={20} color="black" fill="#FDCC0D"/>
        ) : (
          <AiOutlineStar className="icon" size={20} color="black" fill="#FDCC0D"/>
        )}
      </span>
    );
  });

  return (
    <>
      <div className="flex items-center">
        <div className="flex">
          {ratingStar}
        </div>
      </div>
    </>
  );
};


export default StarRating;
