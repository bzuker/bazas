import {useState} from 'react';
import { Header, Form, Icon, Button } from "semantic-ui-react";
import axios from 'axios';

const startingAt = Array.from({ length: 8 }, (v, i) => i + 1).map(x => ({ key: x, text: `${x} ${x === 1 ? 'carta' : 'cartas'}`, value: x }));
const endingAt = Array.from({ length: 8 }, (v, i) => i + 1).map(x => ({ key: x, text: `${x} ${x === 1 ? 'carta' : 'cartas'}`, value: x }));
function CreateGame() {
  const [loading, setIsLoading] = useState(false);
  const [startWith, setStartWith] = useState(3);
  const [endWith, setEndWith] = useState(8);
  const [gameId, setGameId] = useState(null);
  const [selectStartingPlayer, setSelectStartingPlayer] = useState(false);
  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await axios.post(`${process.env.SERVER_URL}/create`, { startWith, endWith, selectStartingPlayer });
    setIsLoading(false);
    setGameId(response.data.id);
  };
  return (
    <>
      <Header icon textAlign='center'>
        <Icon name='plus' />
        Crear nuevo juego
      </Header>
      <Form>
        <Form.Dropdown
          label='Empezando con'
          options={startingAt}
          value={startWith}
          inline
          onChange={(evt, { value }) => setStartWith(value)}
        />
        <Form.Dropdown
          label='Terminando con'
          options={endingAt}
          value={endWith}
          inline
          onChange={(evt, { value }) => setEndWith(value)}
        />
        <Form.Checkbox
          label='Elegir jugador inicial'
          checked={selectStartingPlayer}
          onChange={() => setSelectStartingPlayer(!selectStartingPlayer )}
        />
        <Button color='blue' onClick={handleSubmit} loading={loading}>
          Crear
        </Button>
      </Form>
      {gameId && <Form.Input value={gameId} readOnly style={{ marginTop: '2em' }} />}
    </>
  );
}

export default CreateGame;
