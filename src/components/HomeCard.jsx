import styled from "styled-components";

const CardWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem;

  @media screen and (max-width: 600px) {
    padding: 0 10%;
  }
`;

const Card = styled.div`
  font-family: "Nunito Sans", sans-serif;
  border-radius: 0.36rem;
  color: hsl(0, 0%, 100%);
  background-color: hsl(209, 23%, 22%);
  width: 100%;
`;
const ImageWrapper = styled.div`
  object-fit: cover;
`;
const Image = styled.img`
  width: 100%;
  height: 50%;
  aspect-ratio: 16/10;
`;
const ContentWrapper = styled.div`
  padding: 1.5rem;
`;
const CountryName = styled.h3`
  margin-bottom: 1rem;
`;
const AdditionalInfo = styled.span`
  font-weight: 600;
`;
const StyledP = styled.p`
  margin: 0.25rem 0rem;
`;

export default function HomeCard(props) {
  return (
    <CardWrapper>
      <Card>
        <ImageWrapper>
          <Image src={props.country.flags.png} alt={props.country.name} />
        </ImageWrapper>
        <ContentWrapper>
          <CountryName>{props.country.name}</CountryName>
          <StyledP>
            <AdditionalInfo>Population</AdditionalInfo>:{" "}
            {props.country.population.toLocaleString()}
          </StyledP>
          <StyledP>
            <AdditionalInfo>Region</AdditionalInfo>: {props.country.region}
          </StyledP>
          <StyledP>
            <AdditionalInfo>Capital</AdditionalInfo>: {props.country.capital}
          </StyledP>
        </ContentWrapper>
      </Card>
    </CardWrapper>
  );
}
