// import countries from "world-countries";

// const formattedCountries = countries.map((country)=>({
//     value: country.name.comman,
//     label: `${country.name.common} ${country.flag}`,
//     latlng: country.latlng,
//     region: country.region

// }))


// // Hook Const Use

// const useCountires = ()=>{
//     const getAll = ()=> formattedCountries;
//     return {getAll}
// }

// export default useCountires



import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
    value: country.name.common,  // Corrected "comman" to "common"
    label: `${country.name.common} ${country.flag}`,
    latlng: country.latlng,
    region: country.region
}));

const useCountires = () => {
    const getAll = () => formattedCountries;
    return { getAll };
};

export default useCountires;
