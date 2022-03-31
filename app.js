const notOccupiedSeats = document.querySelectorAll(".row .seat:not(.occupied)"); // bos koltuklari tut
// console.log(notOccupiedSeats);
const movieSelectBox = document.querySelector("#movie");
const count = document.getElementById("count");
const film = document.getElementById("film");
const total = document.getElementById("total");
const container = document.querySelector(".container");
let price = movieSelectBox.options[movieSelectBox.selectedIndex].value;

window.addEventListener("load", () => {
  // cagirmak istedigimiz fonk load ile cagiriouz
  //get last selectedindexes, and last selected movie index and price
  displayUI();
  updateMovieInfo(price);
  //set last selected movie index and price
  // setMovieDataToStorage(movieSelectBox.selectedIndex, price);
});
const displayUI = () => {
  //sayfa yüklendiginde localstorageden güncel bilgilerin alinmasi gerekiyor, bu fonk bunun icin, güncel bilgiyi alcak.
  const selectedSeatsFromStorage = JSON.parse(
    // parse string ifadeyi array e cevirir
    localStorage.getItem("selectedSeats")
  );
  if (
    selectedSeatsFromStorage !== null &&
    selectedSeatsFromStorage.length > 0
  ) {
    notOccupiedSeats.forEach((seat, index) => {
      if (selectedSeatsFromStorage.indexOf(index) > -1) {
        // eslesmedigi zaman -1 gelir
        seat.classList.add("selected");
      }
    });
  }
  // console.log(selectedSeatsFromStorage);
};

// movieSelectBox.onchange = () =>{} onchange eski method onun yerine addevent kullanioz
movieSelectBox.addEventListener("change", (e) => {
  //change eventin adi, onchange event tetiklenince caliscak olan. onchange eski nesil
  let price = e.target.value; // e eventin maruz kaldigi elementin event
  updateMovieInfo(price); //price,e
  // console.log(e.target.value);
});

const updateMovieInfo = (filmPrice) => {
  // updateMovieInfo her tiklamada ve selectboxin degisiminde tetiklenir. o sebeple localStorage de saklanmali ya a database de
  let selectedSeats = document.querySelectorAll(".row .seat.selected"); //arada parent yapisi olmadigi icin bosluksuz yaziyoruz, paent mantigi olacaksa bosluklu olacak
  console.log(selectedSeats.length);
  // console.log(selectedSeats);

  // occupied olamayanlara göre selected seat lerin indexlerini tutan array
  const seatsIndexArray = [...selectedSeats].map((seat) =>
    [...notOccupiedSeats].indexOf(seat)
  );
  //
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndexArray)); //locakStorage de seatsIndexArray arrayini tutabilmek icin streing ifade olmali.
  // stringify serialization dur. tersi deserializationdur.stringify icine bir obje alir ve bunu string text haline getirir ve yukardaki gibi yazinca localStorage e yazdirir.
  const selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  film.innerText =
    movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split(
      "("
    )[0];
  // film.innerText = movieSelectBox[e.target.selectedIndex].innerText.split('(')[0];
  total.innerText = selectedSeatCount * parseFloat(filmPrice); // price string bir ifade old icin paseFloat ile integer yaptik
};

container.addEventListener("click", (e) => {
  // console.log(e.target);
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }
  let price = movieSelectBox.options[movieSelectBox.selectedIndex].value;
  // console.log(price);
  updateMovieInfo(price);
});
