/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPSERVO_CATEGORY}" id="ESPSERVO_CATEGORY" colour="#40BF4A" secondaryColour="#389438" iconURI="">
    <block type="espServo_setAngle" id="espServo_setAngle">
        <field name="PIN">4</field>
        <value name="ANGLE">
            <shadow type="math_angle">
                <field name="NUM">90</field>
            </shadow>
        </value>
    </block>
    <block type="espServo_release" id="espServo_release">
        <field name="PIN">4</field>
    </block>
</category>    `;
}
exports = registerToolboxs;
