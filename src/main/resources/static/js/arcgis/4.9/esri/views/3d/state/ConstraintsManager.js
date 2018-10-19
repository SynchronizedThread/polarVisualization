// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/Accessor ../../../core/Handles ../../../core/watchUtils ../../../core/accessorSupport/decorators ../camera/constraintUtils ../camera/intersectionUtils ./NearFarHeuristic ./SurfaceCollisionConstraint ../support/mathUtils".split(" "),function(d,f,k,g,l,m,n,e,p,q,r,t,h){Object.defineProperty(f,"__esModule",{value:!0});d=function(d){function c(a){var b=d.call(this)||this;b.handles=
new m;b.nearFarHeuristic=r.createNearFarHeuristic(a.view.state.mode,a.view.basemapTerrain,a.view.renderCoordsHelper.spatialReference);return b}k(c,d);c.prototype.initialize=function(){var a=this;this.handles.add([this.view.watch(["constraints.clipDistance.near","constraints.clipDistance.far"],function(){return a.handleClipDistanceNearFarChanged()}),this.view.watch("constraints.clipDistance.mode",function(){return a.handleClipDistanceModeChanged()}),this.view.state.events.on("before-camera-change",
function(b){return a.cameraUpdateNearFar(b.camera)}),this.view.watch("dataExtent",function(){return a.updateNearFar()},!0)]);this.handles.add([this.view.watch(["constraints.altitude.min","constraints.altitude.max"],function(){return a.handleAltitudeMinMaxChanged()},!0)]);this.handles.add([this.view.watch("constraints.tilt.max",function(){return a.handleTiltMaxChanged()},!0),this.view.watch("constraints.tilt.mode",function(){return a.handleTiltModeChanged()},!0),this.view.watch("state.camera",function(){return a.tiltAutoUpdateMax()},
!0)]);this.handles.add(this.view.watch(["map.ground.navigationConstraint.type","constraints.collision.enabled"],function(){return a.updateCollision()},!0));this.view.state.isLocal&&this.handles.add(n.init(this.view,"dataExtent",function(b){return a.updateLocalSurfaceDistance(b)}));this.updateNearFar();"local"!==this.view.state.mode&&this.updateAltitude();this.updateTilt();this.updateCollision();this._set("surfaceCollisionConstraint",new t.default({view:this.view}))};c.prototype.destroy=function(){this.handles&&
(this.handles.destroy(),this.handles=null);this.surfaceCollisionConstraint&&(this.surfaceCollisionConstraint.destroy(),this._set("surfaceCollisionConstraint",null))};c.prototype.handleClipDistanceNearFarChanged=function(){var a=this,b=this.view.constraints&&this.view.constraints.clipDistance;b&&"auto"!==b.mode&&this.view.state.updateCamera(function(c){a.cameraUpdateNearFarManual(c,b);return!0})};c.prototype.handleClipDistanceModeChanged=function(){this.updateNearFar()};c.prototype.updateNearFar=function(){var a=
this;this.view.state.updateCamera(function(b){a.cameraUpdateNearFar(b);return!0})};c.prototype.cameraUpdateNearFar=function(a){var b=this.view.constraints&&this.view.constraints.clipDistance;"manual"===(b?b.mode:"auto")?this.cameraUpdateNearFarManual(a,b):this.cameraUpdateNearFarAuto(a,b)};c.prototype.cameraUpdateNearFarAuto=function(a,b){this.nearFarHeuristic.compute(a.eye,a.center,this.view.dataExtent,q.surfaceElevationBelowEye(this.view,a),a);b&&b.autoUpdate(a.near,a.far)};c.prototype.cameraUpdateNearFarManual=
function(a,b){b&&(a.near=b.near,a.far=b.far)};c.prototype.updateCollision=function(){var a=this.view.map&&this.view.map.ground&&this.view.map.ground.navigationConstraint,b=this.view.constraints&&this.view.constraints.collision.enabled,a=a?"stay-above"===a.type:b,b=this.view.state.constraints.collision;a!==b.enabled&&((b.enabled=a)&&this.reapplyConstraints(8),(a=this.view.constraints&&this.view.constraints.tilt)&&"auto"!==a.mode||this.updateTiltAuto(a))};c.prototype.handleAltitudeMinMaxChanged=function(){this.updateAltitude()};
c.prototype.updateAltitude=function(){var a=this.view.constraints&&this.view.constraints.altitude;this.view.state.constraints.altitude=a&&"local"!==this.view.state.mode?{min:a.min,max:a.max}:null;this.reapplyConstraints()};c.prototype.handleTiltModeChanged=function(){this.updateTilt()};c.prototype.handleTiltMaxChanged=function(){var a=this.view.constraints&&this.view.constraints.tilt;a&&"auto"!==a.mode&&(this.updateTiltManual(a),this.reapplyConstraints())};c.prototype.updateTilt=function(){var a=
this.view.constraints&&this.view.constraints.tilt;"manual"===(a?a.mode:"auto")?this.updateTiltManual(a):this.updateTiltAuto(a);this.reapplyConstraints()};c.prototype.updateTiltManual=function(a){var b=this.view.state.constraints;b.tilt=b.createConstantMaxTilt(h.deg2rad(a.max))};c.prototype.updateTiltAuto=function(a){a=this.view.state.constraints;a.tilt=a.createDefaultTilt();this.tiltAutoUpdateMax()};c.prototype.tiltAutoUpdateMax=function(){var a=this.view.constraints&&this.view.constraints.tilt;if(a&&
"auto"===a.mode){var b=this.view.state.constraints;b.tilt&&(b=b.tilt(this.view.state.camera.distance).max,a.autoUpdate(h.rad2deg(b)))}};c.prototype.updateLocalSurfaceDistance=function(a){var b=Math.max(a.width,a.height);0>=b||(a.hasZ&&(b=Math.max(b,a.zmax-a.zmin)),a=this.view.state,b=3*b/Math.atan(a.camera.fov/2),b!==a.constraints.distance&&(a.constraints.distance=b))};c.prototype.reapplyConstraints=function(a){var b=this;void 0===a&&(a=15);this.view.state.updateCamera(function(c){return p.applyAll(b.view,
c,{selection:a,interactionType:0,interactionFactor:null,interactionStartCamera:null,interactionDirection:null,tiltMode:0})})};g([e.property({constructOnly:!0})],c.prototype,"view",void 0);g([e.property({readOnly:!0})],c.prototype,"surfaceCollisionConstraint",void 0);return c=g([e.subclass("esri.views.3d.state.ConstraintsManager")],c)}(e.declared(l));f.ConstraintsManager=d;f.default=d});