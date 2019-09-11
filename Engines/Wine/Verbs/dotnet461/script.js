const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");
include("engines.wine.plugins.windows_version");
include("engines.wine.plugins.regedit");
const RemoveMono = include("engines.wine.verbs.remove_mono");
const DotNET46 = include("engines.wine.verbs.dotnet46");

/**
 * Verb to install .NET 4.6.1
 */
class DotNET461 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const windowsVersion = this.wine.windowsVersion();

        print(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet461"));

        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                "https://download.microsoft.com/download/E/4/1/E4173890-A24A-4936-9FC9-AF930FE3FA40/NDP461-KB3102436-x86-x64-AllOS-ENU.exe"
            )
            .checksum("83d048d171ff44a3cad9b422137656f585295866")
            .name("NDP461-KB3102436-x86-x64-AllOS-ENU.exe")
            .get();

        new RemoveMono(this.wine).go();

        new DotNET46(this.wine).go();

        this.wine.windowsVersion("win7");

        this.wine
            .overrideDLL()
            .set("builtin", ["fusion"])
            .do();

        wizard.wait(tr("Please wait while {0} is installed...", ".NET Framework 4.6.1"));

        this.wine.run(setupFile, [setupFile, "/q", "/norestart"], null, false, true);

        wizard.wait(tr("Please wait..."));

        this.wine.regedit().deleteValue("HKCU\\Software\\Wine\\DllOverrides", "*fusion");

        this.wine
            .overrideDLL()
            .set("native", ["mscoree"])
            .do();

        this.wine.windowsVersion(windowsVersion);
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "dotnet461", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        wizard.message(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet461"));

        new DotNET461(wine).go();

        wizard.close();
    }
}

module.default = DotNET461;
