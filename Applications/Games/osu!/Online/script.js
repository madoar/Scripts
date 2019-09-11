const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const {LATEST_DEVELOPMENT_VERSION} = include("engines.wine.engine.versions");

const DotNET45 = include("engines.wine.verbs.dotnet45");
const Corefonts = include("engines.wine.verbs.corefonts");

new OnlineInstallerScript()
    .name("osu!")
    .editor("Dean « peppy » Herbert")
    .applicationHomepage("https://osu.ppy.sh/")
    .author("ImperatorS79")
    .category("Games")
    .executable("osu!.exe")
    .wineVersion(LATEST_DEVELOPMENT_VERSION)
    .url("https://m1.ppy.sh/r/osu!install.exe")
    .preInstall(function (wine /*, wizard*/) {
        //maybe needs cjkfonts or set sound driver to alsa
        new Corefonts(wine).go();
        new DotNET45(wine).go();
    });
