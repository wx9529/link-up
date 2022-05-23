import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
const OnBoarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [formData, setFormData] = useState({
        model: '',
        url: '',
        year: '',
        price: ''
    })
    const [cars, setCars] = useState([]);
    const user_id = cookies.UserId;
    useEffect(() => {
        getCarInfo();
    }, [])


    const getCarInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8000/cars', { params: { user_id } });
            console.log('response.data', response.data);
            setCars([...response.data.cars]);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        console.log('submitted');
        const id = cars.length.toString();
        console.log('id', id);
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8000/cars', { formData, user_id, id });
            console.log(response);
            const success = response.status === 200;
            const newCar = { ...formData, id };
            console.log('newCar', newCar);
            setCars((prevState) => [...prevState, newCar]);
        } catch (err) {
            console.log(err);
        }

    }

    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <div className="onboarding">
                <h2>UPLOAD CARS</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="Model">Model</label>
                        <input
                            id="Model"
                            type='text'
                            name="model"
                            placeholder="Model"
                            required={true}
                            value={formData.model}
                            onChange={handleChange}
                        />

                        <label htmlFor="Price">Price</label>
                        <input
                            id="Price"
                            type='text'
                            name="price"
                            placeholder="Price"
                            required={true}
                            value={formData.price}
                            onChange={handleChange}
                        />


                        <label htmlFor="Year">Year</label>
                        <input
                            id="Year"
                            type="text"
                            name="year"
                            required={true}
                            placeholder="Year"
                            value={formData.year}
                            onChange={handleChange}
                        />

                        <input type="submit" />
                    </section>

                    <section>

                        <label htmlFor="url">Photo</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile pic preview" />}
                        </div>
                    </section>
                </form>
            </div>
        </>
    )
}
export default OnBoarding










