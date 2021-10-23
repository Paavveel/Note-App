import React from 'react';
import './post-add-form.css';

export default class PostAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  onValueChange = (evt) => {
    const text = evt.target.value;
    this.setState({ text });
  };
  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.onAdd(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    return (
      <form className='bottom-panel d-flex' onSubmit={this.onSubmit}>
        <input
          className='form-control new-post-label'
          type='text'
          placeholder='О чем вы думаете сейчас?'
          onChange={this.onValueChange}
          value={this.state.text}
        />
        <button className='btn btn-outline-secondary' type='submit'>
          Добавить
        </button>
      </form>
    );
  }
}
