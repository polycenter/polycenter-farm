import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => <div className="r-card2">
  <div className="border-dotted">
    <div className="border">
      <StyledCard>{children}</StyledCard>
    </div>
  </div>
</div>

const StyledCard = styled.div`
  background: ${(props) => props.theme.color.grey[1000]};
  display: flex;
  flex: 1;
  padding: 6px 24px;
  height: 100%;
  flex-direction: column;
`;

export default Card
