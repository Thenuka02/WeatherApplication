import React from 'react';
import'./Searchbox.css'

const Searchbox = ({ searchQuery, setSearchQuery}) => (
    <div className="main">     
     <form action="/" method="get">
      <div className="searchInputs">
        <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Enter country name"
            name="s" 
        />
        <div>
        <button className= "searchButton">
        Search</button>
        </div>
        </div>
    </form>
    </div>
);

export default Searchbox;