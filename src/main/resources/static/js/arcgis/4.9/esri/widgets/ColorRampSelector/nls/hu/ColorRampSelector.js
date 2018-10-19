// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define({colorRamps:{none:"Nincs",blackToWhite_predefined:"Feket\u00e9t\u0151l feh\u00e9rig",yellowToRed_predefined:"S\u00e1rg\u00e1t\u00f3l v\u00f6r\u00f6sig",slope_predefined:"Meredeks\u00e9g",aspect_predefined:"Kitetts\u00e9g",errors_predefined:"Hib\u00e1k",heatmap1_predefined:"H\u0151t\u00e9rk\u00e9p #1",elevation1_predefined:"Magass\u00e1g #1",elevation2_predefined:"Magass\u00e1g #2",blueBright_predefined:"F\u00e9nyes k\u00e9k",blueLightToDark_predefined:"K\u00e9k vil\u00e1gost\u00f3l s\u00f6t\u00e9tig",
blueGreenBright_predefined:"F\u00e9nyes k\u00e9k-z\u00f6ld",blueGreenLightToDark_predefined:"K\u00e9k-z\u00f6ld vil\u00e1gost\u00f3l s\u00f6t\u00e9tig",brownLightToDark_predefined:"Barna vil\u00e1gost\u00f3l s\u00f6t\u00e9tig",brownToBlueGreenDivergingBright_predefined:"Barn\u00e1t\u00f3l k\u00e9kesz\u00f6ldig, diverg\u00e1l\u00f3, f\u00e9nyes",brownToBlueGreenDivergingDark_predefined:"Barn\u00e1t\u00f3l k\u00e9kesz\u00f6ldig, diverg\u00e1l\u00f3, s\u00f6t\u00e9t",coefficientBias_predefined:"Egy\u00fctthat\u00f3 torz\u00edt\u00e1sa",
coldToHotDiverging_predefined:"Hidegt\u0151l a forr\u00f3ig, divergens",conditionNumber_predefined:"Felt\u00e9telsz\u00e1m",cyanToPurple_predefined:"Ci\u00e1nt\u00f3l lil\u00e1ig",cyanLightToBlueDark_predefined:"Vil\u00e1gos ci\u00e1nt\u00f3l a s\u00f6t\u00e9tk\u00e9kig",distance_predefined:"T\u00e1vols\u00e1g",grayLightToDark_predefined:"Sz\u00fcrke vil\u00e1gost\u00f3l s\u00f6t\u00e9tig",greenBright_predefined:"F\u00e9nyes z\u00f6ld",greenLightToDark_predefined:"Z\u00f6ld vil\u00e1gost\u00f3l s\u00f6t\u00e9tig",
greenToBlue_predefined:"Z\u00f6ldt\u0151l k\u00e9kig",orangeBright_predefined:"F\u00e9nyes narancss\u00e1rga",orangeLightToDark_predefined:"Narancss\u00e1rga vil\u00e1gost\u00f3l s\u00f6t\u00e9tig",partialSpectrum_predefined:"R\u00e9szleges spektrum",partialSpectrum1Diverging_predefined:"R\u00e9szleges spektrum 1 diverg\u00e1l\u00f3",partialSpectrum2Diverging_predefined:"R\u00e9szleges spektrum 2 diverg\u00e1l\u00f3",pinkToYellowGreenDivergingBright_predefined:"R\u00f3zsasz\u00ednt\u0151l s\u00e1rg\u00e1sz\u00f6ldig, diverg\u00e1l\u00f3, f\u00e9nyes",
pinkToYellowGreenDivergingDark_predefined:"R\u00f3zsasz\u00ednt\u0151l s\u00e1rg\u00e1sz\u00f6ldig, diverg\u00e1l\u00f3, s\u00f6t\u00e9t",precipitation_predefined:"Csapad\u00e9k",prediction_predefined:"El\u0151rejelz\u00e9s",purpleBright_predefined:"F\u00e9nyes lila",purpleToGreenDivergingBright_predefined:"Lil\u00e1t\u00f3l z\u00f6ldig diverg\u00e1l\u00f3, f\u00e9nyes",purpleToGreenDivergingDark_predefined:"Lil\u00e1t\u00f3l z\u00f6ldig diverg\u00e1l\u00f3, s\u00f6t\u00e9t",purpleBlueBright_predefined:"F\u00e9nyes lil\u00e1sk\u00e9k",
purpleBlueLightToDark_predefined:"Lil\u00e1sk\u00e9k, vil\u00e1gost\u00f3l s\u00f6t\u00e9tig",purpleRedBright_predefined:"F\u00e9nyes lil\u00e1spiros",purpleRedLightToDark_predefined:"Lil\u00e1spiros, vil\u00e1gost\u00f3l s\u00f6t\u00e9tig",redBright_predefined:"F\u00e9nyes piros",redLightToDark_predefined:"Piros, vil\u00e1gost\u00f3l s\u00f6t\u00e9tig",redToBlueDivergingBright_predefined:"Pirost\u00f3l a k\u00e9kig, diverg\u00e1l\u00f3, f\u00e9nyes",redToBlueDivergingDark_predefined:"Pirost\u00f3l a k\u00e9kig, diverg\u00e1l\u00f3, s\u00f6t\u00e9t",
redToGreen_predefined:"Pirost\u00f3l a z\u00f6ldig",redToGreenDivergingBright_predefined:"Pirost\u00f3l a z\u00f6ldig, diverg\u00e1l\u00f3, f\u00e9nyes",redToGreenDivergingDark_predefined:"Pirost\u00f3l a z\u00f6ldig, diverg\u00e1l\u00f3, s\u00f6t\u00e9t",spectrumFullBright_predefined:"Teljes spektrum, f\u00e9nyes",spectrumFullDark_predefined:"Teljes spektrum, s\u00f6t\u00e9t",spectrumFullLight_predefined:"Teljes spektrum, vil\u00e1gos",surface_predefined:"Felsz\u00edn",temperature_predefined:"H\u0151m\u00e9rs\u00e9klet",
whiteToBlack_predefined:"Feh\u00e9rt\u0151l a feket\u00e9ig",yellowToDarkRed_predefined:"S\u00e1rg\u00e1t\u00f3l a s\u00f6t\u00e9tv\u00f6r\u00f6sig",yellowToGreenToDarkBlue_predefined:"S\u00e1rg\u00e1sz\u00f6ldt\u0151l a z\u00f6ldig \u00e9s a s\u00f6t\u00e9tk\u00e9kig",yellowGreenBright_predefined:"F\u00e9nyes s\u00e1rg\u00e1sz\u00f6ld",yellowGreenLightToDark_predefined:"S\u00e1rg\u00e1sz\u00f6ld, vil\u00e1gost\u00f3l s\u00f6t\u00e9tig"}});