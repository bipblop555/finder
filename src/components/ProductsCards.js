import { Link } from "react-router-dom";

import Category from "./Category";

import '../css/ProductsCards.css';


export default function ProductsCards(props){
    function toLocalStorage(){
    
        var items = [
            props.data.title,
            props.data.images.photos[0],
            props.data.price
        ];

        localStorage.setItem('basketItems', JSON.stringify(items));

        var storedItems = JSON.parse(localStorage.getItem('basketItems'));

        console.log(localStorage , 'thisisit');
    }
    
    return (
            <div className="toMarge">

                <div className="container" id ='productsDivs'>
                    <div className="cards">
                        <Link to={'/produits/' + props.data.id} >
                            <figure>
                                <img 
                                src={ props.data.images.photos }
                                />
                            </figure>
                        </Link>
                            <div className="titles">
                                <h2>
                                    { props.data.title }
                                </h2>
                            </div>
                            <div className="rate">
                                <p>
                                    Produit noté <strong>{ props.data.rating} / 5</strong>
                                </p>
                            </div>

                            <button className="addToBasket" 
                                onClick={ toLocalStorage }>
                                Ajouter - { props.data.price }
                            </button>
                    </div>
                </div>
            </div>
    )
}