// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/Handles ../../../core/promiseUtils ../../../core/watchUtils ./atmosphereUtils ../lib/gl-matrix ../support/earthUtils ../support/buffer/glUtil ../support/buffer/InterleavedLayout ../webgl-engine/lib/RenderPass ../webgl-engine/lib/RenderSlot ../webgl-engine/shaders/RealisticAtmospherePrograms ../../webgl/BufferObject ../../webgl/programUtils ../../webgl/Util ../../webgl/VertexArrayObject".split(" "),function(m,r,B,C,t,u,b,h,D,E,F,v,k,G,w,H,I){m=function(){function d(a){this.needsRender=
!1;this.didRender=!0;this.slot=v.POSTPROCESSING_ATMOSPHERE_OPAQUE;this._hazeSlot=v.POSTPROCESSING_ATMOSPHERE_TRANSPARENT;this._renderData={texDepth:b.vec2d.create(),v3CameraPos:b.vec3d.create(),v3CameraUp:b.vec3d.create(),v3CameraRight:b.vec3d.create(),v3CameraDir:b.vec3d.create(),halfSizeNearPlane:b.vec2d.create(),v2CameraCenterOffset:b.vec2d.create(),v4SphereComp:b.vec4d.create(),v4AtmosParams1:b.vec4d.create(),v4AtmosParams2:b.vec4d.create(),v4AtmosParams3:b.vec4d.create(),v3InvWavelength:x,v3InvWavelengthScaled:l,
v4Radii:b.vec4d.create(),fScale:0,fScaleDepth:n,fLowerAlphaBlendBound:0,fScaleOverScaleDepth:0,fOneOverScaleDepth:0,fScaleDepthBlue:p,fOneOverScaleDepthBlue:y,fScaleOverScaleDepthBlue:0,g:e,g2:e*e,fMiePhaseCoefficients:z,showTest:0,nearFar:b.vec2d.create(),fCameraHeight:0,fCameraHeight2:0,fC:0,fCSur:0,fInnerFadeDistance:0,fAltitudeFade:0};this._lowerElevationBoundRadius=0;this._earthRadius=h.earthRadius;this.view=a;this._updateRadius(h.earthRadius)}d.prototype.destroy=function(){this._handles&&(this._handles.destroy(),
this._handles=null);this._hazeProgram&&(this._hazeProgram.dispose(),this._hazeProgram=null);this._skyProgram&&(this._skyProgram.dispose(),this._skyProgram=null);this._vao&&(this._vao.dispose(),this._vao=null)};d.prototype.when=function(a){return C.resolve().then(a)};d.prototype.initializeRenderContext=function(a){var b=this;a=a.rctx;this._handles=new B;this._updateElevation({spatialReference:this.view.basemapTerrain.spatialReference,tile:this.view.basemapTerrain.rootTiles[0],extent:this.view.basemapTerrain.rootTiles[0].extent});
this._handles.add(t.on(this.view,"basemapTerrain","elevation-change",function(a){return b._updateElevation(a)},function(){return b._updateElevation()}));this._handles.add(t.on(this.view,"basemapTerrain","elevation-bounds-change",function(){return b._updateVisibleElevationBounds()},function(){return b._updateVisibleElevationBounds()}));this._hazeProgram=w.createProgram(a,k.program,{haze:!0});this._skyProgram=w.createProgram(a,k.program);this._vao=this._createVertexArrayObject(a)};d.prototype.uninitializeRenderContext=
function(a){this.destroy()};d.prototype.render=function(a){if(a.slot!==this._hazeSlot&&a.slot!==this.slot||a.pass!==F.MATERIAL)return!1;this._update(a.camera);a.slot===this.slot&&this._renderSky(a);a.slot===this._hazeSlot&&this._renderHaze(a);this.needsRender=!1;return!0};d.prototype._renderSky=function(a){var b=a.rctx,c=this._skyProgram;b.bindProgram(c);b.setBlendFunctionSeparate(770,771,1,771);b.setDepthFunction(515);b.setDepthTestEnabled(!0);c.setUniform4fv("v4AtmosParams3",this._renderData.v4AtmosParams3);
this._renderCommon(c,a)};d.prototype._renderHaze=function(a){var b=this,c=a.rctx,d=a.offscreenRenderingHelper,e=this._hazeProgram;c.bindProgram(e);c.setBlendFunctionSeparate(1,769,0,1);d.renderDepthDetached(function(){c.setDepthTestEnabled(!1);c.bindTexture(d.depthTexture,0);e.setUniform1i("tDepth",0);b._renderCommon(e,a)})};d.prototype._renderCommon=function(a,b){var c=b.rctx;a.setUniform3fv("v3InvWavelength",this._renderData.v3InvWavelength);a.setUniform3fv("v3InvWavelengthScaled",this._renderData.v3InvWavelengthScaled);
a.setUniform3fv("v3LightDir",b.lightingData.direction);a.setUniform4fv("v4SphereComp",this._renderData.v4SphereComp);a.setUniform3fv("v3CameraPos",this._renderData.v3CameraPos);a.setUniform3fv("v3CameraUp",this._renderData.v3CameraUp);a.setUniform3fv("v3CameraRight",this._renderData.v3CameraRight);a.setUniform3fv("v3CameraDir",this._renderData.v3CameraDir);a.setUniform2fv("nearFar",this._renderData.nearFar);a.setUniform2fv("halfSizeNearPlane",this._renderData.halfSizeNearPlane);a.setUniform2fv("v2CameraCenterOffset",
this._renderData.v2CameraCenterOffset);a.setUniform4fv("v4Radii",this._renderData.v4Radii);a.setUniform4fv("v4AtmosParams1",this._renderData.v4AtmosParams1);a.setUniform4fv("v4AtmosParams2",this._renderData.v4AtmosParams2);a.setUniform1f("showTest",this._renderData.showTest);a.setUniform1f("fInnerFadeDistance",this._renderData.fInnerFadeDistance);a.setUniform1f("fAltitudeFade",this._renderData.fAltitudeFade);c.setBlendingEnabled(!0);c.setDepthWriteEnabled(!1);c.bindVAO(this._vao);H.assertCompatibleVertexAttributeLocations(this._vao,
a);c.drawArrays(5,0,4);c.setDepthFunction(513);c.setDepthTestEnabled(!1);c.setDepthWriteEnabled(!0);c.setBlendingEnabled(!1);c.setBlendFunctionSeparate(770,771,1,771)};d.prototype._createVertexArrayObject=function(a){var b=A.createBuffer(4);b.position.setVec(0,[-1,-1,1]);b.position.setVec(1,[1,-1,1]);b.position.setVec(2,[-1,1,1]);b.position.setVec(3,[1,1,1]);b.uv0.setVec(0,[0,0]);b.uv0.setVec(1,[1,0]);b.uv0.setVec(2,[0,1]);b.uv0.setVec(3,[1,1]);return new I(a,k.program.attributes,{geometry:D.glLayout(A)},
{geometry:G.createVertex(a,35044,b.buffer)})};d.prototype._adjustRadiusForTesselation=function(a){return a*Math.cos(Math.PI/Math.pow(2,4)/16)};d.prototype._updateElevation=function(a){a=a?a.tile:this.view.basemapTerrain.rootTiles[0];0===a.lij[0]&&(a=this._adjustRadiusForTesselation(h.earthRadius+a.elevationBounds[0]),a!==this._lowerElevationBoundRadius&&(this._lowerElevationBoundRadius=a,this._earthRadius=-1,this._updateVisibleElevationBounds()))};d.prototype._updateVisibleElevationBounds=function(){var a=
this._adjustRadiusForTesselation(h.earthRadius+this.view.basemapTerrain.getElevationBounds()[0]);(0>this._earthRadius||a<this._earthRadius)&&this._updateRadius(a)};d.prototype._updateRadius=function(a){this._earthRadius=a;var d=a*a,c=a/10*10.25,h=c*c,q=1/(c-a),k=q/n,l=q/p,g=.3*(c-a)+a,m=1/(c-g),f=this._renderData;b.vec4d.set4(q,n,k,J,f.v4AtmosParams1);b.vec4d.set4(e,p,l,y,f.v4AtmosParams2);b.vec4d.set4(e*e,z,g,m,f.v4AtmosParams3);b.vec4d.set4(a,d,c,h,f.v4Radii);f.fScale=q;f.fLowerAlphaBlendBound=
g;f.fScaleOverScaleDepth=k;f.fScaleOverScaleDepthBlue=l;d=u.INNER_ATMOSPHERE_DEPTH;f.fInnerFadeDistance=2*Math.sqrt((2*a-d)*d)};d.prototype._update=function(a){a&&(b.vec3d.negate(a.viewForward,this._renderData.v3CameraDir),b.vec3d.set(a.viewUp,this._renderData.v3CameraUp),b.vec3d.set(a.viewRight,this._renderData.v3CameraRight),this._renderData.fCameraHeight=b.vec3d.length(a.eye),this._renderData.fCameraHeight2=this._renderData.fCameraHeight*this._renderData.fCameraHeight,this._renderData.fC=this._renderData.fCameraHeight2-
this._renderData.v4Radii[3],this._renderData.fCSur=this._renderData.fCameraHeight2-this._renderData.v4Radii[1],this._renderData.v4SphereComp=b.vec4d.createFrom(this._renderData.fCameraHeight,this._renderData.fCameraHeight2,this._renderData.fC,this._renderData.fCSur),b.vec3d.set(a.eye,this._renderData.v3CameraPos),b.vec2d.set2(Math.tan(a.fovX/2)/(a.width/a.fullWidth),Math.tan(a.fovY/2)/(a.height/a.fullHeight),this._renderData.halfSizeNearPlane),b.vec2d.set2((a.padding[3]+a.width/2)/a.fullWidth-.5,
(a.padding[2]+a.height/2)/a.fullHeight-.5,this._renderData.v2CameraCenterOffset),b.vec2d.set2(a.near,a.far,this._renderData.nearFar),this._renderData.fAltitudeFade=u.computeInnerAltitudeFade(this._renderData.fCameraHeight-this._earthRadius))};d.isSupported=function(a){return a.rctx.capabilities.depthTexture};return d}();r=.02*Math.PI;var g=.004*Math.PI,x=b.vec3d.createFrom(1/Math.pow(.65,4),1/Math.pow(.57,4),1/Math.pow(.475,4)),l=b.vec3d.create(x);b.vec3d.scale(l,r);b.vec3d.add(l,b.vec3d.createFrom(g,
g,g));var n=.25,p=.05,J=1/n,y=1/p,e=-.99999,z=(1-e*e)/(2+e*e)*1.5,A=E.newLayout().vec3f("position").vec2f("uv0");return m});