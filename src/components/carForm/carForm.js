import { useState, useEffect } from "react"
import "./carForm.css"
import axios from "axios";

//car form to  let user update or add a car, depends on the mode in which it is used
export default function CarForm({mode, closeForm, submitFunc, currCar}) {
    //variables: license, color, year, and manufacturer for uset to enter,
    //colors array for color options, manufacturers array for manufacturer options, years array using map for year options
    //err for error messages
    const [license, setLicense] = useState("");
    const [color, setColor] = useState("white");
    const [manufacturer, setManufacturer] = useState("Volkswagen");
    const [year, setYear] = useState(2021);
    const [colors, setColors] = useState(["white", "silver", "black"]);
    const [manufacturers, setManufacturers] = useState(["Volkswagen", "BMW", "Audi","Dodge"]);
    const [years, setYears] = useState([...Array(12).keys()].map(i => 2021 - i))
    const [err, setErr] = useState("");
    
    //if the form is used in update mode,
    //uses currcar to send get request with axios to find the rest of 
    //the car's data from db
    useEffect(() => {
        if (mode === "Update")
        {
            console.log(currCar)
            axios
                .get("/getcarbylicense/"+currCar)
                .then((response) => {
                    setLicense(response.data.license);
                    setColor(response.data.color);
                    setManufacturer(response.data.manufacturer);
                    setYear(response.data.year);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
      }, []);

    //set input value function will set input with character limit & trim
    function setInputValue(property, val, charLim) {
        val = val.trim();
        if (val.length > charLim) {
            return;
        }
        property(val);
    }

    //validate license function uses regex to validate license as being only alphanumerical
    function validateLicense (license)  {
        return license.match(
            /^[a-zA-Z0-9]+$/
        );
      };

      //submit function prevents default and sets current error to empty string,
      //checks license validation and adds relevant error in case of wrong validation,
      //then uses axios request to post car details to server on method route to add or update car, with relevant data
      //uses submit function from props to do correct action,
      //and closes the popup
      //if there's errors, sets current error
      async function doSubmit (e) {
        e.preventDefault();
        var currErr = "";
    
        if (!validateLicense(license) || !license) {
          currErr = currErr + " license invalid, please enter numbers and letters only. ";
        }
    
        if (currErr === "") {
            setErr("");
            if (mode === "Update")
            var postData = {oglicense:currCar,license:license,color:color,manufacturer:manufacturer,year:year}
            else
            var postData = {license:license,color:color,manufacturer:manufacturer,year:year}
          axios
            .post("/"+mode.toLowerCase()+"car",postData)
            .then((response) => {
            console.log(response)
            if (typeof response.data === "string") 
                setErr(response.data)
            else {
                submitFunc(license, color, manufacturer, year);
                closeForm(false);
            }
            })
            .catch((error) => {
            console.log(error)
            });
        
        } else {
          setErr(currErr);
          return;
        }
      };
    
      //contains form to get license, color, manufacturer and year,
      //on change will set relevant values,
      //and do submit function on submit
      //uses correct labels depending on mode
    return (
        <div>
        <span className="title">{mode} A Car</span>
        <hr/>
        <span className="err">{err}</span>
        <br/>
        <form className="carForm" onSubmit={doSubmit}>
        <label for="license">License Plate </label>
        <br/>
        <input
        type="text"
        id="license"
        placeholder="Enter your number..."
        maxLength={7}
        value={license}
        onChange={(e) =>
            setInputValue(setLicense, e.target.value, 7)
        }
        />
        <br/><br/>
        
        <label for="color">Color </label>
        <br/>
        <select
        id="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        >
        {colors.map((color) => (
            <option
            key={color}
            value={color}
            >
            {color}
            </option>
            ))}
            </select>
            <br/><br/>
            

                <label for="manufacturer">Manufacturer </label>
                <br/>
            <select
            id="manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            >
            {manufacturers.map((manufacturer) => (
                <option
                key={manufacturer}
                value={manufacturer}
                >
                {manufacturer}
                </option>
                ))}
                </select>
                <br/><br/>
                
                <label for="year">Year </label>
                <br/>
            <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            >
            {years.map((year) => (
                <option
                key={year}
                value={year}
                >
                {year}
                </option>
                ))}
                </select>
                <br/><br/>

                <br/>
                <button>{mode} Car →</button>
                </form>
                </div>
                )
            }
