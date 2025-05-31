const form = document.getElementById('formPostagem');
const feed = document.getElementById('feed');
const textoPost = document.getElementById('textoPost');

let posts = [];

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const texto = textoPost.value.trim();
  if (!texto) return;

  const imagemGato = await buscarImagemGato();

  const novoPost = {
    data: new Date(),
    usuario: "gatinho_dev",
    avatar: "https://i.pravatar.cc/150?img=12",
    texto: texto,
    imagem: imagemGato,
    likes: 0
  };

  posts.unshift(novoPost);
  renderizarFeed();
  textoPost.value = '';
});

async function buscarImagemGato() {
  try {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await res.json();
    return data[0].url;
  } catch (err) {
    console.error("Erro ao buscar imagem de gato", err);
    return "";
  }
}

function renderizarFeed() {
  feed.innerHTML = '';

  posts.forEach((post, index) => {
    const div = document.createElement('div');
    div.className = 'post';

    div.innerHTML = `
      <div class="post-header">
        <img src="${post.avatar}" class="avatar" alt="avatar">
        <span class="username">@${post.usuario}</span>
      </div>
      <p>${post.texto}</p>
      ${post.imagem ? `<img src="${post.imagem}" class="cat" alt="Gatinho">` : ''}
      <div class="like">
        <button onclick="curtirPost(${index})">❤️ Curtir</button>
        <span>${post.likes} curtidas</span>
      </div>
    `;

    feed.appendChild(div);
  });
}

function curtirPost(index) {
  posts[index].likes++;
  renderizarFeed();
}
