// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define(["require","exports","../lib/DefaultVertexAttributeLocations","./sources/resolver"],function(d,b,c,a){Object.defineProperty(b,"__esModule",{value:!0});b.compositePass={name:"offscreen-composite",shaders:{vertexShader:a.resolveIncludes("renderer/offscreen/offscreen.vert"),fragmentShader:a.resolveIncludes("renderer/offscreen/offscreen.frag")},attributes:c.Default3D};b.compositeTransparentToHUDVisibilityPass={name:"offscreen-composite-transparent-to-hud-visibility",shaders:{vertexShader:a.resolveIncludes("renderer/offscreen/offscreen.vert"),
fragmentShader:a.resolveIncludes("renderer/offscreen/transparentToHUDVisibility.frag")},attributes:c.Default3D}});