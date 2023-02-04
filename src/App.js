import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import CarsMain from "./components/carsMain/carsMain";
import CarForm from "./components/carForm/carForm";
import "./App.css"
import { useState, useEffect } from "react";
import Popup from "./components/popup/popup";
import axios from 'axios'

// app contains main functions, as well as popups and page structure 

function App() {
  //variables: cars, popups controls, and saving the current car for update and delete functions
  const [cars, setCars] = useState()
  const [addPopup, setAddPopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [delPopup, setDelPopup] = useState(false);
  const [currCar, setCurrCar] = useState("");

  //useeffect will run after render of component
  //using axios will call to backend route that sends cars data
  //and sets them as cars in reverse order (last added car will be first)
  useEffect(() => {
    axios
      .get("/getallcars")
      .then((response) => {
        setCars(response.data.reverse())
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //update car gets updated car details,
  //finds the index of the car
  //and updates the car at index
  function updateCar (license, color, manufacturer, year) {
    console.log("update car", license, color, manufacturer, year)  
    let carIndex = cars.findIndex((car => car.license === currCar));
    cars[carIndex].license = license;
    cars[carIndex].color = color;
    cars[carIndex].manufacturer = manufacturer;
    cars[carIndex].year = year;
  }

  //add car gets new car details,
  //creates car object from them
  //and sets it to top of cars array
  function addCar (license, color, manufacturer, year) {
    console.log("add car", license, color, manufacturer, year)
    let new_car = {license: license, color: color, manufacturer: manufacturer, year:year}
    setCars([new_car, ...cars])
  }

  //delete car filters all cars
  //so removes the car which's license matches the current car
  //and posts a request to server to delete the car from db
  function deleteCar () {
    console.log("delete car", currCar)
    axios
            .post("/deletecar",{license:currCar})
            .then((response) => {
            console.log(response)
            let temp_cars = cars.filter(car => car.license !== currCar);
            setCars(temp_cars);
            })
            .catch((error) => {
            console.log(error)
            });
  }

  //popups for update and delete using carform in update mode and delete mode relatively,
  //popup for delete message
  //header, carsmain body and footer
  return (
    <div>
      <Popup trigger={addPopup} setTrigger={setAddPopup}>
        <CarForm mode={"Add"} closeForm={setAddPopup} submitFunc={addCar}/>
      </Popup>
      <Popup trigger={updatePopup} setTrigger={setUpdatePopup}>
      <CarForm mode={"Update"} closeForm={setUpdatePopup} submitFunc={updateCar} currCar={currCar} cars={cars}/>
      </Popup>
      <Popup trigger={delPopup} setTrigger={setDelPopup}>
      <span className="title">Are you sure you want to delete car #{currCar}?</span>
      <br/>
      <br/>
        <button onClick={() => {deleteCar(); setDelPopup(false)}}>Delete Car</button> <button onClick={() => setDelPopup(false)}>Cancel</button>
      </Popup>

      <Header setAddPopup={setAddPopup}/>
      <CarsMain cars={cars} setUpdatePopup={setUpdatePopup} setDelPopup={setDelPopup} setCurrCar={setCurrCar}/>
      <Footer/>
    </div>
  );
}

export default App;
