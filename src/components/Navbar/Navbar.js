import React, { useContext, Component } from "react";

/* import Context from "../../Context/ReactContext"; */


//temp
import { useWallet } from 'use-wallet'

//style
import "./NavbarStyle.scss";



//logo
import logophoto from "../../images/logophoto.png";

//react router dom
import { BrowserRouter as Router, Link } from "react-router-dom";
/* import MetaMaskButton from "../MetaMaskButton/MetaMaskButton"; */
//
const Navbar = (props) => {
  const { isNight, setNight } = props;
  /*  var { maskProvider, maskAccount, maskName, parent } = props; */

  /* var myContext = useContext(Context); */
  const { account, reset } = useWallet()





  return (




    <nav style={{
      zIndex: '9999',
      boxShadow: isNight ? '-1px 13px 11px -12px rgba(87, 101, 116,0.4)' : '-1px 13px 11px -12px rgba(54, 54, 54, 0.4)'
    }}>
      <div className="contain">

        <img src={logophoto} alt="logo" />
        <div className="" style={{ marginLeft: "auto" }}></div>
        <nav-links>
          <ul>
            {/*   {myContext.maskAccount && (
              <> */}
            <li>
              <a href="https://fur.finance/">HOME</a>
            </li>
            <li>
              <a href="https://fur.finance/about">ABOUT</a>
            </li>
            <li>
              <a href="https://fur.finance/chart">PRICE</a>
            </li>
            <li>
              <a href="https://fur.finance/team">TEAM</a>
            </li>

            <li>
              <a
                className="tradeBTN"
                target="_blank"
                rel="noopener noreferrer"
                href="https://app.uniswap.org/#/swap?outputCurrency=0xffb0b6b3845c79c4d1fb54552ac6f5fef96c18fd"
              >
                TRADE
              </a>
            </li>
            <li>
              <a className="stakeBTN" href="https://fur.finance/stake">
                STAKE
              </a>
            </li>
            <li>
              <a className="stakeBTN" href="https://app.fur.finance">
                FARM
              </a>
            </li>
            <li className="onoffswitch">


              <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" onChange={e => setNight(!isNight)} id="myonoffswitch" />
              <label className="onoffswitch-label" htmlFor="myonoffswitch">
                <span className="onoffswitch-inner"></span>
                <span className="onoffswitch-switch"></span>
              </label>
            </li>

            <ul><label className="account-address">{account}</label></ul>







            {/* </>
            )}
            <li>
              <MetaMaskButton />
            </li> */}
          </ul>
        </nav-links>
      </div>
    </nav>
  );
};

export default Navbar;
