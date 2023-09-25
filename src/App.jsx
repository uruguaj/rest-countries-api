import "./App.css";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Select } from "antd";
import axios from "axios";
import { message } from "antd";

import { useNavigate, useSearchParams } from "react-router-dom";

function App() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useSearchParams({ search: "", region: "" });
  const search = filter.get("search");
  const region = filter.get("region");
  const [messageApi, contextHolder] = message.useMessage();
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Seems this country is not here :/",
    });
  };

  useEffect(() => {
    axios
      .get("./data.json")
      .then((res) => {
        let filteredData = res.data;

        if (search) {
          filteredData = filteredData.filter((country) =>
            country.name.toLowerCase().includes(search.toLowerCase()),
          );
          if (filteredData == "") {
            error();
            setFilter("");
          }
        }

        if (region && region !== "none") {
          filteredData = filteredData.filter(
            (country) => country.region.toLowerCase() === region.toLowerCase(),
          );
          if (filteredData == "") {
            error();
            setFilter("");
          }
        }

        setData(filteredData);
      })
      .catch((e) => {
        alert("An error has occurred!", e);
      });
  }, [search, region]);

  const options = [
    {
      value: "africa",
      label: "Africa",
    },
    {
      value: "americas",
      label: "America",
    },
    {
      value: "asia",
      label: "Asia",
    },
    {
      value: "europe",
      label: "Europe",
    },
    {
      value: "oceania",
      label: "Oceania",
    },
    {
      value: "none",
      label: "Without filter",
    },
  ];
  const handleFilter = (value) => {
    setFilter((prev) => {
      prev.set("region", value);
      return prev;
    });
  };
  const handleSearch = (form) => {
    setFilter((prev) => {
      prev.set("search", form.search);
      return prev;
    });
  };
  const navigate = useNavigate();

  return (
    <div className="body">
      {contextHolder}
      <Form form={form} onFinish={handleSearch}>
        <Form.Item name="search">
          <Input
            defaultValue={search}
            placeholder="Search For Your Country..."
            prefix={<BiSearchAlt style={{ color: "" }} />}
            rootClassName="input-search"
          />
        </Form.Item>
      </Form>
      <Select
        placeholder="Filter By Region"
        value={region || "none"}
        onChange={handleFilter}
        className="filter"
        options={options}
      />
      <div className="countries">
        {data.map((country) => (
          <div
            key={country.name}
            className="card"
            onClick={() => {
              navigate(country.name.toLowerCase());
            }}
          >
            <img
              src={country.flag}
              alt="flag"
              className="flag"
              loading="lazy"
            />
            <div className="info-div">
              <a href={country.name.toLowerCase()}>
                <h1 className="country-title">{country.name}</h1>
              </a>
              <span className="info-span">Population:</span>{" "}
              <span>{country.population.toLocaleString()}</span>
              <br />
              <span className="info-span">Region:</span>{" "}
              <span>{country.region}</span>
              <br />
              <span className="info-span">Capital:</span>{" "}
              <span>{country.capital}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
