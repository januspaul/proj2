import { Button } from "@mui/material";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const News = () => {

    const [articles, setArticles] = useState([]);
    const itemsPerPage = 5;

    useEffect(() => {

        const apiKey = "af6c298da3be4c5baaffa9a77ad42802";
        const fetchArticles = async () => {

            const res = await axios.get(
                `https://newsapi.org/v2/everything?q=pokemon&pageSize=10&language=en&from=2022-11-28&sortBy=publishedAt&apiKey=${apiKey}`
            );
            setArticles(res.data.articles);
        };
        fetchArticles();
    }, []);

    const currentItems = articles.slice(0, itemsPerPage);

    const today = new Date();
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);

    return (
        <div className="bg-primary">
            <div className="row newsHeader-bg mb-3 text-white">
                <div className="col-lg-6 mt-5 mb-5">
                    <span className="ms-5 badge text-bg-warning">Media</span>
                    <span className="ms-3">{formatter.format(today)}</span>
                    <h2 className="ms-5 mt-2 fw-bold">It’s Time for a Gift Exchange on Pokémon TV</h2>
                    <p className="ms-5 mt-4">Get into the holiday spirit as you watch Ash and friends share presents in a special collection of Pokémon the Series episodes.</p>
                    <Button className="ms-5 pe-3 bg-primary rounded-pill text-white ps-3">
                        <img className='hero1Pokeball' src="pokeball.png" alt="" />
                        Read More
                    </Button>
                </div>
                <div className="col-lg-6">
                    <img className="img-fluid d-block w-100 pokeHoliday-border" src="https://www.pokemon.com/static-assets/content-assets/cms2/img/watch-pokemon-tv/_tiles/stunts/winter/2022/winter-169-en.png" alt="pokemon holiday" />
                </div>
            </div>
            <div className="d-flex justify-content-center text-white">
                <p className="bg-primary ps-5 pe-5 pb-2 pt-2 fw-bold radius-bottom" style={{ position: "absolute", }}>LATEST NEWS</p>
            </div>
            <div className="latestNews-bg">
                {currentItems.map((article) => (
                    <div key={article.url} className="text-white pt-5">
                        <div className="d-flex align-items-center p-3">
                            <Link><img src={article.urlToImage} alt={article.title} className="img-fluid imageStyle d-block w-100 text-center order-1 ms-5" /></Link>
                            <div className="order-2 ms-5 ps-3 me-4">
                                <span className="badge text-bg-danger">Animation</span>
                                <span className="ms-3">{formatter.format(today)}</span>
                                <h3 className="text-warning text-uppercase">{article.title}</h3>
                                <p>{article.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default News;