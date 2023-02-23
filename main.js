import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

let id = 0
let pokeArray;

createApp({
    data() {
        return {
            pokemon: [],
            types: ['default'],
            favPokemon: [],
            currentStats: null,
            showFavs: false,
            sortedPokemon: null,
            sortedBy: 'default'
        }
    },
    computed: {
        filteredPoke() {
            //return this.showFavs ? this.pokemon.filter((p) => p.isFavorite) : this.pokemon
            return this.showFavs ? this.pokemon.filter((p) => p.isFavorite) : this.sortedPokemon ? this.sortedPokemon : this.pokemon
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
                    p.types.forEach(t => {
                        if (!this.types.includes(t.type.name)) {
                            this.types = [...this.types, t.type.name]
                        }
                    })
                    
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
        },
        sortByType(pokeType) {
            if (pokeType === 'default') {
                this.sortedPokemon = null
            } else {
                this.sortedPokemon = this.pokemon.filter(p => p.types.some(t => t.type.name === pokeType))
            }
            this.sortedBy = pokeType
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