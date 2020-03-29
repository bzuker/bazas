import { Message, Transition } from 'semantic-ui-react';

function Toast({ message }) {
  if (!message) return null;
  return (
    <Transition visible={!!message} animation='scale' duration='500' mountOnShow transitionOnMount>
      <Message 
      header={message}
      compact 
      negative 
      size='small'
      style={{
        position: 'fixed',
        zIndex: 1000,
        right: '1em',
        top: '1em'
      }}
      />
    </Transition>
  )
}

export default Toast;