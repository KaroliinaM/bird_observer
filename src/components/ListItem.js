import React from 'react';


class ListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      showAll:false
    }
  }
  options={year:"numeric", month:"numeric", day:"numeric", hour:"numeric", minute:"numeric", second:"numeric" }
  timeformat=new Intl.DateTimeFormat("UTC", this.options)
  toggleNotes=()=> {
    this.setState({
      showAll:!this.state.showAll
    })
  }
  render() {
    const notesField=this.state.showAll? this.props.item.notes : this.props.item.notes.substr(0, 10).concat("...")
    return (
      <tr key={this.props.item._id}><td>{this.props.item.species}</td><td>{this.props.item.rarity}</td><td> {this.timeformat.format(this.props.item.timestamp)}</td><td><div onClick={this.toggleNotes}>{notesField}</div></td></tr>
    )
  }
}
export default ListItem
