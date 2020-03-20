import React from 'react';

const RegisterCompound = () => {

    //convert this to stateful? 
    //Consider using contextAPI
    //add onchange to track form input
    //add value to inputs

    return (
        <div className="register-compound-container">
            <button>New Compound</button>
            <div className="register-compound-modal">
                <form>
                    <input 
                        id="compoundName"
                        name="compoundName"
                        type="text"
                        placeholder="Compound Name"
                    />
                    <input />
                    <button>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterCompound;