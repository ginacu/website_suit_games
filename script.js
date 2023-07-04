function getPilihanKomputer() {
    // inputan dari komputer
    // generate bilangan random
    const comp = Math.random()
    if (comp <= 0.34) return 'gajah';
    if (comp >= 0.34 && comp <= 0.67) return 'orang';
    return 'semut';
}

function getHasil(comp, player) {
    // rules
    if (player == comp) return "SERI"
    if (player == 'gajah') return (comp == 'orang') ? 'MENANG' : 'KALAH';
    if (player == 'orang') return (comp == 'semut') ? 'MENANG' : 'KALAH';
    if (player == 'semut') return (comp == 'gajah') ? 'MENANG' : 'KALAH';
}

// Cara agar pilihan komputer yang random itu bergerak secara acak sebelum player memilih pilihannya
function putar() {
    const imgComputer = document.querySelector('.img-komputer');
    const gambar = ['gajah', 'orang', 'semut'];
    let i = 0; // memakai let karena akan berubah2 isinya
    
    const waktuMulai = new Date().getTime(); // ini berfungsi untuk "mendapatkan waktu saat itu" atau waktu ketika fungsi putar() dijalankan, hal ini dilakukan agar satu detik kemudian setelah putar() dijalankan maka akan berhenti
    setInterval(function() { // setInterval() merupakan fungsi untuk melakukan sesuatu secara berulang2 selama interval waktu tertentu
        if (new Date().getTime() - waktuMulai > 1000) { // if ini berfungsi untuk "kalau pengulangan waktunya sudah 1 detik, maka berhentikan"
            clearInterval;
            return; // ini dilakukan supaya keluar dari function, dengan itu maka pengulangan/putar() akan beneran berhenti
        }
        
        imgComputer.setAttribute('src', 'assets/img/' + gambar[i++] + '.png');
        if( i == gambar.length) i = 0;
    }, 100) // 100 artinya 0,1 detik, jadi artinya setiap 0,1 detik itu ganti2 gambarnya
}

// SCORE
// const skorKomputer = document.querySelectorAll('.skor-komputer p');
// const skorPlayer = document.querySelectorAll('.skor-player p');
// let nKomputer = 0;
// let nPlayer = 0
// function skor() {
//     if (hasil == 'MENANG') return skorPlayer.innerHTML = nPlayer++;
//     else if (hasil == 'KALAH') return skorKomputer.innerHTML = nKomputer++;
// }

// seleksi tombol gajah, orang, dan semut
// Cara 1, cuma 1 statement

var nPlayer = 0;
var nKomputer = 0;

const pilihan = document.querySelectorAll('li img');
pilihan.forEach(function(i) {
    i.addEventListener('click', function() {
        const pilihanComputer = getPilihanKomputer();
        const pilihanPlayer = i.className; // fungsi className untuk mengambil nama kelas di element i
        const hasil = getHasil(pilihanComputer, pilihanPlayer);

        // memanggil fungsi putar()
        putar()
        
        setTimeout(function() {
            // ganti gambar pilihan komputer
            const imgComputer = document.querySelector('.img-komputer');
            imgComputer.setAttribute('src', 'assets/img/' + pilihanComputer + '.png');
            
            // masukkan hasil berupa tulisan di kotak tengah
            const info = document.querySelector('.info');
            info.innerHTML = hasil;            
            
            skorPlayer.innerHTML = nPlayer;
            skorKomputer.innerHTML = nKomputer;       
            
        }, 1000);
        
        if (hasil == 'MENANG') {
            nPlayer += 1;
        }
        else if (hasil == 'KALAH') {
            nKomputer += 1;
        }
    
        const skorPlayer = document.querySelector('.skor-player p');
        const skorKomputer = document.querySelector('.skor-komputer p');

    })
});

// tombol reset score
const reset = document.querySelector('.ya p');
reset.addEventListener('click', function() {
    location.reload()
})