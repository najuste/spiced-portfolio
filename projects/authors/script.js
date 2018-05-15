var jsondata = {
    authors: [
        {
            name: "Kahlil Gibran",
            born: 1883,
            died: 1931,
            selectedWritings: [
                "The Prophet",
                "Sand and Foam",
                "The Earth Gods"
            ],
            quote:
                "We live only to discover beauty. All else is a form of waiting.",
            photo:
                "https://upload.wikimedia.org/wikipedia/commons/8/87/Khalil_Gibran.jpg"
        },
        {
            name: "Oscar Wilde",
            born: 1854,
            died: 1900,
            selectedWritings: [
                "The Picture of Dorian Gray",
                "The Importance of Being Earnest",
                "De Profundis"
            ],
            quote:
                "The bureaucracy is expanding to meet the needs of the expanding bureaucracy.",
            photo:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Oscar_Wilde_Sarony.jpg/800px-Oscar_Wilde_Sarony.jpg"
        },
        {
            name: "Haruki Murakami",
            born: 1949,
            died: "",
            selectedWritings: ["A Wild Sheep Chase", "Norvegian Wood"],
            quote:
                "Memories warm you up from the inside. But they also tear you apart.",
            photo:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/HarukiMurakami.png/220px-HarukiMurakami.png"
        },
        {
            name: "Mikhail Bulgakov",
            born: 1891,
            died: 1940,
            selectedWritings: [
                "The Master and Margarita",
                "A Country Doctor's Notebook"
            ],
            quote:
                "Just like a murderer jumps out of nowhere in an alley, love jumped out in front of us and struck us both at once.",
            photo:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bulgakov1910s.jpg/442px-Bulgakov1910s.jpg"
        },
        {
            name: "Albert Camus",
            born: 1913,
            died: 1960,
            selectedWritings: [
                "The Stranger",
                "Teh Plague",
                "The Myth of Sisyphus"
            ],
            quote:
                "You will never be happy if you continue to search for what happiness consists of. You will never live if you are looking for the meaning of life.",
            photo:
                "https://upload.wikimedia.org/wikipedia/commons/0/08/Albert_Camus%2C_gagnant_de_prix_Nobel%2C_portrait_en_buste%2C_pos%C3%A9_au_bureau%2C_faisant_face_%C3%A0_gauche%2C_cigarette_de_tabagisme.jpg"
        }
    ]
};

Handlebars.templates = Handlebars.templates || {};

var templates = document.querySelectorAll(
    'script[type="text/x-handlebars-template"]'
);

Array.prototype.slice.call(templates).forEach(function(script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});

var authors = document.querySelector("#fav-authors");
authors.innerHTML = Handlebars.templates.temp({
    data: jsondata
});
