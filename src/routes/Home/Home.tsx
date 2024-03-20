import React from "react";
import { useCase } from "../../hooks/useCase";
import CaseItem from "../../components/CaseItem/CaseItem";
import "./Home.css";
import { Link } from "react-router-dom";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { cases } = useCase();

  return (
    <div className="container">
      <h3 className="title">Cases Reporting System</h3>
      <div className="home-header">
        <h3>Sort </h3>
        <Link to="/add-case" className="button">
          Add Case
        </Link>
      </div>
      <div>
        <div className="cases-header">
          <h4>Title</h4>
          <h4>Description</h4>
          <h4>Reported On</h4>
        </div>
        {cases.length === 0 ? (
          <p className="empty-cases">No case found!</p>
        ) : (
          cases.map((caseItem) => {
            return <CaseItem key={caseItem.id} caseItem={caseItem} />;
          })
        )}
      </div>
    </div>
  );
};

export default Home;
