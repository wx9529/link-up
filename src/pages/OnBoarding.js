import { useState } from "react"
import Nav from "../components/Nav"

const OnBoarding = () => {

  const [formData, setFormData] = useState({
    user_id: "",
    make: "",
    model: "",
    year: "",
    email: "",
    firstName: "",
    lastName: "",
    url: "",
    matches: []
  })
  const handleSubmit = () => {
    console.log("submit")
  }
  const handleChange = (e) => {
    console.log("change")
    const value = e.target.value;
    const name = e.target.name

    setFormData((prevState)=>({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <>
      <Nav setShowModal={() => { }}
        showModal={false} />
      <div className="onboarding">
        <h2>Post Your Car</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="Make">Make</label>
            <input id="make"
              type="text"
              name="make"
              placeholder="make"
              required={true}
              value={formData.make}
              onChange={handleChange} />
            <label htmlFor="Model">Model</label>
            <input id="Model"
              type="text"
              name="model"
              placeholder="model"
              required={true}
              value={formData.model}
              onChange={handleChange} />
            <label htmlFor="year">Year</label>
            <input id="year"
              type="number"
              name="year"
              placeholder="year"
              required={true}
              value={formData.year}
              onChange={handleChange} />
            <label htmlFor="url">Photo Url</label>
            <input type="url"
              name="url"
              id="url"
              placeholder="photo url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              <img src={formData.url} alt="profile pic preview"/>
            </div>

            <input type="submit" />

          </section>
        </form>

      </div>
    </>
  )
}
export default OnBoarding