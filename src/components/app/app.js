import React from 'react';
import styled from 'styled-components';
import nextId from 'react-id-generator';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import './app.css';

const AppBlock = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          label: 'Going to learn React',
          important: true,
          like: false,
          id: nextId(),
        },
        {
          label: 'That is good...',
          important: false,
          like: false,
          id: nextId(),
        },
        {
          label: 'I need a break...',
          important: false,
          like: false,
          id: nextId(),
        },
      ],
    };
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
        id: nextId(),
      };

      const newArr = [...data, newItem];

      return { data: newArr };
    });
  };

  onToggleLiked = (id) => {
    console.log(`Like ${id}`);
  };
  onToggleImportant = (id) => {
    console.log(`Important ${id}`);
  };

  render() {
    return (
      <AppBlock>
        <AppHeader />
        <div className='search-panel d-flex'>
          <SearchPanel />
          <PostStatusFilter />
        </div>
        <PostList
          posts={this.state.data}
          onDelete={this.deleteItem}
          onToggleLiked={this.onToggleLiked}
          onToggleImportant={this.onToggleImportant}
        />
        <PostAddForm onAdd={this.addItem} />
      </AppBlock>
    );
  }
}
