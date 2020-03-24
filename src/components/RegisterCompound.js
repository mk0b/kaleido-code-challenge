import React, { Component } from 'react';

//stateful component that manages compound and well data.
//TODO: Clean up console.logs

//initializing these outside of the stateful component because I want to be able to add each compound/wells 
//to the array without it getting re-written
let compounds = [];
let wells = [];
let existingWells = [
    'Please register some compounds.'
];
let newWells = [];

class RegisterCompound extends Component {
    constructor(props) {
        //binding this keyword to this class
        super(props);
        //setting state to manage compound, well, and plate data
        this.state = {
            compoundID: '',
            transferFrom: '',
            wellData: [
                'P-12345.A1',
                'P-12345.A2',
                'P-12345.A3',
                'P-12345.A4',
                'P-12345.B1',
                'P-12345.B2',
                'P-12345.B3',
                'P-12345.B4',
                'P-12345.C1',
                'P-12345.C2',
                'P-12345.C3',
                'P-12345.C4',
                'P-1.A1',
                'P-1.A2',
                'P-1.A3',
                'P-1.A4',
                'P-1.B1',
                'P-1.B2',
                'P-1.B3',
                'P-1.B4',
                'P-1.C1',
                'P-1.C2',
                'P-1.C3',
                'P-1.C4',
            ],
        }
    }

    change = (event) => {
        const name = event.target.name;
        console.log('Field Name: ', name);
        const value = event.target.value;
        console.log('Field Value: ', value);

        //updating state for compound and plate data
        this.setState(() => {
            return {
                [name]: value,
            }
        });
        
        //updating array for well data
        if (event.target.name === 'wells') {
            const wellOptions = event.target.options;
            console.log('Well Options: ', wellOptions);
            for (let i = 0; i < wellOptions.length; i++) {
                if (wellOptions[i].selected) {
                    console.log('Selected well options.', wellOptions[i]);
                    wells.push(wellOptions[i].textContent);
                    //FIXME: Options are getting selected more than once when I only click once
                }
            }
        }

        //updating array for well data
        if (event.target.name === 'newWells') {
            const wellOptions = event.target.options;
            for (let i = 0; i < wellOptions.length; i++) {
                if (wellOptions[i].selected) {
                    console.log('Selected well options.', wellOptions[i]);
                    newWells.push(wellOptions[i].textContent);
                    //FIXME: Options are getting selected more than once when I only click once
                }
            }
        }

    }

    register = (event) => {
        event.preventDefault();
        const {
            compoundID,
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
        existingWells = wells;
        //resetting the form fields need to do this manually because I am preventing default submit
        wells = [];
        this.setState(() => {
            return {
                compoundID: '',
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
            transferFrom
        } = this.state;

        //dynamically adding well data to the wells dropdown
        const wellItems = this.state.wellData;
        //console.log('Well Data: ', wellItems);
        const wellIds = wellItems.map(well => {
            return (
                <option key={well} value={well}>{well}</option>
            );
        });

    
        console.log('Existing Wells', existingWells);
        const existingWellItems = existingWells.map(item => {
            return (
                <option key={item} value={item}>{item}</option>
            );
        });

        //TODO: Figure out how to use existing well array to populate the existing wells dropdwon
        console.log('Making sure state is updated correctly', this.state);

        return (
            <div className="register-compound-container">
                <h4>Register a Compound</h4>
                <div className="register-compound-modal">
                    <form id="register-compound-form" className="register-compound-form">
                        <input 
                            id="compoundID"
                            name="compoundID"
                            type="text"
                            placeholder="Compound ID..."
                            onChange={this.change}
                            value={compoundID}
                        />
                        <label id="wells"> 
                            Wells:
                            <select 
                                name="wells"
                                multiple 
                                onChange={this.change}
                                value={wells}>
                                {wellIds}
                            </select>
                        </label>
                        <button onClick={this.register} className="register">Register</button>
                    </form>
                </div>
                <h4>Transfer Well Contents</h4>
                <div className="transfer-compound-modal">
                    <form id="transfer-compound-form" className="transfer-compound-form">
                        <label id="existingWells"> 
                            Existing Wells:
                            <select 
                                name="existingWells"
                                onChange={this.change}
                                value={transferFrom}>
                                {existingWellItems}
                            </select>
                        </label>
                        <label id="newWells"> 
                            Transfer to:
                            <select 
                                name="newWells"
                                multiple 
                                onChange={this.change}
                                value={newWells}>
                                {wellIds}
                            </select>
                        </label>
                        <button onClick={this.transfer} className="transfer">Transfer</button>
                    </form>
                </div>
                <h4>Retrieve Well Contents</h4>
            </div>
        );
    }
}

export default RegisterCompound;