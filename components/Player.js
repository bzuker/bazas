import { useState, useEffect } from 'react';
import { Card, List, Label, Image, Dropdown, Button, Transition } from 'semantic-ui-react';

export default ({ player, nextToPlay, requestBazas, doneRequesting, me, winner, cards }) => {
  const [bazas, setBazas] = useState(0);
  const [animateWinner, setAnimateWinner] = useState(false)
  const handleChange = (evt, { value }) => setBazas(value);
  const hasToPlay = me.id === player.id && nextToPlay === player.id
  const options = Array.from({ length: cards + 1 }, (v, i) => i).map(x => ({key: x, text: x, value: x}))

  useEffect(() => {
    console.log('animate winner:', winner, winner === player.id ? !animateWinner : animateWinner)
    setAnimateWinner(winner === player.id ? !animateWinner : animateWinner);
  }, [winner]);

  return (
    <Transition animation='tada' duration={1000} visible={animateWinner} mountOnShow={false}>
      <Card>
        <Card.Content>
          <Card.Header>
            {player.name}
            {nextToPlay === player.id && (
              <Label basic color='violet' pointing='left'>
                Juega
              </Label>
            )}
          </Card.Header>
          <Card.Description>
            <List>
              <List.Item>
                Pedidas:{' '}
                {!doneRequesting && hasToPlay ? (
                  <>
                    <Button as='div' labelPosition='left'>
                      <Dropdown
                        defaultValue={options[0].value}
                        options={options}
                        selection
                        className='label'
                        onChange={handleChange}
                      />
                      <Button onClick={() => requestBazas(player.id, bazas)}>OK</Button>
                    </Button>
                  </>
                ) : (
                  player.requested || 0
                )}
              </List.Item>
              <List.Item content={`Ganadas: ${player.bazas || 0}`} />
            </List>
          </Card.Description>
          <Label attached='top right' color='blue'>
            {player.score}
          </Label>
        </Card.Content>
        <Image src={player.playedCard ? `https://deckofcardsapi.com/static/img/${player.playedCard.key}.png`: "/backside.jpg"} size='tiny' />
      </Card>
    </Transition>
  );
};
