import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

let id = 0
let pokeArray;

createApp({
    data() {
        return {
            pokemon: [],
            currentStats: null
        }
    },
    methods: {
        getPokemon() {
            for (let i = 1; i <= pokeArray.length; i++) {
                fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(response => response.json())
                .then(data => {
                    this.pokemon = [...this.pokemon, data]
                })
            }
            
        },
        showStats(poke) {
            console.log(poke)
            this.currentStats = poke
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