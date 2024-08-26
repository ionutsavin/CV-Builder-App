import './Popup.css';

interface PopupProps {
    message: string;
    closePopup: () => void;
}
const Popup: React.FC<PopupProps> = ({ message, closePopup }) => {
    return (
        <div className="popup">
        <div className="popup-inner">
            <div className="popup-header">
            <h2>Error</h2>
            </div>
            <div className="popup-content">
            <p>{message}</p>
            </div>
            <div className="popup-footer">
            <button onClick={closePopup}>Close</button>
            </div>
        </div>
        </div>
    );
};

export default Popup;
