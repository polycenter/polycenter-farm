import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import metamaskLogo from '../../assets/img/metamask-fox.svg'
import walletConnectLogo from '../../assets/img/wallet-connect.svg'

import Button from '../Button'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import Spacer from '../Spacer'

import WalletCard from './components/WalletCard'

const WalletProviderModal: React.FC = () => {
  const { account, connect } = useWallet()

  return (
    <>
      <StyledWalletsWrapper>
        <StyledWalletCard>
          <WalletCard
            icon={<img src={metamaskLogo} style={{ height: 32 }} />}
            onConnect={() => connect('injected')}
            title="Metamask"
          />
        </StyledWalletCard>
        <Spacer size="sm" />
        <StyledWalletCard>
          <WalletCard
            icon={<img src={walletConnectLogo} style={{ height: 24 }} />}
            onConnect={() => connect('walletconnect')}
            title="WalletConnect"
          />
        </StyledWalletCard>
      </StyledWalletsWrapper>
    </>
  )
}

const StyledWalletsWrapper = styled.div`
display: flex;
flex-direction: row;
  flex-wrap: wrap;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    flex-wrap: none;
  }
`

const StyledWalletCard = styled.div`
  flex-basis: calc(45% - ${(props) => props.theme.spacing[2]}px);
`

export default WalletProviderModal
