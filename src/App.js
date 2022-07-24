import { useState, useEffect } from 'react'
import Persons from './component/Persons'
import Header from './component/Header'
import PersonForm from './component/PersonForm'
import Filter from './component/Filter'
import personService from './services/persons'
import Notification from './component/Notification'
import AddNotification from './component/AddNotification'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('new name')
  const [newNumber, setNewNumber] = useState('new number')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  const hook = () => {
    personService
      .getAll()
      .then(personInfo => {
        console.log('promise fulfilled')
        setPersons(personInfo)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.filter((p) => p.name === newName)
    const personToAdd = person[0]
    const updatedPerson = { ...personToAdd, number: newNumber }

    if (person.length !== 0) {
      if (window.confirm(`${personToAdd.name} is already added to the phonebook, replace the old number with the new one?`)) {
        personService.update(updatedPerson.id, updatedPerson).then(returnedPerson => {
          console.log(`${returnedPerson.name} successfully updated`)

          setPersons(persons.map(p => p.id !== personToAdd.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(
            `${updatedPerson.name} was successfully updated`
          )
        })
        .catch((error) => {
          console.log(error)
          setPersons(persons.filter(p => p.id !== updatedPerson.id))
          setNewName('')
          setNewNumber('')
          setMessage(`[ERROR] ${updatedPerson.name} was already deleted from server`)
        })
      } 
    }

    if (person.length === 0) {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
  
      personService
        .create(nameObject)
        .then(returnedInfo => {
          console.log(returnedInfo)
          setPersons(persons.concat(returnedInfo))
          setNewName('')
          setNewNumber('')
          setMessage(
            `${newName} was successfully added`
          )
        }) 
        .catch(error => {
          setMessage(
            `[ERROR] ${error.response.data.error}`
          )
          console.log(error.response.data)
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    const regex = new RegExp(newFilter, 'i')
    const filteredPersons = () => persons.filter(person => person.name.match(regex))
    setPersons(filteredPersons)
  }

  const toggleDelete = (id) => {
    const filteredPerson = persons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id

    if (window.confirm(`Delete ${personName}`)) {
      personService
        .remove(id)
      console.log(`${personName} successfully deleted`)
      setMessage(
        `${personName} was successfully deleted`
      )
      setPersons(persons.filter(person => person.id !== personId))
    }
  }

  return (
    <div>
      <Header text='Phonebook' />
      {/* <Notification message={errorMessage} /> */}
      <AddNotification message={message} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Header text='Numbers' />
      <Persons persons={persons} toggleFunction={toggleDelete}/>
    </div>
  )
}

export default App