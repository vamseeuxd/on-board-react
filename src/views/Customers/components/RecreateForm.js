import React from 'react';
import FormModel from './FormModel';

class RecreateForm extends React.Component {
  constructor(props) {
    super(props);   
  }

  render() {
    let arr = this.props.data;
    let formfield = [];
    let uniqueId = this.props.uniqueId;   

    Object.keys(arr).map((line, index) => {
      let lineData = arr[index].fields;
      formfield.push(<FormModel data={lineData} 
                     uniqueId = {uniqueId}
                     changed={this.props.changed} 
                     stateOptions={this.props.stateOptions}/>);
    });
    
    return (
      <div>
          {formfield}
          <button onClick={this.props.remove} style={{margin:10}} type="button" >Remove</button>
      </div>
    );
  }
}
export default RecreateForm;