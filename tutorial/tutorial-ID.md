React adalah _front-end library_ yang sangat populer dan mendapatkan perhatian terus menerus karena beberapa hal:

1. Berurusan dengan _DOM API_ sangatlah susah, akan tetapi React memberi kemudahan para developer untuk berurusan dengan DOM API dengan menggunakan _virtual browser_ yang lebih bersahabat ketimbang dengan _browser_ sungguhan.
2. React bekerja secara deklaratif untuk membuat tatap mukanya.
3. React hanyalah JavaScript, yang mana membuat kurva belajar nya sangat mudah karena API yang dipunyai oleh React pun sedikit.

Berdasarkan statistik yang terdapat pada [blog](https://www.tecla.io/blog/2019-stats-on-top-js-frameworks-react-angular-and-vue/) ini, dapat dilihat bahwa React sangat populer sehingga, banyak juga perusahaan mencari pada programmer yang dapat bekerja menggunakan React.

Dalam tutorial ini kita akan membuat sebuah website minimalis yang akan menampilkan kumpulan film dan dapat mem-favoritkan film tersebut. _User stories_ yang akan ada pada website ini adalah:

1. Dapat menampilkan kumpulan film.
2. User dapat mem-favoritkan film tersebut.
3. User dapat melihat detail dari film tersebut.
4. User dapat melihat film yang termasuk dalam kategori populer.
5. User dapat melihat film yang termasuk dalam kategori yang sedang diputar sekarang.

User stories di atas sudah cukup bagi kita untuk memulai, akan tetapi sebelum memulai dibutuhkan beberapa prasyarat, prayarat tersebut

1. Mempunyai nodejs dengan npm v5.2+, jika belum mempunyai dapat melakukan instalasi [di sini](https://nodejs.org/en/download/) dan ada baiknya untuk memilih versi yang paling baru
2. _Code editor_, _code editor_ di sini tergantung dengan selera masing-masing, untuk tutorial ini saya akan menggunakan webstorm

#### Hal yang perlu diperhatikan

Pada tutorial ini kita akan membuat applikasi kita menggunakan create-react-app dan ant design sebagai _UI library_ kita. Penggunaan create-react-app dipilih karena kita dapat langsung membuat applikasi tanpa harus meng-konfigurasi apapun, sedangkan _UI library_ ant design dipilih karena menurut saya itu adalah sebuah _UI library_ yang sangat lengkap dan mudah untuk digunakan. Kita juga akan menggunakan styled-components sebagai kostumisasi styling kita.

#### Persiapan

Kode asal dari projek yang akan kita buat ini dapat ditemukan [di sini](https://github.com/MirzaChilman/mini-project). Kalian boleh meng-duplikat projek tersebut untuk melihat hasil akhir atau apa yang akan kita buat.

#### Apa yang akan kita buat?

Seperti yang sudah dijelaskan _user stories_ di atas kita akan membuat sebuah website yang akan menampilkan kumpulan film. Berikut adalah beberapa _screenshot_ hal yang akan kita buat

Pada tutorial kali ini kita tidak akan begitu peduli terhadap semua file yang terdapat pada folder komponen, kalian bisa langsung melakukan _copy paste_ atau bernavigasi [ke sini](https://github.com/MirzaChilman/mini-projek/tree/master/src/components), pada tutorial kali ini yang akan kita bahas adalah cara bagaimana menampilkan kumpulan film dan mem-favoritkan film tersebut.

Mengapa melakukan ini? karena hal tersebut sangat dekat dengan kasus nyata pada dunia kerja, dimana biasanya kalian perlu untuk menampilkan data dan mengolahnya. Dalam kasus e-commerce website, mem-favoritkan film sama dengan kasus nyata pada dunia kerja

#### Mulai

Baiklah hal pertama yang akan kita lakukan adalah membuat projek kita menggunakan `create-react-app` jika npm kalian mempunyai versi 5.2+ maka yang perlu dilakukan adalah `npx create-react-app toko-flix`, kode tersebut akan membuat sebuah projek folder bernama toko-flix.

Navigasikan terminal ke dalam folder tersebut dan jalankan `npm install @craco/craco craco-antd antd react-router-dom styled-components axios`

#### craco

Seperti yang sudah dijelaskan sebelumnya bahwa kita akan menggunakan ant design, dan kita perlu untuk mengganti paksa tema mereka dan salah satu caranya adalah menggunakan craco. Maka dari itu buat file `craco.config.js`

```jsx harmony
const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@menu-dark-item-active-bg": "red",
          "@card-background": "#434343",
          "@skeleton-to-color": "shade(#747474, 5%)",
        },
      },
    },
  ],
};
```

Bagian yang perlu kalian perhatikan adalah bagian `customizeTheme` disitulah di mana kalian dapat mengganti paksa variabel. Kita akan mengganti paksa

```
"@menu-dark-item-active-bg": "red",
"@card-background": "#434343",
"@skeleton-to-color": "shade(#747474, 5%)",
```

##### styled-components

Untuk membantu kita dalam melakukan _styling_ kita juga akan menggunakan styled-component.

##### react-router-dom

Dalam membantu kita melakukan _routing_ terhadap React, depedensi react-router-dom adalah dependesi yang sangat disarankan dan sangat mudah untuk digunakan.

##### axios

Kita menggunakan axios untuk melakukan _network request_.

#### index.js

```jsx harmony
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

Kita akan menambahkan `BrowserRouter`, `BrowserRouter` diperlukan untuk membungkus applikasi react kita sehingga _routing_ menggunakan react-router-dom dapat bekerja

#### App.js

```jsx harmony
import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.less";

import { Layout } from "antd";

const Home = React.lazy(() => import("./pages/Home/Home"));
const MovieDetail = React.lazy(() => import("./pages/MovieDetail/MovieDetail"));
const MyMovies = React.lazy(() => import("./pages/MyMovie/MyMovie"));

function App() {
  return (
    <Layout>
      <Header />
      <Suspense fallback={"Loading"}>
        <Switch>
          <Route exact path="/movie/:id" component={MovieDetail} />
          <Route exact path="/my-account/favorites" component={MyMovies} />
          <Route path="/" component={Home} />
        </Switch>
      </Suspense>

      <Footer />
    </Layout>
  );
}

export default App;
```

App.js adalah file pendukung kedua kita yang berguna sebagai pembungkus atau kerangka dari applikasi kita

```jsx harmony
// App.js
import "./App.less";
```

Seperti yang sudah dikatakan bahwa kita akan melakukan penggantian paksa terhadap variabel ant design maka dari itu kita menggunakan `.less`

```less
// App.less
@import "~antd/dist/antd.less";
```

Isi dari App.less pun hanya meng-_import_ dari ant design less

```
<Suspense fallback={"Loading"}>
    <Switch>
      <Route exact path="/movie/:id" component={MovieDetail} />
      <Route exact path="/my-account/favorites" component={MyMovies} />
      <Route path="/" component={Home} />
    </Switch>
</Suspense>
```

Pada baris ini kita mendefiniskan _routing_ yang akan kita punyai pada projek kita, dan _routing_ kita adalah:

1. `/movie/:id` yang akan melakukan _render_ terhadap komponen detail
2. `/my-account/favorites` yang akan me-_render_ komponen MyMovies
3. `/` yang mana menjadi rute dasar kita yang akan me-_render_ komponen home

Dapat dilihat bahwa kita membungkus kode kita dengan komponen `<Switch>`, komponen ini membuat kita hanya dapat me-render satu dari tiga komponen yang sudah kita define di atas

#### Pages

Seperti yang sudah kalian lihat di atas bahwa kita melakukan _routing_ untuk me-_render_ tiga buah komponen, dan komponen itu akan kita buat disebuah folder bernama `pages`

```
src
|--pages
   |--MovieDetail
      |--MovieDetail.jsx
   |--Home
      |--Home.jsx
   |--MyMovie
      |--MyMovie.jsx
```

##### Home.jsx

```jsx harmony
import React, { useEffect, use_state_ } from "react";
import { Layout, Row, Col, Skeleton, Card } from "antd";
import { useLocation } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import axios from "axios";

const { Content } = Layout;
const moviesUrl = {
  nowPlaying: `/movie/now_playing`,
  popular: `/movie/popular`,
  upcoming: "/movie/upcoming",
};

export const calculatePrice = (vote) => {
  let price;

  if (vote > 0 && vote <= 3) {
    price = `${vote * 3500}`;
  } else if (vote > 3 && vote <= 6) {
    price = `${vote * 8250}`;
  } else if (vote > 6 && vote <= 8) {
    price = `${vote * 16350}`;
  } else if (vote > 8 && vote <= 10) {
    price = `${vote * 21250}`;
  } else {
    price = "Unavailable";
  }
  return price;
};
```

_Import_ semua hal yang ada dikode di atas, kode di atas pun cukup jelas karena kita hanya meng-_import_ saja. Dapat kalian lihat juga bahwa kita meng-_import_ sebuah komponen `import MovieCard from "../../components/MovieCard/MovieCard";` Kalian dapat men-_copy_ component tersebut [di sini](https://github.com/MirzaChilman/mini-projek/tree/master/src/components)

```
 /* .... Rest of Code .... */
    price = "Unavailable";
  }
  return price;
};

const Home = () => {
  const location = useLocation();
  const [movies, setMovies] = use_state_([]);
  const [fetchingMovies, setFetchingMovies] = use_state_(false);

  const [favoritedMovies, setFavoritedMovies] = use_state_(
    JSON.parse(localStorage.getItem("favoritedMovies")) || []
  );
   /* Rest of code */
}
```

Pada bagian ini kita mendefinisikan **state** yang akan kita pakai, kita mempunyai tiga **state**:

1. `movies` adalah sebuah _state_ yang akan menyimpan semua data yang sudah kita dapatkan
2. `fetchingMovies` adalah sebuah _state_ yang menandakan jika applikasi sedang melakukan _request_ terhadap _network_ yang nantinya akan kita gunakan untuk menampilkan _placeholder_ gambar
3. `favoritedMovies` adalah _state_ yang kita butuhkan untuk menentukan apakah film tersebut sudah kita masukan kedalam daftar favorit atau belum. _state_ ini akan mengambil _state_ awal dari localStorage, dan jika tidak ditemukan di localStorage maka akan berupa array kosong. Perhatikan bahwa kode tersebut menggunakan `JSON.parse()`, fungsi tersebut berguna untuk mengubah sebuah _string array of object_ menjadi objek di JavaScript. Contoh kita mempunyai `const example = '{"result":true, "count":42}'` dengan `JSON.parse()` akan diubah menjadi `const example = {"result":true, "count":42}`, perhatikan bahwa tanda petik di awal hilang, yang menyebabkan hal tersebut mengubah data dari string menjadi _actual objek_ di JavaScript (lebih lanjut [di sini](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse))

Kita juga menggunakan `const location = useLocation()` kode ini berguna untuk mendapatkan `pathname` di mana _routing_ kita sedang berada, `useLocation` bekerja hampir sama dengan `window.location`.

```jsx harmony
/*  ... Rest of code ... */

const [favoritedMovies, setFavoritedMovies] = use_state_(
  JSON.parse(localStorage.getItem("favoritedMovies")) || []
);

useEffect(() => {
  const fetchMovie = async () => {
    // Fetching Movie
  };
  fetchMovie();
}, [location.pathname]);
```

Selanjutnya kita akan mendefinisikan sebuah `useEffect()`, `useEffect()` adalah sebuah _hooks_ pada React yang termasuk salah satu [lifecycle](https://reactjs.org/docs/hooks-effect.html), _lifecycle_ sendiri mempunyai tiga fase yaitu _mounting_, _updating_ dan _unmounting_. Pada useEffect ini kita akan melakukan sebuah fungsi `fetchMovie` yang akan dijalankan setiap kali `location.pathname` atau url berubah, perhatikan argumen kedua `useEffect()` yaitu `[location.pathname]` di sini kita bilang pada `useEffect` bahwa setiap kali _render_ terjadi dan `location.pathname` berubah maka jalankan `useEffect` ini lagi.

```jsx harmony
const fetchMovie = async () => {
  let response;
  const isNowPlaying = location.pathname.includes("now-playing");
  const isPopular = location.pathname.includes("popular");
  try {
    setFetchingMovies(true);
    if (isNowPlaying) {
      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}${moviesUrl.nowPlaying}?api_key=${process.env.REACT_APP_API_KEY}`
      );
    }
    if (isPopular) {
      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}${moviesUrl.popular}?api_key=${process.env.REACT_APP_API_KEY}`
      );
    }
    if (!isNowPlaying && !isPopular) {
      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}${moviesUrl.upcoming}?api_key=${process.env.REACT_APP_API_KEY}`
      );
    }
    setMovies(response.data.results);
  } catch (e) {
    console.error(e);
  } finally {
    setFetchingMovies(false);
  }
};
```

Pada kode di atas kita mendefinisikan tiga buah variabel yaitu `response`, `isNowPlaying`, dan `isPopular`.

1. Variabel `response` adalah variabel yang digunakan untuk menyimpan `response` hasil dari _network request_
2. `isNowPlaying` adalah sebuah boolean yang menentukan apakah url kita mengandung kata `now-playing`
3. `isPopular` adalah sebuah boolean yang menentukan apakah _url_ kita mengandung kata `popular`

Dengan bantuan `location.pathname` dari `react-router-dom` dan method `includes` kita dapat menentukan apakah lokasi kita sedang berada di salah satu url tersebut.

Baris selanjutnya menentukan _network request_ berdasarkan kondisi dari variabel `response`, di sini kita menggunakan paket `axios` untuk melakukan _network request_. Dapat kalian perhatikan bahwa kita mempunyai sebuah variabel `process.env` (baca lebih lanjut [di sini](https://create-react-app.dev/docs/adding-custom-environment-variables/#:~:text=Environment%20variables%20are%20embedded%20into,possibly%20read%20them%20at%20runtime.)). Buat sebuah file di _root_ folder applikasi kita bernama `.env` lalu isi dengan

```
// .env
REACT_APP_BASE_URL=https://api.themoviedb.org/3
REACT_APP_API_KEY=<movieDb_apiKey>
```

kalian dapat mendapatkan apikey dari movieDb [di sini](https://developers.themoviedb.org/3/getting-started/introduction). Ada dua hal yang perlu kalian perhatikan `setFetchingMovies(true);` dan `setMovies(response.data.results);`, di sini kita sudah mulai mengubah _state_ dari applikasi react kita. _state_ pertama kita mengubah `fetchingMovies` yang mana nantinya akan digunakan untuk menampilkan _loading_ komponen ketika applikasi melakukan _network request_, yang selanjutnya kita mengubah _state_ `movies` dengan hasil dari _network request_.

```jsx harmony
useEffect(() => {
  const fetchMovie = async () => {
    /* ... Rest of the code above ... */
  };
  fetchMovie();
}, [location.pathname]);

return (
  <Content
    style={{
      padding: "50px 50px",
      marginTop: 64,
      backgroundColor: "#323232",
    }}
  >
    <Row gutter={[16, 16]}>
      {!fetchingMovies && renderMovies()}
      {fetchingMovies && renderLoadingCards()}
    </Row>
  </Content>
);
```

Setelah itu karena kita sudah melakukan _network request_ hal yang dilakukan adalah me-_render_ hasilnya. Seperti yang sudah disebutkan bahwa kita akan menggunakan _state_ `fetchingMovies` untuk menandakan antara me-_render_ hasil atau me-_render_ sebuah komponen _loading_. Mari bahas fungsi `renderLoadingCards()`.

```jsx harmony
useEffect(() => {
  /* Rest of code */
}, [location.pathname]);

const renderLoadingCards = () => {
  const cards = [];
  for (let i = 0; i < 20; i++) {
    cards.push(
      <Col xs={24} md={12} lg={8} xl={6}>
        <Card bordered={false}>
          <Skeleton loading active />
          <Skeleton loading active />
          <Skeleton loading active />
        </Card>
      </Col>
    );
  }
  return cards;
};

return <Content>{/* Rest of code */}</Content>;
```

Fungsi `renderLoadingCards()` sangat simpel, fungsi ini akan me-_render_ 20 buah Card komponen milik ant design yang didalamnya berisi komponen Skeleton. Mengapa 20? karena data yang didapat dari _network_ mempunyai maksimal data 20 buah, ini ada hubungannya dengan _Content Layout Shift_ (CLS) yang dapat kalian [baca di sini](https://web.dev/cls/).

```jsx harmony
const renderMovies = () => {
  return (
    <>
      {movies.map((movie) => {
        const { poster_path, vote_average, title, overview, id } = movie;
        const isDisabled = favoritedMovies.find((movie) => {
          return movie.id === id;
        });
        return (
          <Col xs={24} md={12} lg={8} xl={6}>
            <div
              style={{
                color: "white",
              }}
            >
              <MovieCard
                poster_path={poster_path}
                id={id}
                vote_average={vote_average}
                title={title}
                overview={overview}
                price={calculatePrice(vote_average)}
                handleAddCollectionButton={() => {}}
                disabled={isDisabled}
              />
            </div>
          </Col>
        );
      })}
    </>
  );
};

const renderLoadingCards = () => {
  /* Rest of Code */
};
```

Selanjutnya ada fungsi `renderMovies()`, fungsi ini bertujuan untuk me-_render_ kumpulan film dari _state_ `movies`. Pada tahap ini _state_ `movies` kita akan berupa sebuah array of object `[{}]`, dan untuk melakukan iterasi atau _looping_ kita akan menggunakan _method_ `.map`. Perhatikan variabel `isDisabled`, `isDisabled` adalah sebuah boolean variabel yang menentukan apakah `movies` yang di-_loop_ sudah berada pada _state_ `favoritedMovies` jika iya maka akan bernilai `true` yang menyebabkan tombol `Add to my favorites` akan ter-_disable_.

Pada baris `const { poster_path, vote_average, title, overview, id } = movie;` kita melakukan [destructuring](https://www.codepolitan.com/forum/thread/detail/609/bagaimana-cara-kerja-destructuring). Setelah itu kita akan membuat sebuah fungsi yang berguna untuk menambahkan film yang kita pilih untuk dimasukan kedalam film favorit.

```jsx harmony
const handleAddFavoritesButton = (movie) => {
  const { poster_path, vote_average, title, overview, id } = movie;
  setFavoritedMovies((prev_state_) => {
    const combinedMovies = [
      ...prev_state_,
      { poster_path, vote_average, title, overview, id },
    ];
    localStorage.setItem("favoritedMovies", JSON.stringify(combinedMovies));
    return combinedMovies;
  });
};
```

Fungsi handleAddFavoritesButton membutuhkan sebuah argumen berupa data dari film yang kita pilih, film yang kita pilih tersebut kemudian akan digabungkan dengan data film favorit yang sebelumnya kita punya. Seperti yang kalian lihat bahwa `setFavoritedMovies((prev_state_) => {...}` kita menggunakan _state_ sebelumnya untuk kemudian digabungkan dengan data film baru dari film yang kita pilih, kemudian kita simpan gabungan film lama dan film baru yang kita simpan di variabel `combinedMovies` untuk disimpan di localStorage dan digunakan untuk memperbarui _state_ `favoritedMovies` kita.

Pada tahap ini kalian bisa menjalankan `npm start` maka applikasi kita sudah bekerja seperti gif dibawah ini atau [di sini](https://media.giphy.com/media/sxPQhc5MQjI8a2RWcJ/giphy.gif):

![Showcase](https://media.giphy.com/media/Aez2HKUg1xRSRZxQbj/giphy.gif)

##### MyMovie.jsx

Selanjutnya kita akan membuat page `MyMovie.jsx` yang akan menampilan kumpulan film yang sudah kita favoritkan sebelumnya.

```jsx harmony
/* pages/MyMovie/MyMovie.jsx */
import React, { useState } from "react";
import { Col, Layout, Row, Button, Empty } from "antd";
import MovieCard from "../../components/MovieCard/MovieCard";
import { calculatePrice } from "../../utils/utils";
import { background_color_main } from "../../colors";
const { Content } = Layout;

const MyMovie = () => {
  const [favoritedMovies, setFavoritedMovies] = useState(
    JSON.parse(localStorage.getItem("favoritedMovies")) || []
  );

  return (
    <Content
      style={{
        padding: "50px 50px",
        marginTop: 64,
        backgroundColor: background_color_main,
      }}
    >
      {/* .... */}
    </Content>
  );
};

export default MyMovie;
```

Pertama-tama mari _import_ semua hal yang kita perlukan, kemudian perhatikan bahwa pada komponen ini kita menggunakan _state_ yang sama seperti yang kita gunakan pada `Home.jsx`. Karena seperti yang sebelumnya diberitahukan bahwa komponen ini akan menampilkan kumpulan film yang sudah kita favoritkan.

Ada beberapa hal yang perlu diperhatikan:

1. Akan ada sebuah tombol untuk menghapus seluruh film yang telah difavoritkan, dan tombol ini hanya akan muncul jika kita punya satu atau lebih film yang sudah difavoritkan.
2. Jika tidak ada film yang pernah difavoritkan pada tampilkan sebuah indikator bahwa kita belum mempunyai film favorit

Mari kita mulai implemen hal tersebut satu-persatu. Pertama buatlah sebuah fungsi untuk me-_render_ film yang sudah berada dalam daftar favorit kita dengan nama fungsi `renderFavoriteMovies`

```jsx harmony
const renderFavoriteMovies = () => {
  return (
    <>
      <Row gutter={[0, 32]}>
        <Button
          ghost
          danger
          onClick={() => {
            setFavoritedMovies([]);
            localStorage.clear();
          }}
        >
          Clear favorites Movie
        </Button>
      </Row>
      <Row gutter={[16, 16]}>
        {favoritedMovies.map((movie) => {
          const { poster_path, vote_average, title, overview, id } = movie;
          const isDisabled = favoritedMovies.find((movie) => {
            return movie.id === id;
          });
          return (
            <Col xs={24} md={12} lg={8} xl={6}>
              <div
                style={{
                  color: "white",
                }}
              >
                <MovieCard
                  poster_path={poster_path}
                  id={id}
                  vote_average={vote_average}
                  title={title}
                  overview={overview}
                  price={calculatePrice(vote_average)}
                  disabled={isDisabled}
                />
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
```

Pada sintaks kode di atas terdapat dua `Row`, `Row` pertama akan memunculkan sebuah tombol untuk menghapus semua film yang sudah pernah difavoritkan, `Row` kedua akan me-_render_ kumpulan film yang sudah pernah difavoritkan, logika yang dipakai sama dengan logika pada fungsi `renderMovies()` pada `Home.jsx`

Kemudian, buat sebuah fungsi dengan nama `renderNoMovies`, fungsi ini akan ter-_render_ jika kita belum pernah mem-favoritkan film sama sekali.

```jsx harmony
const renderNoMovies = () => {
    return (
      <Row gutter={[16, 16]} justify={"center"}>
        <div
          style={{
            height: "69vh",
          }}
        >
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span
                style={{
                  color: "white",
                }}
              >
                No movies favorites yet
              </span>
            }
          />
        </div>
      </Row>
    );
};
```

Kode lengkap `MyMovie.jsx` dapat dilihat [di sini](https://github.com/MirzaChilman/mini-project/blob/master/src/pages/MyMovie/MyMovie.jsx)

##### MovieDetail.jsx

Komponen terakhir yang akan kita tulis adalah komponen `MovieDetail.jsx`, komponen ini akan berisikan detail dari film yang kita pilih, jika kalian lihat, komponen `MovieCard` mempunyai dua tombol, tombol berwarna merah akan membawa kita ke _url_ yang akan me-_render_ `MovieDetail.jsx`

```jsx harmony
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Layout, Image, Typography, Card } from "antd";
import axios from "axios";
import { calculatePrice } from "../../utils/utils";
import styled from "styled-components";
import {background_color_main} from "../../colors";

const { Title, Text } = Typography;
const { Content } = Layout;

const moviesUrl = {
  nowPlaying: `/movie/now_playing`,
  popular: `/movie/popular`,
  latest: `/movie/latest`,
  detail: "/movie",
};

const StyledTitle = styled(Title)`
  color: white !important;
`;

const StyledText = styled(Text)`
  color: white !important;
`;

const MovieDetail = () => {
  const params = useParams();
  const [movie, setMovie] = useState([]);
  const [credits, setCredits] = useState([]);

  return (
    <Content
      style={{
        padding: "50px 50px",
        marginTop: 64,
        backgroundColor: background_color_main,
      }}
    >
      <Row>
      {/* .... */}
      </Row>
    </Content>
  );
};

export default MovieDetail;
```

Mari kita mulai dengan hal yang sama, kita akan membuat kerangka komponen kita terlebih dahulu dengan meng-_import_ hal yang kita butuhkan. Pada komponen `MovieDetail.jsx`, kita akan mempunyai dua buah fungsi yang berguna untuk me-_render_ poster film dan detail film. Komponen ini akan mempunyai dua _state_, yaitu `movieDetail` untuk menyimpan detail informasi film dan `movieCredits` untuk menyimpan _credits_ dari film tersebut.

Pertama mari buat sebuah fungsi untuk me-_render_ poster film dengan nama fungsi `renderMoviePoster`. Fungsi `renderMoviePoster` sudah cukup jelas, fungsi ini mengambil nilai _state_ dari `movieDetail.poster_path` untuk mendapatkan _url_ gambar poster.

```jsx harmony
const renderMoviePoster = () => (
    <Col xs={23} sm={23} md={23} xl={11} offset={1}>
      <Image
        style={{
          height: "350px",
        }}
        src={`http://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
        alt={movie.title}
        placeholder
      />
    </Col>
);
``` 

Fungsi yang kedua adalah `renderMovieDetails`, pada fungsi ini komponen pun menggunakan sintaks yang cukup jelas, komponen menggunakan nilai dari _state_ `movieDetail` untuk menampilkan detail dari film dan `movieCredits` untuk menampilkan para _cast_ pemain pada film tersebut.

```jsx harmony
const renderMovieDetail = () => (
    <Col xs={24} sm={24} md={24} xl={12}>
      <StyledTitle
        style={{
          textAlign: "center",
        }}
      >
        {movieDetail.title}
      </StyledTitle>
      <Row justify="between">
        <Col md={8}>
          <StyledTitle level={5}>Rating: {movieDetail.vote_average} / 10</StyledTitle>
        </Col>
        <Col md={8}>
          <StyledTitle level={5}>
            Release Date: {movieDetail.release_date}
          </StyledTitle>
        </Col>
        <Col md={8}>
          <StyledTitle level={5}>Runtime: {movieDetail.runtime} minutes</StyledTitle>
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledTitle>
            Price: Rp.{calculatePrice(movieDetail.vote_average)}
          </StyledTitle>
          <StyledText>{movieDetail.overview}</StyledText>
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledTitle
            style={{
              marginTop: "16px",
            }}
          >
            Starring:
          </StyledTitle>
          <Row gutter={[16, 32]}>
            {movieCredits.map((credit) => {
              const { name, character, profile_path } = credit;
              return (
                <Col>
                  <Card
                    hoverable
                    bordered={false}
                    style={{ width: 160, minHeight: 350 }}
                    cover={
                      <Image
                        alt={name}
                        src={`http://image.tmdb.org/t/p/w400${profile_path}`}
                        placeholder
                        fallback={
                          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDg4PDxAPDg8NEA0PDg4PDQ8PEA0OFREWFhURExUYHSggGBolGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAPYAzQMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQFBgID/8QAMRABAAIBAQUHAwMEAwAAAAAAAAECAxEEBSExYRIyQVFxgbEiocETUpEzQmJyI4Lw/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDtAFJAAAAAAAABBadOenvwBI+FtppHO9Y94K7Vjn++J9wfcRE+nr5pAAAAAAAAAAAAAAAAABGoJfLPnrSNbTp5R4z6K23bfGPhXjf46yxcuS1pmbTrM/x7AvbRva09yOzHnOmqjky2t3rTPu8AIJSAs7Jt18c/ur5T+Gpj3pjtz1r58JlhAOnxZq27tqz0ieL25atpjlMx1iWjse9Jj6cn1V5a+MA2EorOsRpxieXWAEgAAAAAAAAAAAKu3bVGOsT/AHW7sLMue3jn/UyTPhX6Yj08QV5tMzMzOus6oAAAAAAABEpAam5tp4/p2nhPGs+UtZzOzX7N6T5Wj+HTgAAAAAAAAAAAA+O15Ozjvbyj7zwc1/738W9va2mG3W0R+fwwQAAAAAAAAAAK849YdW5R1UAkAAAAAAAAABCQFDfP9L/tX4lhtzfP9KP9q/EsMAAAAAAAAAAETLqcM61rPnWPhyzf3Vmm2PjzrMx7eALoAAAAAAAAAAAM/fU/8Uf7V+JYjf3pj1w26TFvbl+XPxIJAAAAAAAAAAbm5q6YtfO0/wAcGJEazERznhHu6XZsfZpWvlEA+oAAAAAAAAAAAImusTHm5zbtm/Tvp4TxrP8Ai6NU3jsn6leHerr2fTyBgB8xwmPKQAAAAAABEpesVO1atf3TEAv7o2WbW7cx9NeXWzaeMOKKVrWOVY0h7AAAAAAAAAAAAAABz+9cfZyzpyvEW9JVGtvrFrFbft1ifRkgAAAAAAiV7dGLtZe14UifeVGW/urFpi18bcwXIhKEgAAAAAAAAAAAAISgHzz44tS0T4xLmdOP2dPlyxWJmZiIiHM2nWZnrM+wIAAAAAAmHT7PXSlY/wAY+HMOh3bmi2OvnXhILQhIAAAAAAAAAAAPGS8V70xHrIPaht28Ix/THG3j0fDbN6c64/e0/hlTOvMHrLltedbTM9HnQAAAAAAAH0w57UntVnSfl8wG9sG3RkjTlfxjzXIctS81nWOcN/YtsjLEeFo5x59QWxEJAAAAAOs8ussHJvXJPLSvpCtkzWtztM+4OgybXjr3rxH3+FbJvbHHdi1uscIYgC9m3rktwjSkdOM/dTvebTraZmes6vIAAAAAAAAAAAAAmlpidYnSYQAv4d63r3oi8emk/ZobPvHHfhMzSfK3L+WAA6qOnH3jRLmMW0XpP02mPfWJX8G95jhkjXrUGwK2DbMd+VvaVjUHKgAAAAAAAAAAAAAAAAAAAAAAALOHbr0jSLcPDXirI0BIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k="
                        }
                        height={240}
                      />
                    }
                    bodyStyle={{
                      color: "white",
                    }}
                  >
                    {`${name}`}
                    &nbsp;
                    <span
                      style={{
                        color: "gold",
                      }}
                    >
                      as
                    </span>
                    &nbsp;
                    {`${character}`}
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Col>
  );
```

Jangan khawatir kode tersebut memang panjang, tapi sebenarnya kode tersebut minim logic karena kode tersebut hanya mengambil data dari _state_ dan menampilkannya. Sampai sini kalian sadar bahwa tidak akan ada apapun yang ditampilkan pada page `MovieDetail.jsx` ini, hal ini dikarenakan kita belum menulis _network request_ yang dibutuhkan. Berikut adalah _network request_ yang kita butuhkan

```jsx harmony
useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setFetchingMovie(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}${moviesUrl.detail}/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        setMovieDetail(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setFetchingMovie(false);
      }
    };
    const fetchMovieCredit = async () => {
      try {
        setFetchingMovie(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/movie/${params.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
        );
        console.log(response);
        const getCast = response.data.cast.slice(0, 4);
        setMovieCredits(getCast);
      } catch (e) {
        console.error(e);
      } finally {
        setFetchingMovie(false);
      }
    };
    fetchMovieCredit();
    fetchMovieDetail();
  }, []);
```

Kode lengkap dapat dilihat [di sini](https://github.com/MirzaChilman/mini-project/blob/master/src/pages/Detail/Detail.jsx).

#### Kesimpulan

Pada tutorial kali ini kita telah belajar untuk:

1. Melakukan _conditional rendering_ berdasarkan logika yang kita definisikan
2. Melakukan _side effect_ untuk melakukan _network request_
3. Melakukan penyimpanan data ke localStorage 
4. Melakukan looping terhadap tipe data array dan me-_render_ hasil looping tersebut
5. Melakuakn _routing_ pada React.
6. Menggunakan React hooks (useState, useLocation, useEffect, and etc)

Akhir kata, saya harap tutorial ini sudah cukup sebagai awalan kalian untuk mempunyai fondasi sebagaimana React bekerja dan bagaimana cara menghadapi _real world case_.