const VideosContainer = document.querySelector(".videos__container")

async function VisualizarVideos() {
    const api = await fetch("http://localhost:3000/videos")
    const videos = await api.json()

    videos.forEach((video) => {
        VideosContainer.innerHTML += `<li class="videos__item">
        <iframe width="100%" height="72%" src="${video.url}"
            title="${video.titulo}" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        <div class="descricao-video">
            <img src="${video.imagem}" alt="logo canal alura">
            <h3 class="titulo-video">${video.titulo}</h3>
            <p>${video.descricao}</p>
        </div>
    </li>`
    })
}

VisualizarVideos()

const barraDePesquisa = document.getElementById('search')

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa(){
    const videos = document.querySelectorAll(".videos__item");

    if(barraDePesquisa.value != ""){
        videos.forEach((video) => {
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
            let valorFiltro = barraDePesquisa.value.toLowerCase();

            if(!titulo.includes(valorFiltro)){
                video.style.display = "none";
            } else {
                video.style.display = "block";
            }

        })
    } else {
        videos.style.display = "block";
    }
}


const addVideoBtn = document.getElementById('addVideo')
const closeBtn = document.getElementById('close')
const form = document.getElementById('addVideoForm')

addVideoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (addVideoBtn.style.display = 'flex') {
        addVideoBtn.style.display = 'none'
        form.style.display = 'flex'
    }

    else {
        addVideoBtn.style.display = 'flex'
        form.style.display = 'none'
    }
})

closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (closeBtn.style.display = 'flex') {
        form.style.display = 'none'
        addVideoBtn.style.display = 'flex'
    }

    else {
        form.style.display = 'flex'
        addVideoBtn.style.display = 'none'
    }
})

async function CriaVideo(titulo, descricao, url, imagem) {
    const api = fetch("http://localhost:3000/videos",{
        method: "POST",
        headers: {
            "content-type": "aplication/json"
        },
        body: JSON.stringify({
            titulo: titulo,
            descricao: `${descricao} mil visualizações`,
            url: url, 
            imagem: imagem
        })
    })

    const conexaoConvertida = await api.json()
    return conexaoConvertida
}


async function addVideo(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descricao = Math.floor(Math.random() * 10).toString();
    const url = document.getElementById("url").value;
    const imagem = document.getElementById("imagem").value;

    await CriaVideo(titulo, descricao, url, imagem);
}

form.addEventListener("submit", event => addVideo(event));