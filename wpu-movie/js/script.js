// fungsi searchMovie
function searchMovie(){
    // kosong kan dulu data sebelumnya, baru setelah itu req dan tampilkan
    $('#movie-list').html('');

    // req menggunakan ajax
    $.ajax({
        // parameter object
        // mau ngambil data dari mana
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        // menggunakan ajax bisa menyimpan datanya disini 'data:', bukan di url
        data: {
            'apikey': '928ae633',
            // s untuk search
            's': $('#search-input').val()
        },
        // jika succes,artinya ajax nya dikirim. makan jalankan function
        success: function (result) {
            // console.log(result);
            // jika berhasil
            if ( result.Response == "True" ){
                // maka datanya ambil juga tampikan
                let movies = result.Search;
                // looping array movies
                $.each(movies, function(i,data){
                    // setiap datanya masukan(append) ke dalam #movie-list
                    // backtik (`), agar tidak lagi memperdulikan spasi
                    // data-id="" - untuk mengambil data id
                    $('#movie-list').append(`
                        <div class="col-md-3">
                            <div class="card mb-3">
                                <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">`+ data.Title +`</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">See detail</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
                // jika success maka hilangkan value pencarian
                $('#search-input').val('');

            } else {
                // jika tidak ada data yang sesuai
                // menggunakan backtik(`) tidak harus string, jadi fleksibel dari pada menggunakan (' atau ") 
                $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">` + result.Error + `</h1>
                    </div>
                `);
            }
        }

    });
}

// jalan kna sebuah function ketika tombol di klik
$('#search-button').on('click', function(){
    // panggil fungsi searchMovie
    searchMovie();
});

// ketika tombol enter di tekandi dalam inputan
$('#search-input').on('keyup', function(e){
    // ketika e punya key kode == 13, tombol enter. source https://keycode.info
    // bisa menggunakan keycode atau which
    if ( e.which == 13 ){
        searchMovie();
    }
});

// jquery tolong carikan saya element #movie-list, lalu ketika saya klik element .see-detail di dalamnya(baikitu muncul nya dari awal/nanti)
$('#movie-list').on('click', '.see-detail', function(){
    // cara mengambil data-id="`+ data.id +`" pada element html
    // console.log($(this).data('id'));
    // maka jalankan ajax
    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey' : '928ae633',
            // i untuk id
            // $(this) adalah tombol see detail yang kita klik
            'i': $(this).data('id')
        },
        // jika succes, maka jalankan function
        success: function(movie) {
            // jika id nya benar
            if ( movie.Response == "True" ) {
                // maka ganti isi html nya
                $('.modal-body').html(`
                    <div class=""container-fluid>
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster +`" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
                                <li class="list-group-item">Released : `+ movie.Released +`</li>
                                <li class="list-group-item">Genre : `+ movie.Genre +`</li>
                                <li class="list-group-item">Actors : `+ movie.Actors +`</li>
                            </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});