import DataTable from "./components/DataTable";

// icons
import { CiSearch, CiHeart } from "react-icons/ci";

// material ui
import { Card, CardContent, Container, InputAdornment, TextField } from "@mui/material";

// import Hook
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useState } from "react";

const App = () => {
  const { data: rowData, error, isLoading } = useAxiosFetch("/pokemon.json");

    //Search by name & Search by threshold
    const [threshold, setThreshold] = useState('')
    const [search, setSearch] = useState('')


  const columns = [
    { header: "ID", key: "id" },
    { header: "Name", key: "name" },
    { header: "Type", key: "type" },
    { header: "Health", key: "hp" },
    { header: "Attack", key: "attack" },
    { header: "Defense", key: "defense" },
    { header: "Special Attack", key: "special_attack" },
    { header: "Special Defense", key: "special_defense" },
    { header: "Speed", key: "speed" },
    { header: "Power", key: "power" },
  ];

  const data = rowData.map((pokemon) => ({
    ...pokemon,
    power:
      pokemon.hp +
      pokemon.attack +
      pokemon.defense +
      pokemon.special_attack +
      pokemon.special_defense +
      pokemon.speed,
  })).filter((row)=>row.name.toLowerCase().includes(search.toLowerCase()) && row.power >=threshold)

  return (
    <div
      style={{
        background: "#414040",
        height: "100%",
        padding: "20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container >
        <Card >
        <CardContent
          component="form"
          sx={{
            "& > :not(style)": { m: 2, width: "45ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-textarea"
            variant="standard"
            placeholder="Search..."
            multiline
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" >
                  <CiSearch />
                </InputAdornment>
              ),
            }}
            onChange={(e)=>{
              setSearch(e.target.value)
            }}
          />
          <TextField
            id="outlined-textarea"
            variant="standard"
            placeholder="Power Threshold"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" >
                  <CiHeart />
                </InputAdornment>
              ),
            }}
            onChange={(e)=>{
              setThreshold(e.target.value)
            }}
          />
          <h3>Min power: 235</h3>
          <h3>Max power: 450</h3>
        </CardContent>
        <DataTable data={data} columns={columns} />
        </Card>
      </Container>
    </div>
  );
};

export default App;
