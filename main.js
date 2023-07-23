// html 'den inputu çağırma
const searchInput = document.getElementById('search');
const button = document.getElementById('search-btn');
const profileArea = document.getElementById('profile');

console.dir(profileArea);

// butonun tıklanma olayını izleme
button.addEventListener('click', getInput);

//! Ekrana Profil arayüzünü basma fonk.
function showProfile(user) {
  console.log(user);
  profileArea.innerHTML = `
     <div class="row border p-3">
        <div class="col-md-3">
          <img
            class="img-fluid rounded shadow"
            src="${user.avatar_url}"
          />
          <a target="_blank" href="${user.html_url}" class="btn btn-primary my-4 w-100">Profili Göster</a>
        </div>
        <div class="col-md-9">

          <span class="badge bg-primary mt-1">Açık Repolar: ${user.public_repos}</span>
          <span class="badge bg-secondary mt-1">Açık Gistler: ${user.public_gists}</span>
          <span class="badge bg-success mt-1">Takipçiler: ${user.followers}</span>
          <span class="badge bg-info mt-1">Takip Edilenler: ${user.following}</span>

          <ul class="list-group my-5">
            <li class="list-group-item">Hakkında: ${user.bio}</li>
            <li class="list-group-item">Şirket: ${user.company}</li>
            <li class="list-group-item">Website: ${user.blog}</li>
            <li class="list-group-item">Konum: ${user.location}</li>
            <li class="list-group-item">Hesap Oluşturma Tarihi: ${user.created_at}</li>
          </ul>
        </div>
      </div>
    `;
}

//! API'dan bir kullanıcı bilgisini alıcak fonk.
async function getUser(user) {
  // gelen user'la birlikte istek atma
  const profileRes = await fetch(
    `https://api.github.com/users/${user}`
  );

  // gelen cevabı işle
  const data = await profileRes.json();

  // fonksiyonun çağrıldığı yere data'yı gönderir
  return data;
}

//! inputtaki yazıyı alan fonk.
function getInput() {
  // input boş olursa form gönderilmesin
  if (searchInput.value === '') return;

  // kullanıcı bilgelerini almaya yarıyacak fonksiyonu çalıştır
  getUser(searchInput.value).then((res) => showProfile(res));
}
