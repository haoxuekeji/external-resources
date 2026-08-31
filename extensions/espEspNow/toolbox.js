/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPESPNOW_CATEGORY}" id="ESPESPNOW_CATEGORY" colour="#0FBD8C" secondaryColour="#0B8E69" iconURI="">
    <block type="espEspNow_init" id="espEspNow_init"></block>
    <block type="espEspNow_myMac" id="espEspNow_myMac"></block>
    <block type="espEspNow_broadcast" id="espEspNow_broadcast">
        <value name="MSG">
            <shadow type="text">
                <field name="TEXT">hello</field>
            </shadow>
        </value>
    </block>
    <block type="espEspNow_send" id="espEspNow_send">
        <value name="MSG">
            <shadow type="text">
                <field name="TEXT">hello</field>
            </shadow>
        </value>
        <value name="MAC">
            <shadow type="text">
                <field name="TEXT">AA:BB:CC:DD:EE:FF</field>
            </shadow>
        </value>
    </block>
    <block type="espEspNow_whenMessage" id="espEspNow_whenMessage"></block>
    <block type="espEspNow_message" id="espEspNow_message"></block>
    <block type="espEspNow_sender" id="espEspNow_sender"></block>
</category>    `;
}
exports = registerToolboxs;
