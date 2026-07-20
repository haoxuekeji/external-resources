/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPBUZZER_CATEGORY}" id="ESPBUZZER_CATEGORY" colour="#CF63CF" secondaryColour="#BD42BD" iconURI="">
    <block type="espBuzzer_playNote" id="espBuzzer_playNote">
        <field name="PIN">4</field>
        <field name="NOTE">262</field>
        <value name="DUR">
            <shadow type="math_number">
                <field name="NUM">0.5</field>
            </shadow>
        </value>
    </block>
    <block type="espBuzzer_playFreq" id="espBuzzer_playFreq">
        <field name="PIN">4</field>
        <value name="FREQ">
            <shadow type="math_number">
                <field name="NUM">440</field>
            </shadow>
        </value>
        <value name="DUR">
            <shadow type="math_number">
                <field name="NUM">0.5</field>
            </shadow>
        </value>
    </block>
    <block type="espBuzzer_rest" id="espBuzzer_rest">
        <value name="DUR">
            <shadow type="math_number">
                <field name="NUM">0.5</field>
            </shadow>
        </value>
    </block>
    <block type="espBuzzer_stop" id="espBuzzer_stop">
        <field name="PIN">4</field>
    </block>
</category>    `;
}
exports = registerToolboxs;
