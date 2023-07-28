import { useState } from 'react'
import './App.css'

function App() {

  const [route, setRoute] = useState({
    route: "",
    stations: [],
  });

  const handleRoute = e => {
    setRoute(route => ({
      ...route,
      route: e.target.value
    }))
  }

  const addStation = () => {
    setRoute(route => ({
      ...route,
      stations: [
        ...route.stations,
        {
          name: "",
          lat: "",
          lon: "",
          errors: {}
        }
      ]
    }))
  }

  const handleStation = (e, key) => {
    let { name, value } = e.target;

    setRoute(route => ({
      ...route,
      stations: route.stations.map((station, i) => {
        if (key === i) {
          station[name] = value

          let current = route.stations.find((r, index) => r[name] === value && key !== index)
          if (current) {
            station.errors[name] = `${name} value is already used with ${value} in other field!`
          } else {
            delete station.errors[name]
          }
        }
        return station
      })
    }))
  }

  const enable = route.route &&
    route.stations.every(station => Object.entries(station).every(([key, value]) => key === 'errors' ? Object.values(value).length === 0 : value))

  console.log(route.stations)

  return (
    <>
      <input type='text' onChange={handleRoute} placeholder='route' />
      <button onClick={addStation}>Add new station</button>
      <hr />
      {route.stations.map((station, index) => (
        <div key={index} style={{display: "flex", padding: "10px"}}>
          <input type='text' name='name' onChange={e => handleStation(e, index)} placeholder='station name'/>
          <input type='number' name='lat' onChange={e => handleStation(e, index)} placeholder='latitude' />
          <input type='number' name='lon' onChange={e => handleStation(e, index)} placeholder='longitude' />
          {Object.values(station.errors).length>0 && <p key={index} style={{ color: 'red' }}>{JSON.stringify(station.errors, null, 1)}</p>}
        </div>
      ))}
      <hr />
      <button disabled={!enable}>Save</button>
      <h3>Route: {route.route}</h3>
      <table>
        <thead>
          <th>Station name</th>
          <th>latitude</th>
          <th>longitude</th>
        </thead>
        <tbody>
          {route.stations.map((station, index) => (
            <tr key={index}>
              <td>{station.name}</td>
              <td>{station.lat}</td>
              <td>{station.lat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
