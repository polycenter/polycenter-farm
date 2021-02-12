import React, { useContext, Component } from "react";
 
/* import Context from "../../Context/ReactContext"; */
import catlogo from "../../images/cat.gif";
 
//temp
// import { useWallet } from 'use-wallet'
import { Switch } from 'ui-neumorphism';
import 'ui-neumorphism/dist/index.css'
//style
import "./NavbarStyle.scss";
 
 
 
//logo
import logophoto from "../../images/logophoto.png";
 
//react router dom
import { BrowserRouter as Router, Link } from "react-router-dom";
/* import MetaMaskButton from "../MetaMaskButton/MetaMaskButton"; */
//
export const Navbar = (props) => {
  /*  var { maskProvider, maskAccount, maskName, parent } = props; */
 
  /* var myContext = useContext(Context); */
  // const { account, reset } = useWallet()
 
  // dark-mode
  const { isNight, setNight } = props;

 
  return (
 
    <nav>
    <div class="nav-wrapper position-relative">
      <div className="dark-mode__toggle">
        <div
          onClick={e => setNight(!isNight)}
          className={isNight ? "toggle toggled" : "toggle"}
        />
      </div>
 
      <nav-links style={{textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
        <ul>
 
          <li>
            <a style={{color: "rgb(15, 224, 15)"}} href={"https://fur.finance"}>HELLO</a>
          </li>
 
 
 
 
          <li>
            <a
              style={{color: "rgb(15, 224, 15)"}}
              target="_blank"
              rel="noopener noreferrer"
              href={`https://app.uniswap.org/#/swap?outputCurrency=0xffb0b6b3845c79c4d1fb54552ac6f5fef96c18fd`}
            >
              TRADE
            </a>
          </li>
          <li>
              <a style={{color: "rgb(15, 224, 15)"}} href={"https://fur.finance/stake"}>VAULT</a>
          </li>
          <li>
            <a style={{color: "rgb(15, 224, 15)"}} className="stakeBTN" href="https://app.fur.finance">
              FARMS
            </a>
          </li>
          <li>
            <Link style={{color: "rgb(15, 224, 15)"}} className="stakeBTN" to="">
            GROUP-FI
            </Link>
          </li>
 
          {/* </>
          )}
          <li>
            <MetaMaskButton />
          </li> */}
        </ul>
      </nav-links>
    </div>
    {/* <ul><label className="account-address">{account}</label></ul> */}
  </nav>
 
 
 
 
  );
};
