import { Grid, Segment } from "semantic-ui-react";
import JoinGame from "../components/JoinGame";
import CreateGame from "../components/CreateGame";

export default () => (
  <Segment placeholder>
    <Grid columns={2} stackable divided>
      <Grid.Row verticalAlign="middle">
        <Grid.Column>
          <JoinGame />
        </Grid.Column>
        <Grid.Column>
          <CreateGame />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);
