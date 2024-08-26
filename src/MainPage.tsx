import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();

  const handleCreateCV = () => {
    navigate('/cv-builder');
  };

  return (
    <div className="main-page">
        <h1 className="main-page-title">Create a new CV</h1>
        <div className="create-cv-container" onClick={handleCreateCV}>
        <button className="create-cv-button">+</button>
      </div>
    </div>
  );
};

export default MainPage;
