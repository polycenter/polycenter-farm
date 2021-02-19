import React, { useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import { Card } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'



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
              
              
              <FarmCards />
             
             
            </Route>
            <Route path={`${path}/:farmId`}>
              <Farm />
            </Route>
          </>
        ) : (
            <div
              style={{
                color: 'lime',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              {isClicked &&
                <>

                  <h3 style={{ color: 'lime' }}>Select a wallet provider.</h3>
                    <WalletProviderModal />
                  <button type="button"
                    style={{ fontSize: '16px', width: '100%', marginTop: '30px', marginBottom:'30px' }}
                    className="btn-link" onClick={e => setClicked(false)}>
                    Cancel
           </button>
                </>}
              {!isClicked && <button 
                style={{ fontSize: '16px' }}
                className="btn-link"
                onClick={e => {
                  setClicked(true);
                }}
              >🔓 Unlock Wallet </button>}
            </div>
          )}
      </Page>
    </Switch>
  )
}

export default Farms
