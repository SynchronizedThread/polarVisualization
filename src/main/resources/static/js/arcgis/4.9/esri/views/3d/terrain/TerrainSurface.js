// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../Color ../../../core/Accessor ../../../core/arrayUtils ../../../core/CollectionFlattener ../../../core/Handles ../../../core/Logger ../../../core/ObjectPool ../../../core/PooledArray ../../../core/watchUtils ../../../core/accessorSupport/decorators ../../../geometry/support/aaBoundingRect ../lib/gl-matrix ../support/Evented ../support/mathUtils ../support/projectionUtils ../support/PromiseLightweight ../support/ResourceController ./OverlayManager ./PlanarTile ./SphericalTile ./SurfaceExtentHelper ./SurfaceTilingSchemeLogic ./TerrainConst ./TerrainRenderer ./terrainUtils ./TileGeometryFactory ./TilemapOnlyTile ./tileUtils ./tileUtils ../../vectorTiles/VectorTileDisplayObject ../../webgl/Texture".split(" "),
function(x,la,M,m,N,O,B,P,Q,R,S,T,F,l,q,u,U,V,C,G,W,X,Y,Z,H,aa,f,ba,n,ca,da,y,I,ea,fa){function J(f,c){return f[0]===c[0]&&f[1]===c[1]&&f[2]===c[2]}function K(f){return f&&("cancel"===f||"cancel"===f.dojoType)}function L(f,c){var a=!1;c=c||f;var b=0;for(f=f.children;b<f.length;b++){var d=f[b];if(d){for(var k in d.layerInfo)for(var h in d.layerInfo[k]){var e=d.layerInfo[k][h].upsampleFromTile;if(e&&e.tile===c)return!0}a=a||L(d,c)}}return a}var z=n.weakAssert,v=R.getLogger("esri.views.3d.terrain.TerrainSurface");
x=function(x){function c(a,b){a=x.call(this)||this;a.defaultTileBackground=f.DEFAULT_TILE_BACKGROUND;a.hideSkirtsDistanceFromExtentMargin=ga;a.hideSkirtsMinimumCameraTilt=ha;a.hideSkirtsMaximumCameraTilt=ia;a._clippingExtent=null;a._dataExtent=null;a._elevationBounds=[0,0];a._rootExtent=q.create();a._iteratorPool=new S(I.IteratorPreorder);a._postorderIterator=new I.IteratorPostorder;a.visible=!1;a.suspended=!1;a._pendingUpdates=!1;a._lvPendingUpdates=!1;a._updateNextFrame=0;a._vectorTileLayerRequests=
0;a._memoryUsed=0;a._overlayOpacity=1;a._eyePosRenderSR=u.vec3d.create();a._eyePosSurfaceSR=u.vec3d.create();a._splitLimits=[0,0,0,0,0,0];a._frustumPlanes=Array(6);a._viewProjectionMatrix=u.mat4d.identity();a.tilemapStats={tilemapRequestsSent:0,tilemapRequestsPending:0,tilemapRequestErrors:0,fullTilemaps:0,emptyTilemaps:0,tilesRequested:0,tileRequestsSent:0,tileRequestErrors:0,tilesNotPresent:0};a._layerViews=[[],[]];a._layerIndexByLayerViewId=[{},{}];a._basemapLayerViewHandles={};a._handles=new Q;
a._lowPrioUpdates=new T;a._topLevelTilemapOnlyTiles=Array(f.TILEMAP_SIZE_EXP+1);a.loaded=!1;a.maxTextureScale=1.2;a.rootTiles=null;a.backgroundImage=f.DEFAULT_TILE_BACKGROUND;a.backgroundColor=null;for(b=0;b<a._topLevelTilemapOnlyTiles.length;b++)a._topLevelTilemapOnlyTiles[b]=new da([b-f.TILEMAP_SIZE_EXP,0,0]);for(b=0;6>b;b++)a._frustumPlanes[b]=u.vec4d.create();return a}M(c,x);c.prototype.normalizeCtorArgs=function(a,b){this._view=a;this._stage=a._stage;this._set("manifold",b);return{}};c.prototype.initialize=
function(){var a=this;this.tilePool="planar"===this.manifold?Y.Pool:Z.Pool;this._renderer=new ba(this.manifold,null);this._renderer.loaded=this._setLoaded.bind(this);this._renderer.install(this._view._stage);F.init(this,"_background",function(){a._renderer.updateTileBackground(a._background)});this._handles.add(this._view.watch("pointsOfInterest",function(b){a._renderer.pointsOfInterest=b}));this._set("overlayManager",new X({terrainSurface:this,view:this._view}));this._handles.add(this.watch("overlayManager.hasHighlights",
this._handleHasHighlights.bind(this)),"overlayManager");var b={layers:this._view.map.allLayers,layerViews:this._view.allLayerViews,spatialReference:this._view.spatialReference};this.extentHelper="spherical"===this.manifold?new H.SurfaceExtentHelperGlobal(b):new H.SurfaceExtentHelperLocal(b);this._handles.add(F.init(this.extentHelper,"stencilEnabledExtents",function(b){a._renderer.setStencilEnabledLayerExtents(b)}),"extentHelper");b=this._view.defaultsFromMap?new P({root:this._view.map,rootCollectionNames:this._view.defaultsFromMap.mapCollectionPaths,
getChildrenFunction:function(a){return a.layers}}):this._view.map.allLayers;b=new aa({layers:b,extentHelper:this.extentHelper,manifold:this.manifold,viewSpatialReference:this._view.spatialReference});this._set("tilingSchemeLogic",b);this._handles.add([this.tilingSchemeLogic.watch("tilingScheme",this._updateTilingSchemeAndExtent.bind(this),!0),this.tilingSchemeLogic.watch("extent",this._updateTilingSchemeAndExtent.bind(this),!0)],"tilingSchemeLogic");this._updateTilingSchemeAndExtent();this._streamDataSupplier=
this._view.resourceController.getStreamDataSupplier(W.ClientType.TERRAIN);this._handles.add(this._view.resourceController.registerFrameWorker(function(b){return a._frame(b)}));this._handles.add(this._view.resourceController.registerIdleFrameWorker({needsUpdate:function(){return a._needsIdleUpdate()},idleFrame:function(){return a._idleUpdate()}}));this._viewChangeUpdate=this._viewChangeUpdate.bind(this);this._view.resourceController.memoryEvents.on("quality-changed",function(){return a._viewChangeUpdate()});
this._handles.add([this._view.on("resize",this._viewChangeUpdate),this._view.watch("state.camera",this._viewChangeUpdate,!0),this._view.watch("qualitySettings.tiledSurface.lodBias",this._viewChangeUpdate),this._view.watch("clippingArea",this._clippingChanged.bind(this))],"view");this._handles.add(this._view.allLayerViews.on("change",this._handleLayerViewChanges.bind(this)),"allLayerViews");this._handleLayerViewChanges({added:this._view.allLayerViews.toArray(),removed:[],moved:[],target:this._view.allLayerViews});
this._updateClippingExtent();this.notifyChange("extent")};c.prototype.destroy=function(){this._handles.destroy();this._removeAllTiles();this.tilingSchemeLogic.destroy();this._set("tilingSchemeLogic",null);this.extentHelper.destroy();this.extentHelper=null;for(var a in this._basemapLayerViewHandles)this._unregisterTiledLayerView(a);this._streamDataSupplier=null;this.overlayManager&&(this.overlayManager.destroy(),this._set("overlayManager",null));this._renderer.destroy(this._stage);this._streamDataSupplier=
this._stage=this._view=this._renderer=null};Object.defineProperty(c.prototype,"renderer",{get:function(){return this._renderer},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"cullBackFaces",{set:function(a){this._renderer.cullBackFaces=a;this._set("cullBackFaces",a)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"extent",{get:function(){return this._clippingExtent||this._rootExtent},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"baseOpacity",
{set:function(a){this._renderer.opaque=1<=a;this._set("baseOpacity",a);this._updateTileTextures(!0)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"ready",{get:function(){return!!this.rootTiles},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"renderOrder",{set:function(a){this._renderer.renderOrder=a;this._set("renderOrder",a)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"skirtScale",{set:function(a){this._renderer.skirtScale=a;this._set("skirtScale",
a)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"_background",{get:function(){return null!=this.backgroundColor?this.backgroundColor:this.backgroundImage},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"velvetOverground",{set:function(a){a!==this.velvetOverground&&(this._renderer.velvetOverground=a);this._set("velvetOverground",a)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"wireframe",{set:function(a){this._renderer.setWireframe(a);
this._set("wireframe",a);this._view._stage.setRenderParams({earlyOcclusionPixelDraw:a})},enumerable:!0,configurable:!0});c.prototype.setVisibility=function(a){a!==this.visible&&(this.visible=a,this._renderer.setVisibility(a),this.setUpdatesDisabled(!a),a&&this._viewChangeUpdate())};c.prototype.isVisible=function(){return this.visible&&this.ready};c.prototype.isSeeThrough=function(){return!this._renderer.isOpaque()};c.prototype.setUpdatesDisabled=function(a){(this.suspended=a)||this._viewChangeUpdate()};
c.prototype.intersect=function(a,b,d){this._renderer.intersect(a,b,d,null)};c.prototype.getElevation=function(a){if(!this.ready)return null;var b=this.rootTiles;if(0===b[0].layerInfo[f.LayerClass.ELEVATION].length)return null;var d=A;if(Array.isArray(a))d=a;else if("point"===a.type&&!C.pointToVector(a,d,this.tilingScheme.spatialReference))return v.error("TerrainSurface.getElevation(): could not project given point to tiling scheme coordinate system"),null;for(var k=0;k<b.length;k++)if(a=b[k],y.isPosWithinTile(a,
d)){for(;a&&!a.renderData;)b=0,d[0]>.5*(a.extent[0]+a.extent[2])&&(b+=1),d[1]<.5*(a.extent[1]+a.extent[3])&&(b+=2),a=a.children[b];if(b=(b=a.renderData)&&b.geometryState?b.geometryState.samplerData:null)return ca.elevationSampler(d[0],d[1],b);break}return null};c.prototype.getElevationBounds=function(){return this._elevationBounds};c.prototype.getScale=function(a){if(this.tilingScheme){if(!C.pointToVector(a,A,this.spatialReference))return v.error("TerrainSurface.getElevation(): could not project given point to tiling scheme coordinate system"),
null;if(this.rootTiles)for(var b=0;b<this.rootTiles.length;b++)if(a=this.rootTiles[b],y.isPosWithinTile(a,A)){for(;a.children[0];)b=0,A[0]>a.children[0].extent[2]&&(b+=1),A[1]<a.children[0].extent[1]&&(b+=2),a=a.children[b];return this._getLodBiasCorrectedScale(a.lij[0])}}return 1E100};c.prototype.queryVisibleScaleRange=function(a,b,d,k){b=b?this.tilingScheme.levelAtScale(b):0;d=d?this.tilingScheme.levelAtScale(d):Infinity;var c=this._getLodBias();this._renderer.queryVisibleLevelRange(a,b+c,d+c,k)};
c.prototype._setLoaded=function(){this.loaded||this._set("loaded",!0)};c.prototype._updateTilingSchemeAndExtent=function(){var a=this.tilingSchemeLogic.extent,b=a&&!q.equals(a,this._dataExtent);b&&(this._dataExtent?q.set(this._dataExtent,a):this._dataExtent=q.create(a));var a=this.tilingSchemeLogic.tilingScheme,d=a!==this.tilingScheme;d&&(z(!!a,"tiling scheme cannot be reset to undefined"),this.tilingScheme&&this._removeAllTiles(),this._set("tilingScheme",a),this._updateClippingExtent(),a&&(this._updateTiledLayers(),
this._renderer.setTileSize(a.pixelSize[0]),this.overlayManager.setSpatialReference(a.spatialReference,"spherical"===this.manifold)));(b||d)&&this._updateRootTiles()};c.prototype._acquireTile=function(a,b,d,k){var c=this.tilePool.acquire();D[0]=a;D[1]=b;D[2]=d;c.init(D,k,this,this.tilingScheme);return c};c.prototype._releaseTile=function(a){a.dispose();a.parent=null;a.parentSurface=null;this.tilePool.release(a)};c.prototype._updateRootTiles=function(){var a=this,b=this._clippingExtent||this._dataExtent,
d=this.tilingScheme;if(b&&d){var c=ja,h=d.rootTilesInExtent(b,c,Infinity);if(this.rootTiles){if(h.length>f.MAX_ROOT_TILES){v.warn(f.TOO_MANY_ROOT_TILES_AFTER_CHANGE_ERROR);return}var b=this.rootTiles.map(function(a){return a.lij}),e=B.difference(b,h,J);if(0<e.removed.length||0<e.added.length){var g=this.rootTiles.filter(function(b){return-1<B.findIndex(e.removed,J.bind(null,b.lij))?(a._purgeChildTiles(b),a._purgeTile(b),!1):!0});e.added.forEach(function(b){b=a._acquireTile(0,b[1],b[2],null);g.push(b);
a._loadTile(b)});this._set("rootTiles",g);this._renderer.setRootTiles(this.rootTiles)}}else h.length>f.MAX_ROOT_TILES&&(v.warn(f.TOO_MANY_ROOT_TILES_FOR_LAYER_ERROR),h=d.rootTilesInExtent(b,c,f.MAX_ROOT_TILES)),this._set("rootTiles",h.map(function(b){b=a._acquireTile(0,b[1],b[2],null);a._loadTile(b);return b})),this._renderer.setRootTiles(this.rootTiles);B.equals(c,this._rootExtent)||(this._rootExtent=q.create(c),this._hasFixedExtent()||this.notifyChange("extent"));this.setVisibility(!0);this._viewChangeUpdate();
this.overlayManager.setOverlayDirty();this.notifyChange("ready")}};c.prototype._viewChangeUpdate=function(){this._stage&&!this.suspended&&this.tilingScheme&&this.visible&&(this._updateViewDependentParameters(),this._updateSkirts(),this._updateOverlayOpacity(this._eyePosSurfaceSR[2]),this._updateTiles())};c.prototype._updateClippingStatus=function(a){a.updateClippingStatus(this._clippingExtent)&&a.pendingUpdates&f.TileUpdateTypes.UPDATE_GEOMETRY&&(this._updateTileGeometry(a),a.pendingUpdates&=~f.TileUpdateTypes.UPDATE_GEOMETRY)};
c.prototype._updateTiles=function(a){void 0===a&&(a=this.rootTiles);if(a){var b=this._iteratorPool.acquire();b.reset(a);var d=this._splitLimits,c=this._frustumPlanes,h;y.hasVisibleSiblings(a)?(a=this._elevationBounds[0],h=this._elevationBounds[1]):(a=Infinity,h=-Infinity);for(;!b.done;){var e=b.next();this._updateClippingStatus(e);if(e.updateVisibility(c)){e.updateScreenDepth(this._viewProjectionMatrix);e.renderData&&(a=Math.min(e.elevationBounds[0],a),h=Math.max(e.elevationBounds[1],h));var g=e.shouldSplit(d,
this._eyePosRenderSR);if(g===f.TileUpdateTypes.SPLIT){e.pendingUpdates&=~f.TileUpdateTypes.MERGE;e.renderData&&(e.pendingUpdates|=f.TileUpdateTypes.SPLIT,b.skipSubtree());this._pendingUpdates=this._pendingUpdates||0!==e.pendingUpdates;continue}e.pendingUpdates&=~f.TileUpdateTypes.SPLIT;g===f.TileUpdateTypes.VSPLITMERGE&&e.updateAgents(f.LayerClass.ELEVATION)}b.skipSubtree();if(!e.renderData){e.pendingUpdates|=f.TileUpdateTypes.MERGE;e.pendingUpdates&=~f.TileUpdateTypes.SPLIT;g=this._iteratorPool.acquire();
for(g.resetOne(e);!g.done;){var r=g.next();this._updateClippingStatus(r);r.updateVisibility(c);r.visible&&r.updateScreenDepth(this._viewProjectionMatrix)}this._iteratorPool.release(g)}this._pendingUpdates=this._pendingUpdates||0!==e.pendingUpdates}this._iteratorPool.release(b);isFinite(a)&&isFinite(h)&&(this._elevationBounds[0]!==a||this._elevationBounds[1]!==h)&&(this._elevationBounds[0]=a,this._elevationBounds[1]=h,this.emit("elevation-bounds-change",null))}};c.prototype._updateViewDependentParameters=
function(){var a=this._view.state.camera,b=Math.tan(.5*a.fovX),d=Math.tan(.5*a.fovY),c=this.tilingScheme.pixelSize,h=Math.pow(2,-this._getLodBias());this._splitLimits[0]=b;this._splitLimits[1]=c[0]/a.width*this.maxTextureScale*h;this._splitLimits[2]=d;this._splitLimits[3]=c[1]/a.height*this.maxTextureScale*h;this._splitLimits[4]=this.tilingScheme.getMaxLod();this._splitLimits[5]=this._view.qualitySettings.tiledSurface.angledSplitBias;a.copyFrustumPlanes(this._frustumPlanes);u.mat4d.multiply(a.projectionMatrix,
a.viewMatrix,this._viewProjectionMatrix);u.vec3d.set(a.eye,this._eyePosRenderSR);C.vectorToVector(this._eyePosRenderSR,this._view.renderSpatialReference,this._eyePosSurfaceSR,this.spatialReference)};c.prototype._updateSkirts=function(){n.autoUpdateSkirtsVisibility(this,this._eyePosSurfaceSR,this._view.state.camera.near)};c.prototype._setLayerViewsUpdating=function(){for(var a=0;a<f.LayerClass.COUNT;a++)for(var b=this._layerViews[a],d=0;d<b.length;d++)b[d].updatingChanged(this._pendingUpdates)};c.prototype._frameTraversal=
function(a){if(this.suspended||!this._pendingUpdates)return!1;this._lowPrioUpdates.clear();this._pendingUpdates=!1;var b=this._renderer.resourceCounter,d=b.numTileTexturesComposited,c=this._iteratorPool.acquire();c.reset(this.rootTiles);for(var h=!1,e=0;!(c.done||a.done()&&h)&&b.numTileTexturesComposited-d<ka;){var g=c.next(),e=e+g.memoryUsed;g.pendingUpdates&f.TileUpdateTypes.MERGE?(this._mergeTile(g),g.pendingUpdates&=~f.TileUpdateTypes.MERGE,h=!0,c.skipSubtree()):g.pendingUpdates&f.TileUpdateTypes.SPLIT?
(this._splitTile(g),g.pendingUpdates&=~f.TileUpdateTypes.SPLIT,h=!0,c.skipSubtree()):0<g.pendingUpdates&&this._lowPrioUpdates.push(g);this._pendingUpdates=this._pendingUpdates||0!==g.pendingUpdates}c.done?this._memoryUsed=e:this._pendingUpdates=!0;this._iteratorPool.release(c);return h};c.prototype._updateTileGeometry=function(a){this._renderer.updateTileGeometry(a);this._elevationUpdate(a)};c.prototype._elevationUpdate=function(a){E.spatialReference=this.spatialReference;E.tile=a;E.extent=a.extent;
this.emit("elevation-change",E);q.containsPoint(a.extent,this._eyePosSurfaceSR)&&this._updateSkirts()};c.prototype._frame=function(a){if(this.rootTiles){for(var b=this._frameTraversal(a);(!a.done()||!b)&&0<this._lowPrioUpdates.length;){var d=this._lowPrioUpdates.pop();d.pendingUpdates&f.TileUpdateTypes.DECODE_ELEVATION?(this._decodeElevation(d,a)&&(d.pendingUpdates&=~f.TileUpdateTypes.DECODE_ELEVATION),b=!0):d.pendingUpdates&f.TileUpdateTypes.UPDATE_GEOMETRY?(this._updateTileGeometry(d),d.pendingUpdates&=
~f.TileUpdateTypes.UPDATE_GEOMETRY,b=!0):d.pendingUpdates&f.TileUpdateTypes.UPDATE_TEXTURE&&(this._renderer.updateTileTexture(d),d.pendingUpdates&=~f.TileUpdateTypes.UPDATE_TEXTURE,b=!0);this._pendingUpdates=this._pendingUpdates||0!==d.pendingUpdates}if(0<this._lowPrioUpdates.length||this._streamDataSupplier.hasPendingDownloads()||0!==this._vectorTileLayerRequests)this._pendingUpdates=!0;this._pendingUpdates===this._lvPendingUpdates||!this._pendingUpdates&&20!==++this._updateNextFrame||(this._setLayerViewsUpdating(),
this._lvPendingUpdates=this._pendingUpdates,this._updateNextFrame=0);b&&(this._memoryUsed=0)}};c.prototype._needsIdleUpdate=function(){return this.isVisible()&&this.overlayManager&&this.overlayManager.overlaysNeedUpdate()};c.prototype._idleUpdate=function(){this.overlayManager.updateOverlays();this._updateOverlayOpacity(this._eyePosSurfaceSR[2])};c.prototype._updateClippingExtent=function(){if(!this.spatialReference)return!1;var a=q.create(),b=null;C.extentToBoundingRect(this._view.clippingArea,a,
this.spatialReference)&&(b=a);if(B.equals(b,this._clippingExtent))return!1;this._clippingExtent=b;this._renderer.clippingExtent=b;this.notifyChange("extent");this._updateTileOverlayParams();this.overlayManager.setOverlayDirty();return!0};c.prototype._clippingChanged=function(){this._updateClippingExtent()&&this._updateRootTiles()};c.prototype._getLodBias=function(){return Math.round(this._view.qualitySettings.tiledSurface.lodBias+2*this._view.resourceController.memoryFactor-2)};c.prototype._getLodBiasCorrectedScale=
function(a){var b=this.tilingScheme.levels;a=V.clamp(a-this._getLodBias(),0,b.length-1);return b[a].scale};c.prototype._cancelTilemapRequests=function(a){for(var b=0;b<f.LayerClass.COUNT;b++){var d=a.layerInfo[b];if(d)for(var c=0;c<d.length;c++){var h=d[c];h.tilemapRequest&&(h.tilemapRequest.cancel(),h.tilemapRequest=null)}}};c.prototype._removeAllTiles=function(){var a=this;this.rootTiles&&(this.rootTiles.forEach(function(b){a._purgeChildTiles(b);a._purgeTile(b)}),this._set("rootTiles",null),this.notifyChange("ready"));
for(var b=0;b<this._topLevelTilemapOnlyTiles.length;b++)this._cancelTilemapRequests(this._topLevelTilemapOnlyTiles[b]);this.setVisibility(!1)};c.prototype._purgeChildTiles=function(a){var b=this._postorderIterator;for(b.reset([a]);!b.done;){for(var d=b.next(),c=0;4>c;c++)d.children[c]=null;d!==a&&this._purgeTile(d)}};c.prototype._purgeTile=function(a){a.unload(this._renderer);this._cancelTilemapRequests(a);a.parent=null;this._releaseTile(a)};c.prototype._splitTile=function(a){var b=a.lij[0]+1,c=2*
a.lij[1],k=2*a.lij[2];a.children[0]=this._createTile(b,c,k,a);a.children[1]=this._createTile(b,c,k+1,a);a.children[2]=this._createTile(b,c+1,k,a);a.children[3]=this._createTile(b,c+1,k+1,a);a.unload(this._renderer);t.spatialReference=this.spatialReference;t.extent=a.extent;t.scale=this._getLodBiasCorrectedScale(b);this.emit("scale-change",t)};c.prototype._createTile=function(a,b,c,k){z(!!k,"_createTile sanity check");a=this._acquireTile(a,b,c,k);a.updateClippingStatus(this._clippingExtent);a.updateVisibility(this._frustumPlanes);
a.visible&&(a.updateScreenDepth(this._viewProjectionMatrix),a.shouldSplit(this._splitLimits,this._eyePosRenderSR)===f.TileUpdateTypes.SPLIT&&(a.pendingUpdates|=f.TileUpdateTypes.SPLIT,this._pendingUpdates=!0));this._loadTile(a);return a};c.prototype._mergeTile=function(a){z(!a.renderData,"_mergeTile sanity check");this._loadTile(a);this._purgeChildTiles(a);t.spatialReference=this.spatialReference;t.extent=a.extent;t.scale=this._getLodBiasCorrectedScale(a.lij[0]);this.emit("scale-change",t)};c.prototype._loadTile=
function(a){a.load(this._renderer);this.overlayManager&&this.overlayManager.hasOverlays()&&this.overlayManager.setOverlayParamsOfTile(a,a.renderData,this._overlayOpacity);this._elevationUpdate(a)};c.prototype._handleHasHighlights=function(a){this._renderer.setNeedsHighlight(a)};c.prototype._decodeElevation=function(a,b){var c=a.layerInfo[f.LayerClass.ELEVATION];if(!c)return!0;for(var k=0;k<c.length;k++){var h=c[k];h.pendingUpdates&=~f.TileUpdateTypes.DECODE_ELEVATION;if(h.rawData){var e=a.decodeElevationData(h.rawData);
h.rawData=null;if(e){h.data=e;var h=[a],g=a.lij[0],r=this._iteratorPool.acquire();for(r.reset(h);!r.done;){var w=r.next();w.findElevationBoundsForLayer(k,g);w.computeElevationBounds()}this._iteratorPool.release(r);a.dataArrived(k,f.LayerClass.ELEVATION,e);this._updateTiles(h)}if(b.done())break}}return k===c.length};c.prototype._handleLayerViewChanges=function(a){var b=this,c=!1;a.added.forEach(function(a){var d=a.layer;n.isTiledLayerView(a)?(b._registerTiledLayer(a),d.loaded&&(c=!0)):a.supportsDraping&&
b.overlayManager&&b.overlayManager.registerLayerView(a)});a.removed.forEach(function(a){n.isTiledLayerView(a)?(c=!0,b._unregisterTiledLayerView(a.uid)):a.supportsDraping&&b.overlayManager&&b.overlayManager.unregisterLayerView(a)});(c=c||0<a.moved.filter(n.isTiledLayerView).length)&&this._updateTiledLayers()};c.prototype._registerTiledLayer=function(a){var b=this,c=[];c.push(a.watch("suspended",function(){b._updateTiledLayers()}));c.push(a.watch("fullOpacity",function(){return b._updateTileTextures()}));
a.on("data-changed",function(){var c=n.isElevationLayerView(a)?f.LayerClass.ELEVATION:f.LayerClass.MAP,d=b._layerIndexByLayerViewId[c][a.uid];null!=d&&b._invalidateLayerData(d,c)});this._basemapLayerViewHandles[a.uid]=c};c.prototype._unregisterTiledLayerView=function(a){var b=this._basemapLayerViewHandles[a];if(b){for(var c=0;c<b.length;c++)b[c].remove();delete this._basemapLayerViewHandles[a]}};c.prototype._updateTiledLayers=function(){var a=this;if(this.tilingScheme){var b=this._view.allLayerViews,
c=[[],[]],k=null,h=q.empty();b.forEach(function(b){var d=b.layer;if(d&&!b.suspended&&n.isTiledLayerView(b)){var e=b.fullExtent;e?a.tilingScheme.compatibleWith(b.tileInfo)?(q.expand(h,e),n.isElevationLayerView(b)?c[f.LayerClass.ELEVATION].push(b):(Infinity!==b.maxDataLevel&&(null===k||b.maxDataLevel>k)&&(k=b.maxDataLevel),c[f.LayerClass.MAP].push(b))):v.warn("Terrain: tiling scheme of layer "+d.id+" is incompatible with other tiled layers, will not be drawn"):v.warn("Terrain: Map or elevation layer does not have fullExtent: "+
d.id)}},this);for(var b=function(a){var b=e._layerViews[a],d=c[a];d.reverse();var k=d.length,h=b.length!==k,g=Array(k),r=Array(b.length);e._layerIndexByLayerViewId[a]={};for(var l=0;l<k;l++){e._layerIndexByLayerViewId[a][d[l].uid]=l;var m=b.indexOf(d[l]);g[l]=m;l!==m&&(h=!0);-1<m&&(r[m]=l)}if(h){e._topLevelTilemapOnlyTiles.forEach(function(b){return b.modifyLayers(r,g,a)});b=e._postorderIterator;for(b.reset(e.rootTiles);!b.done;)b.next().modifyLayers(r,g,a);e._layerViews[a]=d;for(b.reset(e.rootTiles);!b.done;)d=
b.next(),d.restartAgents(a),a===f.LayerClass.ELEVATION&&d.computeElevationBounds();e._updateTiles()}},e=this,g=0;g<f.LayerClass.COUNT;g++)b(g);this.tilingScheme.levels.length-1<k&&(this.tilingScheme.ensureMaxLod(k),this._viewChangeUpdate())}};c.prototype._hasFixedExtent=function(){return!!this._clippingExtent};c.prototype.layerViewByIndex=function(a,b){return this._layerViews[b][a]};c.prototype.numLayers=function(a){return this._layerViews[a].length};c.prototype._updateTileTextures=function(a){void 0===
a&&(a=!1);var b=this._iteratorPool.acquire();for(b.reset(this.rootTiles);!b.done;)b.next().updateTexture(a);this._iteratorPool.release(b)};c.prototype._invalidateLayerData=function(a,b){var c=this._iteratorPool.acquire();for(c.reset(this.rootTiles);!c.done;)c.next().removeLayerAgent(a,b);for(c.reset(this.rootTiles);!c.done;)c.next().invalidateLayerData(a,b);this._iteratorPool.release(c)};c.prototype.setPendingUpdates=function(){this._pendingUpdates=!0};c.prototype.requestTileData=function(a,b,c){var d=
this;this.tilemapStats.tilesRequested++;var h=this.layerViewByIndex(b,c),e=h.layer;if(e.tilemapCache&&!n.isVectorTileLayerView(h)){var g=this.getTilemapTile(a),f=g.layerInfo[c][b];if(f.tilemap){if(!g.hasDataAvailable(a,b,c))return this.tilemapStats.tilesNotPresent++,this._dispatchDataEvent(a,"dataMissing",c,h,{notInTilemap:!0}),b=new G.Promise,b.reject(),b}else{f.tilemapRequest||(f.tilemapRequest=this.requestTilemap(g,b,c,h,e));var w,l=new G.Promise(function(){w&&w.cancel()});f.tilemapRequest.always(function(){f.tilemapRequest=
null;if(!l.isCancelled()){var b=d._layerIndexByLayerViewId[c][h.uid];null!=b&&(g.hasDataAvailable(a,b,c)?(w=d._requestTileData(a,b,c,h),w.then(function(){return l.resolve()})):(d.tilemapStats.tilesNotPresent++,d._dispatchDataEvent(a,"dataMissing",c,h,{notInTilemap:!0}),l.reject()))}});return l}}return this._requestTileData(a,b,c,h)};c.prototype._requestTileData=function(a,b,c,k){this.tilemapStats.tileRequestsSent++;return c===f.LayerClass.ELEVATION?this._requestElevationTileData(a,b,c,k):this._requestMapTileData(a,
b,c,k)};c.prototype._requestElevationTileData=function(a,b,c,k){var d=this;if(n.isElevationLayerView(k)){var e=function(b){var e=d._layerIndexByLayerViewId[c][k.uid];null!=e?(e=a.layerInfo[c][e],e.rawData=b,a.pendingUpdates|=f.TileUpdateTypes.DECODE_ELEVATION,e.pendingUpdates|=f.TileUpdateTypes.DECODE_ELEVATION,d._pendingUpdates=!0):v.warn("TerrainSurface: received data from unknown layer %d %s",c,a.lij.toString())};b=function(b){K(b)||(d.tilemapStats.tileRequestErrors++,d._dispatchDataEvent(a,"dataMissing",
c,k,b))};var g=k.layer;if(n.useFetchTileForLayer(g))return g=g.fetchTile(a.lij[0],a.lij[1],a.lij[2],f.ELEVATION_NODATA_VALUE),g.then(function(a){return e(a)},b),g;g=k.getTileUrl(a.lij[0],a.lij[1],a.lij[2]);g=this._streamDataSupplier.request(g,"binary");g.then(function(a,b){b.url=a;e(b)},b);return g}z(!1,"_requestElevationTileData can only be called for elevation layer views")};c.prototype._requestMapTileData=function(a,b,c,k){var d=this,e=function(b){d._dispatchDataEvent(a,"dataArrived",c,k,b)};b=
function(b){K(b)||(d._dispatchDataEvent(a,"dataMissing",c,k,b),d.tilemapStats.tileRequestErrors++)};if(n.isVectorTileLayerView(k)){var g=k.tileHandler,f=k.schemaHelper.getLevelRowColumn(a.lij);++this._vectorTileLayerRequests;g=g.getVectorTile(f[0],f[1],f[2],0);g.then(e).catch(b).then(function(){return--d._vectorTileLayerRequests});return g}if(n.useFetchTileForLayer(k.layer)&&n.isTileLayerView(k))return g=k.layer.fetchTile(a.lij[0],a.lij[1],a.lij[2]),g.then(e).catch(b),g;g=k.getTileUrl(a.lij[0],a.lij[1],
a.lij[2]);null!=k.refreshInterval&&k.refreshTimestamp&&(g+=(-1<g.indexOf("?")?"\x26":"?")+"_ts\x3d"+k.refreshTimestamp);g=this._streamDataSupplier.request(g,"image");g.then(function(a,b){return e(b)},b);return g};c.prototype.requestTilemap=function(a,b,c,k,h){var d=this,g=a.lij[0]+f.TILEMAP_SIZE_EXP,l=a.lij[1]<<f.TILEMAP_SIZE_EXP,m=a.lij[2]<<f.TILEMAP_SIZE_EXP;this.tilemapStats.tilemapRequestsSent++;this.tilemapStats.tilemapRequestsPending++;return h.tilemapCache.fetchTilemap(g,l,m,{timeout:6E3}).then(function(e){d.tilemapStats.tilemapRequestsPending--;
b=d._layerIndexByLayerViewId[c][k.uid];null!=b&&(a.layerInfo[c][b].tilemap=e)}).catch(function(a){d.tilemapStats.tilemapRequestsPending--;d.tilemapStats.tilemapRequestErrors++})};c.prototype.getTilemapTile=function(a){var b=a.lij[0];return b>f.TILEMAP_SIZE_EXP?y.getTileNLevelsUp(a,f.TILEMAP_SIZE_EXP):this._topLevelTilemapOnlyTiles[b]};c.prototype._dispatchDataEvent=function(a,b,c,f,h){f=this._layerIndexByLayerViewId[c][f.uid];if(null!=f)a[b](f,c,h);else v.warn("TerrainSurface: received data from unknown layer")};
c.prototype._updateTileOverlayParams=function(){if(this.rootTiles){var a=this._iteratorPool.acquire();for(a.reset(this.rootTiles);!a.done;){var b=a.next();b.renderData&&this.overlayManager&&this.overlayManager.setOverlayParamsOfTile(b,b.renderData,this._overlayOpacity)}this._iteratorPool.release(a);this._renderer.setNeedsRender()}};c.prototype._updateOverlayOpacity=function(a){if(this.overlayManager&&(a=this.overlayManager.updateOpacity(a),!isNaN(a))){if(a!==this._overlayOpacity){var b=this._iteratorPool.acquire();
for(b.reset(this.rootTiles);!b.done;){var c=b.next();c.renderData&&(c.renderData.overlayOpacity=a)}this._iteratorPool.release(b)}this._overlayOpacity=a;this._renderer.setNeedsRender()}};c.prototype.getStats=function(){var a=0,b=0,c=0,f=[],h=this._iteratorPool.acquire();for(h.reset(this.rootTiles);!h.done;){var e=h.next();a++;e.renderData&&(b++,e.visible&&(c++,e=e.lij[0],f[e]=null!=f[e]?f[e]+1:1))}this._iteratorPool.release(h);return{numNodes:a,numLeaves:b,numVisible:c,numVisiblePerLevel:f}};c.prototype.getUsedMemory=
function(){if(!this.tilingScheme)return 0;if(0<this._memoryUsed)return this._memoryUsed;var a=this._iteratorPool.acquire();for(a.reset(this.rootTiles);!a.done;){var b=a.next();this._memoryUsed+=b.memoryUsed}this._iteratorPool.release(a);return this._memoryUsed};c.prototype.getMemoryUsage=function(){if(!this.tilingScheme)return{};var a=0,b=0,c=0,k=0,h=0,e=0,g=this._iteratorPool.acquire();g.reset(this.rootTiles);for(var l=this.tilingScheme.pixelSize,l=l[0]*l[1]*4;!g.done;){for(var m=g.next(),n=L(m),
q=0,v=m.layerInfo[f.LayerClass.MAP];q<v.length;q++){var p=v[q],p=p.data,t=0,u=0;p instanceof fa?t+=1.3*p.descriptor.width*p.descriptor.height*4:p instanceof HTMLImageElement?u+=l:p instanceof ea&&(e+=p.getGpuMemoryUsage(),c+=p.getCpuMemoryUsage());m.renderData||n?(a+=u,k+=t):(b+=u,h+=t)}n=0;for(q=m.layerInfo[f.LayerClass.ELEVATION];n<q.length;n++)p=q[n],p=p.data,a+=p?l:0;m.renderData&&(p=m.renderData.texture,k+=p&&p.descriptor?1.3*p.descriptor.width*p.descriptor.height*4:0,m=m.renderData.estimateGeometryMemoryUsage(),
e+=m,c+=m)}this._iteratorPool.release(g);return{cpuVisibleImageData:a,cpuInvisibleImageData:b,cpuGeometryData:c,gpuVisibleImageData:k,gpuInvisibleImageData:h,gpuGeometryData:e}};c.prototype.hasPendingUpdates=function(){if(this._streamDataSupplier.hasPendingDownloads()||0!==this._vectorTileLayerRequests)return!0;var a=this._iteratorPool.acquire();for(a.reset(this.rootTiles);!a.done;)if(0<a.next().pendingUpdates)return this._iteratorPool.release(a),!0;this._iteratorPool.release(a);return!1};c.prototype.getTile=
function(a){var b=a.split("/").map(function(a){return+a});if(0===b[0])return this.rootTiles.forEach(function(a){if(a.lij[1]===b[1]&&a.lij[2]===b[2])return a}),null;var c=Math.pow(2,b[0]),f=Math.floor(b[1]/c),h=Math.floor(b[2]/c),e;this.rootTiles.some(function(a){return a.lij[1]===f&&a.lij[2]===h?(e=a,!0):!1});if(e){for(c=1<<b[0]-1;e.lij[0]<b[0];){var g=b[1]&c?2:0;0<(b[2]&c)&&g++;if(!e.children[g])return console.log("Tile "+a+" doesn't exist, smallest ancestor is "+y.tile2str(e)),null;e=e.children[g];
c>>=1}z(e.lij[0]===b[0]&&e.lij[1]===b[1]&&e.lij[2]===b[2],"not the right tile?");return e}return null};c.prototype.setBorders=function(a){this._renderer.drawBorders=a};c.prototype.setDisableRendering=function(a){this._renderer.disableRendering=a};m([l.property({value:!1})],c.prototype,"cullBackFaces",null);m([l.property({readOnly:!0})],c.prototype,"extent",null);m([l.property({readOnly:!0})],c.prototype,"loaded",void 0);m([l.property({value:1})],c.prototype,"baseOpacity",null);m([l.property({readOnly:!0})],
c.prototype,"overlayManager",void 0);m([l.property({readOnly:!0})],c.prototype,"manifold",void 0);m([l.property()],c.prototype,"maxTextureScale",void 0);m([l.property({readOnly:!0})],c.prototype,"ready",null);m([l.property({value:1})],c.prototype,"renderOrder",null);m([l.property({readOnly:!0})],c.prototype,"rootTiles",void 0);m([l.property({value:!0})],c.prototype,"skirtScale",null);m([l.property({readOnly:!0,aliasOf:"tilingScheme.spatialReference"})],c.prototype,"spatialReference",void 0);m([l.property({})],
c.prototype,"backgroundImage",void 0);m([l.property({type:N})],c.prototype,"backgroundColor",void 0);m([l.property({dependsOn:["backgroundColor","backgroundImage"]})],c.prototype,"_background",null);m([l.property({readOnly:!0})],c.prototype,"tilingScheme",void 0);m([l.property({readOnly:!0,aliasOf:"tilingSchemeLogic.tilingSchemeLocked"})],c.prototype,"tilingSchemeLocked",void 0);m([l.property({readOnly:!0,aliasOf:"tilingSchemeLogic.tilingSchemeDone"})],c.prototype,"tilingSchemeDone",void 0);m([l.property({readOnly:!0})],
c.prototype,"tilingSchemeLogic",void 0);m([l.property({value:!0})],c.prototype,"velvetOverground",null);m([l.property({value:!1})],c.prototype,"wireframe",null);return c=m([l.subclass("esri.views.3d.terrain.TerrainSurface")],c)}(l.declared(O,U.Evented));var ga=1.2,ha=80/180*Math.PI,ia=110/180*Math.PI,ka=12,A=u.vec4d.create(),ja=q.create(),D=[0,0,0],E={spatialReference:null,tile:null,extent:null},t={spatialReference:null,extent:null,scale:0};return x});