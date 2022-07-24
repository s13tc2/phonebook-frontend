import React from 'react'

const Person = ({ person, toggleFunction }) => {
    return (
        <li className='person'>
            <p>{person.name} {person.number}</p>
            <button onClick={toggleFunction}>delete</button>
        </li>
    )
}

export default Person