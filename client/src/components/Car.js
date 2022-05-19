import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Car = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCarInfo();
  }, [])

  const getCarInfo = async () => {
    const user_id = cookies.UserId;
    try {
      const response = await axios.get('http://localhost:8000/cars', { params: { user_id } });
      console.log('response.data', response.data);
      setCars([...response.data.cars]);
    } catch (err) {
      console.log(err);
    }
  }

  const deleteACar = async (id) => {
    const user_id = cookies.UserId;
    try {
      const carArray = [...cars];
      const response = await axios.delete('http://localhost:8000/cars', { params: { id, user_id } });
      carArray.splice(id, 1);
      console.log('carid', id);
      console.log('carArray', carArray);
      setCars([...carArray]);
    } catch (err) {
      console.log(err);
    }
  }


  return (

    <div className="car-display">
      {cars.map((car) =>
        <div key={car.id} className="car-container">
          <img className="car-photos" src={car.url} />
          <h3>{car.year} <br /> {car.model} <br />${car.price}</h3>
          <div className="car-list-button">
            <button className="secondary-button" onClick={() => { deleteACar(car.id) }}>Delete</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Car