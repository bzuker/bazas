import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Card, Message, Icon, Button, Image } from 'semantic-ui-react';
import useSocket from '../../hooks/useSocket';
import Player from '../../components/Player';
import MyCards from '../../components/MyCards';
import NameModal from '../../components/NameModal';
import Scoretable from '../../components/Scoretable';

function Game() {
  const router = useRouter()
  const { game_id: gameId } = router.query
  const [players, setPlayers] = useState([]);
  const [me, setMe] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentRound, setCurrentRound] = useState({});
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [scoretable, setScoretable] = useState(null);
  const [socket] = useSocket(`${process.env.SERVER_URL}/${gameId}`, { autoConnect: false });

  const handleSubmit = (name) => {
    // TODO: handle errors
    if (!name) return;

    // TODO: check if I can join
    socket.emit('add player', name);
  };

  const startGame = () => {
    setShowMessage(false);
    socket.emit('start game');
  };

  const requestBazas = (playerId, bazas) => {
    socket.emit('request bazas', playerId, bazas);
  };

  const playCard = (playerId, card) => {
    if (!currentRound.doneRequestingBazas || currentRound.nextToPlay !== playerId) {
      // TODO: Show message?
      return;
    }

    socket.emit('play card', playerId, card);
  }

  useEffect(() => {
    const handleLogin = (player, roomInfo) => {
      setMe(player);
      setPlayers(roomInfo.players);
      setCurrentRound(roomInfo.currentRound);
      setOpen(false);

      socket.io.opts.query = {
        id: player.id
      };
    };

    const handlePlayerJoin = (player) =>
      setPlayers((players) => (players.find((x) => x.id === player.id) ? players : [...players, player]));

    const handleNext = (roomInfo) => {
      setCurrentRound(roomInfo.currentRound);
      setPlayers(roomInfo.players);
    };

    setOpen(true);
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected, trying to reconnect');
      socket.connect();
    });

    socket.on('join', handlePlayerJoin);
    socket.on('login', handleLogin);
    socket.on('next', handleNext);
    socket.on('game started', (roomInfo) => {
      console.log('game started', roomInfo);
      setCurrentRound(roomInfo.currentRound);
    });
    socket.on('game over', scoretable => setScoretable(scoretable));

    socket.on('cards', (cards) => {
      setCards(cards);
    });

    return () => {
      console.log('disconnecting');
      socket.disconnect();
    };
  }, [socket]);

  return (
    <>
      <Scoretable scores={scoretable} />
      <NameModal open={open} handleSubmit={handleSubmit} />
      {me && showMessage && !currentRound.started ? (
        <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>
              Esperando jugadores...
              <Button floated='right' primary onClick={startGame}>
                Empezar
              </Button>
            </Message.Header>
          </Message.Content>
        </Message>
      ) : null}
      {
        me &&
        <>
          {currentRound.triumphCard && <Image src={`/${currentRound.triumphCard.key}.png`} size='tiny' centered style={{marginBottom: '2em'}} />}
          <Card.Group centered>
          {
          players.map(x => ( 
            <Player 
              key={x.id} 
              player={x}
              nextToPlay={currentRound.nextToPlay}
              me={me} 
              doneRequesting={currentRound.doneRequestingBazas} 
              requestBazas={requestBazas}
              winner={currentRound.winner}
              cards={currentRound.cards}
            />
          ))}
          </Card.Group>
        </>
      }
      {currentRound.started && <MyCards player={me} cards={cards} playCard={playCard} />}
    </>
  );
}

export async function getServerSideProps({params}) {
  // Pass data to the page via props
  return { props: { gameId: params.game_id } }
}

export default Game;
