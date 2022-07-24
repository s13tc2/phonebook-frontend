import React from 'react'
import Person from './Person'

const Persons = ({ persons, toggleFunction }) => {
    return (
        <ul>
            {persons.map(person => 
                <Person key={person.id} person={person} toggleFunction={() => toggleFunction(person.id)}/>
            )}
        </ul>
    )
}


export default Persons