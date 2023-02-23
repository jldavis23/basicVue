import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

let id = 0
let pokeArray;

createApp({
    data() {
        return {
            pokemon: [],
            favPokemon: [],
            currentStats: null,
            showFavs: false
        }
    },
    computed: {
        filteredPoke() {
            return this.showFavs ? this.pokemon.filter((p) => p.isFavorite) : this.pokemon
        }
    },
    methods: {
        getPokemon() {
            for (let i = 1; i <= pokeArray.length; i++) {
                fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(response => response.json())
                .then(data => {
                    let p = data
                    p.isFavorite = false
                    this.pokemon = [...this.pokemon, p]
                })
            }
        },
        showStats(poke) {
            console.log(poke)
            this.currentStats = poke
        },
        toggleFavorite(pokeID) {
            let i = this.pokemon.findIndex(poke => poke.id === pokeID)
            this.pokemon[i].isFavorite = !this.pokemon[i].isFavorite
        }
    },
    mounted() {
        fetch('https://pokeapi.co/api/v2/pokemon')
                .then(response => response.json())
                .then(data => {
                    pokeArray = data.results
                    this.getPokemon()
                })
    }
}).mount('#app')