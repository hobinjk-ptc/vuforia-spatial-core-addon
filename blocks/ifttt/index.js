/**
 * @preserve
 *
 *                                     .,,,;;,'''..
 *                                 .'','...     ..',,,.
 *                               .,,,,,,',,',;;:;,.  .,l,
 *                              .,',.     ...     ,;,   :l.
 *                             ':;.    .'.:do;;.    .c   ol;'.
 *      ';;'                   ;.;    ', .dkl';,    .c   :; .'.',::,,'''.
 *     ',,;;;,.                ; .,'     .'''.    .'.   .d;''.''''.
 *    .oxddl;::,,.             ',  .'''.   .... .'.   ,:;..
 *     .'cOX0OOkdoc.            .,'.   .. .....     'lc.
 *    .:;,,::co0XOko'              ....''..'.'''''''.
 *    .dxk0KKdc:cdOXKl............. .. ..,c....
 *     .',lxOOxl:'':xkl,',......'....    ,'.
 *          .';:oo:...                        .
 *               .cd,    ╔═╗┌─┐┬─┐┬  ┬┌─┐┬─┐   .
 *                 .l;   ╚═╗├┤ ├┬┘└┐┌┘├┤ ├┬┘   '
 *                   'l. ╚═╝└─┘┴└─ └┘ └─┘┴└─  '.
 *                    .o.                   ...
 *                     .''''','.;:''.........
 *                          .'  .l
 *                         .:.   l'
 *                        .:.    .l.
 *                       .x:      :k;,.
 *                       cxlc;    cdc,,;;.
 *                      'l :..   .c  ,
 *                      o.
 *                     .,
 *
 *             ╦ ╦┬ ┬┌┐ ┬─┐┬┌┬┐  ╔═╗┌┐  ┬┌─┐┌─┐┌┬┐┌─┐
 *             ╠═╣└┬┘├┴┐├┬┘│ ││  ║ ║├┴┐ │├┤ │   │ └─┐
 *             ╩ ╩ ┴ └─┘┴└─┴─┴┘  ╚═╝└─┘└┘└─┘└─┘ ┴ └─┘
 *
 * Created by Valentin on 10/22/14.
 *
 * Copyright (c) 2015 Valentin Heun
 *
 * All ascii characters above must be included in any redistribution.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/**
 * @fileOverview
 * IFTTT is a block that triggers custom events on "If This Then That"
 * The event name and key can be generated on maker.ifttt.com and then set in this block's settings menu
 * The request includes the block's current value in the body in the format: {value1: thisBlock.processedData[0].value}
 *
 * Defines a new logic block that will appear in the crafting menu
 * Anytime data arrives at the block, the render function will be triggered.
 * The input data value(s) will arrive in thisBlock.data
 * After performing the block's behavior, write the output value(s) to thisBlock.processedData,
 * And finally call the callback function to send the data to whatever this block is next linked to
 *
 * gui/icon.svg is the small menu icon for the block
 * gui/label.svg is the full image on the block (for a block of blockSize=1 might be the same as icon.svg)
 * gui/index.html is the optional settings menu that pops up when you tap on the block
 */

var request = require('request');


var generalProperties = {
    // display name underneath icon in block menu
    name : "IFTTT",
    // set this to how wide the block should be - (the bigger of # inputs and # outputs)
    blockSize : 1,
    privateData : {},
    // these properties are accessible to user modification via the block's settings menu (gui/index.html)
    publicData : {
        eventName: "reality_editor_43bb26f9",
        ifttt_key: "cjizq-2cjLs9dasYKceqOB" //"d7KguEO4Vn2Xhut0sR0_JI"
    },
    // sets which input indices of the block can have links drawn to them
    activeInputs : [true, false, false, false],
    // sets which output indices of the block can have links drawn from them
    activeOutputs : [true, false, false, false],
    iconImage : "icon.png",
    // not currently used anywhere, but helpful for developer reference
    nameInput : ["in", "", "", ""],
    nameOutput : ["out", "", "", ""],
    // should match the folder name
    type : "IFTTT"
};

exports.properties = generalProperties;

/**
 * This defines how the value should be transformed before sending it to the destination
 * @param {string} object - objectID (object/frame/node/block specifies the "street address" of this block)
 * @param {string} frame - frameID
 * @param {string} node - nodeID
 * @param {string} block - blockID
 * @param {number} index - the index of which input was just received. for example, a block with two inputs will have its render function called twice - once with index 0 and once with index 1. it is up to the implemented to decide whether to trigger the callback when either index is triggered, or only once all indices have received values, etc.
 * @param {{data: Array.<number>, processedData: Array:<number>, ...}} thisBlock - reference to the full block data struct
 * @param {function} callback - should be triggered with these arguments: (object, frame, node, block, index, thisBlock)
 */
exports.render = function (object, frame, node, block, index, thisBlock, callback) {

    // data flows through it like normal
    for (var key in thisBlock.data[index]) {
        thisBlock.processedData[index][key] = thisBlock.data[index][key];
    }

    // BUT ALSO: makes a post request to the server endpoint configured in publicData
    console.log("making ifttt request to " + JSON.stringify(thisBlock.publicData));

    if (index === 0) {

        var endpointUrl = "https://maker.ifttt.com/trigger/" + thisBlock.publicData.eventName + "/with/key/" + thisBlock.publicData.ifttt_key;

        var requestBody = {value1: thisBlock.processedData[0].value};

        var options = {
            method: 'post',
            body: requestBody,
            json: true,
            url: endpointUrl
        };

        request(options, function (err, res, body) {
            if (err) {
                console.error('error posting json: ', err);
                throw err
            }
            var headers = res.headers;
            var statusCode = res.statusCode;
            console.log('headers: ', headers);
            console.log('statusCode: ', statusCode);
            console.log('body: ', body);
        });

    }

    callback(object, frame, node, block, index, thisBlock);
};

/**
 * @todo: not working yet
 */
exports.setup = function (object,frame, node, block, thisBlock, callback) {
// add code here that should be executed once.
    // var publicData thisBlock.publicData;
    // callback(object, frame, node, block, index, thisBlock);
};
