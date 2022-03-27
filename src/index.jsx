
var hCardProps = {
    givenName: 'Sam',
    surname: 'Fairfax',
    email: 'sam.fairfax@fairfaxmedia.com.au',
    phone: '0292822833',
    houseNumber: '100',
    street: 'Harris Street',
    suburb: 'Pyrmont',
    state: 'NSW',
    postcode: '2009',
    country: 'Australia'
  };


//here we will call our reducer and get the saved data

ReactDOM.render(
    React.createElement(window.hCard.default, hCardProps),
    document.querySelector(".HcardApp")
);
