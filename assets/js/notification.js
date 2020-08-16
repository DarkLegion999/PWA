function hasNetwork(online){
    console.log(online);
    alert("Trenutno niste online");

    /*$(document).ready(function() {
        $(".toast").toast("show");
      });*/

   // $('.toast').toast('show');
}

window.addEventListener("load", () => {
    //hasNetwork(navigator.onLine);
  
   /* window.addEventListener("online", () => {
        hasNetwork(true)});  */
        
    window.addEventListener("offline", () => {
        hasNetwork(false);
    });
  });

  