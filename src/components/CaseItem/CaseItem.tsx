import React from "react";
import { CaseEntity } from "../../context/case";
import "./CaseItem.css";
import { Link } from "react-router-dom";
import { useCase } from "../../hooks/useCase";

interface CaseItemProps {
  caseItem: CaseEntity;
}

const CaseItem: React.FC<CaseItemProps> = (props) => {
  const { caseItem } = props;

  const { removeCase } = useCase();

  const handleRemove = () => {
    removeCase(caseItem.id);
  };

  return (
    <div className="case-item">
      <Link className="case-item-title" to={`/cases/${caseItem.id}`}>
        {caseItem.title}
      </Link>
      <p className="case-item-description">
        {caseItem.description.slice(0, 40)}
      </p>
      <p className="case-item-date">
        {new Date(caseItem.reportedDate).toISOString().split("T")[0]}
      </p>

      <Link to={`/add-case?edit=1&id=${caseItem.id}`} className="edit-button">
        Edit
      </Link>

      <button onClick={handleRemove} className="delete-button">
        Remove
      </button>
    </div>
  );
};

export default CaseItem;
