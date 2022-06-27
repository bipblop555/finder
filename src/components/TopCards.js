import '../css/TopCards.css'

export default function TopCards(props){
    return (
        <div className='three'>
            <div className="toMarge">

                <div className="container" id ='productsDivs'>
                    <div className="cards">
                            <figure>
                                <img 
                                src={ props.data.images.photos }
                                />
                            </figure>
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

                            <button className="addToBasket">
                                Ajouter - { props.data.price }
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}