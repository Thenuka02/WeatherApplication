import './App.css';
import React, { useState, useEffect } from 'react';
import Searchbox from './components/UI/Searchbox';
import AvailableCountry from './components/AvailableCountry';
import Axios from 'axios';


// const posts = [
//     { id: '1', countryName: 'Sri Lanka', temperature: '28°C', time: 'Thursday 16.00'  },
//     { id: '2', countryName: 'United Kingdom', temperature: '4°C',  time: 'Thursday 16.00' },
//     { id: '3', countryName: 'United States', temperature: '8°C',  time: 'Thursday 16.00'  },
//     { id: '4', countryName: 'Australia',temperature: '21°C', time: 'Thursday 16.00'  },
// ];

// const filterPosts = (posts, query) => {
//     if (!query) {
//         return posts;
//     }

//     return posts.filter((post) => {
//         const postName = post.countryName.toLowerCase();
//         return postName.includes(query);
        
//     });
// };


// function App() {
//   const { search } = window.location;
//   const query = new URLSearchParams(search).get('s');
//   const [searchQuery, setSearchQuery] = useState(query || '');
//   //const filteredPosts = filterPosts(posts, searchQuery);

const dumyLocations =[
  {countryName: 'Sri Lanka'},
  {countryName: 'United Kingdom'},
  {countryName: 'United States' },
  {countryName: 'Australia'  },
];

function App() {
  const API_KEY = '37e3b27e8b654bff8ed144147210812';
  const [locations, setLocations] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [temp, setTemp] = useState(dumyLocations);
  const [isEdited, setIsEdited] = useState(false);
  const [isError, setIsError] = useState(false);
    
  useEffect(() => {
    getLocations();
    getIsEdited();
    setTimeout(() => {
      const getLocation = JSON.parse(localStorage.getItem('locations'));
      if (getLocation !== null) {
        getLocation.map((location) => {
          Axios
            .get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.loc}&aqi=no`)
            .then(response => {
              setWeatherData((prevWeathers) => {
                const updateWeather = [...prevWeathers];
                updateWeather.push(response.data);
                setWeatherData(updateWeather);
              })
            });
        })
      }
    })
  }, []);

  useEffect(() => {
    saveLocations();
    saveIsEdited();
  }, [locations, isEdited])

  const fetchData = async (location) => {

    try {
      const response = await Axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`,
      )
      setLocations((prevLoc) => {
        const updateLocations = [...prevLoc];
        updateLocations.unshift({ loc: response.data.location.name });
        setLocations(updateLocations);
      })
      setWeatherData((prevWeathers) => {
        const updateWeather = [...prevWeathers];
        updateWeather.push(response.data);
        setWeatherData(updateWeather);
      });
      setIsEdited(true);
    } catch (error) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000)
      console.log(error.response); 
    }
  }

  const deleteHandler = (selectedLoc) => {
    setWeatherData(prevLoc => {
      const updatedWeather = prevLoc.filter((weather) => {
        return weather.location.name !== selectedLoc
      });
      return updatedWeather;
    });
    setLocations((prev) => {
      const updatedLocations = prev.filter((location) => {
        return location.loc.toLowerCase() !== selectedLoc.toLowerCase()
      });
      return updatedLocations;
    });
    setIsEdited(true);
  }

  const saveLocations = () => {
    localStorage.setItem('locations', JSON.stringify(locations));
  }

  const getLocations = () => {
    if (localStorage.getItem('locations') === null) {
      localStorage.setItem('locations', JSON.stringify(locations))
    } else {
      let locationLocal = JSON.parse(localStorage.getItem('locations'));
      setLocations(locationLocal);
    }
  }

  const saveIsEdited = () => {
    localStorage.setItem('isEdited', JSON.stringify(isEdited));
  }

  const getIsEdited = () => {
    if (localStorage.getItem('isEdited') == null) {
      localStorage.setItem('isEdited', isEdited);
    } else {
      let editedLocal = JSON.parse(localStorage.getItem('isEdited'));
      setIsEdited(editedLocal);
    }
  }

  


  // return (
  //   <div >
  //     <Searchbox 
  //       searchQuery={searchQuery}
  //       setSearchQuery={setSearchQuery}
  //     />
  //     <ul>
  //       {filteredPosts.map((post) => (
  //         <ul key={post.id}>{post.countryName}, {post.temperature}, {post.time}</ul>
  //           ))}
  //     </ul>
  //   </div>
  // ); 

  return (
    <div >
      <Searchbox 
      fetchData={fetchData} />
      {isError && <p className="error">Wrong Location!! Please Enter correct Location</p>}
      {locations.length === 0 ? 
      <h3>No Data...</h3>
      : <AvailableCountry weatherData={weatherData} onDelete={deleteHandler} />}
    </div>
  );
}

export default App;
