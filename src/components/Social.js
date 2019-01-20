import React from 'react'
import styled from 'styled-components'
import Ionicon from 'react-ionicons'

const Wrapper = styled.section`
  margin: 1rem auto 0;
  @media screen and (min-width: 52rem) {
    margin: 0;
  }
`
const SocialIcon = styled.div`
  display: inline-block;
  padding: 0 0.5rem;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
`

const Social = props => {
  return (
    <Wrapper>
      <SocialIcon>
        <a href="https://github.com/iammatthias/" alt="github">
          <Ionicon className="icon" fontSize="1.5em" icon="logo-github" />
        </a>
      </SocialIcon>
      <SocialIcon>
        <a href="https://instagram.com/iammatthias/" alt="instagram">
          <Ionicon className="icon" fontSize="1.5em" icon="logo-instagram" />
        </a>
      </SocialIcon>
      <SocialIcon>
        <a href="https://twitter.com/iamMatthias" alt="twitter">
          <Ionicon className="icon" fontSize="1.5em" icon="logo-twitter" />
        </a>
      </SocialIcon>
      <SocialIcon>
        <a href="https://www.linkedin.com/in/iammatthias/" alt="linkedin">
          <Ionicon className="icon" fontSize="1.5em" icon="logo-linkedin" />
        </a>
      </SocialIcon>
      <SocialIcon>
        <a href="https://www.facebook.com/iammatthias" alt="facebook">
          <Ionicon className="icon" fontSize="1.5em" icon="logo-facebook" />
        </a>
      </SocialIcon>
    </Wrapper>
  )
}

export default Social
