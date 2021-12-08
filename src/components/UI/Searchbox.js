import React from 'react';
import'./Searchbox.css'

const Searchbox = ({ fetchData }) => {

    const [location, setLocation] = useState('');

    const addWeather = (e) => {
        e.preventDefault();
        if (location.trim().length > 0) {
            fetchData(location);
            setLocation('');
        }
    }

    const locationHandler = (event) => {
        setLocation(event.target.value);
    }


return(
    <div className="main">     
     <form onSubmit={addWeather}>
      <div className="searchInputs">
        <input
            value={location}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Enter country name"
            name="s" 
            onChange={locationHandler} 
            
        />
        <div>
        <button className= "searchButton">
        Search</button>
        </div>
        </div>
    </form>
    </div>
)

};
export default Searchbox;