import BigNumber from 'bignumber.js'
import React, { useContext, useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes, ThemeContext } from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from '../../../components/Button'
import { Card } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'
import { Link } from 'react-router-dom'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { Farm } from '../../../contexts/Farms'
import useAllStakedValue, {
  StakedValue,
} from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useSushi from '../../../hooks/useSushi'
import { getEarned, getMasterChefContract } from '../../../sushi/utils'
import { bnToDec } from '../../../utils'
import { divide } from 'numeral'
import NightModeContext from '../../../contexts/NightModeContext'

interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber
}

const FarmCards: React.FC = () => {
  const [farms] = useFarms()
  const { account } = useWallet()
  const stakedValue = useAllStakedValue()

  const sushiIndex = farms.findIndex(
    ({ tokenSymbol }) => tokenSymbol === 'SUSHI',
  )

  console.log(stakedValue)

  const sushiPrice =
    sushiIndex >= 0 && stakedValue[sushiIndex]
      ? stakedValue[sushiIndex].tokenPriceInWeth
      : new BigNumber(0)

  const BLOCKS_PER_YEAR = new BigNumber(2336000)
  const SUSHI_PER_BLOCK = new BigNumber(100)

  const rows = farms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm, i) => {
      const farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        apy: stakedValue[i]
          ? sushiPrice
              .times(SUSHI_PER_BLOCK)
              .times(BLOCKS_PER_YEAR)
              .times(stakedValue[i].poolWeight)
              .div(stakedValue[i].totalWethValue)
          : null,
      }
      const newFarmRows = [...farmRows]
      if (newFarmRows[newFarmRows.length - 1].length === 3) {
        newFarmRows.push([farmWithStakedValue])
      } else {
        newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
      }
      return newFarmRows
    },
    [[]],
  )

  return (
    <div className="grid grid-cols-3 gap-8 mt-12">
      {!!rows[0].length ? (
        rows.map((farmRow, i) =>
          farmRow.map((farm, j) => <FarmCard farm={farm} />),
        )
      ) : (
        <StyledLoadingWrapper>
          <Loader text="Cooking the rice ..." />
        </StyledLoadingWrapper>
      )}
    </div>
  )
}

interface FarmCardProps {
  farm: FarmWithStakedValue
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const { isNight }: any = useContext(NightModeContext)

  const [startTime, setStartTime] = useState(0)
  const [harvestable, setHarvestable] = useState(0)

  const { account } = useWallet()
  const { lpTokenAddress } = farm
  const sushi = useSushi()

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  useEffect(() => {
    async function fetchEarned() {
      if (sushi) return
      const earned = await getEarned(
        getMasterChefContract(sushi),
        lpTokenAddress,
        account,
      )
      setHarvestable(bnToDec(earned))
    }
    if (sushi && account) {
      fetchEarned()
    }
  }, [sushi, lpTokenAddress, account, setHarvestable])

  const poolActive = true // startTime * 1000 - Date.now() <= 0

