import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdotes';
import { notifyWithTimeout, useNotificationDispatch } from '../services/NotificationContext';

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    },
    onError: error => {
      notifyWithTimeout(dispatch, `Error: ${error.response.data.error}`, false, 8000);
    },
  });


  const onCreate = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 });
    notifyWithTimeout(dispatch, `Created: ${content}`);
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
