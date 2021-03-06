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
      term: '',
      filter: 'all',
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
    this.setState(({ data }) => {
      const index = data.findIndex((item) => item.id === id);
      const old = data[index];
      const newItem = { ...old, like: !old.like };

      const newArr = [
        ...data.slice(0, index),
        newItem,
        ...data.slice(index + 1),
      ];

      return { data: newArr };
    });
  };
  onToggleImportant = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((item) => item.id === id);
      const old = data[index];
      const newItem = { ...old, important: !old.important };

      const newArr = [
        ...data.slice(0, index),
        newItem,
        ...data.slice(index + 1),
      ];

      return { data: newArr };
    });
  };

  searchPost = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => item.label.indexOf(term) > -1);
  };

  filterPost = (items, filter) => {
    if (filter === 'like') {
      return items.filter((item) => item.like);
    } else {
      return items;
    }
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };
  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { data, term, filter } = this.state;

    const liked = data.filter((item) => item.like).length;
    const allPosts = data.length;

    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

    return (
      <AppBlock>
        <AppHeader liked={liked} allPosts={allPosts} />
        <div className='search-panel d-flex'>
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}
          />
        </div>
        <PostList
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleLiked={this.onToggleLiked}
          onToggleImportant={this.onToggleImportant}
        />
        <PostAddForm onAdd={this.addItem} />
      </AppBlock>
    );
  }
}
