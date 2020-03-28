import {useState} from 'react';
import {Button, Dropdown} from 'semantic-ui-react';

function StartGame({ selectStartingPlayer, players, startGame }) {
  const [startingPlayer, setStartingPlayer] = useState(null);
  console.log(startingPlayer);
  if (selectStartingPlayer) {
    const options = players.map(x => ({
      key: x.id,
      value: x.id,
      text: x.name
    }));

    return (
      <Button as='div' labelPosition='left' floated='right'>
        <Dropdown 
          options={options} 
          selection 
          className='label' 
          value={startingPlayer} 
          onChange={(evt, { value }) => setStartingPlayer(value)} 
        />
        <Button onClick={() => startGame(players.find(x => x.id === startingPlayer))}>Empezar</Button>
      </Button>
    )
  }
  
  return (
    <Button floated='right' primary onClick={() => startGame()}>
      Empezar
    </Button>
  );
}

export default StartGame;