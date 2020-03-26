import {Image, Grid, Segment} from 'semantic-ui-react';

function Triumph({ card, cardsNumber, requested }) {
  const addedRequests = requested.reduce((prev, curr) => prev + curr.bazas, 0);
  return (
    <Grid centered>
      <Image src={`/${card.key}.png`} size='tiny' style={{ marginBottom: '2em', width: '9em' }} />
      <Segment textAlign='left' compact>
        <div>Cartas: {cardsNumber}</div>
        <div>Pedidas: {addedRequests}</div>
        <div>Hay {Math.abs(cardsNumber - addedRequests)} de {cardsNumber - addedRequests > 0 ? 'menos' : 'más'}</div>
      </Segment>
    </Grid>
  )
}

export default Triumph;