import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => <div className="r-card">
  <StyledCard>{children}</StyledCard>
</div>

const StyledCard = styled.div`
  background: ${(props) => props.theme.color.grey[1000]};
  box-shadow: inset 1px 1px 0px ${(props) => props.theme.color.grey[100]};
  display: flex;
  flex: 1;
  padding: 6px 24px;
  flex-direction: column;
  border-radius: 80px;
`;

export default Card
