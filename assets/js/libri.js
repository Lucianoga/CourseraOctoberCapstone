const ul = document.getElementById('libri');

let url ;
if (document.location.href === 'https://progettohypermedia2019.herokuapp.com/assets/pages/letturepreferite.html'){
    url = 'https://progettohypermedia2019.herokuapp.com/api/libro/preferiti'
}
else if(document.location.href === 'https://progettohypermedia2019.herokuapp.com/assets/pages/nuoviprodotti.html' || 'https://progettohypermedia2019.herokuapp.com/assets/pages/bestseller.html'|| 'https://progettohypermedia2019.herokuapp.com/assets/pages/tuttiprodotti.html'){
    url = 'https://progettohypermedia2019.herokuapp.com/api/libro';
}

else {
    let id_of_the_page = window.location.pathname.split("/").slice(-1)[0];
    id_of_the_page = id_of_the_page.substring(0, id_of_the_page.lastIndexOf("."));
    url = 'https://progettohypermedia2019.herokuapp.com/api/libro/'+ id_of_the_page;
}



fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        console.log(data);
        // Create and append the li's to the ul
        //let libri = data; // Get the results
        return data.map(function(libro) { // Map through the results and for each run the code below
            let row = createNode('div'),
                div = createNode('div'), //  Create the elements we need
                img = createNode('img'),
                div2 = createNode('div'),
                titolo = createNode('h2'),
                autore = createNode('p'),
                descrizione = createNode('p'),
                prezzo = createNode('p'),
                isbn = createNode('p'),
                br = createNode('br'),
                ISBN = createNode('p'),
                Prezzo = createNode('p'),
                tema= createNode('p'),
                genereLetterario = createNode('p'),
                digitale = createNode('p'),
                DataPubblicazione = createNode('p'),
                CasaEditrice = createNode('p');


            row.classList.add('row-flex');
            row.classList.add('d-flex');
            row.classList.add('rowdrop');
            row.classList.add('justify-content-center');
            div.classList.add('column');
            img.src = libro.Immagine;  // Add the source of the image to be the src of the img element
            //img.classList.add('img-left');
            descrizione.classList.add('text-justify');
            prezzo.classList.add('text-justify');
            isbn.classList.add('text-justify');
            div2.classList.add('column');
            titolo.innerHTML = `${libro.Titolo}`;
            titolo.classList.add("text-center");
            descrizione.innerText= `${libro.Descrizione}`;
            Prezzo.innerHTML = "Prezzo: "+`${libro.Prezzo}`;
            ISBN.innerText = "ISBN: " +`${libro.ISBN}`;
            tema.innerText = "Tema: " +`${libro.Tema}`;
            genereLetterario.innerText = "Genere: " +`${libro.Genere_Letterario}`;
            if (libro.Digitale === false){
                digitale.innerText = "Non é disponibile il formato ebook.";
            }
            else{
                digitale.innerText = "E' disponibile anche in formato Ebook.";
            }

            DataPubblicazione.innerText = "Data pubblicazione: " +`${libro.Data_Pubblicazione}`.substring(0,10);;
            CasaEditrice.innerText = "Casa editrice: " +`${libro.Casa_Editrice}`;
            autore.innerText = "Autore/i: ";
            //link al libro singolo
            var a = createNode('a');
            a.href= "./libro/"+`${libro.id}`+ ".html" ;

            var linkimg = createNode('a');
            linkimg.href= "./libro/"+`${libro.id}`+ ".html" ;
            //gestione autori


            autore.innerHTML = "Autore/i: ";


            let nomeAutore;
             async function getAutore(id){
                 let urlAutore = 'https://progettohypermedia2019.herokuapp.com/api/autore/'+ id;
                 let response = await fetch(urlAutore);
                 let autore = await response.json();
                 return  autore;
             }
            //primo autore
             getAutore(`${libro.Id_Autore}`)
                .then(function(data) {
                    console.log(data);

                    return data.map(function (tabellaAutore) { // Map through the results and for each run the code below
                        let urlAutore = 'https://progettohypermedia2019.herokuapp.com/assets/pages/autore/'+ libro.Id_Autore + '.html';
                        nomeAutore = `${tabellaAutore.Nome}`;
                        autore.innerHTML = autore.innerHTML + "<a href='"+urlAutore+"'>" + nomeAutore + "</a>" ;
                    });

                });

            //secondo autore
            if (libro.Id_Autore2 !== null) {

                getAutore(`${libro.Id_Autore2}`)
                    .then(function (data) {
                        console.log(data);

                        return data.map(function (tabellaAutore) { // Map through the results and for each run the code below
                            let urlAutore = 'https://progettohypermedia2019.herokuapp.com/assets/pages/autore/'+ libro.Id_Autore2 + '.html';
                            nomeAutore = `${tabellaAutore.Nome}`;
                            autore.innerHTML = autore.innerHTML + ", " + "<a href='"+urlAutore+"'>" + nomeAutore + "</a>";
                        });

                    });
            }

            //terzo autore

            if (libro.Id_Autore3 !== null) {
                getAutore(`${libro.Id_Autore3}`)
                    .then(function (data) {
                        console.log(data);

                        return data.map(function (tabellaAutore) { // Map through the results and for each run the code below
                            let urlAutore = 'https://progettohypermedia2019.herokuapp.com/assets/pages/autore/' + libro.Id_Autore3 + '.html';
                            nomeAutore = `${tabellaAutore.Nome}`;
                            autore.innerHTML = autore.innerHTML + ", " + "<a href='" + urlAutore + "'>" + nomeAutore + "</a>";
                        });

                    });
            }

            //quarto autore
            if (libro.Id_Autore4 !== null) {

                getAutore(`${libro.Id_Autore4}`)
                    .then(function (data) {
                        console.log(data);

                        return data.map(function (tabellaAutore) { // Map through the results and for each run the code below
                            let urlAutore = 'https://progettohypermedia2019.herokuapp.com/assets/pages/autore/'+ libro.Id_Autore4 +'.html';
                            nomeAutore = `${tabellaAutore.Nome}`;
                            autore.innerHTML = autore.innerHTML + ", " + "<a href='"+urlAutore+"'>" + nomeAutore + "</a>";
                        });

                    });
            }

            //acquista
            if (localStorage.user_id) {

                carrello = createNode('button');
                carrello.innerHTML = "ACQUISTA";
                carrello.classList.add('btn');
                carrello.classList.add('btn-danger','text-center');
                carrello.addEventListener('click', async _ => {
                    try {
                        const response = await fetch('https://progettohypermedia2019.herokuapp.com/api/carrello/inserisciElemento', {
                            method: 'post',
                            body: JSON.stringify({
                                "idUtente": localStorage.getItem('user_id'),
                                "idLibro": `${libro.id}`
                            }),
                            headers: {'Content-Type': 'application/json'}

                        });
                        alert("Il prodotto è stato inserito correttamente nel carrello");
                        console.log('Completed!', response);
                    } catch (err) {
                        console.error(`Error: ${err}`);
                    }
                });
            }



            // Make the HTML of our span to be the first and last name of our author
            append(row,div);
            append(div,linkimg);
            append(linkimg, img); // Append all our elements
            append(row, div2);


            append(div2, a);
            append(a, titolo);

            //append(div2, descrizione);
            append(div2, autore);
            append(div2, CasaEditrice);
            append(div2, digitale);
            append(div2, DataPubblicazione);
            append(div2, genereLetterario);
            append(div2, tema);

            append(div2, Prezzo);
            append(div2, prezzo);
            append(div2, ISBN);
            append(div2, isbn);
            if (localStorage.user_id) {
                append(div2, carrello);
            }
            append(ul,row);
            append(ul,br);
            append(ul,br);
        })
    });
document.body.classList.add('wait');

// Saluto utente
if (window.location.href === 'https://progettohypermedia2019.herokuapp.com/assets/pages/nuoviprodotti.html'){


    if (localStorage.user_id) {

    let saluto = 'https://progettohypermedia2019.herokuapp.com/api/user/' + localStorage.getItem('user_id');
    const divSaluto = document.getElementById('salutoUtente');
    divSaluto.style.setProperty('display', 'block', 'important');
    fetch(saluto)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            console.log(data);

                let testo = createNode('h1');
                testo.innerHTML = "Benvenuto "+ `${data.nome}` + ",";
                testo.classList.add('text-center');
                append(divSaluto,testo);

        });

    }
}

function createNode(element) {
    return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
    return parent.appendChild(el); // Append the second parameter(element) to the first one
}