const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const { LATEST_STAGING_VERSION } = include("engines.wine.engine.versions");

const Mspatcha = include("engines.wine.verbs.mspatcha");
include("engines.wine.plugins.windows_version");

new OnlineInstallerScript()
    .name("Adobe Acrobat Reader DC")
    .editor("Adobe")
    .applicationHomepage("https://acrobat.adobe.com/us/en/acrobat/pdf-reader.html?promoid=C4SZ2XDR&mv=other")
    .author("ImperatorS79")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .url("https://ardownload2.adobe.com/pub/adobe/reader/win/11.x/11.0.10/en_US/AdbeRdr11010_en_US.exe")
    .checksum("98b2b838e6c4663fefdfd341dfdc596b1eff355c")
    .category("Office")
    .executable("AcroRd32.exe")
    .preInstall(function (wine /*, wizard*/) {
        new Mspatcha(wine).go();
    })
    .postInstall(function (wine /*, wizard*/) {
        // fix broken dialogs (e.g. preferences)
        wine.windowsVersion("winxp");
    });
