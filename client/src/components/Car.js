const db = [
  {
    name: 'Richard Hendricks',
    year: '2021',
    make: 'audi',
    model: 'R8',
    price: 130000,
    url: 'https://images.unsplash.com/photo-1612468008274-9445bd56161e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29vbCUyMGNhcnxlbnwwfHwwfHw%3D&w=1000&q=80'
  },
  {
    name: 'Richard Hendricks',
    year: '2021',
    make: 'audi',
    model: 'R8',
    price: 150000,
    url: 'https://images.unsplash.com/photo-1612468008274-9445bd56161e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29vbCUyMGNhcnxlbnwwfHwwfHw%3D&w=1000&q=80'
  }
]

const Car = () => {

  const cars = db

  return (

    <div className="car-display">
      {cars.map((car) =>
        <div className="car-container">
          <img className="car-photos" src={car.url} />
          <h3>{car.year} <br />{car.make} {car.model} <br />${car.price}</h3>
          <div className="car-list-button">
            <button className="secondary-button">Update</button>
            <button className="secondary-button">Delete</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Car