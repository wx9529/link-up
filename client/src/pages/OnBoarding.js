import Nav from '../components/Nav';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OnBoarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: "",
        url: "",
        cars:[],
        matches: [],
    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('submitted');
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8000/user', { formData });
            console.log(response);
            const success = response.status === 200;
            if (success) navigate('/dashboard');
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
            <Nav
                minimal={true}
                setShowModal={() => {
                }}
                showModal={false}
            />

            <div className="onboarding">
                <h2>UPLOAD CARS</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="Model">Model</label>
                        <input
                            id="Model"
                            type='text'
                            name="Model"
                            placeholder="Model"
                            required={true}
                            value={formData.Model}
                            onChange={handleChange}
                        />

                        <label htmlFor="Price">Price</label>
                        <input
                            id="Price"
                            type='text'
                            name="Price"
                            placeholder="Price"
                            required={true}
                            value={formData.Price}
                            onChange={handleChange}
                        />


                        <label htmlFor="Year">Year</label>
                        <input
                            id="Year"
                            type="text"
                            name="Year"
                            required={true}
                            placeholder="Year"
                            value={formData.Year}
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
