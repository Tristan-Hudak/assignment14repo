const getCrafts = async() => {
    try{
        //return (await (await fetch("http://localhost:3000/api/crafts"))).json();
        let response = await fetch("http://localhost/3000/api/crafts");
        return await response.json();
    }
    catch(error) {
        console.log("error reciveing data");
        return "";
    }
};

const showCrafts = async() => {

    let craftsJSON = await getCrafts();

    const craftDiv = document.getElementById("json-container");


    //const craftsJSON = await getCrafts();
    console.log(craftsJSON);
    
    if(craftsJSON == ""){
        console.log("sorry, no Animals");
        return;
    }

   

    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    const div4 = document.createElement("div");
    const div5 = document.createElement("div");

    const divConstructor = (currentDiv, num) => {
        //console.log(currentDiv);
        currentDiv.setAttribute("id", "div"+num);
        currentDiv.setAttribute("class", "img-size");
        currentDiv.classList.add("class","coll1o5");
        
    }

    const listConstrtor = (arraies) => {
        const modalSecUl = document.createElement("ul");

        arraies.forEach((array)=>{
            const listItem = document.createElement("li");
            listItem.innerHTML = array;
            modalSecUl.append(listItem);
        });

        return modalSecUl;
    }

    divConstructor(div1,1);
    divConstructor(div2,2);
    divConstructor(div3,3);
    divConstructor(div4,4);
    divConstructor(div5,5);


    craftDiv.append(div1);
    craftDiv.append(div2);
    craftDiv.append(div3);
    craftDiv.append(div4);
    craftDiv.append(div5);

    let modalCounter = 0;

    craftsJSON.forEach((craft) => {
        const section = document.createElement("section");
        section.classList.add("spacing");
        section.setAttribute("rel", "modal "+modalCounter);

        const img = document.createElement("img");
        img.setAttribute("id", "img-holder");
        img.setAttribute("rel", "modal "+modalCounter);
        img.src = "http://localhost/3000/images/" + craft.image;

        

        //modal creation
        const modalDiv = document.createElement("div");
        const modalBody = document.createElement("div");

        modalDiv.classList.add("modal")
        modalDiv.setAttribute("id", "modal "+modalCounter);
        modalDiv.classList.add("class", "show-hide");

        

        modalBody.classList.add("flex-box");
        modalBody.classList.add("modal-content");

        const modalExit = document.createElement("span");
        modalExit.setAttribute("id","farRight")
        modalExit.setAttribute("rel", "modal "+modalCounter);
        modalExit.setAttribute("class","close")
        modalExit.innerHTML =  `&times;`;

        const modalImg = document.createElement("img");
        modalImg.setAttribute("id", "img-modal");
        modalImg.src = "http://localhost/3000/images/" + craft.image;

        //text area

        const modalSection = document.createElement("section");
        modalSection.setAttribute("id", "sec-space")

        const modalSecTitle = document.createElement("h1");
        const modalSecDescrip = document.createElement("p");
        const modalSecUlTitle = document.createElement("h2");
        

        modalSection.append(modalSecTitle);
        modalSecTitle.innerHTML = craft.name;

        modalSection.append(modalSecDescrip);
        modalSecDescrip.innerHTML = craft.description;

        modalSection.append(modalSecUlTitle);
        modalSecUlTitle.innerHTML = "Supplies";

        modalSection.append(listConstrtor(craft.supplies));

        //order

        const modalContent = document.createElement("div");
        const modalHeader = document.createElement("div");

        modalContent.setAttribute("class", "coll1o2");
        modalContent.setAttribute("class", "flex-box");
        modalHeader.setAttribute("class", "coll1o2");

        modalHeader.append(modalExit);
        modalContent.append(modalImg);
        modalContent.append(modalSection);
        
        modalBody.append(modalContent);
        modalBody.append(modalHeader);
        


        modalDiv.append(modalBody);


        
        //entering right div
        

        if(craft.number == 1){
            div1.append(section);
            //console.log(1);
        }
        else if(craft.number == 2){
            div2.append(section);
            //console.log(2);
        }
        else if(craft.number == 3){
            div3.append(section);
            //console.log(3);
        }
        else if(craft.number == 4){
            div4.append(section);
            //console.log(4);
        }
        else if(craft.number == 5){
            div5.append(section);
            //console.log(5);
        }
        else {
            div1.append(section);
            //console.log(0);
        }

        
        //console.log(img.src);

        section.append(img);
        section.append(modalDiv);

        modalCounter++;
    });

    

    const showThatModal = (e) => {
        

        if( e.target.getAttribute("id") == "img-holder" || e.target.getAttribute("class") == "spacing" ){
            //console.log(e.target.getAttribute("rel"));
            const id = e.target.getAttribute("rel");
            console.log(id + "Open");
            document.getElementById(id).style.display = "block";

        }
        
    };

    const exitModal = (e) => {
        //console.log(e.target.getAttribute("id"));
        const modalsid = e.target.getAttribute("rel");
        //console.log(modalsid + "close");
        document.getElementById(modalsid).style.display = "none";
    }


    
    
    
    const container = document.querySelector("#json-container");

    const secMatches = container.querySelectorAll("section");
    const spanMatches = container.querySelectorAll("span");

    //console.log(matches);

    secMatches.forEach((sec)=>{
        //console.log(document.getElementById("exiter"));
        sec.onclick = showThatModal;
        
    });

    spanMatches.forEach((span)=>{
        span.onclick = exitModal;
    })
    

};

showCrafts();

