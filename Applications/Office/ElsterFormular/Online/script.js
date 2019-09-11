const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");

include("engines.wine.plugins.native_application");
const Vcrun2017 = include("engines.wine.verbs.vcrun2017");

new LocalInstallerScript()
    .name("ElsterFormular")
    .editor("ELSTER")
    .applicationHomepage("https://www.elster.de/elfo_home.php")
    .browseMessage(
        tr("Please select the installation file.\nYou can download it from https://www.elster.de/elfo_down.php.")
    )
    .author("Plata")
    .category("Office")
    .executable("pica.exe")
    .preInstall(function (wine /*, wizard*/) {
        new Vcrun2017(wine).go();

        wine.nativeApplication("pdf");
    });
