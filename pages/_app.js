import { Container } from "semantic-ui-react";
import "fomantic-ui-css/semantic.min.css";
import Router from 'next/router'
import * as gtag from '../lib/gtag'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

export default ({ Component, pageProps }) => (
  <Container style={{ marginTop: "3em" }}>
    <Component {...pageProps} />
  </Container>
);
