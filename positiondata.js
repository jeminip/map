/**
 * Basic structure that maps the id's to territory names. 
 * We use this structure to build the Risk.Territories Object
 * @type {Object}
 */
var StoreNames = {	
    Nordstrom: 'Nordstrom',
    ZGallerie: 'Z Gallerie',
    WetSeal: 'Wet Seal',
    
};

var StoreLink = {
	Nordstrom: 'www.google.com', 
}

/**
 * Containts the neighbour data for the specific territories
 * @type {Object}
 */
var Neighbors = {
    Nordstrom: ['ZGallerie'],
    ZGallerie: ['Nordstrom'],
    WetSeal: ['ZGallerie'],
};	


//
var CenterPoints = {
    Nordstrom: {x:0, y:0},
    ZGallerie: {x:301, y:325},
    WetSeal: {x:380, y:324},
};