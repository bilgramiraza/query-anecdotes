import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import axios from 'axios';

const App = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
    retry: false,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = result.data;

  if (result.isError) return <div>Anecdotes not available due to Server Issues</div>;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {
        result.isLoading ?
          <div>Loading Data...</div> :
          anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>)
      }
    </div>
  )
}

export default App
