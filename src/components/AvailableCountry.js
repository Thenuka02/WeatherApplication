// import Card from './UI/Card';

// const DummyData = [
//     { id: '1', countryName: 'Sri Lanka', temperature: '28°C', time: 'Thursday 16.00'  },
//     { id: '2', countryName: 'United Kingdom', temperature: '4°C',  time: 'Thursday 16.00' },
//     { id: '3', countryName: 'United States', temperature: '8°C',  time: 'Thursday 16.00'  },
//     { id: '4', countryName: 'Australia',temperature: '21°C', time: 'Thursday 16.00'  },
// ];

// const AvailableCountry = () => {
//     const countryList = DummyData.map(country => 
//     <CountryName 
//         key={country.id}
//         id={country.countryName}
//         description={country.temperature} 
//         price={country.time}

//     />);

//     return (
//      <section className={classes.country}>
//         <Card>
//         <ul>
//             {countryList}
//         </ul>
//         </Card>
//     </section>
//     );
// };

// export default AvailableCountry;

import React from "react";
import Card from "./UI/Card";

const AvailableCountry = ({ weatherData, onDelete }) => {

    return (
        <div className=" ">
            {weatherData.map((data) => {
                return <Card key={data.location.name} uniqueId={data.location.name} weatherData={data} onDelete={onDelete} />
            })}
        </div>
    )
}

export default AvailableCountry;