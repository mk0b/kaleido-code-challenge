import React, { Component } from 'react';

//stateful component that manages compound and well data.

import GridDisplay from './GridDisplay';

class RegisterCompound extends Component {

    //convert this to stateful? 
    //Consider using contextAPI
    //add onchange to track form input
    //add value to inputs

    constructor(props) {
        //binding this keyword to this class
        super(props);
        //setting state to manage compound and well data
        this.state = {

        }
    }

    render() {
        return (
            <div className="register-compound-container">
                <button>New Compound</button>
                <div className="register-compound-modal">
                    <form>
                        <input 
                            id="plateID"
                            name="plateID"
                            type="text"
                            placeholder="Plate"
                        />
                        <input 
                            id="compoundID"
                            name="compoundID"
                            type="text"
                            placeholder="Compound ID"
                        />
                        <input 
                            id="well"
                            name="well"
                            type="text"
                            placeholder="Well"
                        />
                        <button>Cancel</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterCompound;