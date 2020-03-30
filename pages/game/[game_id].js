import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Message, Icon, Button } from 'semantic-ui-react';
import useSocket from '../../hooks/useSocket';
import Player from '../../components/Player';
import MyCards from '../../components/MyCards';
import NameModal from '../../components/NameModal';
import Scoretable from '../../components/Scoretable';
import Triumph from '../../components/Triumph';
import StartGame from '../../components/StartGame';
import Toast from '../../components/Toast';

const getFirstPlayer = currentRound => {
  if (!currentRound || !currentRound.playedCards) {
    return null;
  }

  if (currentRound.playedCards.length > 0) {
    return currentRound.playedCards[0].playerId;
  }

  if (currentRound.winners.length > 0) {
    return currentRound.winners[currentRound.winners.length - 1]
  }

  return currentRound.firstToPlay;
};

function Game() {
  const router = useRouter();
  const { game_id: gameId } = router.query;
  const [players, setPlayers] = useState([]);
  const [me, setMe] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentRound, setCurrentRound] = useState({});
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [scoretable, setScoretable] = useState(null);
  const [selectStartingPlayer, setSelectStartingPlayer] = useState(null);
  const [invalidMessage, setInvalidMessage] = useState('');
  const [socket] = useSocket(`${process.env.SERVER_URL}/${gameId}`, { autoConnect: false });

  const handleSubmit = (name, pwd) => {
    // TODO: handle errors
    if (!name || !pwd) return;

    // TODO: check if I can join
    socket.emit('add player', name, pwd);
  };

  const startGame = (player) => {
    setShowMessage(false);
    socket.emit('start game', player);
  };

  const requestBazas = (playerId, bazas) => {
    socket.emit('request bazas', playerId, bazas);
  };

  const playCard = (playerId, card) => {
    if (!currentRound.doneRequestingBazas || currentRound.nextToPlay !== playerId) {
      setInvalidMessage('No podés tirar todavía');
      return;
    }

    socket.emit('play card', playerId, card);
  };

  useEffect(() => {
    const handleLogin = (player, roomInfo) => {
      setMe(player);
      setPlayers(roomInfo.players);
      setCurrentRound(roomInfo.currentRound);
      setSelectStartingPlayer(roomInfo.settings.selectStartingPlayer)
      setOpen(false);

      socket.io.opts.query = {
        id: player.id
      };
    };

    const handlePlayerJoin = player =>
      setPlayers(players => (players.find(x => x.id === player.id) ? players : [...players, player]));

    const handleNext = roomInfo => {
      setCurrentRound(roomInfo.currentRound);
      setPlayers(roomInfo.players);
    };

    const handleInvalid = message => {
      setInvalidMessage(message);
      setTimeout(() => setInvalidMessage(''), 3000);
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
    socket.on('game started', roomInfo => {
      console.log('game started', roomInfo);
      setCurrentRound(roomInfo.currentRound);
    });
    socket.on('game over', scoretable => setScoretable(scoretable));
    socket.on('invalid', handleInvalid);
    socket.on('not joined', () => alert('Ya empezó el juego, si ya estabas jugando poné bien tu nombre y contraseña'));

    socket.on('cards', cards => {
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
      <Toast message={invalidMessage} />
      {me && showMessage && !currentRound.started && (
        <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>
              Esperando jugadores...
              <StartGame players={players} selectStartingPlayer={selectStartingPlayer} startGame={startGame} />
            </Message.Header>
          </Message.Content>
        </Message>
      )}
      {me && (
        <>
          {currentRound.triumphCard && (
            <Triumph card={currentRound.triumphCard} cardsNumber={currentRound.cards} requested={currentRound.requestedBazas} />
          )}
          <Card.Group centered>
            {players.map(x => (
              <Player
                key={x.id}
                player={x}
                nextToPlay={currentRound.nextToPlay}
                playedFirst={getFirstPlayer(currentRound)}
                me={me}
                doneRequesting={currentRound.doneRequestingBazas}
                requestBazas={requestBazas}
                winner={currentRound.winner}
                cards={currentRound.cards}
              />
            ))}
          </Card.Group>
        </>
      )}
      {currentRound.started && <MyCards player={me} cards={cards} playCard={playCard} />}
    </>
  );
}

export async function getServerSideProps({ params }) {
  // Pass data to the page via props
  return { props: { gameId: params.game_id } };
}

export default Game;
