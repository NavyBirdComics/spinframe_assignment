import './header.css'

//header contains menu and add car button that opens the popup
export default function Header({setAddPopup}) {
  return (
    <div className="header">
      <span className="logo">
        <img src="/img/pngegg.png" width="50px"/>
        &nbsp;
        |
        &nbsp;
        <span className="title">Vehichle Fleet Management App</span>
      </span>
      <span className="menu">
        View & Manage Cars
        &nbsp;
        <button onClick={() => setAddPopup(true)}>Add A Car</button>
      </span>
    </div>
  )
}