  return (
    <div
      className={`border shadow-lg p-6 rounded-lg space-y-6  ${
        isNight ? 'text-white' : 'text-black'
      }`}
    >
      <div className="space-y-4">
        <div className="flex flex-1 items-center justify-center mx-auto text-center">
          {farm.icon}
        </div>
        <StyledTitle>{farm.name}</StyledTitle>
      </div>
      <div className="text-center font-medium text-xs flex flex-row space-x-2">
        <p>Deposit {farm.lpToken}</p>
        <p>&rarr;</p>
        <p>Earn {farm.earnToken.toUpperCase()}</p>
      </div>

      <div>
        <Link to={`/farms/${farm.id}`}>
          <button
            className="block p-2 border-white shadow rounded-lg w-full font-medium text-lg"
            disabled={!poolActive}
          >
            {!poolActive && (
              <Countdown
                date={new Date(startTime * 1000)}
                renderer={renderer}
              />
            )}
            {poolActive && 'Select'}
          </button>
        </Link>
      </div>

      <div className={`grid grid-cols-3 gap-2`}>
        <div className="rounded border p-1">
          <p className="text-xs">APY</p>
          <p>
            {farm.apy
              ? `${farm.apy
                  .times(new BigNumber(100))
                  .times(new BigNumber(3))
                  .toNumber()
                  .toLocaleString('en-US')
                  .slice(0, -1)}%`
              : 'Loading ...'}
          </p>
        </div>
        <div className="rounded border p-1">
          <p className="text-xs">{farm.tokenSymbol}</p>

          <p>
            {farm.tokenAmount
              ? (farm.tokenAmount.toNumber() || 0).toLocaleString('en-US')
              : '-'}{' '}
          </p>
        </div>
        <div className="rounded border p-1">
          <p className="text-xs">BNB</p>

          <p>
            {farm.wethAmount
              ? (farm.wethAmount.toNumber() || 0).toLocaleString('en-US')
              : '-'}{' '}
          </p>
        </div>
      </div>
    </div>
  )
  // return (
  // <div>
  //   {farm.tokenSymbol === 'DAI' && <StyledCardAccent />}
  //   <Card className="farmCards">
  //     <CardContent>
  //       <StyledContent>
  //         <CardIcon>{farm.icon}</CardIcon>
  //         <StyledTitle>{farm.name}</StyledTitle>
  //         <StyledDetails>
  //           <StyledDetail>Deposit {farm.lpToken}</StyledDetail>
  //           <StyledDetail>Earn {farm.earnToken.toUpperCase()}</StyledDetail>
  //         </StyledDetails>
  //         <Spacer />
  //         <button
  //           className="p-2 border-white shadow rounded-lg w-full font-medium text-lg"
  //           disabled={!poolActive}
  //         >
  //           {!poolActive && (
  //             <Countdown
  //               date={new Date(startTime * 1000)}
  //               renderer={renderer}
  //             />
  //           )}
  //           {poolActive && 'Select'}
  //         </button>
  //         <StyledInsight>
  //           <StyledInsight
  //             className="apy"
  //             style={{ color: 'lightpurple', marginBottom: '10%' }}
  //           >
  //             APY
  //             {farm.apy
  //               ? `${farm.apy
  //                   .times(new BigNumber(100))
  //                   .times(new BigNumber(3))
  //                   .toNumber()
  //                   .toLocaleString('en-US')
  //                   .slice(0, -1)}%`
  //               : 'Loading ...'}
  //           </StyledInsight>
  //           <StyledInsight style={{ marginBottom: '10%' }}>
  //             {farm.tokenAmount
  //               ? (farm.tokenAmount.toNumber() || 0).toLocaleString('en-US')
  //               : '-'}{' '}
  //             {farm.tokenSymbol}
  //           </StyledInsight>
  //           <StyledInsight style={{ marginBottom: '10%' }}>
  //             {farm.wethAmount
  //               ? (farm.wethAmount.toNumber() || 0).toLocaleString('en-US')
  //               : '-'}{' '}
  //             ETH
  //           </StyledInsight>
  //         </StyledInsight>
  //       </StyledContent>
  //     </CardContent>
  //   </Card>
  // </div>
  // )
}

const RainbowLight = keyframes`

	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  width: 900px;
  margin-bottom: 80px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  animation: color-change 7s infinite;
  color: lime;
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
  text-align: center;

  @keyframes color-change {
    14% {
      color: rgb(37, 150, 150);
    }
    28% {
      color: rgb(224, 18, 196);
    }
    42% {
      color: rgb(190, 0, 0);
    }
    56% {
      color: rgba(0, 255, 0, 0.39);
    }
    70% {
      color: rgba(0, 0, 255, 0.589);
    }
    84% {
      color: indigo;
    }
    100% {
      color: rgba(238, 130, 238, 0.521);
    }
  }
`

const StyledContent = styled.div`
  color: lime;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: lime;
  text-align: center;
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fffdfa;
  color: lime;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  border: 1px solid #e6dcd5;
  text-align: center;
  padding: 0 12px;
  background-color: transparent;
`

export default FarmCards
