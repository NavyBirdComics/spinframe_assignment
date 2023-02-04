//cars table iterates over all cars, 
//shows details for them,
//and shows options to update or delete the cars
//pressing update or delete button will set current car to relevant car and open updatr or delete popups
export default function CarsTable({cars, setUpdatePopup, setDelPopup, setCurrCar}) {
  return (
    <div className="cars-table-container">
        <span className="title">View and update or delete the cars in your Fleet</span>
        <br/>
        <br/>
      <table className="cars-table">
        <thead>
            <tr>
                <th>license plate</th>
                <th>color</th>
                <th>manufacturer</th>
                <th>year</th>
            </tr>
        </thead>
        <tbody>
            {cars ? cars.map((car,index) => 
                <tr key={index}>
                    <td>{car.license}</td>
                    <td>{car.color}</td>
                    <td>{car.manufacturer}</td>
                    <td>{car.year}</td>
                    <td><button onClick={() => {setCurrCar(car.license); setUpdatePopup(true)}}>update</button></td>
                    <td><button onClick={() => {setCurrCar(car.license); setDelPopup(true)}}>delete</button></td>
                </tr>
            ) : ""}
        </tbody>
        </table>
    </div>
  )
}
