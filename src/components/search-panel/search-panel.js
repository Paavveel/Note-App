import React from 'react';
import './search-panel.css';

export default class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { turm: '' };
  }

  onUpdateSearch = (evt) => {
    const turm = evt.target.value;
    this.setState({ turm });
    this.props.onUpdateSearch(turm);
  };

  render() {
    return (
      <input
        className='form-control search-input'
        type='text'
        placeholder='Поиск по записям'
        onChange={this.onUpdateSearch}
      />
    );
  }
}
