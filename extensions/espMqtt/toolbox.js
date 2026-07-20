/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPMQTT_CATEGORY}" id="ESPMQTT_CATEGORY" colour="#660066" secondaryColour="#4D004D" iconURI="">
    <block type="espMqtt_connect" id="espMqtt_connect">
        <value name="HOST">
            <shadow type="text">
                <field name="TEXT">broker.emqx.io</field>
            </shadow>
        </value>
        <value name="PORT">
            <shadow type="math_number">
                <field name="NUM">1883</field>
            </shadow>
        </value>
    </block>
    <block type="espMqtt_disconnect" id="espMqtt_disconnect">
    </block>
    <block type="espMqtt_subscribe" id="espMqtt_subscribe">
        <value name="TOPIC">
            <shadow type="text">
                <field name="TEXT">openblock/demo</field>
            </shadow>
        </value>
    </block>
    <block type="espMqtt_publish" id="espMqtt_publish">
        <value name="TOPIC">
            <shadow type="text">
                <field name="TEXT">openblock/demo</field>
            </shadow>
        </value>
        <value name="MSG">
            <shadow type="text">
                <field name="TEXT">hello</field>
            </shadow>
        </value>
    </block>
    <block type="espMqtt_checkMsg" id="espMqtt_checkMsg">
    </block>
    <block type="espMqtt_whenMessage" id="espMqtt_whenMessage">
    </block>
    <block type="espMqtt_topic" id="espMqtt_topic">
    </block>
    <block type="espMqtt_message" id="espMqtt_message">
    </block>
</category>    `;
}
exports = registerToolboxs;
