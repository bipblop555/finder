import React from 'react';
import {Link} from 'react-router-dom';
import Basket from '../pages/Basket';

import '../css/header.css';
import ProductsCards from './ProductsCards';


export default class Header extends React.Component{

    state = {
        search : '',
        results: [],
        paniers: [],
    }

    constructor(){
        super()

        this.handleInput = this.handleInput.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.showBasket = this.showBasket.bind(this);

        this.categoryLoader = this.categoryLoader.bind(this);
        this.categoryLoaderDissapear = this.categoryLoaderDissapear.bind(this);
    }

    categoryLoader(){
        let loadDiv = document.getElementById('ctrlH');
        loadDiv.classList.remove('hide');
    }
    categoryLoaderDissapear(){
        let loadDiv = document.getElementById('ctrlH');
        loadDiv.classList.add('hide');
    }

    showBasket(){
        var myBasket = JSON.parse(localStorage.getItem('basketItems'));

        var titleBasket = JSON.stringify(myBasket[0]);
        var imgBasket = JSON.stringify(myBasket[1]);
        var priceBasket = JSON.stringify(myBasket[2]);

        this.setState({
            search : '',
            results: [],
            paniers: myBasket,
        })
        
        console.log(titleBasket);
        console.log(imgBasket);
        console.log(priceBasket);

        return titleBasket, myBasket, priceBasket;
    }

    handleInput(event){
        this.setState (()=>{
            return{
                search : event.target.value
            }
        })
    }
    loader(){

    }
    handleSearch(event){
        event.preventDefault();

        fetch('https://otakod.es/hetic/ecommerce-api/products?search=' + this.state.search)
         .then((response)=>{
           this.categoryLoader();
            return response.json()
         })
         .then((json)=>{
             this.setState((state)=>{
                this.categoryLoaderDissapear();
                
                return{
                    search: '',
                    results: json.products
                }
            })
         })
    }

    
    render(){
        return(
            <>
        <div className='header'>
            <Link to={'/home/'} style={{ textDecoration: 'none' }}>
                <h2 className='title'>
                    Finder
                </h2>
            </Link>

            <form onSubmit={this.handleSearch}>
                <input 
                className='input'
                type ='text'
                placeholder ='Search'
                required
                onChange={this.handleInput}
                />
                
                    <button className='sub_button'>
                <Link to={'/search/'} style={{ textDecoration: 'none', color: 'white'}}>
                        Chercher
                </Link>
                    </button>
            </form>
            <div className='englob'>
                <Link to="/mon-panier" >
                    <ul>
                        <li onClick={this.showBasket}>
                        <svg className ="basket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M171.7 191.1H404.3L322.7 35.07C316.6 23.31 321.2 8.821 332.9 2.706C344.7-3.409 359.2 1.167 365.3 12.93L458.4 191.1H544C561.7 191.1 576 206.3 576 223.1C576 241.7 561.7 255.1 544 255.1L492.1 463.5C484.1 492 459.4 512 430 512H145.1C116.6 512 91 492 83.88 463.5L32 255.1C14.33 255.1 0 241.7 0 223.1C0 206.3 14.33 191.1 32 191.1H117.6L210.7 12.93C216.8 1.167 231.3-3.409 243.1 2.706C254.8 8.821 259.4 23.31 253.3 35.07L171.7 191.1zM191.1 303.1C191.1 295.1 184.8 287.1 175.1 287.1C167.2 287.1 159.1 295.1 159.1 303.1V399.1C159.1 408.8 167.2 415.1 175.1 415.1C184.8 415.1 191.1 408.8 191.1 399.1V303.1zM271.1 303.1V399.1C271.1 408.8 279.2 415.1 287.1 415.1C296.8 415.1 304 408.8 304 399.1V303.1C304 295.1 296.8 287.1 287.1 287.1C279.2 287.1 271.1 295.1 271.1 303.1zM416 303.1C416 295.1 408.8 287.1 400 287.1C391.2 287.1 384 295.1 384 303.1V399.1C384 408.8 391.2 415.1 400 415.1C408.8 415.1 416 408.8 416 399.1V303.1z"/>
                        </svg>
                        </li>
                    </ul> 
                </Link>
            </div>
        </div>
        <div className='Basket'>
            {
                this.state.paniers.map((panier)=>{
                    <div key={panier[0]} >
                        <Basket donee={panier}/>
                    </div>
                })
            }
        </div>
        <div className='flexedd'>
        
            {
                this.state.results.map((result)=>{
                    return (
                        <div key={ result.id }>
                            <ProductsCards data={ result } />
                        </div>
                    )
                })
            }
            
        </div>
        <div className="ctrlH hide" id ='ctrlH'>
                <div className="lds-ring">
                    <div>

                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                    <div>
                        
                    </div>
                </div>
             </div>
            </>
        )
    }
}
    
