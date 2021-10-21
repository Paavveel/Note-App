import React from 'react';
import PostListItem from '../post-list-item';
import './post-list.css';

const PostList = ({ posts }) => {
  const filteredPosts = posts.filter(
    (item) => typeof item === 'object' && isNotEmpty(item)
  );

  const elements = filteredPosts.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className='list-group-item'>
        <PostListItem {...itemProps} />
      </li>
    );
  });

  function isNotEmpty(obj) {
    for (let key in obj) {
      return true;
    }
    return false;
  }

  return <ul className='app-list list-group'>{elements}</ul>;
};

export default PostList;
