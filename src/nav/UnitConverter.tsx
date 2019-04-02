import React, { Component } from 'react';

interface UnitConverterProps {
  convertUnit: (newUnit: string) => void,
  unit: string
}

class UnitConverter extends Component<UnitConverterProps, {}> {
  handleUnitConversion = (e: any) => {
    const newUnit = e.target.textContent;
    this.props.convertUnit(newUnit);
  }

  render() {
    return (
      <div className="unit-container">
        <span className={`unit-value ${this.props.unit === 'C' ? 'active-unit' : ''}`} onClick={this.handleUnitConversion}>C</span>
        <span className={`unit-value ${this.props.unit === 'F' ? 'active-unit' : ''}`} onClick={this.handleUnitConversion}>F</span>
      </div>
    );
}
}

export default UnitConverter;
