

$(function(){
   
    var waterJugs = {

        // initialize water jugs
        init: function() {
            this.wjBuild();
        },

        // configuration variables
        wjConfig: {
            jugs: $("section > ul li"),
            fillJugButton: $("section > ul li").find("ul li:first-child"),
            transferButton: $("section > ul li").find("ul li:eq(1)"),
            emptyJugButton: $("section > ul li").find("ul li:last-child"),
            win: $("#win"),
            largeJugSize: 5,
            smallJugSize: 3,
            targetAmount: 4
        },

        // build water jugs function
        wjBuild: function() {

            this.wjEvents();
        },

        // water jugs even handlers
        wjEvents: function() {
            
            // show/hide menus
            this.wjConfig.jugs.hover(
                function () {
                    $(this).children("ul").show();
                },
                function () {
                   $(this).children("ul").hide();
                }
            );

            // fill jug buttons
            this.wjConfig.fillJugButton.click(function() {
                var jugIndex = $(this).parents("li").index();
                var fillCount = $(this).parents("li").find("span");

                if(jugIndex === 0) {
                    fillCount.html(waterJugs.wjConfig.largeJugSize);
                }
                else {
                    fillCount.html(waterJugs.wjConfig.smallJugSize);   
                }
            });

            // transfer between jugs buttons
            this.wjConfig.transferButton.click(function() {

                var jugIndex = $(this).parents("li").index();
                var largeFillCount = $(this).parents("ul").find("li:first-child span");
                var largeFillNum = parseInt(largeFillCount.html()); // a
                var largeEmptyNum = (waterJugs.wjConfig.largeJugSize - largeFillNum); // x
                var smallFillCount = $(this).parents("ul").find("li:last-child span");
                var smallFillNum = parseInt(smallFillCount.html()); // b
                var smallEmptyNum = (waterJugs.wjConfig.smallJugSize - smallFillNum); // y
                
                // transfer from large jug
                var wjLargeJugTransfer = function() { 
                    if(smallFillNum < waterJugs.wjConfig.smallJugSize) {
                        if(largeFillNum < waterJugs.wjConfig.smallJugSize) {
                            smallFillCount.html(largeFillNum - smallFillNum);
                            largeFillCount.html(smallFillNum);
                        }
                        else {
                            smallFillCount.html(smallEmptyNum);
                            largeFillCount.html(largeFillNum - smallEmptyNum);
                        }
                    }
                    else {
                        console.log("small jug is full");
                    }
                    testAmount();
                };

                // transfer from small jug
                var wjSmallJugTransfer = function() {
                    if(largeFillNum < waterJugs.wjConfig.largeJugSize) {
                        if(largeFillNum >= waterJugs.wjConfig.smallJugSize) {
                            smallFillCount.html(smallFillNum - largeEmptyNum);
                            largeFillCount.html(smallFillNum + largeEmptyNum);
                        }
                        else {
                            smallFillCount.html(0);
                            largeFillCount.html(smallFillNum + largeFillNum);   
                        }
                    }
                    else {
                        console.log("large jug is full");
                    }
                    testAmount();
                };

                // test to see if target amount was reached
                var testAmount = function() {
                    var amount = $("section > ul li").find("span").html();
                    if(amount == waterJugs.wjConfig.targetAmount) {
                        $("#win").show();
                    }
                };
                
                // which jug?
                if(jugIndex === 0){
                    wjLargeJugTransfer();
                }
                else if(jugIndex === 1) {
                    wjSmallJugTransfer();
                }
                
            });
            
            // empty jug button
            this.wjConfig.emptyJugButton.click(function() {
                $(this).parents("li").find("span").html("0");
            });

            // hide win screen
            this.wjConfig.win.click(function() {
                $(this).hide();
            });

        }

    }

    // call water jugs initilization 
    waterJugs.init();

});