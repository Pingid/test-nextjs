import styled from "styled-components"

export const StyledAnchor = styled.a`
  color: inherit;
  text-decoration: inherit; /* no underline */
  cursor: pointer;
`
export const PrimaryAnchor = styled(StyledAnchor)`
  &:hover {
    text-decoration: underline;
  }
`
