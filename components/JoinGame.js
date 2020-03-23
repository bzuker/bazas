import { useState } from 'react';
import { Header, Form, Input, Icon, Button } from "semantic-ui-react";
import Link from "next/link";

function JoinGame() {
  const [gameId, setGameId] = useState('');

  const handleJoinGame = () => {
    console.log('gameid', gameId);
  }
  return (
    <>
      <Header icon textAlign="center">
        <Icon name="user plus" />
        Ingresar a un juego
      </Header>
      <Form>
        <Form.Field>
          <label>Id del juego</label>
          <Input placeholder="Id del juego (ej: gd34j17)" onChange={(evt, {value}) => setGameId(value)} />
        </Form.Field>
        <Link href="/game/[game_id]" as={`/game/${gameId}`}>
          <Button color="blue" onClick={handleJoinGame}>
            Ingresar
          </Button>
        </Link>
      </Form>
    </>
  );
} 

export default JoinGame;
