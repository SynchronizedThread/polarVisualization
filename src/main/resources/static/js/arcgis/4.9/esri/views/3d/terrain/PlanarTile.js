// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../../../core/ObjectPool ../lib/gl-matrix ../support/mathUtils ./Tile ./TileGeometryFactory".split(" "),function(h,v,m,n,p,l,q,r){h=function(c){function a(b,t,d,f){var g=c.call(this,a.NumSubdivisionsAtLevel)||this;g.tileUp=u;void 0!==b&&g.init(b,t,d,f);return g}m(a,c);a.prototype.init=function(b,a,d,f){c.prototype.init.call(this,b,a,d,f);this.edgeLen=this.extent[2]-this.extent[0];this.edgeLen2=this.edgeLen*this.edgeLen;this.curvatureHeight=
0;this.centerAtSeaLevel[0]=l.lerp(this.extent[0],this.extent[2],.5);this.centerAtSeaLevel[1]=l.lerp(this.extent[1],this.extent[3],.5);this.centerAtSeaLevel[2]=0;this.updateRadiusAndCenter()};a.prototype.updateRadiusAndCenter=function(){c.prototype.updateRadiusAndCenter.call(this);var b=(this.extent[2]-this.extent[0])*Math.SQRT1_2,a=.5*(this.elevationBounds[0]-this.elevationBounds[1]);this.radius=Math.sqrt(b*b+a*a)};a.prototype.isVisible=function(a){if(!this.intersectsClippingArea)return!1;for(var b=
this.extent[0],d=this.extent[1],f=this.elevationBounds[0],g=this.extent[2],c=this.extent[3],h=this.elevationBounds[1],k=0;6>k;++k){var e=a[k];if(0<e[0]*(0<e[0]?b:g)+e[1]*(0<e[1]?d:c)+e[2]*(0<e[2]?f:h)+e[3])return!1}return!0};a.prototype.createGeometry=function(a,c,d){a.needsUpdate=!1;r.createPlanarGlobeTile(a.numVertsPerRow,this.extent,a.samplerData,c,d,a.clippingArea,this.renderData);this.updateMemoryUsed()};a.NumSubdivisionsAtLevel=[2,2,2,2,2,2,2,2];a.Pool=new n(a);return a}(q);var u=p.vec3d.createFrom(0,
0,1);return h});