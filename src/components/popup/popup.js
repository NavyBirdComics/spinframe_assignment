import "./popup.css";

//popup uses props and shows the popup if trigger is true,
//shows children as body of popup 
//and uses close button that sets trigger to false on close
export default function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
      <button className="popup-close-btn" onClick={() => props.setTrigger(false)}>
            ✘
          </button>
        {props.children}
        
      </div>
    </div>
  ) : (
    ""
  );
}
