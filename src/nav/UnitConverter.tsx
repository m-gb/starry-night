import React, { Component } from 'react';

interface UnitConverterProps {
  convertUnit: (newUnit: string) => void,
  unit: string
}

class UnitConverter extends Component<UnitConverterProps, {}> {
  handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const newUnit: string = e.currentTarget.innerText;
    this.props.convertUnit(newUnit);
  }

  render() {
    return (
      <div className="border border-info mx-2 rounded">
        <button className={`btn text-light ${this.props.unit == 'C' ? "btn-info" : ""}`} onClick={this.handleClick}>C</button>
        <button className={`btn text-light ${this.props.unit == 'F' ? "btn-info" : ""}`} onClick={this.handleClick}>F</button>
      </div>
    );
  }
}

export default UnitConverter;
