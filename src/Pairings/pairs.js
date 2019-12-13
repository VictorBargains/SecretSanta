import React, { Component } from 'react';
import SecretSantaContext from '../SecretSantaContext';

function shuffle(userList){
    let poolOfNames = [];
    while (userList.length !== 0) {
        let randomIndex;
        randomIndex = Math.floor(Math.random() * userList.length);
        poolOfNames.push(userList[randomIndex]);
        userList.splice(randomIndex, 1);
    }
    return poolOfNames;
}

const pairWithRight = (right) => (leftItem, i) => {
    let rightItem = right[i];
    let leftUser = poolOfNames
        .find(user => leftItem.id === user.id)
    let rightUser = poolOfNames
        .find(user => rightItem.id === user.id)

    leftUser.pairName = rightUser.id;
    rightUser.pairName = leftUser.id;  
};

class Pairs extends Component {

    static defaultProps = {
        users: []
    }

    static contextType = SecretSantaContext;

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submited')
    }

    render() {

        const { users } = this.context;
        let userList = users.map(obj => {
            let newObject = {};

            Object.keys(obj).forEach(properyKey => {
                newObject[properyKey] = obj[properyKey]
            });

            return newObject;
        })
        userList.map(obj => obj.pairName = "")
        
        // shuffle enough times to ensure randomness
        let poolOfNames = shuffle(userList);
        // ^^^ hide all complexity in there, whether 1 or 7 or 20 shuffle loops

        // split once
        let left = poolOfNames.slice(0, poolOfNames.length / 2);
        let right = poolOfNames.slice(Math.ceil(poolOfNames.length / 2))

        // pair once 
        left.forEach(pairWithRight(right));

        console.log(left);
        console.log(right);
        console.log(poolOfNames);

        return (
            <section>
                {poolOfNames.map((user) => (
                    <li key={user.id}>{user.name} has: <span>{user.pairName}</span></li>
                ))}


                <button type="submit" onClick={(e) => this.handleSubmit(e)}>Submit</button>
            </section>
        )
    }

}

export default Pairs;