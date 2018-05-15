// connect four game

(function() {
    var col = $("#board .col");
    var currentPlayer;
    var player1result = 0;
    var player2result = 0;
    var slots = $("#board .slot");

    if (typeof currentPlayer === "undefined") {
        start();
        choosePlayer();
        playGame();
    }

    function playGame() {
        console.log(
            "Game is on:",
            player1result,
            player2result,
            "Current player:",
            currentPlayer
        );
        col.on("click.board", function(e) {
            var emptySlot;
            var slotsInColumn = $(e.currentTarget).find(".slot");
            e.stopPropagation();

            for (var r = 5; r >= 0; r--) {
                if (
                    !slotsInColumn.eq(r).hasClass("player1") &&
                    !slotsInColumn.eq(r).hasClass("player2")
                ) {
                    emptySlot = slotsInColumn.eq(r);
                    emptySlot.addClass(currentPlayer);

                    var slotsInRow = $(".row" + r);

                    break;
                }
            }

            if (hasWon(slotsInColumn)) {
                col.off("click.board");
                console.log("Winnner in columns");
                winner();
                return;
            } else if (hasWon(slotsInRow)) {
                col.off("click.board");
                console.log("Winnner in rows");

                winner();
                return;
            } else if (hasWonDiagonally(slots)) {
                col.off("click.board");
                console.log("Winnner in diagonals");

                winner();
                return;
            }

            switchPlayers();
        });
    }

    function start() {
        var start = $("#startslide");

        $("#startslide .startbutton").on("click", function(e) {
            start.css({ animation: "moveout 1.5s 0s 1" });
            e.stopPropagation();
            setTimeout(function() {
                start.css({ display: "none" });
            }, 1400);
        });
    }

    function choosePlayer() {
        $(".home").on("click", function(e) {
            var ct = $(e.currentTarget);
            ct.prepend("<p>Go go go !!!</p>");
            if (ct.children().hasClass("player1")) {
                currentPlayer = "player1";
            } else {
                currentPlayer = "player2";
            }
            $(".home").off("click");
        });
    }

    function switchPlayers() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    function hasWon(slots) {
        var str = "";
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                str += "w";
            } else {
                str += "l";
            }
        }
        return str.indexOf("wwww") > -1;
    }

    function hasWonDiagonally(slots) {
        var diagonalMatches = [
            [0, 7, 14, 21],
            [1, 8, 15, 22],
            [2, 9, 16, 23],
            [6, 13, 20, 27],
            [7, 14, 21, 28],
            [8, 15, 22, 29],
            [12, 19, 26, 33],
            [18, 25, 32, 39],
            [19, 26, 33, 40],
            [13, 20, 27, 34],
            [14, 21, 28, 35],
            [18, 13, 8, 3],
            [19, 14, 9, 4],
            [20, 27, 34, 41],
            [20, 15, 10, 5],
            [36, 31, 26, 21],
            [30, 25, 20, 15],
            [24, 19, 14, 9],
            [37, 32, 27, 22],
            [31, 26, 21, 16],
            [25, 20, 15, 10],
            [38, 33, 28, 23],
            [32, 27, 22, 17],
            [26, 21, 16, 11]
        ];
        for (var i = 0; i < diagonalMatches.length; i++) {
            if (
                slots.eq(diagonalMatches[i][0]).hasClass(currentPlayer) &&
                slots.eq(diagonalMatches[i][1]).hasClass(currentPlayer) &&
                slots.eq(diagonalMatches[i][2]).hasClass(currentPlayer) &&
                slots.eq(diagonalMatches[i][3]).hasClass(currentPlayer)
            ) {
                return true;
            }
        }
    }

    function winner() {
        var winneralert = $(".winneralert");
        var looser;
        winneralert.css({
            zIndex: "10"
        });
        $(".home").css({ background: "darkolivegreen" });

        if (currentPlayer === "player1") {
            looser = $(".home.player2");
            player1result++;
            winneralert.css({
                animation: "slidetoright 1s forwards ease-in"
            });
        } else {
            looser = $(".home.player1");
            player2result++;
            winneralert.css({
                animation: "slidetoleft 1s forwards ease-in"
            });
        }

        winneralert.find("h1").text("Hooray " + currentPlayer);
        winneralert
            .find("p")
            .text("Winning " + player1result + " : " + player2result);
        looser.addClass("off");
        slots.addClass(currentPlayer);
        slots.addClass("off");

        $(".winneralert").on("mousedown", function(e) {
            if ($(e.target).hasClass("restartbutton")) {
                winneralert.css({ animation: "moveout 1.5s 0s forwards" });
                slots.removeClass("player1 player2 off");
                $(".home").removeClass("off");
                console.log("Taking off the winneralert listener handler");
                //// FIXED : was noting the event listener
                $(".winneralert").off();
                console.log("Calling from winner() to play game");
                playGame();
            } else if ($(e.target).hasClass("cancelbutton")) {
                slots.addClass(winner);
                winneralert.css({ animation: "moveout 1.5s 0s forwards" });
                setTimeout(function() {
                    $("#board-controls").addClass("off");
                }, 2000);
            }
        });
    }
})();
