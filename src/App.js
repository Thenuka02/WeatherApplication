import './App.css';
import { useState } from 'react';
import Searchbox from './components/UI/Searchbox';

const posts = [
    { id: '1', countryName: 'Sri Lanka', temperature: '28°C'},
    { id: '2', countryName: 'United Kingdom', temperature: '4°C'},
    { id: '3', countryName: 'United States', temperature: '8°C' },
    { id: '4', countryName: 'Australia',temperature: '21°C' },
];

const filterPosts = (posts, query) => {
    if (!query) {
        return posts;
    }

    return posts.filter((post) => {
        const postName = post.countryName.toLowerCase();
        return postName.includes(query);
        
    });
};

function App() {
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');
  const filteredPosts = filterPosts(posts, searchQuery);

  return (
    <div >
      <Searchbox 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ul>
        {filteredPosts.map((post) => (
          <ul key={post.id}>{post.countryName}, {post.temperature}</ul>
            ))}
      </ul>
    </div>
  );
}

export default App;
