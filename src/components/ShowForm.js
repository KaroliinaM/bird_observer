import React from 'react'

class ShowForm extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      visible:false
    }
  }
  toggleVisibility =()=> {
    this.setState({visible: !this.state.visible})
  }
  render() {
    const hideWhenVisible={ display: this.state.visible ? 'none' : ''}
    const showWhenVisible={ display: this.state.visible ? '' : 'none'}
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggleVisibility}>{this.props.buttonlabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>hide form</button>
        </div>
      </div>
    )
  }

}
export default ShowForm
