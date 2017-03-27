
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;
    $greeting.text('Bien, ¿así que quieres vivir en ' + address + '?');

    var streetviewURL = 'https://maps.googleapis.com/maps/api/streetview?size=1280x800&location=' + address + '&key=AIzaSyC1U9GNSQ0ausvex3bbc-0lirAug1qZUXw' + "";
    $body.append('<img class="bgimg" src= "' + streetviewURL + '">');


    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&apikey=ee5e5a5efcdc442b9250794bc2fb9da5';
      $.getJSON(nytimesUrl,function(data){
          $nytHeaderElem.text("Artículos del New York Times relacionados con " + cityStr);
          articulos = data.response.docs;
          for (var i = 0; i < articulos.length; i++){
            var articulo = articulos[i];
            var date = new Date(articulo.pub_date);
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            $nytElem.append('<li class="article">'+'<a href ="'+articulo.web_url+'">'+articulo.headline.main+'</a>'+'<p>'+ month[date.getMonth()] + ", " + date.getDate() + " - " + date.getFullYear() +'</p>'+'<p>'+ articulo.byline.original+'</p>'+'<p>'+ articulo.snippet+'</p>'+'</li>');
          }

      }).fail(function(){
        $nytHeaderElem.text("No es posible obtener conexión con New York Times ")});

        var wikiUrl = 'https://es.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + cityStr + '&namespace=0&limit=10';
        var wikiRequestTimeout = setTimeout(function(){
          $wikiElem.text("No es posible obtener conexión con Wikipedia");
        },8000);
        $.ajax(wikiUrl, {
          dataType: "jsonp",
          success: function(response){
            var listaArt = response[1];
            for (var i = 0; i < listaArt.length; i++){
              wikiArt = listaArt[i];
              var url = 'https://es.wikipedia.org/wiki/'+wikiArt;
              $wikiElem.append('<li class="article">'+'<a href ="'+url+'">'+wikiArt+'</a></li>');

            };
            clearTimeout(wikiRequestTimeout);
          }
        });






      return false;

  }



$('#form-container').submit(loadData);
