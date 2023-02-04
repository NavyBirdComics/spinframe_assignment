import "./carsMain.css"
import CarsTable from "./components/carsTable"

//carsmain is a container for carstable, sets background styling
export default function CarsMain({cars, setUpdatePopup, setDelPopup, setCurrCar}) {
  return (
    <div className="carstable-container" 
    style={{backgroundImage:"url(/img/uwp2004148.webp)"}}>
      <div className="carstable-content">
        <CarsTable cars={cars} setUpdatePopup={setUpdatePopup} setDelPopup={setDelPopup} setCurrCar={setCurrCar}/>
      </div>
      <div className="carstable-fade"></div>
    </div>
  )
}
