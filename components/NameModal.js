import {useState} from 'react';
import { Modal, Header, Form, Button } from "semantic-ui-react";

export default ({ open, handleSubmit }) => {
  const [name, setName] = useState(null);
  return (
  <Modal open={open} size="small">
    <Modal.Content>
      <Header icon="user" content="Tu nombre" />
      <Form onSubmit={() => handleSubmit(name)}>
        <Form.Input
          label="Nombre"
          placeholder="Nombre"
          onChange={e => setName(e.target.value.trim())}
        />
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button color="green" inverted onClick={() => handleSubmit(name)}>
        Jugar!
      </Button>
    </Modal.Actions>
  </Modal>
);
}
