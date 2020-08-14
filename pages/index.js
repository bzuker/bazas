import { Grid, Segment, Menu } from "semantic-ui-react";
import JoinGame from "../components/JoinGame";
import CreateGame from "../components/CreateGame";

export default () => (
  <>
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
  <Menu fixed='bottom' style={{padding: 10, alignItems: 'center'}}>
    <div>By <a style={{marginLeft: 2}}href='https://mobile.twitter.com/Brian_Zuker' target='_blank' rel='noopener'>@Brian_Zuker</a></div>
    <a style={{marginLeft: 'auto'}} href='https://cafecito.app/bzuker' rel='noopener' target='_blank'><img srcSet='https://cdn.cafecito.app/imgs/buttons/button_5.png 1x, https://cdn.cafecito.app/imgs/buttons/button_5_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_5_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_5.png' alt='Invitame un café en cafecito.app' /></a>
  </Menu>
  </>
);
