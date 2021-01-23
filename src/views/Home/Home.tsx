import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/img/logo.png'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import { Link } from 'react-router-dom';
import { Card, Button } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'
import Balances from './components/Balances'
import Logo from '../../assets/img/img.png'
import catHeart from '../../images/catHeart.gif'


const Home: React.FC = () => {
  return (
    <div className="mainCard">
  
    <Card className="card">
    <div className="catImg">
      <img src={catHeart} alt="cat doing math" height="100" width="100" />
    </div>

        <Balances />
        <div className="menuBtn"><Button><Link to={"/farms"} style={{ color: 'lime' }} >🔪 See the Menu</Link></Button></div>
     </Card>
     
      
   
    
       
        
   
    
    </div>
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
