import { Pokemons } from './components/Pokemons'
import './global.scss'

export default function App() {

  return(
    <main>
      <div className='inicio'>
        <div className='elements'>
          <img src="src/assets/images/logo.svg" alt="" className='logo'/>
          <div className='pokeball'>
            <img src="src/assets/images/luzes.svg" alt="" className='luzes'/>
            <img src="src/assets/images/img-pokeball.svg" alt="" />
          </div>
        </div>
      </div>

      <Pokemons/>
    </main>
  )
}

