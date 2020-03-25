import React, { Component } from 'react';

//stateful component that manages compound and well data.
//TODO: Clean up console.logs

//initializing these outside of the stateful component because I want to be able to add each compound/wells 
//to the array without it getting re-written
let compounds = [];
//let wells = [];
let newWells = [];

class RegisterCompound extends Component {
    constructor(props) {
        //binding this keyword to this class
        super(props);
        //setting state to manage compound, well, and plate data
        this.state = {
            compoundID: '',
            wells: '',
            transferFrom: '',
            newWells: '',
        }
    }

    change = (event) => {
        const name = event.target.name;
        console.log('Field Name: ', name);
        const value = event.target.value;
        console.log('Field Value: ', value);

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
        console.log('New Compound: ', newCompound)

        //adding to temp array
        compounds.push(newCompound);
        console.log('Compounds array', compounds);
        
        //adding the newCompound object to the compounds array.
        this.setState(() => {
            return {
                compounds
            }
        });
        console.log('What is in state: ', this.state);

        //putting the wells contents into existingWells array before resetting wells
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
        console.log('New Wells', newWells);

        const {
            transferFrom,
        } = this.state;

        const transferCompound = {
            transferFrom,
            newWells
        }

        console.log(transferCompound);

        //adding new compound to compounds array.
        compounds.push(transferCompound)

        //adding the newCompound object to the compounds array.
        this.setState(() => {
            return {
                compounds
            }
        });
    }

    render() {
        const {
            compoundID,
            wells,
            transferFrom,
            newWells,
        } = this.state;

        console.log('Making sure state is updated correctly', this.state);

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
                <h3>Transfer Well Contents</h3>
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
                <h3>Retrieve Well Contents</h3>
            </div>
        );
    }
}

export default RegisterCompound;