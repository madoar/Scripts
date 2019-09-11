const SteamScript = include("engines.wine.quick_script.steam_script");
const { LATEST_STABLE_VERSION } = include("engines.wine.engine.versions");

include("engines.wine.plugins.virtual_desktop");
const Vcrun2013 = include("engines.wine.verbs.vcrun2013");
const Corefonts = include("engines.wine.verbs.corefonts");
const DXVK = include("engines.wine.verbs.dxvk");

new SteamScript()
    .name("Subnautica Below Zero")
    .editor("Unknown Worlds Entertainment")
    .author("Zemogiter")
    .applicationHomepage("https://unknownworlds.com/subnautica/")
    .wineDistribution("upstream")
    .wineVersion(LATEST_STABLE_VERSION)
    .wineArchitecture("amd64")
    .appId(848450)
    .preInstall(function (wine, wizard) {
        wizard.message(
            tr("You can make the game smoother by using this: https://github.com/lutris/lutris/wiki/How-to:-Esync")
        );

        new Vcrun2013(wine).go();
        new Corefonts(wine).go();
        new DXVK(wine).go();

        wine.setVirtualDesktop();
    })
    .gameOverlay(false);
