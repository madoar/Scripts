const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

const Corefonts = include("engines.wine.verbs.corefonts");
include("engines.wine.plugins.windows_version");

new OnlineInstallerScript()
    .name("Steam")
    .editor("Valve")
    .applicationHomepage("https://www.steampowered.com")
    .author("Quentin PÂRIS")
    .url("https://steamcdn-a.akamaihd.net/client/installer/SteamSetup.exe")
    .checksum("4b1b85ec2499a4ce07c89609b256923a4fc479e5")
    .category("Games")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function (wine /*, wizard*/) {
        wine
            .setOsForApplication()
            .set("steam.exe", "winxp")
            .do();
        wine
            .setOsForApplication()
            .set("steamwebhelper.exe", "winxp")
            .do();
        new Corefonts(wine).go();
    })
    .executable("Steam.exe", ["-no-cef-sandbox"]);
