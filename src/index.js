import React from 'react';
import ReactDOM from 'react-dom';
import Timestamp from 'react-timestamp'
import axios from 'axios'

const promise = axios.get('http://localhost:3001/observation')

promise.then(response => {
console.log(response)
})
class App extends React.Component{
  constructor() {
    super()
    this.state={
      observation: [],
    newSpecies: "",
    newNotes: "",
    newRarity: ""
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
    const observation=this.state.observation.concat({
      species:this.state.newSpecies,
      notes: this.state.newNotes,
      rarity: this.state.newRarity,
      timestamp:Date.now()
    })
    this.setState({
      observation:observation,
      newSpecies: "",
      newNotes: ""
    })
    console.log(this.state.observation)
  }
  obsName=(event)=> {
    event.preventDefault()
    console.log(event.target.value)
    this.setState({[event.target.name]:event.target.value})
    console.log(this.state.newRarity)
  }
  changeSelection=(event)=> {
    console.log(event.target.value)
    this.setState({newRarity:event.target.value})
    console.log(this.state.newRarity)
  }


  list=()=>this.state.observation.map(obs=> <li key={obs.species}>{obs.species} {obs.notes} {obs.rarity} {this.timeformat.format(obs.timestamp)}</li>)
  options={year:"numeric", month:"numeric", day:"numeric", hour:"numeric", minute:"numeric", second:"numeric" }
timeformat=new Intl.DateTimeFormat("UTC", this.options)

render() {
  return (
    <div>
      Hello World <br />
      {console.log(this.state.newRarity==="common")}
      <form onSubmit={this.addObservation}>
        <input name="newSpecies" onChange={this.obsName} value={this.state.newSpecies} /> <br/>
        <label>
        <input type="radio" name="newRarity" onChange={this.changeSelection} value="common" checked={this.state.newRarity === 'common'}/>
        Common
        </label>
        <label>
        <input type="radio" name="newRarity" onChange={this.changeSelection} value="rare" checked={this.state.newRarity === 'rare'}/>
        Rare
        </label>
        <label>
        <input type="radio" name="newRarity" onChange={this.changeSelection} value="extremely rare" checked={this.state.newRarity === 'extremely rare'}/>
        Extremely rare
        </label>
         <br/>
        <input name="newNotes" onChange={this.obsName} value={this.state.newNotes}/> <br/>
        <button type="submit">save</button>
      </form>
      {this.list()}
      <div>
      {console.log(this.timeformat.format(Date.now()))}
      </div>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
