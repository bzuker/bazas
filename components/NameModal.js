import {useState} from 'react';
import { Modal, Header, Form, Button } from "semantic-ui-react";

export default ({ open, handleSubmit }) => {
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');
  return (
    <Modal open={open} size='small'>
      <Modal.Content>
        <Header icon='user' content='Tu nombre' />
        <Form onSubmit={() => handleSubmit(name, pwd)}>
          <Form.Input label='Nombre' placeholder='Nombre' onChange={e => setName(e.target.value.trim())} value={name} />
          <Form.Input
            label='Contraseña'
            placeholder='Contraseña'
            onChange={e => setPwd(e.target.value.trim())}
            value={pwd}
            onKeyPress={e => e.key === 'Enter' && handleSubmit(name, pwd)}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' inverted onClick={() => handleSubmit(name, pwd)}>
          Jugar!
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
