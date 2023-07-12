import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  description: string;
  selected?: boolean;
  onSelect: (str: string)=> void;
  // labels: string[];
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  onSelect,
  // labels
}) => {
  const handleCat = useCallback(()=>{
    onSelect(label)
  },[])
  
  return (
    <Link to={`?cat=${label}`} onClick={handleCat}>
    <div
      className={`
      flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer 
      ${selected ? "border-b-neutral-800" : "border-transparent"} 
      ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
      >
      <Icon size={26} />
      {label}
    </div>
      </Link>
  );
};

export default CategoryBox;
