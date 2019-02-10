import React from 'react';
import ReactDOM from 'react-dom';
import Timestamp from 'react-timestamp'
import axios from 'axios'

import List from './components/List'
import RadioButton from './components/RadioButton'
import Input from './components/Input'
import ShowForm from './components/ShowForm'

class App extends React.Component{
  constructor() {
    super()
    this.state={
      observation: [],
    newSpecies: "",
    newNotes: "",
    newRarity: "common",
    sortkey: "timestamp"
    }
  }
  componentDidMount() {
    axios
      .get('http://localhost:3001/observation')
      .then(response => {
        this.setState({observation: response.data})
      })
  }

  addObservation=(event)=> {
    event.preventDefault()
    const newObservation={
      species:this.state.newSpecies,
      notes: this.state.newNotes,
      rarity: this.state.newRarity,
      timestamp:Date.now()
    }
    axios
      .post('http://localhost:3001/observation', newObservation)
      .then(response => {
        this.setState({
          observation:this.state.observation.concat(response.data),
          newSpecies: "",
          newNotes: "",
          newRarity: "common"
        })
      })
  }
  obsName=(event)=> {
    event.preventDefault()
    this.setState({[event.target.name]:event.target.value})
  }
  changeSelection=(event)=> {
    this.setState({newRarity:event.target.value})
  }
  resetFields=(event)=> {
    event.preventDefault()
    this.setState({
      newSpecies: "",
      newNotes: "",
      newRarity: "common"
    })
  }

  render() {
    return (
      <div className="container">
        <h2>Bird observations</h2>
        <ShowForm buttonlabel="new observation">
          <form onSubmit={this.addObservation}>
            <Input name="newSpecies" onChange={this.obsName} value={this.state.newSpecies} FieldLabel="Species" />
            <RadioButton selection={this.changeSelection} value="common" checked={this.state.newRarity ==='common'} />
            <RadioButton selection={this.changeSelection} value="rare" checked={this.state.newRarity ==='rare'} />
            <RadioButton selection={this.changeSelection} value="extremely rare" checked={this.state.newRarity ==='extremely rare'} />
            <Input name="newNotes" onChange={this.obsName} value={this.state.newNotes} FieldLabel="Notes" />
            <button type="submit">save</button>
            <button name="reset" onClick={this.resetFields}>cancel</button>
          </form>
        </ShowForm>
        <List observations={this.state.observation}/>
      </div>
    )
  }
}
export default App
