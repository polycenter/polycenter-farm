import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card3'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useEarnings from '../../../hooks/useEarnings'
import useReward from '../../../hooks/useReward'
import { getBalanceNumber } from '../../../utils/formatBalance'
import cat from '../../../assets/img/CAT.png'

interface HarvestProps {
  pid: number
}

const Harvest: React.FC<HarvestProps> = ({ pid }) => {
  const earnings = useEarnings(pid)
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useReward(pid)

  return (
    <Card >
      <CardContent >
        <StyledCardContentInner style={{color: 'rgb(15, 224, 15)' }}>
          <StyledCardHeader style={{color: 'rgb(15, 224, 15)' }}>
            <CardIcon >🐋</CardIcon>
            <Value value={getBalanceNumber(earnings)} />
            <Label text="POLYC Earned" />
          </StyledCardHeader>
          <StyledCardActions 
            style={{color: 'rgb(15, 224, 15)' }}>
            <button type="button"
              style={{ fontSize: '16px' }}
              className="btn-link"
              disabled={!earnings.toNumber() || pendingTx}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
            >
              {pendingTx ? 'Collecting YFUR' : 'Harvest'}
            </button>
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  color: rgb(15, 224, 15);
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
color: rgb(15, 224, 15);
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledSpacer = styled.div`
color: rgb(15, 224, 15);
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
color: rgb(15, 224, 15);
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Harvest
