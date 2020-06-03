import React from 'react';
import countries from "../../../assets/data/Dropdowns/countries.json";
import states from "../../../assets/data/Dropdowns/states.json";

class FormModel extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let arr = this.props.data;
    let formfields = [];
    const mystyle = {
      margin: 10
    };
    Object.keys(arr).map((field, index) => {
      let fieldData = arr[field];
      /*if (fieldData.type != "button") {
        formfields.push(<label style={mystyle}>{fieldData.label}</label>);
      }*/
      switch (fieldData.type) {
        case('text'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth}>
              <label htmlFor={fieldData.name}>{fieldData.label}</label>
              <input className="form-control"
                     type={fieldData.type}
                     required={fieldData.required}
                     id={fieldData.name}
                     name={fieldData.name}
                     ref={fieldData.name}
                     onChange={this.props.changed}
                     defaultValue={fieldData.value}/>
            </div>
          );
          break;
        case('textarea'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth}>
              <label htmlFor={fieldData.name}>{fieldData.label}</label>
              <textarea className="form-control"
                        defaultValue={fieldData.value}
                        required={fieldData.required}
                        id={fieldData.name}
                        name={fieldData.name}
                        ref={fieldData.name}
                        onChange={this.props.changed}/>
            </div>
          );
          break;
        case('radiogroup'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth}>
              <label className="d-block mb-3">{fieldData.label}</label>
              {
                Object.values(fieldData.values).map((value, _index) => {
                  var ids = fieldData.name + _index;
                  let val = fieldData.value;
                  let checkFlag = false;
                  if (val && val === fieldData.values[index]) {
                    checkFlag = true;
                  }
                  return (
                    <div className="form-check form-check-inline">
                      <input className="form-check-input"
                             type="radio"
                             onChange={this.props.changed}
                             defaultValue={value}
                             name={fieldData.name}
                             id={ids}
                             ref={fieldData.name}
                             defaultChecked={checkFlag}/>
                      <label className="form-check-label"
                             for={ids}>
                        {value}
                      </label>
                    </div>
                  )
                })
              }
            </div>
          );
          break;
        case('select'):
          var link = fieldData.link;
          var options = [];
          if (link == "countries") {
            countries.countries.map((cntry, key) => {
              let country = countries.countries[key];
              if (typeof country.isSelected != 'undefined' && country.isSelected != null) {
                options.push(<option value={country.abbreviation}
                                     selected>{country.country}</option>);
              } else if (typeof country.available != 'undefined' && country.available != null) {
                options.push(<option value={country.abbreviation}>{country.country}</option>);
              } else {
                options.push(<option value={country.abbreviation}
                                     disabled>{country.country}</option>);
              }

            })
          } else if (link == "states") {
            let statesList = states.US;
            statesList.map((stateKey, key) => {
              let state = statesList[key];
              options.push(<option value={state.value}>{state.label}</option>);
            });
          } else if (link == "self") {
            var optList = fieldData.options;
            optList.map((optIndex, key) => {
              let opt = optList[key];
              options.push(<option value={opt.value}>{opt.label}</option>);
            });
          }
          if (typeof fieldData.dependent != 'undefined' && fieldData.dependent) {
            formfields.push(
              <div className={'form-group ' + fieldData.colWidth}>
                <label htmlFor={fieldData.name}>{fieldData.label}</label>
                <select ref={fieldData.name}
                        id={fieldData.name}
                        onChange={this.props.changed}
                        className="form-control">
                  {this.props.stateOptions}
                </select>
              </div>
            );
          } else {
            formfields.push(
              <div className={'form-group ' + fieldData.colWidth}>
                <label htmlFor={fieldData.name}>{fieldData.label}</label>
                <select ref={fieldData.name}
                        className="form-control"
                        id={fieldData.name}
                        onChange={this.props.changed}
                        style={mystyle}>
                  {options}
                </select>
              </div>
            );
          }

          break;
        case('button'):
          if (fieldData.name == "searchBtn") {
            formfields.push(
              <div className={'my-auto ' + fieldData.colWidth}>
                <button onClick={this.props.searchHandler}
                        className="btn btn-primary mt-2"
                        id={fieldData.name}
                        type={fieldData.type}>
                  {fieldData.label}
                </button>
              </div>
            );
          } else {
            formfields.push(
              <div className={'my-auto ' + fieldData.colWidth}>
                <button onClick={fieldData.clicked}
                        className="btn btn-primary mt-2"
                        id={fieldData.name}
                        type={fieldData.type}>
                  {fieldData.label}
                </button>
              </div>
            );
          }

          break;
        default:
          formfields.push(<br/>);
      }
    });

    return (
      <div className="form-row mb-5">
        {formfields}
      </div>
    );
  }
}

export default FormModel;