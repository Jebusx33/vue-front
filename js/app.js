/** clonar articulos por js */
                window.addEventListener("load", function(){
                    var template = document.getElementById("article__template");
                    var articles = document.getElementById("articles");

                    for(var i = 1; i <= 5; i++){
                        var clonado = template.cloneNode(true);
                        clonado.removeAttribute("id");

                        var h2 = clonado.getElementsByTagName("h2")[0];
                        h2.innerHTML = h2.textContent + ' ' + i;

                        articles.appendChild(clonado);
                    }
    
                });
        
