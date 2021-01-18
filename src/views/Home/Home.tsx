import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/img/logo.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import { Link } from 'react-router-dom';
import Balances from './components/Balances'
import Logo from '../../assets/img/img.png'

const Home: React.FC = () => {
  return (
    <Page>
      <img src={Logo} alt="Logo" className="img-logo" />
      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <StyledInfo>
        <p className="color">🏆<b>Pro Tip</b>: FUR-ETH LP token pool yields 4.8x more token
        rewards per block.</p>
      </StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Link to={"/farms"} className="btn-link">🔪 See the Menu</Link>
        <div style={{ marginBottom: '60px' }} />
      </div>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

export default Home
