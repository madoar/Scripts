const SteamScript = include("engines.wine.quick_script.steam_script");
const {LATEST_STABLE_VERSION} = include("engines.wine.engine.versions");

include("engines.wine.verbs.d3dx9");

new SteamScript()
    .name("Space Beast Terror Fright")
    .editor("nornware AB")
    .author("madoar")
    .appId(357330)
    .wineVersion(LATEST_STABLE_VERSION)
    .preInstall(function (wine /*, wizard*/) {
        wine.d3dx9();
    });
