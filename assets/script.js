document.addEventListener("DOMContentLoaded", function() {
    const pokemonListElement = document.getElementById("pokemonList");
    const getPokemonButton = document.getElementById("getPokemonButton");

    getPokemonButton.addEventListener("click", function() {
        // Hapus daftar Pokemon sebelumnya (jika ada)
        pokemonListElement.innerHTML = '';

        // Ambil data dari API
        fetch('https://pokeapi.co/api/v2/pokemon?limit=36')
            .then(response => response.json())
            .then(data => {
                // Loop melalui hasil dan tambahkan setiap Pokemon ke daftar
                for (let i = 0; i < data.results.length; i++) {
                    const pokemon = data.results[i];

                    // Ambil detail Pokemon menggunakan URL yang diberikan
                    fetch(pokemon.url)
                        .then(response => response.json())
                        .then(pokemonData => {
                            // Ambil tipe pertama (jika ada)
                            const type = pokemonData.types.length > 0 ? pokemonData.types[0].type.name : 'Unknown';

                            // Tambahkan Pokemon ke daftar
                            const listItem = document.createElement("li");

                            // Tambahkan nomor dan nama di atas gambar
                            const pokemonInfo = document.createElement("div");
                            pokemonInfo.className = "pokemon-info";
                            pokemonInfo.textContent = `${i + 1}. ${pokemonData.name}`;
                            listItem.appendChild(pokemonInfo);

                            // Tambahkan gambar Pokemon
                            const imgElement = document.createElement("img");
                            imgElement.src = pokemonData.sprites.front_default;
                            listItem.appendChild(imgElement);

                            // Tambahkan tipe di bawah gambar
                            const pokemonType = document.createElement("div");
                            pokemonType.className = "pokemon-type";
                            pokemonType.textContent = `Type: ${type}`;
                            listItem.appendChild(pokemonType);

                            // Ubah warna latar belakang berdasarkan tipe Pokemon
                            listItem.style.backgroundColor = getTypeColor(type);

                            pokemonListElement.appendChild(listItem);
                        })
                        .catch(error => console.error('Error fetching Pokemon details:', error));
                }
            })
            .catch(error => console.error('Error fetching Pokemon list:', error));
    });
});

// Fungsi untuk mendapatkan warna berdasarkan tipe Pokemon
function getTypeColor(type) {
    switch (type) {
        case 'normal':
            return '#a8a878';
        case 'fire':
            return '#f08030';
        case 'water':
            return '#6890f0';
        case 'grass':
            return '#78c850';
        // Tambahkan warna untuk tipe lainnya sesuai kebutuhan
        default:
            return '#a8a878';
    }
}
