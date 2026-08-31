/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPEVENTS_CATEGORY}" id="ESPEVENTS_CATEGORY" colour="#FFBF00" secondaryColour="#CC9900" iconURI="">
    <block type="espEvents_whenButton" id="espEvents_whenButton">
        <field name="PIN">0</field>
    </block>
    <block type="espEvents_whenTouch" id="espEvents_whenTouch">
        <field name="TOUCH">4</field>
    </block>
    <block type="espEvents_everyNSeconds" id="espEvents_everyNSeconds">
        <value name="N">
            <shadow type="math_positive_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>
</category>    `;
}
exports = registerToolboxs;
