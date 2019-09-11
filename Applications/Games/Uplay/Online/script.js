const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

include("engines.wine.plugins.windows_version");
const Corefonts = include("engines.wine.verbs.corefonts");

new OnlineInstallerScript()
    .name("Uplay")
    .editor("Ubisoft")
    .applicationHomepage("https://uplay.ubi.com/")
    .author("Plata, KREYREN")
    .url("https://ubistatic3-a.akamaihd.net/orbit/launcher_installer/UplayInstaller.exe")
    .category("Games")
    .executable("UbisoftGameLauncher.exe")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function (wine /*, wizard*/) {
        new Corefonts(wine).go();
        wine
            .setOsForApplication()
            .set("upc.exe", "winvista")
            .do();
        wine
            .setOsForApplication()
            .set("UbisoftGameLauncher.exe", "winvista")
            .do();
    });
