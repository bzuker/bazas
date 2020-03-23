import { Modal, Header, Table, Button } from 'semantic-ui-react';

export default ({ scores }) => {
  return !!scores && (
    <Modal open={true} size='small'>
      <Modal.Content>
        <Header icon='check' content='Terminó el juego!' />
        <Table basic='very' celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nombre</Table.HeaderCell>
              <Table.HeaderCell>Puntos</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {scores.map(player => (
              <Table.Row key={player.id}>
                <Table.Cell>
                  <Header as='h4'>
                    <Header.Content>
                      {player.name}
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{player.score}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color='green'
          inverted
          onClick={() => alert('Todavía no está listo, creá otro juego para volver a empezar')}
        >
          Empezar de nuevo
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
