import React, { Component } from 'react';

//stateful component that manages compound and well data.

//import GridDisplay from './GridDisplay';

//TODO: Clean up console.logs

//initializing these outside of the stateful component because I want to be able to add each compound/wells to the array without it getting re-written
let compounds = [];
let wells = [];

class RegisterCompound extends Component {
    constructor(props) {
        //binding this keyword to this class
        super(props);
        //setting state to manage compound, well, and plate data
        this.state = {
            compoundID: '',
            plate: '',
            plateData: [
                'P-12345',
                'P-1',
                'P-2',
            ],
            wellData: [
                'A1',
                'A2',
                'A3',
                'A4',
                'B1',
                'B2',
                'B3',
                'B4',
                'C1',
                'C2',
                'C3',
                'C4',
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
                    wells.push(wellOptions[i].value);
                    //FIXME: Options are getting selected more than once when I only click once
                } else {
                    //resetting wells array if no options are selected
                    //wells = [];
                }
            }
        }
        

    }

    submit = (event) => {
        event.preventDefault();
        const {
            compoundID,
            plate,
        } = this.state;

        const newCompound = {
            compoundID,
            plate,
            wells
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

        //resetting the form fields need to do this manually because I am preventing default submit
        wells = [];
        this.setState(() => {
            return {
                compoundID: '',
                plate: '',
            }
        });
    }

    render() {
        const {
            compoundID,
            plate,
        } = this.state;


        //dynamically adding plate data to the plates dropdown
        const plates = this.state.plateData;
        //console.log('Plate Data:', plates);
        const platesIds = plates.map(plate => {
            //console.log(plate);
            return (
                <option key={plate} value={plate}>{plate}</option>
            );
        });
        //console.log('plate Ids', typeof platesIds, platesIds);

        //dynamically adding well data to the wells dropdown
        const wellItems = this.state.wellData;
        //console.log('Well Data: ', wellItems);
        const wellIds = wellItems.map(well => {
            return (
                <option key={well} value={well}>{well}</option>
            );
        });

        console.log('Making sure state is updated correctly', this.state);

        return (
            <div className="register-compound-container">
                <button>New Compound</button>
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
                        <label id="plate">
                            Plate:
                            <select 
                                name="plate"
                                onChange={this.change}
                                value={plate}>
                                {platesIds}
                            </select>
                        </label>
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
                        <button onClick={this.submit} className="register">Register</button>
                        <button className="cancel">Cancel</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterCompound;