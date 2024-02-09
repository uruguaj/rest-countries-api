// css imports
import "semantic-ui-css/semantic.min.css";
import "./App.css";

// components import
import { Input, Dropdown } from "semantic-ui-react";
import HomeCard from "./components/HomeCard.jsx";

// utils import
import styled from "styled-components";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// styled components
const CardsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 3rem;
  height: auto;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 1500px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const BodyWrapper = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const InputWrapper = styled.div`
  width: 100%;
  padding: 1.25rem;
  margin: 2rem 0rem;
  @media screen and (min-width: 1024px) {
    display: flex;
    .ui.icon.input > input,
    .ui.large.input {
      width: 100% !important;
      margin-right: 1rem;
    }
  }
  @media screen and (max-width: 1024px) {
    .dropdown {
      margin-top: 1.25rem;
    }
  }
`;
const SingleCard = styled.div`
  cursor: pointer;
`;

function App() {
  //variables for filter
  const [filter, setFilter] = useState(null);
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  // data fetch
  const { isPending, error, data } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => await fetch("./data.json").then((res) => res.json()),
  });
  // fetch pending component, here to avoid importing same component twice
  if (isPending) {
    return (
      <BodyWrapper>
        <InputWrapper>
          <Input
            fluid
            size="large"
            icon={{
              name: "search",
              circular: true,
              link: true,
            }}
            iconPosition="left"
            placeholder="Loading..."
            disabled
          />
          <Dropdown
            clearable
            options={[]}
            selection
            placeholder="Loading..."
            disabled
          />
        </InputWrapper>
      </BodyWrapper>
    );
  }

  // fetch error
  if (error) return "An error has occurred: " + error.message;

  // handlers

  const handleRegionChange = (e, { value }) => {
    e.preventDefault();
    setFilter(value);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  // filters logic
  const regions = [...new Set(data.map((country) => country.region))];

  const options = regions.map((region, index) => ({
    key: index,
    text: region,
    value: region,
  }));

  const filteredData = data
    .filter((country) => {
      const countryName = country.name.toLowerCase();
      const searchText = inputText.toLowerCase();
      return countryName.includes(searchText);
    })
    .filter((country) => {
      if (filter) {
        return country.region === filter;
      }
      return true;
    });

  return (
    <>
      <BodyWrapper>
        <InputWrapper>
          <Input
            fluid
            size="large"
            icon={{
              name: "search",
              circular: true,
              link: true,
            }}
            iconPosition="left"
            placeholder="Search for a country..."
            value={inputText}
            onChange={handleInputChange}
          />
          <Dropdown
            clearable
            options={options}
            selection
            value={filter}
            onChange={handleRegionChange}
            placeholder="Filter by Region"
          />
        </InputWrapper>

        <CardsWrapper>
          {filteredData.map((country) => (
            <SingleCard
              key={country.name}
              className="c1"
              onClick={() => {
                navigate(`/${country.name}`);
              }}
            >
              <HomeCard key={country.name} country={country} />
            </SingleCard>
          ))}
        </CardsWrapper>
      </BodyWrapper>
    </>
  );
}

export default App;
