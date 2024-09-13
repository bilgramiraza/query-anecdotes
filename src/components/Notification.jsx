import { useNotificationValue } from "../services/NotificationContext"

const Notification = () => {
  const { message, status } = useNotificationValue();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    borderColor: status ? 'green' : 'red'
  }

  if (!message) return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
