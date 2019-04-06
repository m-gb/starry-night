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
      <div className="unit-container">
        <span className={`unit-value ${this.props.unit == 'C' ? 'active' : ''}`} onClick={this.handleClick}>C</span>
        <span className={`unit-value ${this.props.unit == 'F' ? 'active' : ''}`} onClick={this.handleClick}>F</span>
      </div>
    );
  }
}

export default UnitConverter;
