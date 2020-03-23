import { Container } from "semantic-ui-react";
import "fomantic-ui-css/semantic.min.css";

export default ({ Component, pageProps }) => (
  <Container style={{ marginTop: "3em" }}>
    <Component {...pageProps} />
  </Container>
);
