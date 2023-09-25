import "./style.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { BsArrowLeft, BsArrowReturnLeft } from "react-icons/bs";

export default function CountryPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("./data.json")
      .then((res) => setData(res.data))
      .catch((e) => {
        alert("An error has occurred!", e);
      });
  }, []);
  const { country } = useParams();
  const countryData = data.find((c) => c.name.toLowerCase() === country);

  if (!countryData) {
    return <div>Country not found</div>;
  }

  return (
    <div className="single-country">
      <div className="content">
        <Button href="/" className="back-button">
          <BsArrowLeft />{" "}
        </Button>
        <img src={countryData.flag} alt="flag" className="flag-big" />
        <div className="country-info">
          <h1>{countryData.name}</h1>

          <span className="info-span">
            Native Name:
            <span className="info-other"> {countryData.nativeName}</span>
          </span>
          <br />
          <span className="info-span">
            Population:
            <span className="info-other">
              {" "}
              {countryData.population.toLocaleString()}
            </span>
          </span>
          <br />
          <span className="info-span">
            Region:<span className="info-other"> {countryData.region}</span>
          </span>
          <br />
          <span className="info-span">
            Sub Region:
            <span className="info-other"> {countryData.subregion}</span>
          </span>
          <br />
          <span className="info-span">
            Capital:<span className="info-other"> {countryData.capital}</span>
          </span>
          <br />
          <span className="info-span">
            Top Level Domain:
            <span className="info-other"> {countryData.topLevelDomain}</span>
          </span>
          <br />
          <div>
            {countryData.currencies.map((currency) => (
              <span key={currency.code}>
                {" "}
                <span className="info-span">Currencies :</span> {currency.name}{" "}
                ({currency.code})
              </span>
            ))}
          </div>
          <div>
            <span className="info-span">Languages: </span>
            {countryData.languages.map((langauge) => (
              <span key={langauge.language}>
                {","}
                {langauge.name}{" "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
