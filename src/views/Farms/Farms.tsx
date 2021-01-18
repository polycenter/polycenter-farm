import React, { useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import logo from '../../assets/img/logo.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import Farm from '../Farm'

import FarmCards from './components/FarmCards'

const Farms: React.FC = () => {
  const [isClicked, setClicked] = useState(false);
  const { path } = useRouteMatch()
  const { account } = useWallet()
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={logo} height="120" />}
                subtitle="Earn YFUR tokens by staking FUR Liquidity Pool Tokens"
              />
              <FarmCards />
            </Route>
            <Route path={`${path}/:farmId`}>
              <Farm />
            </Route>
          </>
        ) : (
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              {isClicked &&
                <>

                  <h3>Select a wallet provider.</h3>
                    <WalletProviderModal />
                  <button type="button"
                    style={{ fontSize: '16px', width: '100%', marginTop: '30px', marginBottom:'30px' }}
                    className="btn-link" onClick={e => setClicked(false)}>
                    Cancel
           </button>
                </>}
              {!isClicked && <button type="button"
                style={{ fontSize: '16px' }}
                className="btn-link"
                onClick={e => {
                  setClicked(true);
                }}
              >🔓 Unlock Wallet</button>}
            </div>
          )}
      </Page>
    </Switch>
  )
}

export default Farms
