import React, {Component} from 'react';

class Profile extends Component {
    render() {
        const { 
            // allInterests,    // needed for autocomplete later
            userInterests,
            addUserInterest,
            removeUserInterest
        } = this.context;

        return (
            <section>
                <h1>Profile</h1>

                <form>
                    <label>Add Interests</label>
                    <input ref={(HTMLInputElement) => this.input = HTMLInputElement} />

                    <button onClick={() => addUserInterest(this.input.value)}>Add</button>
                </form>

                <h3>Interests</h3>
                <ul>
                    {userInterests.map( (interest, i) => (
                        <li key={`${interest}${i}`}>
                            {interest}
                            <a href="#" onClick={(e) => {  
                                e.preventDefault();
                                removeUserInterest(interest); 
                            } }><span className='fa fa-circle-x' title="Delete"></span></a>
                        </li>
                    ) )}
                </ul>

                <h3>Current Partner</h3>
                <a href="#">Partner's Name</a>

            </section>

        )
    }

}

export default Profile;