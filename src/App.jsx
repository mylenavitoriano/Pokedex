import { Pokemons } from './components/Pokemons'
import { useState, useEffect } from 'react'
import './global.scss'

export default function App() {

  const [allTypes, setAllTypes] = useState([])
  const [loadMoreTypes, setLoadMoreTypes] = useState('https://pokeapi.co/api/v2/type')

  const [type, setType] = useState('all')

  const loadTypes = async () => {
    const res = await fetch(loadMoreTypes)
    const data = await res.json()

    setLoadMoreTypes(data.next)

    const createTypeObject = (result) =>{
        result.forEach( async (type) => {
            if(type.name != 'unknown' & type.name != 'shadow'){
                const res = await fetch(`${loadMoreTypes}/${type.name}`)
                const data = await res.json()

                setAllTypes(currentList => [...currentList, data])
            }
        })
    }
    createTypeObject(data.results)
}

useEffect(() => {
    loadTypes()
}, [])

function selectType(typeName){
  setType(typeName)
}

  return(
    <main>
      <div className='inicio'>
        <div className='elements'>
          <img src="/src/assets/images/logo.svg" alt="" className='logo'/>
          <div className='pokeball'>
            <img src="/src/assets/images/luzes.svg" alt="" className='luzes'/>
            <img src="/src/assets/images/img-pokeball.svg" alt="" />
          </div>
        </div>
      </div>

      <div className="conteudo">
        <div className='types'>
          <button className={type == "all" ? 'type active' : 'type'} onClick={() => selectType(`all`)}>
              <img src="/src/assets/icons/icon-types/all-pokemons.svg" alt="" />
              <p className='type-all-pokemons'>All</p>
          </button>

          {allTypes.map((item, index) => (
              <button className={item.name == type ? 'type active' : 'type'} key={index} onClick={() => selectType(item.name)}>
                  <img src={`/src/assets/icons/icon-types/${item.name}.svg`} alt="" />
                  <p className={`type-${item.name}`}>{item.name[0].toUpperCase() + item.name.substring(1)}</p>
              </button>
          ))}
        </div>

        <Pokemons type={type}/>
      </div>

    </main>
  )
}

