
import React from "react";
import { Carousel, Card, CardGroup, Container } from "react-bootstrap";

const Featured = () => {
  const [pokemons, setPokemons] = React.useState([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const handleSlideChange = (index) => {
    setPokemons([]);
    setCurrentSlide(index);
  };

  React.useEffect(() => {
    const loadPokemons = () => {
      for (let i = 0; i <= 3; i++) {
        const randomId = Math.floor(Math.random() * 807) + 1;
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
          .then((response) => response.json())
          .then((data) =>
            setPokemons((prevPokemons) => [...prevPokemons, data])
          );
      }
    };
    loadPokemons();
  }, [currentSlide]);

  return (
    <div style={{ backgroundColor: "#6423B5", backgroundSize:"100%" }} className="featuredContainer p-5">
      <Container>
        <div>
          <h3 className="text-styleFeatured aboutUsHeader"><span className="lineFeatured"></span>Featured Pokemon</h3>
        </div>

        <Carousel activeIndex={currentSlide} onSelect={handleSlideChange} className="pb-5 mx-5">
          {[...Array(3)].map((_, index) => (
            <Carousel.Item key={index}>
              <CardGroup style={{ justifyContent: "space-around" }}>
                {pokemons.map((pokemon) => (
                  <div key={pokemon.id} className="row">
                    <div className="col-5">
                      <Card
                        key={pokemon.id}
                        style={{ width: "250px" }}
                        className="mt-1 px-2"
                      >
                        <Card.Img
                          variant="top"
                          src={
                            pokemon.sprites.other["official-artwork"]
                              .front_default
                          }
                          alt={pokemon.name}
                        />
                        <hr />
                        <Card.Body className="text-center">
                          <Card.Title className="">
                            {pokemon.name.charAt(0).toUpperCase() +
                              pokemon.name.slice(1)}
                          </Card.Title>
                          <Card.Text>
                            #{pokemon.id.toString().padStart(3, 0)}
                          </Card.Text>
                          <img
                            src={`https://veekun.com/dex/media/types/en/${pokemon.types[0].type.name}.png`}
                            alt={pokemon.types[0].type.name}
                          />
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                ))}
              </CardGroup>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default Featured;
