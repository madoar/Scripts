const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const { LATEST_STAGING_VERSION } = include("engines.wine.engine.versions");

include("engines.wine.plugins.windows_version");
const Corefonts = include("engines.wine.verbs.corefonts");
const D3DX9 = include("engines.wine.verbs.d3dx9");
const Vcrun2008 = include("engines.wine.verbs.vcrun2008");

new OnlineInstallerScript()
    .name("Earth Eternal - Valkal's Shadow")
    .editor("Team TAW")
    .applicationHomepage("http://www.theanubianwar.com/valkals-shadow")
    .author("rockfireredmoon")
    .url("http://www.theanubianwar.com/sites/default/files/downloads/EarthEternal_Valkals_Shadow_Setup.exe")
    .installationArgs(["/S"])
    .category("Games")
    .executable("Spark.exe", ["http://live.theanubianwar.com/Release/Current/EarthEternal.car"])
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function (wine /*, wizard*/) {
        wine.windowsVersion("winxp");
        new Corefonts(wine).go();
        new D3DX9(wine).go();
        new Vcrun2008(wine).go();
    });
