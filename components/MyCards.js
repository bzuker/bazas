import { Menu, Image } from "semantic-ui-react";

const Card = ({ card, onClick }) => (
  <Menu.Item onClick={onClick}>
    <Image src={card ? `/${card.key}.png`: "backside.jpg"} size="tiny" />
  </Menu.Item>
);


export default ({ cards, player, playCard }) => (
  <Menu fixed='bottom' widths={8}>
    {cards.map((x, i) => (
      <Card key={i} card={x} onClick={() => playCard(player.id, x)} />
    ))}
  </Menu>
);
