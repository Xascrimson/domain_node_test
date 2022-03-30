

// //here we will call our reducer and get the saved data
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const { Provider } = require("./data/context");

// console.log('line 7',Provider);
// let hCardProps = {
//   givenName: "Sam",
//   surname: "Fairfax",
//   email: "sam.fairfax@fairfaxmedia.com.au",
//   phone: "0292822833",
//   houseNumber: "100",
//   street: "Harris Street",
//   suburb: "Pyrmont",
//   state: "NSW",
//   postcode: "2009",
//   country: "Australia",
// };
let hCardPropsData = JSON.stringify(hCardProps)
console.log('line22',hCardPropsData);
ReactDOM.render(
    React.createElement(window.hCard.default, hCardPropsData),
    document.querySelector(".HcardApp")
);
