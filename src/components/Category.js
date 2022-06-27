import { Link } from "react-router-dom";
import React from "react";
import ProductsCards from "./ProductsCards";
import { useState } from "react";

import '../css/Category.css';

let page = 1;
let type ='';

export default class Category extends React.Component{
    state = {
        produits: [],
        loneKey: '',
    }
    constructor(){
        super()
        
        this.handleFetch = this.handleFetch.bind(this);
        
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        
        this.categoryLoader = this.categoryLoader.bind(this);
        this.categoryLoaderDissapear = this.categoryLoaderDissapear.bind(this);

        this.showBtn = this.showBtn.bind(this);
        this.marginbtn = this.marginbtn.bind(this);
    }
    marginbtn(){
        let globBtn = document.getElementById('glowBtn');

        globBtn.classList.add('marge');
    }
    showBtn(){
        let btns = document.querySelectorAll('#btns');

        for (let i = 0; i < 2; i++){
            btns[i].classList.remove('hide')
        }
    }
    categoryLoader(){
        let loadDiv = document.getElementById('ctrlH');
        loadDiv.classList.remove('hide');
    }
    categoryLoaderDissapear(){
        let loadDiv = document.getElementById('ctrlH');
        loadDiv.classList.add('hide');
    }
    next(event){
        event.preventDefault();

        page +=1;

        this.handleFetch(page);
    }
    previous(event){
        event.preventDefault();
        if (page > 0){
            page -=1;

            this.handleFetch(page);
        }
         else if (page == 0){
            return;
        }
    }
    handleFetch(page, newType){
        if (newType != null){
            type = newType
        }
        fetch('https://otakod.es/hetic/ecommerce-api/products?search='+ type + '&page=' + page)
        .then((response)=>{
            this.marginbtn();
            this.categoryLoader();
            this.showBtn();
            return response.json();
        })
        .then ((json)=>{
            this.setState((state)=>{
                this.categoryLoaderDissapear();
                return {
                    produits: json.products,
                }
            })
        })
    }
    render(){
        return ( 
             <>
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
         <div className="categoryBar">
             <ul className="categoryNames">
                    <Link to={'/produits/figurines'}>
                 <li> 
                        <button 
                        className="categorybtn"
                        onClick={ 
                            (event) => {
                                event.preventDefault();
                                page=1;
                                
                                this.handleFetch(page, 'figurine');
                                } }>
                            figurine
                        </button>
                 </li>
                    </Link>  
                 <li>
                     <button
                     className="categorybtn" 
                        onClick={ 
                            (event) => {
                                event.preventDefault();
                                page=1;

                                this.handleFetch(page, 'vetement');
                                } }>
                            vetements
                     </button>
                 </li>
                 <li>
                     <button 
                     className="categorybtn"
                     onClick={ 
                         (event) => {
                            
                             event.preventDefault();
                             page=1;
                             
                             this.handleFetch(page, 'deco');
                            } }>
                        deco
                     </button>
                 </li>
             </ul>
         </div>
         <div className="flex">
                {
                    this.state.produits.map((produit)=>{
                        return (
                            <div id = "productsDiv" 
                                key ={ produit.id } >

                                < ProductsCards
                                 data={ produit } />
                            </div>
                        )
                    })
                }
            </div>
            <div className="globBtn" id="glowBtn">
                <button className="btnNP a hide" onClick={this.previous} id='btns'>
                    Previous
                </button>
                <button className="btnNP b hide" onClick={ this.next} id='btns'>
                    Next
                </button>
            </div>
        </>
        )
    }
}
