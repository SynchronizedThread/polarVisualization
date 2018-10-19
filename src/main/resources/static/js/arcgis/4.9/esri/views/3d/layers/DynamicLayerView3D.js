// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../../../core/tsSupport/decorateHelper ../../../core/Handles ../../../core/Logger ../../../core/promiseUtils ../../../core/accessorSupport/decorators ../../../geometry/Extent ../../../geometry/support/aaBoundingRect ./LayerView3D ./support/overlayImageUtils ./support/projectExtentUtils ../lib/gl-matrix ../support/debugFlags ../webgl-engine/Stage ../webgl-engine/lib/RenderGeometry ../webgl-engine/lib/Texture ../webgl-engine/materials/DefaultMaterial ../../layers/RefreshableLayerView".split(" "),
function(n,G,r,h,t,u,v,f,p,g,w,q,x,y,z,l,A,B,C,D){var E=u.getLogger("esri.views.3d.layers.DynamicLayerView3D");n=function(m){function c(){var a=null!==m&&m.apply(this,arguments)||this;a.supportsDraping=!0;a.hasDraped=!0;a.fullExtentInLocalViewSpatialReference=null;a.overlayUpdating=!1;a.maximumDataResolution=null;a._handles=new t;a._images=[];a._extents=[];return a}r(c,m);Object.defineProperty(c.prototype,"drawingOrder",{get:function(){return this._get("drawingOrder")},set:function(a){if(a!==this._get("drawingOrder")){this._set("drawingOrder",
a);var b=new Set;this._images.forEach(function(e){e&&e.material&&(e.material.renderPriority=a,b.add(e.material.id))});0<b.size&&(this.view._stage.getDrapedTextureRenderer().updateRenderOrder(b),this.emit("draped-data-change"))}},enumerable:!0,configurable:!0});c.prototype.initialize=function(){var a=this;this.drawingOrder=this.view.getDrawingOrder(this.layer.uid);this.addResolvingPromise(x.toViewIfLocal(this).then(function(b){return a._set("fullExtentInLocalViewSpatialReference",b)}));this._handles.add(this.watch("suspended",
function(){return a._suspendedChangeHandler()}));var b=this.notifyChange.bind(this,"suspended");this._handles.add(this.view.resourceController.registerIdleFrameWorker({idleBegin:function(){a._isScaleRangeActive()&&b()}}));this._isScaleRangeLayer()&&this._handles.add([this.layer.watch("minScale",b),this.layer.watch("maxScale",b)],"layer");this._handles.add([this.watch("fullOpacity",this._opacityChangeHandler.bind(this)),this.layer.on("redraw",this._layerRedrawHandler.bind(this))],"layer")};c.prototype.destroy=
function(){this.clear();this._handles.destroy()};c.prototype.setDrapingExtent=function(a,b,e,k,c){k=this._extentAndSizeAtResolution(b,e,k);b=k.size;k=k.extent;if("imageMaxWidth"in this.layer||"imageMaxHeight"in this.layer){var d=this.layer.imageMaxWidth,f=this.layer.imageMaxHeight;b.width>d&&(b.height=Math.floor(b.height*d/b.width),b.width=d);b.height>f&&(b.width=Math.floor(b.width*f/b.height),b.height=f)}d=this._extents[a];d&&g.equals(d.extent,k)&&!this._imageSizeDiffers(k,e,d.imageSize,b)||(this._extents[a]=
{extent:g.create(k),spatialReference:e,imageSize:b,renderLocalOrigin:c},this.suspended||this._fetch(a))};c.prototype.getGraphicFromGraphicUid=function(a){return v.reject()};c.prototype.clear=function(){for(var a=0;a<this._images.length;a++)this._clearImage(a)};c.prototype.doRefresh=function(){this.suspended||this.refetch()};c.prototype.canResume=function(){if(!this.inherited(arguments))return!1;if(this._isScaleRangeLayer()){var a=this.layer,b=a.minScale,a=a.maxScale;if(0<b||0<a){var e=this.view.scale;
if(e<a||0<b&&e>b)return!1}}return!0};c.prototype.isUpdating=function(){if(this.overlayUpdating)return!0;for(var a=0,b=this._images;a<b.length;a++)if(b[a].loadingPromise)return!0;return!1};c.prototype.processResult=function(a,b){if(b instanceof HTMLImageElement||b instanceof HTMLCanvasElement)a.image=b};c.prototype.updateImage=function(a){return!1};c.prototype.refetch=function(){for(var a=0;a<this._extents.length;a++)this._extents[a]&&this._fetch(a)};c.prototype.beforeFetch=function(){};c.prototype.findExtentInfoAt=
function(a){for(var b=0,e=this._extents;b<e.length;b++){var c=e[b],d=c.extent;if((new p(d[0],d[1],d[2],d[3],c.spatialReference)).contains(a))return c}return null};c.prototype._imageSizeDiffers=function(a,b,e,c){if(!this.maximumDataResolution||z.TESTS_DISABLE_UPDATE_THROTTLE_THRESHOLDS)return!0;b=g.width(a)/this.maximumDataResolution.x;a=g.height(a)/this.maximumDataResolution.y;a=Math.abs(a/e.height-a/c.height);return 1.5<Math.abs(b/e.width-b/c.width)||1.5<a?!0:!1};c.prototype._fetch=function(a){var b=
this;if(!this.suspended){this.beforeFetch();var e=this._extents[a],c=e.extent,d=new p(c[0],c[1],c[2],c[3],e.spatialReference);this._images[a]||(this._images[a]={texture:null,material:null,rendergeometry:null,loadingPromise:null,image:null,pixelData:null,renderExtent:g.create(c)});var f=this._images[a];f.loadingPromise&&f.loadingPromise.cancel();0===d.width||0===d.height?this._clearImage(a):(f.loadingPromise=this.layer.fetchImage(d,e.imageSize.width,e.imageSize.height,{requestAsImageElement:!0}),f.loadingPromise.then(function(e){g.set(f.renderExtent,
c);b.processResult(f,e);b._createStageObjects(a,f.image);0===a&&b._images[1]&&b._images[1].rendergeometry&&b._createStageObjects(1,null);b.notifyChange("updating");b.emit("draped-data-change")}).catch(function(a){a&&"CancelError"!==a.name&&"cancel"!==a.dojoType&&E.error(a);b.notifyChange("updating")}).always(function(){f.loadingPromise=null}),this.notifyChange("updating"))}};c.prototype._clearImage=function(a){a=this._images[a];var b=this.view._stage;a&&(a.rendergeometry&&(b.getDrapedTextureRenderer().removeRenderGeometries([a.rendergeometry]),
a.rendergeometry=null),a.texture&&(b.remove(l.ModelContentType.TEXTURE,a.texture.id),a.texture=null),a.material&&(b.remove(l.ModelContentType.MATERIAL,a.material.id),a.material=null),a.loadingPromise&&(a.loadingPromise.cancel(),a.loadingPromise=null),a.image=null,a.pixelData=null)};c.prototype._createStageObjects=function(a,b){var c=this.view._stage,f=c.getDrapedTextureRenderer(),d=this._images[a];b&&(d.texture&&c.remove(l.ModelContentType.TEXTURE,d.texture.id),d.texture=new B(b,"dynamicLayer",{width:b.width,
height:b.height,wrapClamp:!0}),c.add(l.ModelContentType.TEXTURE,d.texture));d.material?b&&d.material.setParameterValues({textureId:d.texture.id}):(d.material=new C({ambient:[1,1,1],diffuse:[0,0,0],transparent:!0,opacity:this.fullOpacity,textureId:d.texture.id,receiveSSAO:!1},"dynamicLayer"),d.material.renderPriority=this.drawingOrder,c.add(l.ModelContentType.MATERIAL,d.material));b=this._extents[a].renderLocalOrigin;if(0===a)a=q.createGeometryForExtent(d.renderExtent,-1);else if(1===a){a=this._images[0].renderExtent;
if(!a)return;a=q.createOuterImageGeometry(a,d.renderExtent,-1)}else{console.error("DynamicLayerView3D._createStageObjects: Invalid extent idx");return}c=new A(a);c.material=d.material;c.origin=b;c.transformation=y.mat4d.identity();c.name="dynamicLayer";c.uniqueName="dynamicLayer#"+a.id;f.addRenderGeometries([c]);d.rendergeometry&&f.removeRenderGeometries([d.rendergeometry]);d.rendergeometry=c};c.prototype._isScaleRangeLayer=function(){return"minScale"in this.layer&&"maxScale"in this.layer};c.prototype._isScaleRangeActive=
function(){return this._isScaleRangeLayer()?0<this.layer.minScale||0<this.layer.maxScale:!1};c.prototype._extentAndSizeAtResolution=function(a,b,c){var e=g.width(a)/g.height(a),d={width:c,height:c};1.0001<e?d.height=c/e:.9999>e&&(d.width=c*e);b=this._clippedExtent(a,b,F);d.width=Math.round(d.width/(g.width(a)/g.width(b)));d.height=Math.round(d.height/(g.height(a)/g.height(b)));return{size:d,extent:b}};c.prototype._clippedExtent=function(a,b,c){if("local"!==this.view.viewingMode)return g.set(c,a);
b=this.view.basemapTerrain;var e=b.extent;return b.ready&&e?g.intersection(a,e,c):g.set(c,a)};c.prototype._opacityChangeHandler=function(a){for(var b=0,c=this._images;b<c.length;b++){var f=c[b];f&&f.material&&f.material.setParameterValues({opacity:a})}this.emit("draped-data-change")};c.prototype._layerRedrawHandler=function(){for(var a=!1,b=0;b<this._images.length;b++){var c=this._images[b];this.updateImage(c)&&(a=!0,this._createStageObjects(b,c.image))}a&&this.emit("draped-data-change")};c.prototype._suspendedChangeHandler=
function(){if(this.suspended)this.clear(),this.emit("draped-data-change");else for(var a=0;a<this._extents.length;a++)this._fetch(a)};h([f.property()],c.prototype,"layer",void 0);h([f.property({dependsOn:["view.scale","layer.minScale","layer.maxScale"]})],c.prototype,"suspended",void 0);h([f.property({type:Boolean})],c.prototype,"supportsDraping",void 0);h([f.property({type:Boolean})],c.prototype,"hasDraped",void 0);h([f.property({value:0,type:Number})],c.prototype,"drawingOrder",null);h([f.property({readOnly:!0})],
c.prototype,"fullExtentInLocalViewSpatialReference",void 0);h([f.property()],c.prototype,"overlayUpdating",void 0);h([f.property({dependsOn:["overlayUpdating"]})],c.prototype,"updating",void 0);return c=h([f.subclass("esri.views.3d.layers.DynamicLayerView3D")],c)}(f.declared(w,D));var F=g.create();return n});