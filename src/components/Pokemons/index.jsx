import { useState, useEffect } from 'react'
import { render } from 'react-dom'
import './styles.scss'

export function Pokemons(){

    const [allPokemons, setAllPokemons] = useState([])
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

    const loadPokemons = async () => {
        const res = await fetch(loadMore)
        const data = await res.json()

        setLoadMore(data.next)

        const createPokemonObject = (result) =>{
            result.forEach( async (pokemon) => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                const data = await res.json()

                setAllPokemons(currentList => [...currentList, data])
            })
        }
        createPokemonObject(data.results)
    }

    useEffect(() => {
        loadPokemons()
    }, [])

    return(
        <div className='pokemons'>
            {allPokemons.map((item, index) => (
                <div className={`pokemon ${item.types[0].type.name}`} key={index}>
                    <div className='poke-description'>
                        <p>#{item.id < 10 ? '00'+item.id : '0'+item.id}</p>
                        <h2>{item.name[0].toUpperCase() + item.name.substring(1)}</h2>

                        <div className='types'>
                            {item.types.map((item, index) => (
                                <img src={`src/assets/icons/icon-types-black/${item.type.name}.svg`} alt="" key={index}/>
                            ))}
                        </div>
                    </div>
                    <div className='poke-image'>
                        <img src={item.sprites.other.dream_world.front_default} alt="" />
                    </div>
                </div>
            ))}

            <button className='btn-load-more' onClick={() => loadPokemons()}>Load More</button>
        </div>
    )
    
}