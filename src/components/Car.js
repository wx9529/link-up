const db = [
  {
    name: 'Richard Hendricks',
    year: '2021',
    make: 'audi',
    model: 'R8',
    url: 'https://images.unsplash.com/photo-1612468008274-9445bd56161e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29vbCUyMGNhcnxlbnwwfHwwfHw%3D&w=1000&q=80'
  },
    {
    name: 'Richard Hendricks',
    year: '2021',
    make: 'audi',
    model: 'R8',
    url: 'https://images.unsplash.com/photo-1612468008274-9445bd56161e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29vbCUyMGNhcnxlbnwwfHwwfHw%3D&w=1000&q=80'
  }
]

const Car = () => {

  const cars = db

  return (
    
      <div className="car-display">
      <div className="swiper-container">
        <div className="card-container">
          {cars.map((car) =>
          <div>    
                <h3>{car.name} <br /> {car.year} <br />{car.make} {car.model} </h3>
                <img className="car-photos" src={car.url} />
          </div>
          )}
      </div>
      </div>
      </div>
)
}

export default Car