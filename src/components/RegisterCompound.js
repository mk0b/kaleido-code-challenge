import React, { Component } from 'react';

//stateful component that manages compound and well data.

//import GridDisplay from './GridDisplay';

//TODO: Clean up console.logs

//initializing this outside of the stateful component because I want to be able to add each compound to the array without it getting re-written
let compounds = [];

class RegisterCompound extends Component {

    //TODO: Make wells simplier? Just have A1 etc options instead of connecting them to plate. Already choosing a plate and storing.
    constructor(props) {
        //binding this keyword to this class
        super(props);
        //setting state to manage compound, well, and plate data
        this.state = {
            compoundID: '',
            plate: '',
            wells: '',
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

        this.setState(() => {
            return {
                [name]: value,
            }
        });
    }

    submit = (event) => {
        event.preventDefault();
        const {
            compoundID,
            plate,
            wells
        } = this.state;

        const newCompound = {
            compoundID,
            plate,
            wells
        }
        console.log('New Compound: ', newCompound)

        //adding to temp array
        compounds.push(newCompound);
        console.log('Temporary Compound Array', compounds);
        
        //adding the newCompound object to the compounds array.
        this.setState(() => {
            return {
                compounds
            }
        });
        console.log('What is in state: ', this.state);
    }

    render() {
        const {
            compoundID,
            plate,
            wells
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
                    <form>
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