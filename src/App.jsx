import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './services/anecdotes';
import { notifyWithTimeout, useNotificationDispatch } from './services/NotificationContext';

const App = () => {

  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: updatedAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote));
    },
  });

  const handleVote = anecdote => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    notifyWithTimeout(dispatch, `Voted for ${anecdote.content}`);
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
