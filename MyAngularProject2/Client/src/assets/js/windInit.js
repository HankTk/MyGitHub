var mapObj;

var windytyInit = {
    key: 'PsL-At-XpsPTZexBwUkO7Mx5I',
    zoom: 1,


}

function windytyMain(map) {

    mapObj = '';
    var overlays = document.getElementById('overlays')

    overlays.onclick = function (event) {
        W.setOverlay(event.target.innerHTML)
    }

    mapObj = map;
    //mapObj.setZoom(1)
}


var markerGroup

function mapMarker(planes, vessels, alertP, deg, vesselDet, drawTrakerBool, cardtype) {
	if (cardtype === undefined) {
		 cardtype = 'default';
	}

    if (mapObj) {
        // mapObj.setZoom(1);

        markerGroup = L.layerGroup().addTo(mapObj);
        if (planes.length > 0) {
            if (planes[0] != undefined) {
                var shipIcon = L.icon({
                    iconUrl: '../../assets/img/ship-node-redL.png',
                    iconSize: [0, 0]

                });
                mapObj.setView(planes[0])
                console.log(planes);
                for (var i = 0; i < planes.length; i++) {

                    if (typeof alertP[i] != "undefined") {
                        shipIcon = L.icon({

                            iconUrl: '../../assets/img/vesselicons/' + alertP[i]

                        });
                    }

                    if (vessels[i][1] != "undefined" && typeof vessels[i][1] != "undefined") {
                        var marker1 = new L.marker(planes[i], {
                                icon: shipIcon,
                                title: vessels[i][1],
                                alt: vessels[i][0],
                                rotationAngle: deg[i],
                                id: vessels[i][0]

                            })
                            .on('click', markerClick)
                            .addTo(markerGroup)

                    }



                    //hide the popup close button 
                    if (drawTrakerBool != 1) {
                        marker1.on('mouseout', function (event) {
                            event.target.closePopup();
                        });
                        markerGroup.addLayer(marker1.bindPopup('', {
                                closeButton: false,
                                offset: L.point(0, -0)
                            })
                            .on('mouseover', marker1.openPopup.bind(marker1)));

                        marker1.on('popupopen', function (event, e) {
                            //popup content setup
                            var windcontent = function (values) {

                                if (values.length == 1) {
                                    var newObj = values;
                                } else {

                                    var newObj = values.filter(function (value) {
                                        return value.imoNo == event.target.options.id;
                                    })

                                    //   var newObj=values.filter(v => v.imoNo==event.target.options.id)
                                }
                                if (newObj) {
                                    try {
                                        var shipSpeed = '_';
                                        if(Number(newObj[0].speed)) {
                                            shipSpeed = Number(newObj[0].speed).toFixed(2).toString() +'  Knots';
                                        }

                                        if (cardtype == 'default')
                                        {
                                            return '<div id="popup" class="ol-popup ol-popup-windty">  ' +
                                            '<div class="panel panel-default"><div class="panel-heading clearfix"> ' +
                                            '<div class="panel-heading-main"><img _ngcontent-c4="" src="../../assets/images/ship-card.png"> ' +
                                            '<span id="vslName-content">'+ newObj[0].vesselName + '</span></div></div></div> ' +
                                             '<ul>'+
                                            '<li>LAT</li>'+
                                            '<li>'+ newObj[0].latitude+'</li>'+
                                            '<li>LONG</li>'+
                                            '<li>'+ newObj[0].longitude+'</li>'+
                                            '<li>SHIP SPEED</li>'+
                                            '<li>'+ shipSpeed +'</li>'+
                                            '<li>ENGINE SPEED</li>'+
                                            '<li>'+ Number(newObj[0].merpm).toFixed(2).toString() +'  RPM</li>'+
                                            '<li>WIND SPEED</li>'+
                                            '<li>'+ Number(newObj[0].windSpeed).toFixed(2).toString() +'  knots</li>'+
                                            '<li>DRAFT:FORE </li>'+
                                            '<li>'+ Number(newObj[0].forDraftWithoutNormal).toFixed(2).toString() +'  Meters</li>'+
                                            '<li>DRAFT:AFT</li>'+
                                            '<li>' + Number(newObj[0].aftrDraftWithoutNormal).toFixed(2).toString() +'  Meters</li>'+
                                            ' </ul>'+'</div>';
                                        } else {
                                            var status = 0;
                                            if (newObj[0].status === '--') {
                                                status = 0;
                                            } else if (newObj[0].status.trim().replace(/\s/g, '').toUpperCase() === 'ATANCHOR') {
                                                status = 100;
                                            } else {
                                                status = 40;
                                            }
                                            return '<div id="popup" class="ol-popup-windty"><div class="panel panel-default"><div class="panel-heading clearfix"> ' +
                                            '<small class="pull-right text-right">  ' +
                                            '<span><span class="'+ newObj[0].statusStyle + '" id="onOffClass-content"></span>' +
                                            '<span id="onOff-content">'+ newObj[0].onOff + '</span></span><br> ' +
                                            '<span id="date-content">'+ newObj[0].lastdate + '</span> ' +
                                            '</small><div class="panel-heading-main"><img _ngcontent-c4="" src="../../assets/images/ship-card.png"> ' +
                                            '<span id="vslName-content">'+ newObj[0].vesselName + '</span></div></div> ' +
                                            '<div class="panel-body"><div class="row"><div class="col-6"> ' +
                                            '<h4 class="no-bottom-margin"><span id="rpm-content">'+  Number(newObj[0].engineSpeed).toFixed(2).toString() + '</span> ' +
                                            '<small class="color2">RPM</small></h4></div><div class="col-6 text-right"> ' +
                                            '<h4 class="no-bottom-margin"><span id="knot-content"> '+ Number(newObj[0].shipSpeed).toFixed(2).toString() + '</span>' +
                                            '<small class="color2"> knots</small></h4> ' +
                                            '</div></div><div class="row"><div class="col-sm-12"><p class="push-bottom5 push-top5 content-ellipsis"> ' +
                                            '<span id="status-content">'+ newObj[0].status + '</span></p></div></div><div class="row"> ' +
                                            '<div class="col-6"><p class="no-margin line-1"><small> ' +
                                            '<span id="atd-content">ATD '+ newObj[0].atdday + '/' + newObj[0].atdmonth + '</span><br> ' +
                                            '<span class="color2" id="fromPort-content">'+ newObj[0].lastport + '</span></small></p> ' +
                                            '</div><div class="col-6 text-right"><p class="no-margin line-1"> ' +
                                            '<small><span id="eta-content">ETA '+ newObj[0].etaday + '/' + newObj[0].etamonth + '</span><br> ' +
                                            '<span class="color2" id="toPort-content">'+ newObj[0].nextport + '</span></small> ' +
                                            '</p></div></div><div class="row"><div class="col-sm-12"><div class="progress"> ' +
                                            '<div class="progress-bar bg-success" role="progressbar" id="divImgStatus" style="width: ' + status + '%;"> ' +
                                            '<span class="sr-only" id="progress-content">'+ status + '% </span> ' +
                                            '<img src="../../assets/images/arrow-green.png" class="arrow-end" style="display: inherit;width: auto;"> ' +
                                            '</div></div></div></div></div></div></div>';
                                        }
                                    } catch (err) {
                                        //   popup.setPosition([12345888.78848884, 123458988.554457457]);
                                        console.log(err);
                                    }
                                }


                            }



                            event.popup.setContent(windcontent(vesselDet));

                        });
                    }



                }
            }
        }




    } else {

        setTimeout(function () {

            mapMarker(planes, vessels, alertP, deg, vesselDet, drawTrakerBool, cardtype);
        }, 2000)
    }

    function markerClick(e) {

        localStorage.setItem("Windy_event", e.target.options.alt);
        window.dispatchEvent(new CustomEvent('windy', {
            detail: e.target.options.alt
        }));
    }
}


function mapTrack(planes, vessel) {

    if (mapObj) {
        if (markerGroup == undefined) {
            markerGroup = L.layerGroup().addTo(mapObj);
        } else {
            clearMarker();
        }
        //mapObj.setZoom(1);

        if (planes.length > 0) {
            if (planes[0] != undefined) {
                mapObj.setView(planes[0])
                var polyline = new L.polyline(
                    planes, {
                        color: 'red',
                        weight: 3,
                        opacity: 2,
                        //dashArray: '5,5',
                        lineJoin: 'round'
                    }
                ).addTo(markerGroup);
            }
        }
    } else {

        setTimeout(function () {
            //console.log('runing again traxcker', planes);
            mapTrack(planes);
        }, 2000)
    }
}

function clearMarker() {
    if (markerGroup) {
        console.log('marker group is ', markerGroup);
        markerGroup.clearLayers()
        markerGroup = L.layerGroup().addTo(mapObj)
    }
}

function clearMap() {
    mapObj = undefined
}

export var windModule = (function () {

    var proto_initIcon = L.Marker.prototype._initIcon;
    var proto_setPos = L.Marker.prototype._setPos;

    var oldIE = (L.DomUtil.TRANSFORM === 'msTransform');

    L.Marker.addInitHook(function () {
        var iconOptions = this.options.icon && this.options.icon.options;
        var iconAnchor = iconOptions && this.options.icon.options.iconAnchor;
        if (iconAnchor) {
            iconAnchor = (iconAnchor[0] + 'px ' + iconAnchor[1] + 'px');
        }
        this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center bottom';
        this.options.rotationAngle = this.options.rotationAngle || 0;

        // Ensure marker keeps rotated during dragging
        this.on('drag', function (e) {
            e.target._applyRotation();
        });
    });

    L.Marker.include({
        _initIcon: function () {
            proto_initIcon.call(this);
        },

        _setPos: function (pos) {
            proto_setPos.call(this, pos);
            this._applyRotation();
        },

        _applyRotation: function () {
            if (this.options.rotationAngle) {
                this._icon.style[L.DomUtil.TRANSFORM + 'Origin'] = this.options.rotationOrigin;

                if (oldIE) {
                    // for IE 9, use the 2D rotation
                    this._icon.style[L.DomUtil.TRANSFORM] = 'rotate(' + this.options.rotationAngle + 'deg)';
                } else {
                    // for modern browsers, prefer the 3D accelerated version
                    this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
                }
            }
        },

        setRotationAngle: function (angle) {
            this.options.rotationAngle = angle;
            this.update();
            return this;
        },

        setRotationOrigin: function (origin) {
            this.options.rotationOrigin = origin;
            this.update();
            return this;
        }
    });

    return {

        init_marker: function () {

            var f = ["maps", "prototypes", "rootScope", "broadcast", "object", "mapsCtrl", "trans", "broadcast", "calendar", "http", "jsonLoader", "overlays", "products", "colors", "legend", "windytyUI", "windytyCtrl"];
            L || this.c("Missing Leaflet library. Add leaflet library into HEAD seaction of your code"), /0.7.5|0.7.7/.test(L.version) || this.c("Wrong version of Leaflet library. Version 0.7.5 or 0.7.7 required"), windytyInit.key || this.c("Missing API key");

            var g = "https://api.windytv.com/v2.3/",
                h = document.getElementById("windyty");

            var parent = this;

            h || this.c("Missing DIV with windyty id"), h.innerHTML = '<div id="map_container" style="width:100%; height:100%;"></div><div id="contrib">OSM & contributors</div><div id="legend"></div><canvas id="jpg_decoder" style="display: none;" ></canvas><div id="globe_container"></div><a class="logo" href="https://www.windytv.com" target="wndt"><img class="w" src="https://www.windytv.com/img/ikona.svg"><img class="text" src="https://www.windytv.com/img/logo-windytv.svg"></a>', this.b(g + "api.css"), this.a("https://www.windytv.com/gfs/minifest.js", function () {
                parent.a(g + "api.js?key=" + windytyInit.key, parent.d)
            })

        },

        init_track: function () {
            var f = ["maps", "prototypes", "rootScope", "broadcast", "object", "mapsCtrl", "trans", "broadcast", "calendar", "http", "jsonLoader", "overlays", "products", "colors", "legend", "windytyUI", "windytyCtrl"];
            L || this.c("Missing Leaflet library. Add leaflet library into HEAD seaction of your code"), /0.7.5|0.7.7/.test(L.version) || this.c("Wrong version of Leaflet library. Version 0.7.5 or 0.7.7 required"), windytyInit.key || this.c("Missing API key");

            var g = "https://api.windytv.com/v2.3/",
                h = document.getElementById("windytyT");

            var parent = this;

            h || this.c("Missing DIV with windyty id"), h.innerHTML = '<div id="map_container" style="width:100%; height:100%;"></div><div id="contrib">OSM & contributors</div><div id="legend"></div><canvas id="jpg_decoder" ></canvas><div id="globe_container"></div><a  class="logo" href="https://www.windytv.com" target="wndt"><img  class="w" src="https://www.windytv.com/img/ikona.svg"><img  class="text" src="https://www.windytv.com/img/logo-windytv.svg"></a>', this.b(g + "api.css"), this.a("https://www.windytv.com/gfs/minifest.js", function () {
                parent.a(g + "api.js?key=" + windytyInit.key, parent.d)
            })
        },

        a: function (a, b) {
            var c = document.createElement("script");
            c.type = "text/javascript", document.head.appendChild(c), c.async = !0, c.onload = b || function () {}, c.onerror = function () {
                console.error("Failed to load" + a)
            }, c.src = a
        },

        b: function (a) {
            var b = document.createElement("link");
            b.rel = "stylesheet", b.href = a, document.head.appendChild(b)
        },

        c: function (a) {
            throw alert(a), a
        },

        d: function (d) {
            var parent = this;
            var f = ["maps", "prototypes", "rootScope", "broadcast", "object", "mapsCtrl", "trans", "broadcast", "calendar", "http", "jsonLoader", "overlays", "products", "colors", "legend", "windytyUI", "windytyCtrl"];
            W.require(f, function (a) {
                W.setTimestamp = W.windytyUI.setTimestamp.bind(W.windytyUI),
                    W.setOverlay = W.windytyUI.setOverlay.bind(W.windytyUI),
                    W.setLevel = W.windytyUI.setLevel.bind(W.windytyUI),
                    W.timeline = W.windytyUI.calendar,
                    W.on = W.broadcast.on.bind(W.broadcast),
                    W.off = W.broadcast.off.bind(W.broadcast),
                    W.once = W.broadcast.once.bind(W.broadcast),
                    W.fire = W.broadcast.emit.bind(W.broadcast);
                windytyMain(a)
            }), setTimeout(function () {
                console.log("Welcome to Windyty API: Please  do not remove, or hide Windyty logo and link from a map.")
            }, 1e3)
        },

        drawMarker: function (planes, vessels, alertP, deg, vesselDet, drawTrakerBool, cardtype ) {


            mapMarker(planes, vessels, alertP, deg, vesselDet, drawTrakerBool, cardtype);
        },
        drawTrack: function (planes, vessel, alertP, deg, vesselDet, drawTrakerBool, cardtype) {

            mapTrack(planes, vessel);
            this.drawMarker([planes[0]], vessel, alertP, deg, vesselDet, drawTrakerBool, cardtype)

        },

        clearMarker: function () {
            clearMarker()
        },

        clearMap: function () {
            clearMap()
        }

    }
})();