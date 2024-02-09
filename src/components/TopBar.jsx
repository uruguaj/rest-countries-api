import styled from "styled-components";
import { Icon } from "semantic-ui-react";

const TopBarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 5rem;
  padding: 2.25rem;
  color: #fff;
  font-family: "Nunito Sans", sans-serif;
  background-color: var(--background-dark-light);
  display: flex;
  align-items: center;
`;
const Title = styled.h1`
  cursor: pointer;
  padding: 0.15rem;
  margin-bottom: 0.098rem;
  font-size: 1rem;
`;
const ToggleButton = styled.p`
  position: absolute;
  cursor: pointer;
  right: 0;
  font-weight: 600;
  right: 1rem;
  font-size: 0.85rem;
`;
const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export default function TopBar() {
  return (
    <>
      <TopBarWrapper>
        <ContentWrapper>
          <Title
            onClick={() => {
              location.href = "/";
            }}
          >
            Where in the world?
          </Title>
          <ToggleButton>
            <Icon name="moon" />
          </ToggleButton>
        </ContentWrapper>
      </TopBarWrapper>
    </>
  );
}
