const SteamScript = include("engines.wine.quick_script.steam_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

const Uplay = include("engines.wine.verbs.uplay");

new SteamScript()
    .name("Assassin’s Creed® IV Black Flag™")
    .editor("Ubisoft Montreal")
    .author("Plata")
    .appId(242050)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .postInstall(function (wine /*, wizard*/) {
        // the automatically installed Uplay version does not update properly
        new Uplay(wine).go();
    });
