import React,{useState} from "react";

const Provider = ({ children }) => {
    let initialState = {
        givenName: "Sam",
        surname: "Fairfax",
        email: "sam.fairfax@fairfaxmedia.com.au",
        phone: "0292822833",
        houseNumber: "100",
        street: "Harris Street",
        suburb: "Pyrmont",
        state: "NSW",
        postcode: "2009",
        country: "Australia",
    };

    [personData, setPersonData] = useState(initialState);

    const formContext = React.createContext();

    const data = {
        value: {
            personData,
        },
        action: { setPersonData },
    };
    return data;
    // return <formContext.Provider value={data}>{children}</formContext.Provider>;
};

module.exports = { Provider };
