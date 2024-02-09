import "../App.css";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Icon, Button } from "semantic-ui-react";
const ButtonWrapper = styled.div`
  padding: 2.15rem;
`;
const ImageWrapper = styled.div`
  width: 100%;
  padding: 37.5px;
`;
const ContentWrapper = styled.div`
  padding: 37.5px;
  color: #fff;
`;
const MoreContentWrapper = styled.div`
  margin-top: 4rem;
`;
const Image = styled.img`
  width: 100%;
`;

const BoldP = styled.p`
  font-family: "Nunito Sans", sans-serif;
  font-weight: 600;
`;
const LightSpan = styled.span`
  font-family: "Nunito Sans", sans-serif;
  font-weight: 300;
`;
const BordersWrapper = styled.div`
  margin-top: 3rem;
`;
const BorderStatesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const SingleState = styled.p`
  width: 100%;
`;
export default function SingleCountry() {
  const { name } = useParams();
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => await fetch("./data.json").then((res) => res.json()),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const countryName = name.toLowerCase();
  const filteredData = data.filter((country) =>
    country.name.toLowerCase().includes(countryName)
  );

  const handleBackButtonClick = () => {
    navigate("/");
  };

  return (
    <>
      <ButtonWrapper>
        <Button onClick={handleBackButtonClick} icon>
          <Icon name="arrow left" />
          <span style={{ marginLeft: "1rem" }}>Go Back</span>
        </Button>
      </ButtonWrapper>
      <ImageWrapper>
        <Image
          src={filteredData[0].flags.svg}
          alt={`${filteredData[0].name} flag`}
        />
      </ImageWrapper>
      <ContentWrapper>
        {filteredData.map((country) => (
          <div key={country.name}>
            <h2>{country.name}</h2>
            <p>
              {" "}
              <BoldP>
                Native Name: <LightSpan>{country.name}</LightSpan>
              </BoldP>
            </p>
            <p>
              {" "}
              <BoldP>
                Population:{" "}
                <LightSpan>{country.population.toLocaleString()}</LightSpan>
              </BoldP>
            </p>
            <p>
              {" "}
              <BoldP>
                Region: <LightSpan>{country.region}</LightSpan>
              </BoldP>
            </p>
            <p>
              {" "}
              <BoldP>
                Sub Region: <LightSpan>{country.subregion}</LightSpan>
              </BoldP>
            </p>
            <p>
              {" "}
              <BoldP>
                Capital: <LightSpan>{country.capital}</LightSpan>
              </BoldP>
            </p>
            <MoreContentWrapper>
              <div>
                <BoldP>
                  Top Level Domain:{" "}
                  <LightSpan>{country.topLevelDomain}</LightSpan>
                </BoldP>
              </div>
              <div>
                <BoldP>
                  Currencies:{" "}
                  <LightSpan>
                    {country.currencies.map((currency) => (
                      <span key={currency.code}>{currency.name}</span>
                    ))}
                  </LightSpan>
                </BoldP>
              </div>
              <div>
                <BoldP>
                  Languages:{" "}
                  <LightSpan>
                    {country.languages.map((language, index) => (
                      <span key={language.code}>
                        {language.name}
                        {index < country.languages.length - 1 && ", "}
                      </span>
                    ))}
                  </LightSpan>
                </BoldP>
              </div>
            </MoreContentWrapper>
            <BordersWrapper>
              <h3>Border Countries:</h3>
              {country.borders && country.borders.length > 0 ? (
                <BorderStatesWrapper>
                  {country.borders.map((border, index) => (
                    <SingleState key={index}>{border}</SingleState>
                  ))}
                </BorderStatesWrapper>
              ) : (
                <SingleState>None</SingleState>
              )}
            </BordersWrapper>
          </div>
        ))}
      </ContentWrapper>
    </>
  );
}
