import React from "react";
import top from "../css/top.css";
import TopCards from "./TopCards";

let does = true;
let dont = false
export default class Top extends React.Component{
    state = {
        topProducts: []
    }
    constructor(){
        super()

        this.handleTop = this.handleTop.bind(this);
        
    }
    handleTop(){
        if (does == true){

            fetch('https://otakod.es/hetic/ecommerce-api/products/top')
            .then((response)=>{
                return response.json()
            })
            .then((json)=>{
                this.setState((state)=>{
                    return{
                        topProducts: json.products
                    }
                })
            })
            does = false;

        } else if (does = false){
            return
        }
    }
    render(){
        this.handleTop()
        return(
            <div className="nosProduits">

                <p>
                    Nos produits phares
                </p>
                
                <div className="round">
                    {
                        this.state.topProducts.map((topProduct)=>{
                            return (
                                <div key={topProduct.id}>
                                    <TopCards data={topProduct}/>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}