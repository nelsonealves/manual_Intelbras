window.addEventListener('load', (value)=>{
    //document.getElementById("nav").innerHTML = "";
    //if (document.getElementById("select_model").value) add_navbar(models[document.getElementById("select_model").value]);

    document.getElementById("select_model").addEventListener("change", (value) => {
        console.log("value");
        let product = return_product(value.target.value);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain");

        var myInit = { method: 'GET',
               headers: myHeaders};
        
        console.log('http://localhost:8000/teste/'+product);
        if(product){
            fetch('http://localhost:8000/teste/'+product, myInit)
            .then(function(response) {
                return response.json();
            }).then(function(res) {
                add_navbar(res[value.target.value]);
            });
        //add_navbar(models[value.target.value]);
        }
    })
})

return_product = (value) => {
    let product = {
        "AP 310": "ap310",
        "AP 360": "ap360",
        "AP 1210": "ap1210",
        "AP 1350": "ap1350",
        "AP 1750": "ap1750"
    }
    return product[value]
}
select_option = (value) => {
    console.log(models[value]);
}

function add_navbar (model) {
    // Clear navbar
    if(document.getElementById("nav")) document.getElementById("nav").innerHTML = "";
    if(document.getElementById("body")) document.getElementById("body").innerHTML = "";
    console.log(model);
    model.map((section,i) => {
        console.log("section", i);
        console.log(section);
        // Add navbar section
        let li = return_li(section);
        // Add body content
        let section_body = return_section(section["seção"]);
        
        if(section["subseção"]){
            let ul = document.createElement("ul");
            section["subseção"].map( subsection => {
                // Add navbar subsection
                let li_ul = return_ul(subsection);
                // Add body content
                let subsection_body = return_section(subsection);
                ul.appendChild(li_ul);
                section_body.appendChild(subsection_body)
            })
            li.appendChild(ul);
        };
        document.getElementById("nav").appendChild(li)
        document.getElementById("body").appendChild(section_body);
    })
    
}

return_li = (value) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.setAttribute("href","#"+ value["seção"].id);
    let text = document.createTextNode(value["seção"]["name"]);
    a.appendChild(text);
    li.appendChild(a);

    return li;
}

return_ul = (value) => {
    let li_ul = document.createElement("li")
    let a_ul = document.createElement("a");
    a_ul.setAttribute("href","#"+ value.id);
    let text_ul = document.createTextNode(value["name"]);
    a_ul.appendChild(text_ul);
    li_ul.appendChild(a_ul);
    li_ul.setAttribute("class", "nav");
   
    return li_ul;
}

return_ull = () => {
    let ul = document.createElement("ul");
    ul.setAttribute("class", "nav hidden-xs hidden-sm");
    ul.setAttribute("id", "nav");
    ul.setAttribute("data-spy", "affix");
    ul.setAttribute("style","top: 150px;");

    return ul;
}



return_section = (value) => {
    let section = document.createElement('section')
    if(value["anotation"] == null) {
        section.innerHTML = value["file"]
    } else {
        section.innerHTML = value["file"] + "<br>"+ value["anotation"]
    }
    section.setAttribute("id", value["id"])

    return section;
}

