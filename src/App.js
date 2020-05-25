import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories',
    {
      url: "https://github.com/marlonchallouts/conceitos-reactjs",
      title: `Repository ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"]
    })

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`, id);
    
    if (response.status === 204) {
      const repository = repositories.filter(repo => repo.id !== id);
      setRepositories(repository);
    }

  }

  return (
    <>
      <Header title="Repositórios">
        <ul data-testid="repository-list">
          {repositories.map((repo) => (
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
            </li>
          ))}
        </ul>
      </Header>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
