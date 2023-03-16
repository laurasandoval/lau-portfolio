import './index.scss'

export default function Billie({ server }) {

    return (
        <>
            <div className="billie">
                <header>
                    <h1 className="header-typography">
                        <span>A guide</span>
                        <span className="serif">to</span>
                        <span>Santiago</span>
                        <span className="serif">for</span>
                        <span>Billie Eilish<br />& Finneas<br />& Team</span>
                    </h1>

                    <p className="serif curated-disclaimer">Curated with love by<br /><a href="https://instagram.com/laurasideral" rel="noopener noreferrer">✿ Laura Sandoval</a> and <br /><a href="https://instagram.com/lifewithcolors" rel="noopener noreferrer">✿ Laura Mardones</a></p>
                </header>

                <main>
                    <section>
                        <h2 className="title">Visit</h2>
                        <div className="place">
                            <h3 className="title">
                                <a href="https://goo.gl/maps/CKUnomctYVEWjfu86" rel="noopener noreferrer">Parque Metropolitano</a>
                            </h3>
                            <p className="description">Also known as “Cerro San Cristóbal”. Make sure to take <a href="https://telefericosantiago.cl" rel="noopener noreferrer">the cablecar</a> to the top and drink some <a href="https://en.wikipedia.org/wiki/Mote_con_huesillo" rel="noopener noreferrer">“mote con huesillo”</a> while you're there.</p>
                        </div>
                        <div className="place">
                            <h3 className="title">
                                <a href="https://goo.gl/maps/wVSDufDDVWVtYqhr9" rel="noopener noreferrer">Sky Costanera</a>
                            </h3>
                            <p className="description">The best 360-degree panoramic views of the city, from  <a href="https://en.wikipedia.org/wiki/Costanera_Center" rel="noopener noreferrer">the tallest building in Latin America</a>. Sunset is an excellent time to visit.</p>
                        </div>
                    </section>
                    <section>
                        <h2 className="title">Eat & Drink</h2>
                        <div className="place">
                            <h3 className="title">
                                <a href="https://goo.gl/maps/ReMLXF64zyasp4Rh9" rel="noopener noreferrer">Quinoa</a>
                            </h3>
                            <p className="description">A trendy vegetarian and vegan restaurant that offers a variety of creative dishes with local cuisine.</p>
                        </div>
                        <div className="place">
                            <h3 className="title">
                                <a href="https://goo.gl/maps/iHpKT4NSvApcNeg26" rel="noopener noreferrer">Valdivia Bar</a>
                            </h3>
                            <p className="description">A cozy and laid-back bar offering a variety of craft beers, local wines, and pub-style food—including gluten-free options (!!).</p>
                        </div>
                    </section>
                </main>

                <p className="tickets-disclaimer">We couldn't get tickets, but we hope you have a wonderful show on Friday. Enjoy your stay in Santiago 🖤</p>
            </div>
        </>
    )
}
