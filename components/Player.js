import { useState, useEffect } from 'react';
import { Card, List, Label, Image, Dropdown, Button, Transition } from 'semantic-ui-react';

export default ({ player, nextToPlay, requestBazas, doneRequesting, me, winner, cards, playedFirst }) => {
  const [bazas, setBazas] = useState(0);
  const [animateWinner, setAnimateWinner] = useState(false);
  const hasToPlay = me.id === player.id && nextToPlay === player.id;
  const options = Array.from({ length: cards + 1 }, (v, i) => i).map(x => ({ key: x, text: x, value: x }));
  const handleChange = (evt, { value }) => setBazas(value);
  const handleBazaRequest = () => {
    requestBazas(player.id, bazas);
  };

  useEffect(() => {
    setAnimateWinner(winner === player.id ? !animateWinner : animateWinner);
  }, [winner]);

  useEffect(() => {
    setBazas(0);
  }, [nextToPlay]);

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
            {nextToPlay !== player.id && playedFirst === player.id && (
              <Label basic color='orange' pointing='left'>
                Empezó
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
                      <Dropdown value={bazas} options={options} selection className='label' onChange={handleChange} />
                      <Button onClick={handleBazaRequest}>OK</Button>
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
        <Image src={player.playedCard ? `/${player.playedCard.key}.png` : '/backside.jpg'} size='tiny' />
      </Card>
    </Transition>
  );
};
