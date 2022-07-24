import React from 'react'

const NameField = ({value, onChange}) => {
    return (
        <input value={value} onChange={onChange}></input>
    )
}

const NumberField = ({ value, onChange }) => {
    return (
        <input value={value} onChange={onChange}></input>
    )
}

const Button = ({ text }) => {
    return (
        <button type="submit">{text}</button>
    )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                <NameField value={newName} onChange={handleNameChange} />
                <br />
                <NumberField value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <Button text='add' />
            </div>
        </form>
    )
}

export default PersonForm