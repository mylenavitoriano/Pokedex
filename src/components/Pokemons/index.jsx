import { useState, useEffect } from 'react'
import './styles.scss'

export function Pokemons({type}){

    const [allPokemons, setAllPokemons] = useState([])
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
    const [control, setControl] = useState(1)

    let maxPokemons = 20

    
    const loadPokemons = async () => {
        const res = await fetch(loadMore)
        const data = await res.json()

        setLoadMore(data.next)

        const createPokemonObject = (result) =>{
            result.forEach( async (poke) => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.name}`)
                const data = await res.json()
                
                setAllPokemons(currentList => [...currentList, data])
            })
        }

        createPokemonObject(data.results)
    }

    const loadPokemonsType = async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
        const data = await res.json()

        const createPokemonObject = (result) =>{
            console.log(20 * control)
            for(let i = ((control - 1) * maxPokemons); i < (20 * control); i++){
                fetch(`https://pokeapi.co/api/v2/pokemon/${result[i].pokemon.name}`)
                .then( res => res.json())
                .then(data => setAllPokemons(currentList => [...currentList, data]))
            }
        }
        setAllPokemons('')
        createPokemonObject(data.pokemon)
    }

    useEffect(() => {
        if(type != 'all'){
            loadPokemonsType()
            console.log(allPokemons)
        }else{
            loadPokemons()
            console.log(allPokemons)
        }

        setAllPokemons(currentList => [ ...currentList.slice(0, -1)])
        console.log("AQUIIII")
    }, [type])

    return(
        <div className='pokemons'>
            {allPokemons != '' ? allPokemons.map((item, index) => (
                item.sprites.other.home.front_default &&
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
                        <img src={item.sprites.other.home.front_default} alt="" />
                    </div>
                </div>
            )) : ''}

            <button className='btn-load-more' onClick={type != "all" ? () => {loadPokemonsType(); setControl(control + 1)}  : () => loadPokemons()}>Load More</button>
        </div>
    )
    
}