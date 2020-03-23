import {useState} from 'react';
import { Header, Form, Icon, Button } from "semantic-ui-react";
import axios from 'axios';

const startingAt = [
  {
    key: "1",
    text: "1 carta",
    value: "1"
  },
  {
    key: "2",
    text: "2 cartas",
    value: "2"
  },
  {
    key: "3",
    text: "3 cartas",
    value: "3"
  },
  {
    key: "4",
    text: "4 cartas",
    value: "4"
  }
];

const endingAt = [
  {
    key: "6",
    text: "6 cartas",
    value: "6"
  },
  {
    key: "7",
    text: "7 cartas",
    value: "7"
  },
  {
    key: "8",
    text: "8 cartas",
    value: "8"
  }
];
function CreateGame() {
  const [loading, setIsLoading] = useState(false);
  const [startWith, setStartWith] = useState(startingAt[2].value);
  const [endWith, setEndWith] = useState(endingAt[2].value);
  const [gameId, setGameId] = useState(null);
  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await axios.post(`${process.env.SERVER_URL}/create`, { startWith, endWith });
    setIsLoading(false);
    setGameId(response.data.id);
  };
  return (
    <>
      <Header icon textAlign="center">
        <Icon name="plus" />
        Crear nuevo juego
      </Header>
      <Form>
        <Form.Dropdown
          label="Empezando con"
          options={startingAt}
          defaultValue={startWith}
          inline
          onChange={(evt, { value }) => setStartWith(value)}
        />
        <Form.Dropdown
          label="Terminando con"
          options={endingAt}
          defaultValue={endWith}
          inline
          onChange={(evt, { value }) => setEndWith(value)}
        />
        <Button color="blue" onClick={handleSubmit} loading={loading}>Crear</Button>
      </Form>
      {gameId && <Form.Input value={gameId} readOnly style={{marginTop: '2em'}} />}
    </>
  );
}

export default CreateGame;
