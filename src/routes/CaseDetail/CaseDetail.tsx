import * as React from "react";
import { useParams } from "react-router-dom";
import { useCase } from "../../hooks/useCase";

interface CaseDetailProps {}

const CaseDetail: React.FC<CaseDetailProps> = () => {
  const { cases } = useCase();
  const { caseId } = useParams();

  const caseItem = cases.find((c) => c.id === caseId);

  return (
    <div className="container">
      <h2>{caseItem?.title}</h2>
      <p>{new Date(caseItem.reportedDate).toISOString().split("T")[0]}</p>
      <p>{caseItem?.description}</p>
    </div>
  );
};

export default CaseDetail;
