var Mall = {

    /**
     * Settings Object, holding application wide settings
     */
    Settings :{
        globalScale: 1,
        colors: {yellow: '#ff0', green: '#0f0', blue: '#00f', red: '#f00', purple: '#f0f', cyan: '#00ffe4'},
    },

    /**
     * Our main Territories object
     * It looks like:
     * Territories: {
     *     Alaska: {path: Kinetic.Path Object, color: String, name: 'Alaska', ...},
     *     ... 
     *  }
     */
    Store: {},

    /**
     * Some other variables
     */
    stage: null,
    mapLayer: null,
    topLayer: null,
    backgroundLayer: null,

    /**
     * Functions that we will use
     */
    init: function() { 
        Mall.setUpStoreObj();

    //Initiate a Kinetic stage
    Mall.stage = new Kinetic.Stage({
        container: 'map',
        width: 1620,
        height: 1000,
    });

    Mall.mapLayer = new Kinetic.Layer({
        scale: Mall.Settings.globalScale
    });

    Mall.topLayer = new Kinetic.Layer({
        scale: Mall.Settings.globalScale
    });

    Mall.drawBackgroundImg();
    Mall.drawStore();

    Mall.stage.add(Mall.backgroundLayer);
    Mall.stage.add(Mall.mapLayer);
    Mall.stage.add(Mall.topLayer);

    Mall.mapLayer.draw();

    Mall.divideStore();
},

    setUpStoreObj: function() {
        for(id in StoreNames) {

            var pathObject = new Kinetic.Path({
                data: StorePathData[id].path,
                id: id//set a unique id --> path.attrs.id
            });

            //Using a sprite image for territory names
            //see: drawImage() -- https://developer.mozilla.org/en-US/docs/Canvas_tutorial/Using_images , and see Kinetic.Image() docs for more
            var sprite = new Image();
            sprite.src = 'names.png';
            var storeNameImg = new Kinetic.Image({
                image: sprite,
                x: FontDestinationCoords[id].x,
                y: FontDestinationCoords[id].y,
                width: FontSpriteCoords[id].sWidth, //'destiantion Width' 
                height: FontSpriteCoords[id].sHeight, //'destination Height'
                crop: [FontSpriteCoords[id].sx, FontSpriteCoords[id].sy, FontSpriteCoords[id].sWidth, FontSpriteCoords[id].sHeight]

            });

            Mall.Store[id] = {
                name: StoreNames[id],
                path: pathObject,
                nameImg: storeNameImg,
                color: null,
                neighbors: Neighbors[id],
            };
        }
        
    },
   

    drawBackgroundImg: function() {
        Mall.backgroundLayer = new Kinetic.Layer({
            scale: Mall.Settings.globalScale
        });
        var imgObj = new Image();
        imgObj.src = null;
        
        var img = new Kinetic.Image({
            image: imgObj,
            //alpha: 0.8
        });
        Mall.backgroundLayer.add(img);
    }, 

    drawStore: function() {
        for (t in Mall.Store) {
            
            var path = Mall.Store[t].path;
            var nameImg = Mall.Store[t].nameImg;
            var group = new Kinetic.Group();

            //We have to set up a group for proper mouseover on territories and sprite name images 
            
            group.add(path);
            group.add(nameImg);
            Mall.mapLayer.add(group);
        
            //Basic animations 
            //Wrap the 'path', 't' and 'group' variables inside a closure, and set up the mouseover / mouseout events for the demo
            //when you make a bigger application you should move this functionality out from here, and maybe put these 'actions' in a seperate function/'class'
            

            (function(path, t, group) {
                group.on('mouseover', function() {
                    path.setFill('#eee');
                    path.setOpacity(0.3);
                    group.moveTo(Mall.topLayer);
                    Mall.topLayer.drawScene();
                });

                group.on('mouseout', function() {
                    path.setFill(Mall.Settings.colors[Mall.Store[t].color]);
                    path.setOpacity(0.4);
                    group.moveTo(Mall.mapLayer);
                    Mall.topLayer.draw();
                });

                group.on('click', function() {
                    var link = StoreLink.id;
                    var name = StoreNames[id];
                    newwindow=window.open(link,name,'left=10,top=10,height=500,width=300,left=75');
                    newdocument=newwindow.document;
                    newdocument.write("Figure out how to get coupons in here!");
                    location.hash = path.attrs.id;
                });


            })(path, t, group);
        }               
    },


    divideStore: function() {

        fillRandomColors();

        for(var id in Mall.Store) {
            var color = Mall.Store[id].color;
            
            var neighbors = Mall.Store[id].neighbors;

            //a VERY simple algorithm to make the map more equal
            var similarNeighbors = 0;
            for(var i = 0; i < neighbors.length; i++) {

                var currNeighbor = neighbors[i];
                if (Mall.Store[currNeighbor].color == color) {
                    similarNeighbors++;
                }
            }

            //how many similar neighbours we allow
            if (similarNeighbors > 2) {
                var newColor = getRandomColor();
                while (color == newColor) {
                    var newColor = getRandomColor();
                }
                Mall.Store[id].color = newColor;

                Mall.Store[id].path.setFill(Mall.Settings.colors[newColor]);
                Mall.Store[id].path.setOpacity(0.4);              
            }
        }

        Mall.mapLayer.draw();

        function fillRandomColors() {
            for(var id in Mall.Store) {
                var color = getRandomColor();
                Mall.Store[id].color = color;
                Mall.Store[id].path.setFill(Mall.Settings.colors[color]);
                Mall.Store[id].path.setOpacity(1.0);          

            }

        }

        /**
         * Returns a color name like 'yellow'
         */
        function getRandomColor() {
            var colors = ['yellow', 'green', 'blue'];
            //Math.random() returns between [0, 1), so don't worry
            var randomNum = Math.floor(Math.random()*(colors.length)); 
            return colors[randomNum];
        }
    }

}
