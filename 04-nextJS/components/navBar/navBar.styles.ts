import styled from '@emotion/styled';
import {boxShadow , mainColor} from '../../styles/variables'

export const Nav = styled.nav`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 10px;
  box-shadow: ${boxShadow},
  rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  
  .link{
    text-decoration: none;
  }
  
  img {
    max-width: 100px;
    margin-bottom: 5px;
  }

  & a {
    font-weight: 600;
    font-size: 18px;
  }

  .active {
    color: tomato;
  }

  & div {
    display: flex;
    gap: 10px;
  }


`

