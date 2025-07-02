// (()=>{
//     "use strict";
//     const forms = document.querySelectorAll(".needs-validation");
//     Array.from(forms).forEach(form=>{
//         form.addEventListener(
//             "submit",
//             (event)=>{
//     if(!form.checkValidity()){
//         event.preventDefault();
//         event.stopPropagation();
//     }
//     form.classList.add("was-validated");
// } ,
// false     
//   );
//     });
// })();
document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    
    const forms = document.querySelectorAll(".needs-validation");

    forms.forEach(form => {
        form.addEventListener("submit", (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            else{
                console.log("form is valid!");
            }
            form.classList.add("was-validated");
        }, false);
    });
});
