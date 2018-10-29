import { TableFactory } from "../diagram/TableFactory.js";
import { Tools as tools } from "../basic/BasicTools.js";
import { PARAMS_TABLE as ptable} from "../basic/ParamsTable.js";
import { SceneGenerator } from "./SceneGenerator.js";

/**
 * This is a manager to manage scenes and init them
 *
 * @author dsy 2018/9/12
 * @returns {{init: init}} singleton
 * @constructor singleton
 */
export var SceneManager = () => {
    const __init__ = (props) => {
        tools.watch("props", props);
        props.factory = new TableFactory();
        // arcgis 3d map renderer
        if (!props.table_debug) {
            require([
                "esri/Map",
                "esri/views/SceneView",
                "esri/layers/GraphicsLayer"
            ], (Map, SceneView, GraphicsLayer,) => {
                // 1. init map and view (global map)
                props.map = new Map({
                    logo: false,
                    basemap: "satellite",
                    ground: "world-elevation"
                });
                tools.watch("map", props.map);
                props.view = new SceneView({
                    alphaCompositingEnabled: true,
                    container: props.container,
                    map: props.map,
                    environment: {
                        lighting: {
                            // date: Date.now(),
                            // directShadowsEnabled: false,
                            ambientOcclusionEnabled: true,
                            cameraTrackingEnabled: true
                        },
                        background: {
                            type: "color",
                            color: [0, 0, 0, 0]
                        },
                        starsEnabled: false,
                    }
                });
                tools.watch("view", props.view);
                tools.setEventInApp(ptable.events.VUE_CONTROL, () => props.vuePanel.application);
                props.view.ui.empty('top-left'); // remove control panel in top left
                props.view.ui._removeComponents(["attribution"]); // remove "Powered by esri"
                props.map.add(props.staticGLayer = new GraphicsLayer());　// add GraphicLayer to map
                props.view.when(() => {
                    $.when($.ajax({
                        url: `${props.scenesUrl}/common`,
                        dataType: "json"
                    }).done((common) => {
                        props.ships = common.ships;
                        props.stations = common.stations;
                    })).done(() => {
                        SceneGenerator.init_ships(props);
                        SceneGenerator.init_stations(props);
                        SceneGenerator.init_demonstration(props);
                        SceneGenerator.init_popup(props);
                        SceneGenerator.init_scenes(props);
                    });
                }, (error)=> {
                    tools.mutter(error, "error");
                });
            });
        } else {
            // when in table debug model
            SceneGenerator.init_demonstration(props);
            SceneGenerator.init_scenes(props);
        }
    };

    return {
        init: (props) => {
            if (props) {
                tools.watch("tools", tools);
                __init__(props);
            } else {
                tools.mutter("props is undefined.", "error");
            }
        }
    }
};