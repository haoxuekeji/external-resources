/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPWEBREMOTE_CATEGORY}" id="ESPWEBREMOTE_CATEGORY" colour="#4C97FF" secondaryColour="#3373CC" iconURI="">
    <block type="espWebRemote_startAp" id="espWebRemote_startAp">
        <value name="SSID">
            <shadow type="text">
                <field name="TEXT">OpenBlock</field>
            </shadow>
        </value>
        <value name="PWD">
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
        </value>
    </block>
    <block type="espWebRemote_startSta" id="espWebRemote_startSta"></block>
    <block type="espWebRemote_address" id="espWebRemote_address"></block>
    <block type="espWebRemote_whenButton" id="espWebRemote_whenButton">
        <field name="BTN">A</field>
    </block>
    <block type="espWebRemote_slider" id="espWebRemote_slider">
        <field name="SLIDER">S1</field>
    </block>
    <block type="espWebRemote_setLabel" id="espWebRemote_setLabel">
        <value name="TEXT">
            <shadow type="text">
                <field name="TEXT">hello</field>
            </shadow>
        </value>
        <field name="LABEL">L1</field>
    </block>
</category>    `;
}
exports = registerToolboxs;
