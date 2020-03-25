import React, { Component } from 'react';

//initializing outside of component so it wont re-write
let compounds = [];

//stateful component that handle all methods and needed data
class RegisterCompound extends Component {
    constructor(props) {
        //binding this keyword to this class
        super(props);
        //setting state to manage needed data
        this.state = {
            compoundID: '',
            wells: '',
            transferFrom: '',
            newWells: '',
            search: '',
        }
    }

    change = (event) => {
        //grabbing name and value for form field that is being changed
        const name = event.target.name;
        const value = event.target.value;

        //updating state for field inputs
        this.setState(() => {
            return {
                [name]: value,
            }
        });
    }

    register = (event) => {
        event.preventDefault();

        const {
            compoundID,
            wells,
        } = this.state;

        const newCompound = {
            compoundID,
            wells,
        }

        //adding the newCompound object to the compounds array.
        compounds.push(newCompound);
        
        //updating state with the compounds array
        this.setState(() => {
            return {
                compounds
            }
        });

        //resetting the form fields need to do this manually because I am preventing default submit
        this.setState(() => {
            return {
                compoundID: '',
                wells: '',
            }
        });
    }

    transfer = (event) => {
        event.preventDefault();

        const {
            transferFrom,
            newWells,
        } = this.state;

        //search for transfer from well if at least one compound is registered
        if (this.state.compounds) {

            for (let i = 0; i < this.state.compounds.length; i++) {
                //console.log(this.state.compounds[i].wells);
                const wellsString = this.state.compounds[i].wells;

                if (wellsString.includes(transferFrom)) {
                    //grab the compound in it
                    const compoundIDString = this.state.compounds[i].compoundID;

                    //create newCompounds for transfer to wells with that compound in them
                    const newCompound = {
                        compoundID: compoundIDString,
                        wells: newWells,
                    }

                    //update compounds array with newCompounds
                    compounds.push(newCompound);

                    //update state with the new compounds array
                    this.setState(() => {
                        return {
                            compounds,
                        };
                    });

                    //stopping once a match is found
                    break;

                } else {
                    console.log('Error! This well does not exist. Please register a compound with this well before attempting a transfer.');
                }
            }
        } else {
            console.log('Error! Please register at least one compound.');
        }
    }

    search = (event) => {
        event.preventDefault();

        const {
            search
        } = this.state;

        //find well from search field if at least one compound is registered
        if (this.state.compounds) {

            let message;

            for (let i = 0; i < this.state.compounds.length; i++) {
                const wellsString = this.state.compounds[i].wells;

                if (wellsString.includes(search)) {
                    //grab associated compound
                    const compoundIDString = this.state.compounds[i].compoundID;

                    //show well and compound on screen
                    message = `${search} contains Compound ID: ${compoundIDString}`;
                    document.querySelector('.search-results').innerHTML = message;
                } else {
                    //no search results
                    message = 'No search results, please try again.';
                    document.querySelector('.search-results').innerHTML = message;
                }
            }
        } else {
            console.log('Error! Please register at least one compound.');
        }
    }

    render() {
        const {
            compoundID,
            wells,
            transferFrom,
            newWells,
            search,
        } = this.state;

        console.log('STATE: ', this.state);

        return (
            <div className="register-compound-container">
                <h3>Register a Compound</h3>
                <div className="register-compound-modal">
                    <form id="register-compound-form" className="register-compound-form">
                        <input 
                            id="compoundID"
                            name="compoundID"
                            type="text"
                            placeholder="Compound ID..."
                            onChange={this.change}
                            value={compoundID} />
                        <input 
                            id="wells"
                            name="wells"
                            type="text"
                            placeholder="Well(s)..."
                            onChange={this.change}
                            value={wells} />
                        <button onClick={this.register} className="register">Register</button>
                    </form>
                </div>
                <h3>Transfer Well Content</h3>
                <div className="transfer-compound-modal">
                    <form id="transfer-compound-form" className="transfer-compound-form">
                        <input 
                            id="transferFrom"
                            name="transferFrom"
                            type="text"
                            placeholder="Well to transfer from..."
                            onChange={this.change}
                            value={transferFrom} />
                        <input 
                            id="newWells"
                            name="newWells"
                            type="text"
                            placeholder="Well(s) to transfer to..."
                            onChange={this.change}
                            value={newWells} />
                        <button onClick={this.transfer} className="transfer">Transfer</button>
                    </form>
                </div>
                <h3>Retrieve Well Content</h3>
                <div className="search-container">
                    <form id="search-form" className="search-form">
                        <input 
                            id="search"
                            name="search"
                            type="text"
                            placeholder="Search a well..."
                            onChange={this.change}
                            value={search} />
                        <button onClick={this.search} className="search">Search</button>
                    </form>
                    <div className="search-results">
                        {/* Empty div will show content on search */}
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterCompound;