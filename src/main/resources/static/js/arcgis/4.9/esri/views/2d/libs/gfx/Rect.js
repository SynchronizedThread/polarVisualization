// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/tsSupport/extendsHelper","dojox/gfx/_base","./Shape"],function(c,e,g,f,h){Object.defineProperty(e,"__esModule",{value:!0});c=function(c){function d(b){var a=c.call(this)||this;a.shape=f.getDefault("Rect");a.rawNode=b;return a}g(d,c);d.prototype.getBoundingBox=function(){return this.shape};d.prototype.setShape=function(b){this.shape=f.makeParameters(this.shape,b);this.bbox=null;for(var a in this.shape)if("type"!==a&&"r"!==a){b=this.shape[a];if("width"===
a||"height"===a)b=0>b?0:b;this.rawNode.setAttribute(a,b)}null!=this.shape.r&&(this.rawNode.setAttribute("ry",this.shape.r),this.rawNode.setAttribute("rx",this.shape.r));return this};d.nodeType="rect";return d}(h.default);e.default=c});