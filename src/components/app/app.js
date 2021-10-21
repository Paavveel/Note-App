import React from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import './app.css';
import styled from 'styled-components';

const AppBlock = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { label: 'Going to learn React', important: true, id: 'qwer' },
        { label: 'That is good', important: false, id: 'asdf' },
        { label: 'I need a break...', important: false, id: 'zxcv' },
      ],
    };
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((item) => item.id === id);

      const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

      return { data: newArr };
    });
  };
  addItem = (body) => {
    this.setState(({ data }) => {
      const newItem = {
        label: body,
        import: false,
        id: this.maxId++,
      };

      const newArr = [...data, newItem];

      return { data: newArr };
    });
  };

  render() {
    return (
      <AppBlock>
        <AppHeader />
        <div className='search-panel d-flex'>
          <SearchPanel />
          <PostStatusFilter />
        </div>
        <PostList posts={this.state.data} onDelete={this.deleteItem} />
        <PostAddForm onAdd={this.addItem} />
      </AppBlock>
    );
  }
}
