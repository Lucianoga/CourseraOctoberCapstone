 if (localStorage.user_id) {
    //nascondo barra di login se l'utente è loggato
     var loginButton = document.getElementById("loginbutton");
        loginButton.style.display ="none";
     //mostro carrello
     var carrello = document.getElementById("pulsanteUtenteLoggato");
        carrello.style.display = "block";
     //logout
     var logout = document.getElementById("logout");
        logout.style.display = "block";
    }

