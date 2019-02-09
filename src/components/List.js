import React from 'react';
import { Table } from 'react-bootstrap'

import ListItem from './ListItem'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      sortvalue:"timestamp",
      inverse:false
    }
  }
  compare=(a, b)=> {
    if(typeof(a)==="string") {
      a=a.toLowerCase()
      b=b.toLowerCase()
    }
    if(a<b) return -1
    if(a>b) return 1
    else return 0
  }

  list=()=>{
    const retList=this.props.observations.sort((a, b) => this.compare(a[this.state.sortvalue],b[this.state.sortvalue])).map(obs=> <ListItem key={obs._id} item={obs} />)
    if(this.state.inverse) return retList.reverse()
    else return retList
  }

  sorting=(event)=> {
    if(this.state.sortvalue===event.target.id){
      this.setState({
        inverse:!this.state.inverse
      })
    } else {
      this.setState({
        sortvalue:event.target.id,
        inverse:false
      })
    }
  }
  render() {
    return(
      <div>
        <Table striped>
          <thead>
            <tr>
              <td onClick={this.sorting} id="species">Species</td>
              <td onClick={this.sorting} id="rarity">Rarity</td>
              <td onClick={this.sorting} id="timestamp">Seen on</td>
              <td onClick={this.sorting} id="notes">Notes</td>
            </tr>
          </thead>
          <tbody>
            {this.list()}
          </tbody>
        </Table>
      </div>
    )
  }
}
export default List
