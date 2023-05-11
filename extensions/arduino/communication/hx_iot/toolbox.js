/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addToolbox () {
    return `
<category name="%{BKY_HXIOT_CATEGORY}" id="HXIOT_CATEGORY" colour="#42CCFF" secondaryColour="#00BFFF">
    <block type="hxIot_init" id="hxIot_init">
        <value name="SERVER">
            <shadow type="text">
                <field name="TEXT">mqtt://haoxuekeji.com:1883</field>
            </shadow>
        </value>
    </block>
    <block type="hxIot_connect" id="hxIot_connect">
    </block>
    <block type="hxIot_disconnect" id="hxIot_disconnect">
    </block>
    <block type="hxIot_connected" id="hxIot_connected">
    </block>
    <block type="hxIot_publish" id="hxIot_publish">
        <value name="DATA">
            <shadow type="text">
                <field name="TEXT">hello</field>
            </shadow>
        </value>
    </block>
    <block type="hxIot_whenReceivedEvent" id="hxIot_whenReceivedEvent">
        <value name="MESSAGE">
            <block type="hxIot_whenReceivedEventMessage" id="hxIot_whenReceivedEventMessage">
            </block>
        </value>
    </block>
    <block type="hxIot_whenTopicReceived" id="hxIot_whenTopicReceived">
        <value name="DATA">
            <shadow type="text">
                <field name="TEXT">hello</field>
            </shadow>
        </value>
    </block>
</category>`;
}

exports = addToolbox;
