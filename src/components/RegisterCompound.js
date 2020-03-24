import React, { Component } from 'react';

//stateful component that manages compound and well data.

//import GridDisplay from './GridDisplay';

//TODO: Clean up console.logs

class RegisterCompound extends Component {

    //convert this to stateful? 
    //Consider using contextAPI
    //add onchange to track form input
    //add value to inputs

    //Now I am thinking an array of objects each object is a compound id and an array of wells A1 example of a well
    //create arrays for plate well combos then add an if statement on the dropdown depending on what plate was selected and show the well options for that plate

    constructor(props) {
        //binding this keyword to this class
        super(props);
        //setting state to manage compound and well data
        this.state = {
            compounds: [
                {
                    compoundID: '',
                    plate: '',
                    wells: []
                }

            ],
            plateData: [
                {
                    plateID: 'P-12345',
                    wells: [
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
                    ]
                },
                {
                    plateID: 'P-1',
                    wells: [
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
                    ]
                },
                {
                    plateID: 'P-2',
                    wells: [
                        'P-2.A1',
                        'P-2.A2',
                        'P-2.A3',
                        'P-2.A4',
                        'P-2.B1',
                        'P-2.B2',
                        'P-2.B3',
                        'P-2.B4',
                        'P-2.C1',
                        'P-2.C2',
                        'P-2.C3',
                        'P-2.C4',
                    ]
                },
            ]
        }
    }

    change = (event) => {
        const name = event.target.name;
        console.log('Field Name: ', name);
        const value = event.target.value;
        console.log('Field Value: ', value);

        this.setState(() => {
            return {
                compounds: [
                    {
                        [name]: value,
                    }
                ]
            }
        });
    }

    render() {
        const {
            compoundID,
        } = this.state.compounds;


        //dynamically adding plate data to the plates dropdown
        const plates = this.state.plateData;
        console.log('Plate Data:', plates);
        const platesIds = plates.map(plate => {
            console.log(plate.plateID);
            return (
                <option key={plate.plateID} value={plate.plateID}>{plate.plateID}</option>
            );
        });
        console.log('plate Ids', typeof platesIds, platesIds);

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
                                onChange={this.change}>
                                {platesIds}
                            </select>
                        </label>
                        <label id="wells"> 
                            Wells:
                            <select 
                                name="wells" 
                                onChange={this.change}>
                                <option value="P-12345.A1">P-12345.A1</option>
                                <option value="P-12345.A2">P-12345.A2</option>
                                <option value="P-12345.A3">P-12345.A3</option>
                                <option value="P-12345.A4">P-12345.A4</option>
                                <option value="P-12345.A5">P-12345.A5</option>
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